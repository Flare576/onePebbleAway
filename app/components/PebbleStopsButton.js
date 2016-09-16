import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux';
import { Modal, View, ListView, Text, StyleSheet, TouchableHighlight } from 'react-native';

class PebbleStopsButton extends Component {
  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
  }

  goToPebbleStopScreen () {
    Actions.pebbleStops()
  }

  render() {
    let groupName = 'Group'
    if(this.props.selectedPebbleStopSet !== undefined && this.props.pebbleStopSets[this.props.selectedPebbleStopSet] !== undefined){
      groupName = this.props.pebbleStopSets[this.props.selectedPebbleStopSet].name
    }
    return (
      <View style={styles.row}>
        <TouchableHighlight style={styles.button} onPress={() => this.goToPebbleStopScreen()}>
          <Text>{groupName}</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderRadius: 4,
    margin: 2,
    borderWidth: 0.5,
    borderColor: '#000000',
    flex: 1,
  },
  button: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
  }
})

function mapStateToProps(state) {
  const { pebbleStopSets, selectedPebbleStopSet } = state

  return {
    pebbleStopSets,
    selectedPebbleStopSet,
  }
}

export default connect(mapStateToProps)(PebbleStopsButton);
