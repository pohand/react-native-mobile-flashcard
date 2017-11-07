import React, { Component } from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import * as api from './utils/api'
import { Constants } from 'expo'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import MainNavigator from './components/MainNavigator'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'

const store = createStore(reducer, compose(applyMiddleware(thunk)));

function FlashCardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar
        translucent
        backgroundColor={backgroundColor}
        {...props}
      />
    </View>
  );
}

export default class App extends Component {
  componentDidMount() {
    const today = new Date();
    today.setMinutes(today.getMinutes() + 1);

    api.setLocalNotification(today);
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <FlashCardStatusBar
            backgroundColor="#0C9B65"
            barStyle="light-content"
          />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
