import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, ListView, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Accordion from 'react-native-collapsible/Accordion';
import * as actions from '../actions/stops.actions'

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  }
];

class StopsScreen extends Component {
  constructor(props){
    super(props)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

  }

  componentDidMount() {
    this.props.dispatch(actions.fetchStopsIfNeeded(this.props.selectedRoute))
  }

  chooseStop(stop){
    this.props.dispatch(actions.chooseStop(stop.id))
    Actions.stops()// should be the modal window asking which Pebble group to add to
  }

  renderHeader(stopGroup){
    return (
      <View style={styles.header}>
        <Text>{stopGroup.name.name}</Text>
      </View>
    )
  }

  renderContent(stopGroup){
    let content = stopGroup.stopIds.map( (stopId) => (
      <TouchableHighlight key={stopId} onPress={() => this.chooseStop(stopId)}>
        <Text>{this.props.stops[stopId].name}</Text>
      </TouchableHighlight>
    ))

    return (
      <View style={styles.content}>
        {content}
      </View>
    )
  }

  render(){
    if(this.props.isFetching === undefined || this.props.isFetching){
      return (
        <View style={{margin: 128}}>
          <Text>Loading Stops</Text>
        </View>
      )
    } else{
      return (
        <View style={{margin: 128,flex: 1}}>
          <Accordion
            sections={this.props.items}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent.bind(this)}
          />
        </View>
      )
    }
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
});
export default connect(mapStateToProps)(StopsScreen);
