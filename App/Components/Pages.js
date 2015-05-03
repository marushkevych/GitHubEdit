var React = require('react-native');
var Separator = require('./Separator');
var api = require('../Utils/api');

var {
	View,
    StyleSheet,
    ScrollView,
    Text,
    TouchableHighlight,
    ActivityIndicatorIOS
} = React;

var TOKEN = '3631fc18a25572cfc25719c4d0d75302169b13a7';
var USER = 'marushkevych';


class Pages extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      pages: [],
      isLoading: true,
      error: false
    }

    api.getPages(USER, TOKEN).then((res) => {
      this.setState({isLoading: false, pages: res});
    }, (err) => {
      this.setState({isLoading: false, error: "Failes to get pages"});
    });    
  }   

  openPage(url){
     this.props.onPageSelected(url);
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
			</ScrollView>
		);
	}

}

module.exports = Pages;


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