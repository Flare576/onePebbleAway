import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, ListView, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as actions from '../actions/routes.actions'


class RoutesScreen extends Component {
  constructor(props){
    super(props)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchRoutesIfNeeded(this.props.selectedAgency))
  }

  chooseRoute(route){
    this.props.dispatch(actions.chooseRoute(route.id))
    Actions.stops()
  }

  filterRoute(filter){
    this.props.dispatch(actions.filterRoute(filter.text))
  }

  renderRow (route) {
    let divider = route.shortName && route.longName ? ' - ' : ''
    let name = route.shortName + divider + route.longName
    return (
      <View style={styles.row}>
        <TouchableHighlight key={route.id} onPress={() => this.chooseRoute(route)}>
          <Text>{name}</Text>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    if(this.props.isFetching === undefined || this.props.isFetching) {
      return (
        <View style={{margin: 128}}>
          <Text>Loading Routes</Text>
        </View>
      )
    } else{
      const dataSource = this.dataSource.cloneWithRows(this.props.items);
      //onEndEditing  maybe?
      return (
        <View style={{marginTop: 100}}>
          <TextInput
            onChangeText={(text) => this.filterRoute({text})}
          />
          <View style={{flex:1}}>
            <ListView
                      contentInset={{top: 0}}
                      automaticallyAdjustContentInsets={false}
                      dataSource={dataSource}
                      renderRow={this.renderRow.bind(this)}
                      pageSize={5}
            />
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 10,
    margin: 2,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000000'
  }
})


function getVisibleRoutes(routeFilter, items){
  if(routeFilter){
    return items.filter( t => ((t.shortName + t.longName).indexOf(routeFilter) != -1))
  }
  return items
}

function mapStateToProps(state) {
  const { selectedAgency, routes, routeFilter } = state
  const {
    isFetching,
    lastUpdated,
    items
  } = routes || {
    isFetching: true,
    items: []
  }

  return {
    items: getVisibleRoutes(routeFilter, items),
    isFetching,
    lastUpdated,
    selectedAgency
  }
}

export default connect(mapStateToProps)(RoutesScreen);
