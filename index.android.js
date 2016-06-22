'use strict';

import React from 'react'
import {ReactNative,
  AppRegistry,
  BackAndroid,
  Navigator,
  StyleSheet,
  ToolbarAndroid,
  View} from 'react-native'

import AgencyScreen from './app/agencies/AgencyScreen'
import AgenciesScreen from'./app/agencies/AgenciesScreen'

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from './app/reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var RouteMapper = function(route, navigationOperations, onComponentRef) {
  _navigator = navigationOperations;
  if (route.name === 'agencies') {
    return (
      <AgenciesScreen navigator={navigationOperations} />
    );
  } else if (route.name === 'agency') {
    return (
      <View style={{flex: 1}}>
        <ToolbarAndroid
          actions={[]}
          navIcon={require('image!android_back_white')}
          onIconClicked={navigationOperations.pop}
          style={styles.toolbar}
          titleColor="white"
          title={route.agency.title} />
        <AgencyScreen
          style={{flex: 1}}
          navigator={navigationOperations}
          agency={route.agency}
        />
      </View>
    );
  }
};

var onePebbleAway = React.createClass({
  render: function() {
    var initialRoute = {name: 'agencies'};
    return (
      <Navigator
        style={styles.container}
        initialRoute={initialRoute}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={RouteMapper}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    backgroundColor: '#a9a9a9',
    height: 56,
  },
});

AppRegistry.registerComponent('onePebbleAway', () => onePebbleAway);

module.exports = onePebbleAway;
