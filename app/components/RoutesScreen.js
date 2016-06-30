import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as actions from '../actions/routes.actions'


class RoutesScreen extends Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchRoutesIfNeeded(this.props.selectedAgency))
  };

  chooseRoute(route){
    this.props.dispatch(actions.chooseRoute(route.id))
    Actions.stops()
  }

  render() {
    return this.props.isFetching === undefined || this.props.isFetching ?
      (
        <View style={{margin: 128}}>
          <Text>Loading Routes</Text>
        </View>
      ) :
      (
        <View style={{marginTop: 128}}>
          <Text onPress={Actions.pageTwo}>This is the Routes page!</Text>
          {this.props.items.map((route, i) => {
            if (i < 10){
              return (
              <TouchableHighlight key={route.id} onPress={() => this.chooseRoute(route)}>
                <Text>{route.shortName}</Text>
              </TouchableHighlight>)
            }
          }
          )}
        </View>
      )
  }
}

function mapStateToProps(state) {
  const { selectedAgency, routes } = state
  const {
    isFetching,
    lastUpdated,
    items
  } = routes || {
    isFetching: true,
    items: []
  }

  return {
    items,
    isFetching,
    lastUpdated,
    selectedAgency
  }
}

export default connect(mapStateToProps)(RoutesScreen);
