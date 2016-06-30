/*
import React,{
  Component
} from 'react-native';
import { Provider } from 'react-redux';
import rootReducer from '../reducers/';
import Navigation from './Navigation';


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation/>
      </Provider>
    );
  }
}

export default App;
*/


import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Scene } from 'react-native-router-flux';
import thunkMiddleware from 'redux-thunk'

const RouterWithRedux = connect()(Router);
import reducers from '../reducers';

const middleware = [thunkMiddleware];
const store = compose(
  applyMiddleware(...middleware)
)(createStore)(reducers);

import AgenciesScreen from '../components/AgenciesScreen'
import RoutesScreen from '../components/RoutesScreen'
import StopsScreen from '../components/StopsScreen'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root">
            <Scene key="agencies" component={AgenciesScreen} title="Agencies" initial={true} />
            <Scene key="busRoutes" component={RoutesScreen} title="Routes" />
            <Scene key="stops" component={StopsScreen} title="Stops" />
          </Scene>
        </RouterWithRedux>
      </Provider>
    )
  }
}
