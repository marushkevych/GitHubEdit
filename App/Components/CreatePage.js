var React = require('react-native');
var api = require('../Utils/api');
var Editor = require('./Editor');
var Buffer = require('buffer').Buffer;
var Document = require('../Model/Document');


var URL = 'https://api.github.com/repos/marushkevych/marushkevych.github.io/contents/_posts';



var {
	View,
	StyleSheet,
	Text,
	TouchableHighlight,
	TextInput,
	AsyncStorage
} = React;


var content;
function setContent(newContent){
	content = newContent;
}


class CreatePage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			pageName: ''
		}


	}


	createPage(){
		var url = URL+'/'+this.state.pageName;
		api.createPage(url, utf8_to_b64('new page')).then((res) => {
			console.log('create page response', res);
			this.openPage(res.content.url);
		})
	}

	save(document){
		if(content == null){
			return;
		}

		// this.setState({isLoading: true});
		document.emit('SAVING');

		var b64content = utf8_to_b64(content);
		console.log('submitting content', b64content);

		api.updatePage(document.url, b64content, document.sha).then((res) => {
			document.sha = res.content.sha;
			document.emit('SAVED_OK');
			// this.setState({isLoading: false});
			console.log('Saved!!!!')
		}, (err) => {
			document.emit('SAVED_ERROR');
			// this.setState({isLoading: false, error: "Failed to save changes"});
			console.log('Error', err)
		});      
	}	

	openPage(url){
		// debugger;
		var document = new Document(url);
		this.props.navigator.push({
			title: "Editor",
			component: Editor,
			passProps: {url, setContent, document},
			rightButtonTitle: 'Save',
			onRightButtonPress: () => {
				this.save(document);
			},
		});			 
	}	


	render(){
		return(
			<View style={styles.container}>
				<TextInput
					style={styles.textInput}
					onChange={(e) => {
						this.setState({pageName: e.nativeEvent.text});
					}}
					placeholder='file name'
					value={this.state.pageName}>
				</TextInput>
				<TouchableHighlight
					onPress={this.createPage.bind(this)}
					underlayColor='#88D485'
					style={styles.button}>
					<Text style={styles.buttonText}>Create Page</Text>
				</TouchableHighlight>				
			</View>
		);
	}

}

module.exports = CreatePage;

function utf8_to_b64( str ) {
	return (new Buffer(str, 'utf8')).toString('base64');
}

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