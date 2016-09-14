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

  renderHeader(stopGroup, i, isActive){
    return (
      <View style={[styles.header, isActive ? styles.active : styles.inactive]}>
        <Text>{stopGroup.name.name}</Text>
      </View>
    )
  }

  renderContent(stopGroup, i, isActive){
    let content = stopGroup.stopIds.map( (stopId) => (
      <TouchableHighlight key={stopId} style={styles.button} onPress={() => this.chooseStop(stopId)}>
        <Text>{this.props.stops[stopId].name}</Text>
      </TouchableHighlight>
    ))

    return (
      <View style={[styles.content, isActive ? styles.active : styles.inactive]}>
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
        <View style={styles.container}>
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
    marginTop: 128,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    padding: 10,
    margin: 2,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000000',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  button: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
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
