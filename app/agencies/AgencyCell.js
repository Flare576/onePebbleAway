import React from 'react'
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} from 'react-native'

let AgencyCell = React.createClass({
  render: function() {

    let TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }

    return (
      <View>
        <TouchableElement
          onPress={this.props.onSelect}
          onShowUnderlay={this.props.onHighlight}
          onHideUnderlay={this.props.onUnhighlight}>
          <View>
            <Text style={styles.agencyName}>{this.props.agency.name}</Text>
          </View>
        </TouchableElement>
      </View>
    )
  }
})

var styles = StyleSheet.create({
  contentContainer: {
  padding: 10,
},
  rightPane: {
  justifyContent: 'space-between',
  flex: 1,
},
  agencyName: {
  flex: 1,
  fontSize: 16,
  fontWeight: '500',
},
});

module.exports = AgencyCell;
