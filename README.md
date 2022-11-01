# deal with tmp file and tmp folders

Handy tool when you write down some text using vscode offen, and do not want to save the files one by one.

## Features

1. Create a tmp file with a shortcut.

## Extension Settings

This extension contributes the following settings:

* `vsc.tmp.deleteOnExit`: removes the created files when vscode exits, default false
* `vsc.tmp.tmpDir`: where the temporary files will be created, default the system temp dir
* `vsc.tmp.file.defaultExtension`: Default file extension type for the prompt

## Extension Commands

All commands are available by opening the Command Palette (`Command+Shift+P` on macOS and `Ctrl+Shift+P` on Windows/Linux) and typing in one of the following Command Name:

| Command Name            | Command ID                 | Description                                          |
| ----------------------- | -------------------------- | ---------------------------------------------------- |
| `Vsc-tmp: Create`       | `nvsc.tmp.file.create`     | create a temporary file                              |
| `Vsc-tmp: Open Created` | `vsc.tmp.file.openCreated` | open a temporary file created in the current session |

By default, the extension does not provide any shortcut. But you can assign each command to one. (see [Key Bindings for Visual Studio Code](https://code.visualstudio.com/docs/getstarted/keybindings) for more information).
