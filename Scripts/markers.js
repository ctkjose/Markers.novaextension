

function parseMarkers(editor){
	let d = editor.document;
	if( !d || d.isEmpty ) return [];
	
	const txt = d.getTextInRange(new Range(0, d.length));
	
	if(!txt) return [];
		
	var lines = txt.split(d.eol);
	let s = '', ln=0, pos=0;
	let szEOL = d.eol.length;
	var items = [];
	
	
	let defaults = [
		"^\\s*//\\s*!\\s*(.*)\\s*$",
		"^\\s*//\\s*((MARK|TODO|FIXME):\\s+(.*))$",
		"^\\s*/\\*\\s*!\\s*(.*)\\s*\\*/$",
		"^\\s*#pragma\\s*mark\\s(.*)$"
	];
	
	let patterns = nova.config.get("expw-markers.regex");
	if(!patterns) patterns = defaults;
	let tests = [];
	
	for(let pattern of patterns){
		try{
			//console.log(pattern);
			let re = new RegExp(pattern, 'mi');
			tests.push(re);
		}catch(err){
			nova.workspace.showInformativeMessage("A marker regular expression is invalid.");
			
		}
		
	}
	
	let matched = (m) => {
		let s = m[0];
		let lbl = m.pop();
		
		//console.log("Line=%d, Pos:%d", ln, pos);
		items.push({ name: lbl, text: s, line: ln, pos: pos });
		
	};
	
	for(ln = 0; ln < lines.length; ln++ ){
		s = lines[ln];
		//console.log("LN[%d]  = [%s]", ln, s);
		for(let re of tests){
			let m = re.exec(s);
			if(m){
				//console.log("LN[%d]  = [%s]", ln, s);
				matched(m);
				break;
			}
		}
		pos += s.length + szEOL;
	}
	
	return items;
}

exports.parseMarkers = parseMarkers;
