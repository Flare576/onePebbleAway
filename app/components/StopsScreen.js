import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as actions from '../actions/stops.actions'


class StopsScreen extends Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchStopsIfNeeded(this.props.selectedRoute))
  };

  chooseStop(stop){
    this.props.dispatch(actions.chooseStop(stop.id))
    Actions.stops()// should be the modal window asking which Pebble group to add to
  }

  render() {
    return this.props.isFetching === undefined || this.props.isFetching ?
      (
        <View style={{margin: 128}}>
          <Text>Loading Stops</Text>
        </View>
      ) :
      (
        <View style={{marginTop: 128}}>
          {
            this.props.items.map( (stopGroup) => {
              let stopDom = stopGroup.stopIds.map((stopId) => {
                console.log("you'll be seeing a lot of me")
                return <TouchableHighlight key={stopId} onPress={() => this.chooseStop(stopId)}>
                    <Text>{this.props.stops[stopId].name}</Text>
                  </TouchableHighlight>
              })
              return [<Text>{stopGroup.name.name}</Text>,...stopDom]
            })
          }
        </View>
      )
  }
}

function mapStateToProps(state) {
  const { selectedRoute, stopGroups, stops } = state
  const {
    isFetching,
    lastUpdated,
    items
  } = stopGroups || {
    isFetching: true,
    items: []
  }

  return {
    items,
    stops,
    isFetching,
    lastUpdated,
    selectedRoute
  }
}

export default connect(mapStateToProps)(StopsScreen);
