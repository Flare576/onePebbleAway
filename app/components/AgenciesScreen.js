import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, ListView, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as actions from '../actions/agencies.actions'
import PebbleStopsButton from './PebbleStopsButton'

class AgenciesScreen extends Component {
  constructor(props){
    super(props)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchAgenciesIfNeeded())
  };

  chooseAgency(agency){
    this.props.dispatch(actions.chooseAgency(agency.id))
    Actions.busRoutes()
  }

  renderRow (agency) {
    return (
      <View style={styles.row}>
        <TouchableHighlight key={agency.id} style={styles.button} onPress={() => this.chooseAgency(agency)}>
          <Text>{agency.name}</Text>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    if(this.props.isFetching === undefined || this.props.isFetching) {
      return (
        <View style={{margin: 128}}>
          <Text>Loading Agencies</Text>
        </View>
      )
    } else{
      const dataSource = this.dataSource.cloneWithRows(this.props.items);
      return (
        <View style={styles.topLevel}>
          <View style={styles.pebbleStopContainer}>
            <Text style={styles.pebbleStopHeader}>Pebble Bus Group:</Text>
            <View style={styles.pebbleStopHolder}>
              <PebbleStopsButton/>
            </View>
          </View>
          <View style={{flex:1}}>
            <ListView
              contentInset={{top: 0}}
              automaticallyAdjustContentInsets={false}
              dataSource={dataSource}
              renderRow={this.renderRow.bind(this)}
            />
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  topLevel: {
    marginTop: 55,
    flex: 1
  },
  pebbleStopContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  pebbleStopHolder: {
    height: 45,
    width: 200
  },
  pebbleStopHeader: {
    marginBottom: 10
  },
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
  const { agencies } = state
  const {
    isFetching,
    lastUpdated,
    items
  } = agencies || {
    isFetching: true,
    items: []
  }

  return {
    items,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AgenciesScreen);
