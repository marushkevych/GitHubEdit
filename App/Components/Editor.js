var React = require('react-native');
var Badge = require('./Badge');
var api = require('../Utils/api');
var LoadingOverlay = require('./LoadingOverlay');
var Buffer = require('buffer').Buffer;
var ContentService = require('../Model/ContentService');

var {
	View,
		StyleSheet,
		ScrollView,
		Text,
		TouchableHighlight,
		ActivityIndicatorIOS,
		TextInput,
		AsyncStorage
} = React;

var USER = 'marushkevych';
var STORAGE_KEY = "token.key";

class Editor extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			content: '',
			isLoading: true,
			error: false,
			sha: ''
		}

		ContentService.on('loading', () => {
			this.setState({isLoading: true});
		});	

		ContentService.on('change', () => {
			this.setState({isLoading: false});
		});		


		this.props.document.on('SAVING', () => {
			this.setState({isLoading: true});
		})

		this.props.document.on('SAVED_OK', () => {
			this.setState({isLoading: false});
		})

		this.props.document.on('SAVED_ERROR', () => {
			this.setState({isLoading: false, error: "Failed to save changes"});
		})


		api.getContent(this.props.url).then((res) => {
			this.props.document.sha = res.sha;
			this.setState({
				isLoading: false, 
				content: b64_to_utf8(res.content),
				sha: res.sha
			});
		}, (err) => {
			this.setState({isLoading: false, error: "Failes to get page content"});
		});    
	}   


	handleChange(e){
		// this.setState({
		// 	content: e.nativeEvent.text
		// });
		this.props.setContent(e.nativeEvent.text)
	}

	render(){
		return (
			<ScrollView style={styles.container} >
				<TextInput
					style={styles.textInput}
					multiline={true}
					onChange={this.handleChange.bind(this)}
					autoFocus={true}
					value={this.state.content}>
				</TextInput>
				<Text>{this.state.error ? this.state.error : ""}</Text>
				<LoadingOverlay isVisible={this.state.isLoading} />
			</ScrollView>
		);
	}

}

module.exports = Editor;

function utf8_to_b64( str ) {
	return (new Buffer(str, 'utf8')).toString('base64');
}

function b64_to_utf8( str ) {
	return (new Buffer(str, 'base64')).toString('utf8');
}

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
		height: 250,
		padding: 5,
		fontSize: 14,
		borderWidth: 1,
		fontFamily: 'Verdana'
		// flex: 10
	},
	buttonText: {
		fontSize: 24,
		color: 'white',
		alignSelf: 'center'
	},
	name: {
		color: '#48BBEC',
		fontSize: 18,
		paddingBottom: 5
	},
	stars: {
		color: '#48BBEC',
		fontSize: 14,
		paddingBottom: 5
	},
	description: {
		fontSize: 14,
		paddingBottom: 5
	}
});