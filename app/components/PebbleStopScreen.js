import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, ListView, Text, StyleSheet, TouchableHighlight } from 'react-native';

class PebbleStopScreen extends Component {
  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
  }
  // Todo: text box and chooser for making/ setting current PebbleStopGroup
  render () {
    return (
      <View style={styles.topLevel}>
        <TouchableHighlight>
          <Text>Hello World</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topLevel: {
    marginTop: 50,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    borderRadius: 4,
    margin: 2,
    borderWidth: 0.5,
    borderColor: '#000000',
    flex: 1,
  },
})

function mapStateToProps(state) {
  const { pebbleStopSets, selectedPebbleStopSet } = state

  return {
    pebbleStopSets,
    selectedPebbleStopSet,
  }
}

export default connect(mapStateToProps)(PebbleStopScreen);
