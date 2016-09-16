import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Scene } from 'react-native-router-flux';
import thunkMiddleware from 'redux-thunk'
import AgenciesScreen from '../components/AgenciesScreen'
import RoutesScreen from '../components/RoutesScreen'
import StopsScreen from '../components/StopsScreen'
import PebbleStopScreen from '../components/PebbleStopScreen'

const RouterWithRedux = connect()(Router);
import reducers from '../reducers';

const middleware = [thunkMiddleware];
const store = compose(
  applyMiddleware(...middleware)
)(createStore)(reducers);


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root">
            <Scene key="agencies" component={AgenciesScreen} title="Agencies" initial={true} />
            <Scene key="busRoutes" component={RoutesScreen} title="Routes" />
            <Scene key="stops" component={StopsScreen} title="Stops" />
            <Scene key="pebbleStops" component={PebbleStopScreen} title="Pebble Stop Groups" />
          </Scene>
        </RouterWithRedux>
      </Provider>
    )
  }
}
