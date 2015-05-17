var React = require('react-native');
var AsyncStorage = React.AsyncStorage;


var api = {
	getPages: function(URL){
		return doFetch(URL);
	},	
	getContent: function(url){
		return doFetch(url);
	},
	createPage: function(url, content){
		return this.updatePage(url, content);
	},
    updatePage: function(url, content, sha){

    	return AsyncStorage.getItem("token.key").then((token)=>{

	    	var body = {
			  message: "updating",
			  committer: {
			    name: "Andrey M",
			    email: "marushkevych@gmail.com"
			  },
			  content: content
			};

			if(sha){
				body.sha = sha;
			}

			var conf = 	{
				method: 'put',
			  	headers: {
					'Authorization': 'token ' + token
				},
				body: JSON.stringify(body)
			};
	    	console.log('updating request', conf)

			return doFetch(url, conf);		
    	});
    	

    },



};


function doFetch(url, conf){
	return fetch(url, conf).then((res) => {
		console.log('got response', res)
		return res.json().then((json) => {
			console.log('got response json', json)
			if(res.status >= 400){
				throw new Error(json.message)
			}
			return json;	
		})		
	});
}


module.exports = api;