var React = require('react-native');
var Overlay = require('react-native-overlay');
 
var {
  View,
  ActivityIndicatorIOS,
  StyleSheet,
} = React;
 
var LoadingOverlay = React.createClass({
  getDefaultProps(): StateObject {
    return {
      isVisible: false
    }
  },
 
  render(): ReactElement {
    return (
      <Overlay isVisible={this.props.isVisible}>
        <View style={styles.background}>
          <ActivityIndicatorIOS
            size="large"
            animating={true}
            style={styles.spinner} />
        </View>
      </Overlay>
    );
  }
});
 
var styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
})
 
module.exports = LoadingOverlay;