import React from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';

var dismissKeyboard = require('dismissKeyboard');

import AgencyCell from './AgencyCell'
import RoutesScreen from './RoutesScreen'
import * as actions from '../../actions/agencies.actions'

let AgenciesScreen = React.createClass({

  componentDidMount: function() {
    this.props.dispatch(actions.fetchAgenciesIfNeeded())
  },

  selectAgency: function(agency: Object) {
    this.props.dispatch(actions.chooseAgency(agency))
    
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: 'Routes for ' + agency.name,
        component: RoutesScreen
      });
    } else {
      dismissKeyboard();
      this.props.navigator.push({
        title: 'Routes for ' + agency.name,
        name: 'routes',
      });
    }
  },


  renderFooter: function() {
    return <View style={styles.scrollSpinner}/>
  },


  renderSeparator: function ( sectionID, rowID, adjacentRowHighlighted: boolean) {
    var style = styles.rowSeparator;
    if (adjacentRowHighlighted) {
      style = [style, styles.rowSeparatorHide];
    }
    return (
      <View key={'SEP_' + sectionID + '_' + rowID}  style={style}/>
    );
  },

  renderRow: function(agency: Object, sectionID: number, rowID: number, highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void) {
    //todo take out that stupid highlightRowFunc from param list and move it inside 
    return <AgencyCell
        key={agency.id}
        onSelect={() => this.selectAgency(agency)}
        onHighlight={function() {return highlightRowFunc(sectionID, rowID)}}
        onUnhighlight={function() { highlightRowFunc(null, null)}}
        agency={agency}
      />
  },

  render: function() {
    var content = !props.agencies || props.agencies.isFetching ?
      <NoAgencies
        isLoading={props.agencies.isFetching}
      /> :
      <ListView
        ref="listview"
        renderSeparator={this.renderSeparator}
        renderFooter={this.renderFooter}
        renderRow={this.renderRow}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={true}
        showsVerticalScrollIndicator={false}
      />;

    return (
      <View style={styles.container}>
        {content}
      </View>
    );
  },
})



var NoAgencies = React.createClass({
  render: function() {
    var text = 'Retrieving Agencies...';
    if (!this.props.isLoading) {
      text = 'No idea why I\'m still displayin this.';
    }

    return (
      <View style={[styles.container, styles.centerText]}>
        <Text style={styles.noAgenciesText}>{text}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centerText: {
    alignItems: 'center',
  },
  noAgenciesText: {
    marginTop: 80,
    color: '#888888',
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  scrollSpinner: {
    marginVertical: 20,
  },
  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginLeft: 4,
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },
});

module.exports = AgenciesScreen;
