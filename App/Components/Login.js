var React = require('react-native');
var api = require('../Utils/api');
var Pages = require('./Pages');


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
			token: 'efff2c869b76dd163782a2ece66abdd9d1e03661'
		}
	}

	setToken(){
		AsyncStorage.setItem("token.key", this.state.token).then(()=>{
			this.props.navigator.push({
				title: "Pages",
				component: Pages
			});			
		})
	}

	render(){
		return(
			<View style={styles.container}>
				<TextInput
					style={styles.textInput}
					onChange={(e) => {
						this.setState({token: e.nativeEvent.text});
					}}
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
	    padding: 30,
	    marginTop: 65,
	    flexDirection: 'column',
	    // justifyContent: 'center',
	    // backgroundColor: '#48BBEC',
	    // alignItems: 'flex-start',
	},
	textInput: {
		height: 40,
		padding: 5,
		fontSize: 16,
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