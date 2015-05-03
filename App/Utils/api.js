var URL = 'https://api.github.com/repos/marushkevych/marushkevych.github.io/contents/_posts';


var api = {
	getPages: function(username, token){
		return doFetch(URL);
	},	
	getContent: function(url, token){
		return doFetch(url);
	},
    updatePage: function(url, content, sha, TOKEN){
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
				'Authorization': 'token 2c8cd72a20d52ce11b3b1a79f66db31bb3817a22'
			},
			body: JSON.stringify(body)
		};
    	console.log('updating request', conf)

		return doFetch(url, conf);		

    },


	getNotes: function(username){
		username = username.toLowerCase().trim();
		return doFetch(`https://github-notes-saver.firebaseio.com//${username}.json`);
	},
	addNote: function(username, note){
		username = username.toLowerCase().trim();
		return doFetch(`https://github-notes-saver.firebaseio.com//${username}.json`, {
			method: 'post',
			body: JSON.stringify(note)
		});
	}

};

function doFetch(url, conf){
	return fetch(url, conf).then((res) => {
		return res.json().then((json) => {
			console.log('got response', json)
			if(json && json.message === 'Not Found'){
				throw new Error("Not Found");
			}
			return json;	
		})		
	});
}


module.exports = api;