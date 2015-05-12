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
			token: ''
		}
	}

	setToken(){
		AsyncStorage.setItem("token.key", this.state.token).then(()=>{
			this.props.toRoute({
				name: "Pages",
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
					style={styleButton('#758BF4')}>
					<Text style={styles.buttonText}>save</Text>
				</TouchableHighlight>				
			</View>
		);
	}

}

module.exports = Login;

function styleButton(backgroundColor){
  return {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: backgroundColor
  };
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	rowContainer: {
		flexDirection: 'column',
		flex: 1,
		padding: 10
	},  
	textInput: {
		height: 40,
		padding: 5,
		fontSize: 12,
		// flex: 10
	},
	buttonText: {
		fontSize: 24,
		color: 'white',
		alignSelf: 'center'
	},
});