/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Router = require('react-native-router');
var Pages = require('./App/Components/Pages');
var Badge = require('./App/Components/Badge');
var Editor = require('./App/Components/Editor');
var Login = require('./App/Components/Login');


var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	AsyncStorage
} = React;

var STORAGE_KEY = "token.key";
AsyncStorage.removeItem(STORAGE_KEY)



class GitHubEdit extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			editing: false,
			token: null
		};


		AsyncStorage.getItem(STORAGE_KEY).then((token)=>{
			this.setState({token});
		})
	}
	openPage(url){
		console.log('open page', url);
		this.setState({
			editing: true,
			page: url
		})
	}
	setToken(token){
		AsyncStorage.setItem(STORAGE_KEY, token).then(()=>{
			this.setState({token});
		})  
	}
	getContent(){
		if(this.state.token == null){
			return <Login onToken={this.setToken.bind(this)} />
		}

		if(this.state.editing){
				return <Editor url={this.state.page}/>
		}
		return <Pages onPageSelected={this.openPage.bind(this)} />
	}
	render() {
		return (
				<View style={styles.container}>
					<Badge title='Pages' />
					{this.getContent()}
				</View>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center',
		// backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});

AppRegistry.registerComponent('GitHubEdit', () => GitHubEdit);
