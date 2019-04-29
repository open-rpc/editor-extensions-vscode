import * as vscode from 'vscode';
import * as path from 'path';
import * as v4 from 'uuid/v4';

export class ReactWebView {
	public static currentPanel: vscode.WebviewPanel | undefined;

	constructor(extensionPath: string) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

		// Check for existing panel
		if (ReactWebView.currentPanel) {
			ReactWebView.currentPanel.reveal(column);
		} else {
			ReactWebView.currentPanel = vscode.window.createWebviewPanel(
        'openRpc',
        'Preview: openrpc.json',
				vscode.ViewColumn.One,
				{
					enableScripts: true
				}
      );

			ReactWebView.currentPanel.webview.html = this.getWebviewContent(extensionPath);

			// Clean up resource when panel disposes
			ReactWebView.currentPanel.onDidDispose(() => {
				if (ReactWebView.currentPanel) {
					ReactWebView.currentPanel.dispose();
					ReactWebView.currentPanel = undefined;
				}
			});

			vscode.workspace.findFiles('openrpc.json')
				.then(files => {
					const openRpcDoc = files[0]; // using the file at root

					const docData = require(openRpcDoc.path);
					this.updateContent(docData);
				});

			vscode.workspace.onDidChangeTextDocument(({ contentChanges, document }) => {
				if (document.fileName.endsWith('openrpc.json') && !document.isDirty) {
					try {
						const serializedText = document.getText().replace('\n', '');
						const parsedData = JSON.parse(serializedText);
						this.updateContent(parsedData);
					} catch(error) {
						vscode.window.showErrorMessage(`Error parsing openrpc.json: ${error.message}`);
					}
				}
			});
		}
	}

	updateContent(data: any) {
		if (ReactWebView.currentPanel) {
			ReactWebView.currentPanel.webview.postMessage(data);
		}
	}

	getWebviewContent(extensionPath: string) {
		const manifest = require(path.join(extensionPath, 'build', 'asset-manifest.json'));

		// get main script file name
		const mainScript = manifest.files['main.js'];

		// get runtime script file name
		const runtimeMainScript = manifest.files['runtime~main.js'];
	
		// get all generated chunks names
		const chunksRegex = /^(static)+(\/js)+(.)+(chunk\.js)$/;
		const chunkNames = Object.keys(manifest.files).filter(key => chunksRegex.test(key));

		// Use a nonce to whitelist which scripts can be run
		const nonce = v4();

		const scripts = [mainScript, runtimeMainScript, ...chunkNames]
			.map(scriptName => {
				const scriptUri = vscode.Uri
					.file(path.join(extensionPath, 'build', scriptName))
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
	return new ReactWebView(context.extensionPath);
};

export default createOrRevealWebView;
