var React = require('react-native');
var Separator = require('./Separator');
var api = require('../Utils/api');
var Editor = require('./Editor');
var LoadingOverlay = require('./LoadingOverlay');
var Document = require('../Model/Document');


var {
	View,
		StyleSheet,
		ScrollView,
		Text,
		TouchableHighlight,
		ActivityIndicatorIOS,
		AsyncStorage
} = React;

var USER = 'marushkevych';

var content;
var sha;
function setContent(newContent, newSha){
	content = newContent;
	sha = newSha;
}


class Pages extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			pages: [],
			isLoading: true,
			error: false
		}

		api.getPages(USER).then((res) => {
			this.setState({isLoading: false, pages: res});
		}, (err) => {
			this.setState({isLoading: false, error: "Failes to get pages"});
		});    
	}   

	save(document){
		if(content == null){
			return;
		}

		// this.setState({isLoading: true});
		document.emit('SAVING');

		var b64content = utf8_to_b64(content);
		console.log('submitting content', b64content);
		AsyncStorage.getItem("token.key").then((token)=>{
			console.log('token is', token)
			api.updatePage(document.url, b64content, sha, token).then((res) => {
				document.emit('SAVED_OK');
				// this.setState({isLoading: false});
				console.log('Saved!!!!')
			}, (err) => {
				document.emit('SAVED_ERROR');
				// this.setState({isLoading: false, error: "Failed to save changes"});
				console.log('Error', err)
			});      
		})    
	}	

	openPage(url){
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
		var pages = this.state.pages;
		console.log('pages', this.state.pages);

		var list = pages.map((page, index) => {
			return (
				<View key={index}>
					<View style={styles.rowContainer}>
						<TouchableHighlight
							onPress={this.openPage.bind(this, page.url)}
							underlayColor='transparent'>
							<View>
								<Text style={styles.name}>{page.name}</Text>
							</View>
						</TouchableHighlight>
					</View>
					<Separator/>
				</View>
				
			);
		});

		return (
			<ScrollView style={styles.container} >
				{list}     
				<Text>{this.state.error ? this.state.error : ""}</Text>
				<LoadingOverlay isVisible={this.state.isLoading} />
			</ScrollView>
		);
	}

}

module.exports = Pages;

function utf8_to_b64( str ) {
	return btoa(unescape(encodeURIComponent( str )));
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