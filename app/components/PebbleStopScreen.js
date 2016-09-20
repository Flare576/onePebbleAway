import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, ListView, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import * as actions from '../actions/stops.actions'

class PebbleStopScreen extends Component {
  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.state = {newName:''}
  }

  addPebbleStopGroup(){
    this.props.dispatch(actions.createPebbleGroup(this.state.newName))
  }
  // Todo: text box and chooser for making/ setting current PebbleStopGroup
  /*
  _________ Add Group
  |Group Name [Delete]
  -|Stop
  -|Stop
  |Group Name
  |Group Name
   */
  render () {
    return (
      <View style={styles.topLevel}>
        <View style={styles.newGroupView}>
          <TextInput style={styles.newGroupText}
            onChangeText={(newName) => this.setState({newName})}
          />
          <TouchableHighlight style={styles.newGroupButton}
            onPress={() => this.addPebbleStopGroup()}>
            <Text>Add Group</Text>
          </TouchableHighlight>
        </View>
        <View>
          <Accordion
            sections={this.props.pebbleStopSets}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent.bind(this)}
          />
        </View>
      </View>
    )
  }

  renderHeader(stopGroup, i, isActive){
    return (
      <View style={[styles.header, isActive ? styles.active : styles.inactive]}>
        <Text>{stopGroup.name}</Text>
      </View>
    )
  }

  renderContent(stopGroup, i, isActive){
    return (
      <View style={[styles.content, isActive ? styles.active : styles.inactive]}>
        <Text>CONTENT</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topLevel: {
    marginTop: 50,
    flex: 1,
  },
  newGroupView: {
    flexDirection: 'row'
  },
  newGroupText: {
    flex: 5
  },
  newGroupButton: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    borderRadius: 4,
    margin: 2,
    borderWidth: 0.5,
    borderColor: '#000000',
    flex: 1,
  },

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
})

function mapStateToProps(state) {
  const { pebbleStopSets, selectedPebbleStopSet } = state

  return {
    pebbleStopSets,
    selectedPebbleStopSet,
  }
}

export default connect(mapStateToProps)(PebbleStopScreen);
