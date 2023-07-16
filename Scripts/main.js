//Markers...

const { parseMarkers } = require("./markers");


exports.activate = function() {
    // Do work when the extension is activated
}

exports.deactivate = function() {
    // Clean up state before the extension is deactivated
}


nova.commands.register("expw-markers.show-markers", (workspace) => {
    
    let editor = nova.workspace.activeTextEditor;
    if(!editor) return;
    
    const items = parseMarkers(editor);
    
    if(!items.length){
        nova.workspace.showInformativeMessage("No markers where found.");
        return;
    }
    const names = items.map((mark) =>
        mark.name ? `${mark.name} (line ${mark.line})` : `Line ${mark.line}`
    );
    
    nova.workspace.showChoicePalette(names, {}, (name, index) => {
        if(!editor || !name) return;
        let mark = items[index];
        
        
        editor.scrollToPosition(mark.pos);
        let r = new Range(mark.pos,mark.pos);
        editor.addSelectionForRange(r);
        //editor.addSelectionForRange(mark.r);
        //editor.moveToTop();
        //editor.moveDown(mark.line);
    });
    
    
});


nova.commands.register("expw-markers.runExternalTool", (workspace) => {
    var options = {
        "placeholder": "/path/to/tool",
        "prompt": "Run"
    };
    nova.workspace.showInputPanel("Enter the path to the external tool:", options, function(result) {
        if (result) {
            var options = {
                // "args": [],
                // "env": {},
                // "stdin": <any buffer or string>
            };
            
            var process = new Process(result, options);
            var lines = [];
            
            process.onStdout(function(data) {
                if (data) {
                    lines.push(data);
                }
            });
            
            process.onDidExit(function(status) {
                var string = "External Tool Exited with Stdout:\n" + lines.join("");
                nova.workspace.showInformativeMessage(string);
            });
            
            process.start();
        }
    });
});

