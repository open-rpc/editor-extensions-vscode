import * as vscode from 'vscode';


export class ReactWebView {
	public static currentPanel: vscode.WebviewPanel | undefined;

	constructor() {
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
        vscode.ViewColumn.One
      );

      ReactWebView.currentPanel.webview.html = this.getWebviewContent();
		}
	}

	getWebviewContent() {
		return `<!DOCTYPE html>
			<html lang="en">
				<head>
						<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<title>Preview window</title>
				</head>
				<body>
					<div id="app"></div>
				</body>
			</html>
		`;
	}
}

const createOrRevealWebView = () => {
	return new ReactWebView();
};

export default createOrRevealWebView;
