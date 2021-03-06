var React = require('react-native');
var api = require('../Utils/api');
var Pages = require('./Pages');
var CreatePage = require('./CreatePage');


// var URL = 'https://api.github.com/repos/marushkevych/marushkevych.github.io/contents/_posts';
var URL = 'https://api.github.com/repos/shamashka/shamashka.github.io/contents/_posts';

var {
	View,
	StyleSheet,
	Text,
	TouchableHighlight,
	TextInput,
	AsyncStorage
} = React;



class Login extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			token: null
		}

		AsyncStorage.getItem("token.key").then((token)=>{
			if(token){
				this.loadPages();
				// this.setState({token});
			}
		});
	}
	componentWillReceiveProps(){
		console.log('componentWillReceiveProps is called')
		this.setState({token: ''})
	}

	// shouldComponentUpdate(){
	// 	console.log('shouldComponentUpdate is called')
	// 	this.token = '';
	// 	return true;
	// }

	loadPages(){
		var pagesRoute = {
			title: "Pages",
			component: Pages,
			rightButtonTitle: 'New Page',
			passProps: {URL},
			onRightButtonPress: () => {
				this.props.navigator.push({
					title: 'Create page',
					component: CreatePage,
					passProps: {URL, PagesRoute: pagesRoute}
				});
			},
			leftButtonTitle: 'logout',
			onLeftButtonPress: () => {
				console.log('logout button pressed')
				AsyncStorage.removeItem("token.key").then(()=>{
					this.props.navigator.pop();
				})
			}			
		};

		this.props.navigator.push(pagesRoute);			
	}

	setToken(){
		if(this.state.token == null || this.state.token.trim().length == 0){
			return;
		}

		AsyncStorage.setItem("token.key", this.state.token).then(()=>{
			this.loadPages();			
		})
	}

	render(){
		return(
			<View style={styles.container}>
				<TextInput
					autoFocus={true}
					style={styles.textInput}
					onChangeText={(text) => {
						this.setState({token: text});
					}}
					placeholder='Paste your secure token'
					value={this.state.token}>
				</TextInput>
				<TouchableHighlight
					onPress={()=>{
						this.setToken();
					}}
					underlayColor='#88D485'
					style={styles.button}>
					<Text style={styles.buttonText}>submit</Text>
				</TouchableHighlight>				
			</View>
		);
	}

}

module.exports = Login;


var styles = StyleSheet.create({
	container: {
	    flex: 1,
	    padding: 20,
	    marginTop: 65,
	    flexDirection: 'column',
	    // justifyContent: 'center',
	    // backgroundColor: '#48BBEC',
	    // alignItems: 'flex-start',
	},
	textInput: {
		height: 40,
		padding: 5,
		fontSize: 12,
		// flex: 1,
		borderWidth:1,
		marginBottom: 20
	},
	button: {
		height: 40,
		flexDirection: 'row',
		alignSelf: 'stretch',
		justifyContent: 'center',
		// flex: 1,
		backgroundColor: '#758BF4'
	},
	buttonText: {
		fontSize: 24,
		color: 'white',
		alignSelf: 'center'
	},
});