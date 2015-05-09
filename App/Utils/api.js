var URL = 'https://api.github.com/repos/marushkevych/marushkevych.github.io/contents/_posts';


var api = {
	getPages: function(username){
		return doFetch(URL);
	},	
	getContent: function(url){
		return doFetch(url);
	},
    updatePage: function(url, content, sha, token){


    	var body = {
		  message: "updating",
		  committer: {
		    name: "Andrey M",
		    email: "marushkevych@gmail.com"
		  },
		  content: content,
		  sha: sha
		};

		var conf = 	{
			method: 'put',
		  	headers: {
				'Authorization': 'token ' + token
			},
			body: JSON.stringify(body)
		};
    	console.log('updating request', conf)

		return doFetch(url, conf);		

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