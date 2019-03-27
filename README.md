# OPEN-RPC Visual Studio Code Extension

Provides auto-completion and validation for [OPEN-RPC](https://github.com/open-rpc/spec) `openrpc.json` documents.

[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=open-rpc/editor-extensions-vscode
)](https://dependabot.com)

## Installation

You can find this extension on the vscode marketplace [here](https://marketplace.visualstudio.com/items?itemName=OPEN-RPC.OPEN-RPC).


## Usage

Open a file that matches the pattern: `*openrpc.json`

Use `vscode` keybindings as normal to get auto completion, formatting and validation features:

- `CTRL + SPACE` - auto complete OpenRPC Document - `ENTER` or `TAB` to complete
  - `CTRL + N/CTRL + P` - down/up a completion menu line
- `ALT + SHIFT + F` - Format Document
- To **See Errors**:
  - mouse `hover` underlined green `~` 
    - `CMD + K + I` - keychord for `hover`
  - `CMD + SHIFT + M` to see errors in the `Problems Pane`
  


**gif**

![openrpc-vscode](https://user-images.githubusercontent.com/364566/54830472-c5819800-4c75-11e9-8490-49656eb0dd66.gif)

**screenshot**

![image](https://user-images.githubusercontent.com/364566/54831313-59a02f00-4c77-11e9-84bf-eb486f5aa1db.png)

## Extension Settings

This extension contributes the following settings:

* `jsonValidation` for OPEN-RPC documents via its [meta-schema](https://github.com/open-rpc/meta-schema)

### 1.0.0

Initial release of OPEN-RPC vscode extension

### Conventions and Specifications 

Using conventions, documentation and specifications make it easier to:
- communicate the problem you are solving
- ease onboarding
- build and use composable tools
- promote open source contribution and engagement
- promote issue and feature discussion on Github itself


### Contributing

How to contribute, build and release are outlined in [CONTRIBUTING.md](CONTRIBUTING.md), [BUILDING.md](BUILDING.md) and [RELEASING.md](RELEASING.md) respectively. Commits in this repository follow the [CONVENTIONAL_COMMITS.md](CONVENTIONAL_COMMITS.md) specification.
