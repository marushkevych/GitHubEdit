var EventEmitter = require('events').EventEmitter;

class Document extends EventEmitter {
	constructor(url){
		super();
		this.url = url;
	}
}

module.exports = Document;