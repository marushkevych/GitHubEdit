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


	getRoute(){

		return {
			title: 'Login!',
			component: Login,
			backButtonTitle: 'Logout',

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
