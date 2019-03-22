# OPEN-RPC Visual Studio Code Extension

Provides auto-completion and validation for [OPEN-RPC](https://github.com/open-rpc/spec) `openrpc.json` documents.

[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=open-rpc/editor-extensions-vscode
)](https://dependabot.com)

## Installation

You can find this extension on the vscode marketplace [here](https://marketplace.visualstudio.com/items?itemName=OPEN-RPC.OPEN-RPC).


## Usage

Open a file that matches the pattern: `*openrpc.json`

Use `vscode` keybindings as normal to get auto completion and validation features:

- `CTRL + SPACE` - auto complete OpenRPC Document - `ENTER` or `TAB` to complete
- mouse `hover` underlined green `~` to see errors OR `CMD + SHIFT + M` to see errors in the `Problems Pane`
  - `CMD + K + I` - keychord for `hover`

**gif**

![openrpc-vscode](https://user-images.githubusercontent.com/364566/54830472-c5819800-4c75-11e9-8490-49656eb0dd66.gif)

**screenshot**

![image](https://user-images.githubusercontent.com/364566/54831313-59a02f00-4c77-11e9-84bf-eb486f5aa1db.png)

## Extension Settings

This extension contributes the following settings:

* `jsonValidation` for OPEN-RPC documents via its [meta-schema](https://github.com/open-rpc/meta-schema)

### 1.0.0

Initial release of OPEN-RPC vscode extension


