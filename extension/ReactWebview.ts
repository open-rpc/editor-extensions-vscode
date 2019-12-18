import * as vscode from 'vscode';
import * as path from 'path';
import * as v4 from 'uuid/v4';
import { OpenRPC } from '@open-rpc/meta-schema';
import { parseOpenRPCDocument } from '@open-rpc/schema-utils-js';

const parseDocument = (doc: string): Promise<OpenRPC> => {
  return parseOpenRPCDocument(doc.replace('\n', ''), {
    validate: false
  });
};

export class ReactWebView {
  private static currentPanel: vscode.WebviewPanel | undefined;

  constructor(context: vscode.ExtensionContext) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    vscode.workspace.onDidChangeTextDocument(async (editor) => {
      try {
        this.updateContent(await parseDocument(editor.document.getText()));
      } catch (error) {
        // vscode.window.showErrorMessage(`Error parsing openrpc.json: ${error.message}`);
      }
    });

    // Check for existing panel
    if (ReactWebView.currentPanel) {
      ReactWebView.currentPanel.reveal(column);
    } else {
      ReactWebView.currentPanel = vscode.window.createWebviewPanel(
        'openRpc',
        'Preview: openrpc.json',
        vscode.ViewColumn.Two,
        {
          enableScripts: true,
        }
      );

      ReactWebView.currentPanel.webview.html = this.getWebviewContent(context.extensionPath);

      // Clean up resource when panel disposes
      ReactWebView.currentPanel.onDidDispose(() => {
        if (ReactWebView.currentPanel) {
          ReactWebView.currentPanel.dispose();
          ReactWebView.currentPanel = undefined;
        }
      });
    }

    const init = async () => {
      if (vscode.window.activeTextEditor) {
        try {
          const text = await parseDocument(vscode.window.activeTextEditor.document.getText());
          setTimeout(async () => {
            this.updateContent(text);
            vscode.commands.executeCommand('workbench.action.navigateBack');
          }, 1000);
        } catch (error) {
          // vscode.window.showErrorMessage(`Error parsing openrpc.json: ${error.message}`);
        }
      }
    };

    init();
  }


  updateContent(data: any) {
    if (ReactWebView.currentPanel) {
      ReactWebView.currentPanel.webview.postMessage({
        method: "updateSchema",
        params: {
          schema: data
        }
      });
    }
  }

  getWebviewContent(extensionPath: string) {
    const manifest = require(path.join(extensionPath, 'build', 'asset-manifest.json'));

    // get all generated chunks names
    const chunksRegex = /^((?!\.map|\.css|\.html).)*$/;
    const chunkNames = Object.keys(manifest.files).filter(key => chunksRegex.test(key));

    // Use a nonce to whitelist which scripts can be run
    const nonce = v4();

    const scripts = [...chunkNames]
      .map((scriptName) => {
        const scriptUri = vscode.Uri
          .file(path.join(extensionPath, 'build', manifest.files[scriptName]))
          .with({ scheme: 'vscode-resource' });

        return `<script nonce="${nonce}" src="${scriptUri}"></script>`;
      })
      .join('');

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
				<meta name="theme-color" content="#000000">
				<title>React App</title>
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource: https:; script-src 'nonce-${nonce}';style-src vscode-resource: 'unsafe-inline' http: https: data:;">
				<base href="${vscode.Uri.file(path.join(extensionPath, 'build')).with({ scheme: 'vscode-resource' })}/">
				<style>
					body {
						background: white;
					}
				</style>
			</head>

			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root"></div>
				${scripts}
			</body>
			</html>`;
  }
}

const createOrRevealWebView = (context: vscode.ExtensionContext) => {
  return new ReactWebView(context);
};

export default createOrRevealWebView;
