var EventEmitter = require('events').EventEmitter;
var Buffer = require('buffer').Buffer;
var api = require('../Utils/api');
var dateFormat = require('dateformat');

var header = '---\n'+
'layout: post\n'+
'category: \n'+
'tagline: \n'+
'tags : [ ]\n'+
'---\n';

/**
 * Emits events: loading, change
 */
class ContentService extends EventEmitter {
	constructor(){
		super();
	}

	refreshPages(){
		return api.getPages(this.currentFolder).then((pages) =>{
			this.pages = pages;
		})		
	}

	loadFolder(url){
		this.currentFolder = url;
		this.emit('loading');
		return this.refreshPages().then(() =>{
			this.emit('change');
		})
	}

	loadPage(url){
		this.emit('loading');
		return api.getContent(url).then((res) =>{
			this.currentPage = res;
			this.emit('change');
		})		
	}

	createPage(name){
		this.emit('loading');
		var date = dateFormat(new Date(), "yyyy-mm-dd");
		var url = `${this.currentFolder}/${date}-${name}.md`;
		return api.createPage(url, utf8_to_b64(header)).then((res) => {
			return this.refreshPages().then(() => {
				return this.loadPage(res.content.url).then(() => {
					return res.content.url;
				})
			})
		})
	}

	
}

function utf8_to_b64( str ) {
	return (new Buffer(str, 'utf8')).toString('base64');
}

module.exports = new ContentService();