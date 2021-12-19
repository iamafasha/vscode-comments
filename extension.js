const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "iamafasha-commentor" is now active!');
	
	let disposable = vscode.commands.registerCommand('iamafasha-commentor.comment', function () {
		//dectect language of selected text
		let editor = vscode.window.activeTextEditor;
		let selection = editor.selection;
		let text = editor.document.getText(selection);
		let comment_types = [
			"Single Line Comment",
			"Multi Line Comment",
			"HTML Comment",
			"Hash Comment"		
		]
		//display more commands	
		let moreCommands = vscode.window.showQuickPick(comment_types);
		moreCommands.then(function(value){
			console.log(value);
			if(value == "Single Line Comment"){
				let comment = "//" + text;
				editor.edit(function(editBuilder){
					editBuilder.replace(selection, comment);
				}).then(function(){
					editor.selection.active = editor.selection.anchor;
				});
			}

			if(value == "Multi Line Comment"){
				let comment = "/*" + text + "*/";
				editor.edit(function(editBuilder){
					editBuilder.replace(selection, comment);
				});
			}

			if(value == "HTML Comment"){
				//wrap text in comment tags
				let comment = "<!-- \n" + text + "\n -->";
				editor.edit(function(editBuilder){
					editBuilder.replace(selection, comment);
				});
			}

			if(value == "Hash Comment"){
				//add a hash to every \n of text
				let comment = "#" + text.replace(/\n/g, "\n#");
				editor.edit(function(editBuilder){
					editBuilder.replace(selection, comment);
				});
			}

			editor.edit(builder => {
				builder.replace(selection, "");
			})

		}).catch(function(reason){
			console.log(reason);
		});

		// vscode.window.showInformationMessage(language);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {
	
}

module.exports = {
	activate,
	deactivate
}
