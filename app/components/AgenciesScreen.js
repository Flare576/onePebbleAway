import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as actions from '../actions/agencies.actions'


class AgenciesScreen extends Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchAgenciesIfNeeded())
  };

  chooseAgency(agency){
    this.props.dispatch(actions.chooseAgency(agency.id))
    Actions.busRoutes()
  }

  render() {
    return this.props.isFetching === undefined || this.props.isFetching ?
      (
        <View style={{margin: 128}}>
          <Text>Loading Agencies</Text>
        </View>
      ) :
     (
       <View style={{marginTop: 128}}>
         {this.props.items.map((agency, i) =>
           <TouchableHighlight key={agency.id} onPress={() => this.chooseAgency(agency)}>
             <Text>{agency.name}</Text>
           </TouchableHighlight>
         )}
       </View>
    )
  }
}

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
