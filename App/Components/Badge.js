var React = require('react-native');

var {
  StyleSheet,
} = React;

var View = React.createFactory(React.View);
var Text = React.createFactory(React.Text);
var Image = React.createFactory(React.Image);

class Badge extends React.Component{

	render(){
		return View({style: styles.container},
			Text({style: styles.name}, this.props.title)
		);
	}
}

Badge.propTypes = {
	title: React.PropTypes.string.isRequired
}

module.exports = Badge;



var styles = StyleSheet.create({
  container: {
    backgroundColor: '#48BBEC',
    paddingBottom: 10,
    paddingTop: 10,
  },
  name: {
    alignSelf: 'center',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  handle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white'
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    marginTop: 10,
    alignSelf: 'center'
  }
});