/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Pages = require('./App/Components/Pages');
var Badge = require('./App/Components/Badge');
var Editor = require('./App/Components/Editor');
var Login = require('./App/Components/Login');

var Router = React.NavigatorIOS;

var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	AsyncStorage
} = React;

// AsyncStorage.removeItem("token.key")


class GitHubEdit extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			token: null
		};


		AsyncStorage.getItem("token.key").then((token)=>{
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
		AsyncStorage.setItem("token.key", token).then(()=>{
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
	getRoute(){
		if(this.state.token == null){
			return {
				title: 'Login!',
				component: Login,
				backButtonTitle: 'Logout',
			};
		}

		return {
			title: 'Pages!',
			component: Pages
		};
	}
	render() {
		return (
			<Router 
				style={styles.container} 
				initialRoute={this.getRoute()} 
				barTintColor='#48BBEC'/>
		)
	}
}

var styles = StyleSheet.create({
  container:{
    flex: 1,
    // backgroundColor: '#48BBEC',
  },
});

AppRegistry.registerComponent('GitHubEdit', () => GitHubEdit);
