'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

import * as Path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import * as vscode from 'vscode';

let created_files = [];


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    const resolvePath = (filepath: string): string => {
        if (filepath[0] === '~') {
            const hoveVar = process.platform === 'win32' ? 'USERPROFILE' : 'HOME';
            return Path.join(process.env[hoveVar], filepath.slice(1));
        }
        else {
            return Path.resolve(filepath);
        }
    };

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('vsc.tmp.file.create', async () => {
        // The code you place here will be executed every time your command is executed
        const tempdir = resolvePath(
            vscode.workspace
                .getConfiguration('vsc.tmp')
                .get('tmpDir') || os.tmpdir());

        function currentTimeString(): string {
            const current = new Date();
            return `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}_${current.getMinutes()}_${current.getSeconds()}_${current.getMilliseconds()}`;
        }

        const fileExtension = await vscode.window.showInputBox({
            prompt: "File extension type",
            value: "tmp",
        });

        const filepath = `${tempdir}${Path.sep}tmp_${currentTimeString()}.${fileExtension}`;
        fs.writeFile(filepath, '', _ => { });
        created_files.push(filepath);
        vscode.workspace
            .openTextDocument(filepath)
            .then(vscode.window.showTextDocument);
    });

    // let onclose = vscode.workspace.onDidCloseTextDocument(e => {
    //     console.log(e.fileName);
    //     console.log(e);
    //     if (e.lineCount == 0) {
    //         console.log(e.fileName);
    //     }
    // });
    // context.subscriptions.push(onclose);
    context.subscriptions.push(disposable);
}


// this method is called when your extension is deactivated
export function deactivate() {
    const deleteOnExit = vscode.workspace
        .getConfiguration('vsc.tmp')
        .get("deleteOnExit", false);

    for (const f of created_files) {
        if (deleteOnExit) {
            fs.unlink(f, console.error);
        } else {
            //Delete the file anyway if the file is empty
            fs.stat(f, (_, s) => {
                if (!!s && s.size == 0) {
                    console.log(s);
                    fs.unlink(f, console.error)
                }
            })
        }
    }
}

