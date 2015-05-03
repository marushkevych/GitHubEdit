var React = require('react-native');
var Separator = require('./Separator');
var api = require('../Utils/api');

var {
	View,
    StyleSheet,
    ScrollView,
    Text,
    TouchableHighlight,
    ActivityIndicatorIOS,
    TextInput
} = React;

var TOKEN = '3631fc18a25572cfc25719c4d0d75302169b13a7';
var USER = 'marushkevych';


class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      content: '',
      isLoading: true,
      error: false,
      sha: ''
    }

    api.getContent(this.props.url, TOKEN).then((res) => {
      this.setState({
        isLoading: false, 
        content: b64_to_utf8(res.content),
        sha: res.sha
      });
    }, (err) => {
      this.setState({isLoading: false, error: "Failes to get page content"});
    });    
  }   

  save(){
    var content = utf8_to_b64(this.state.content);
    console.log('submitting content', content);
    api.updatePage(this.props.url, content, this.state.sha, TOKEN).then((res) => {
      this.setState({isLoading: false});
    }, (err) => {
      this.setState({isLoading: false, error: "Failed to save changes"});
    });      
  }
  handleChange(e){
    this.setState({
      content: e.nativeEvent.text
    })
  }

	render(){
		return (
			<ScrollView style={styles.container} >
        <TextInput
          style={styles.textInput}
          multiline={true}
          onChange={this.handleChange.bind(this)}
          value={this.state.content}>
        </TextInput>
        <Text>{this.state.error ? this.state.error : ""}</Text>
        <TouchableHighlight
          onPress={this.save.bind(this)}
          underlayColor='#88D485'
          style={styleButton('#758BF4')}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
			</ScrollView>
		);
	}

}

module.exports = Editor;

function utf8_to_b64( str ) {
  return btoa(unescape(encodeURIComponent( str )));
}

function b64_to_utf8( str ) {
  return decodeURIComponent(escape(atob( str )));
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
    height: 300,
    padding: 5,
    fontSize: 12,
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