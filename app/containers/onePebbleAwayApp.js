import React, { Component } from 'react-native';
import Agencies from '../components/agencies/AgenciesScreen';

// @connect(state => ({
//   state: state.counter
// }))
class OnePebbleAwayApp extends Component {
  render() {
    const { state, actions } = this.props;
    return (
      <Text>Hello World</Text>
    );
  }
}
