import React, {
} from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import oneBusAway from '../common/onebusaway'

var dismissKeyboard = require('dismissKeyboard');

import AgencyCell from './AgencyCell'
import AgencyScreen from './AgencyScreen'

let resultsCache = {
};

let LOADING = false;

let AgenciesScreen = React.createClass({

  getInitialState: function() {
    return {
      isLoading: false,
      isLoadingTail: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    }
  },

  componentDidMount: function() {
    this.fetchAgencies();
  },

  _urlForQueryAndPage: function(): string {
    return oneBusAway.url + 'agencies-with-coverage.json?key=' + oneBusAway.key
  },

  fetchAgencies: function() {
    if (resultsCache.data) {
      if (!LOADING) {
        this.setState({
          dataSource: this.getDataSource(resultsCache.data),
          isLoading: false
        });
      } else {
        this.setState({ isLoading: true });
      }
      return;
    }

    LOADING = true;
    resultsCache.data = null;
    this.setState({
      isLoading: true,
      isLoadingTail: false,
    });

    fetch(this._urlForQueryAndPage())
      .then((response) => response.json())
      .then((responseData) => {
        let agencies = responseData.data.references.agencies
        LOADING = false;
        resultsCache.data = agencies;

        this.setState({
          isLoading: false,
          dataSource: this.getDataSource(agencies),
        });
      })
      .catch((error) => {
        LOADING = false;
        resultsCache.data = undefined;

        this.setState({
          dataSource: this.getDataSource([]),
          isLoading: false,
        });
      })
      .done();
  },

  getDataSource: function(agencies: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(agencies)
  },

  selectAgency: function(agency: Object) {
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: agency.name,
        component: AgencyScreen,
        passProps: {agency},
      });
    } else {
      dismissKeyboard();
      this.props.navigator.push({
        title: agency.name,
        name: 'agency',
        agency: agency,
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
    return <AgencyCell
      key={agency.id}
      onSelect={() => this.selectAgency(agency)}
      onHighlight={function() {return highlightRowFunc(sectionID, rowID)}}
      onUnhighlight={function() { highlightRowFunc(null, null)}}
      agency={agency}
    />
  },

  render: function() {
    var content = this.state.dataSource.getRowCount() === 0 ?
      <NoAgencies
        isLoading={this.state.isLoading}
      /> :
      <ListView
        ref="listview"
        renderSeparator={this.renderSeparator}
        dataSource={this.state.dataSource}
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
