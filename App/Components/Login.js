var React = require('react-native');
var api = require('../Utils/api');

var {
	View,
	StyleSheet,
	Text,
	TouchableHighlight,
	TextInput,
} = React;



class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			token: ''
		}
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
						this.props.onToken(this.state.token);
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