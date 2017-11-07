import { TabNavigator, StackNavigator } from 'react-navigation'
import Decks from './Decks'
import AddDeck from './AddDeck'
import Deck from './Deck'
import AddCard from './AddCard'
import Quiz from './Quiz'
import React from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { orange } from '../utils/colors'

const Tabs = TabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: 'Deck List',
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={30} color={tintColor} />
      },
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) => <FontAwesome name="plus-square" size={30} color={tintColor} />
      },
    }
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      style: {
        height: 56,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: "FLASH CARDS",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: 'purple',
        justifyContent: 'center'
      },
      headerTitleStyle: { alignSelf: 'center' }
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      title: "DECK",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "purple"
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: "ADD CARD",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "purple"

      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: "QUIZ",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "purple"
      }
    }
  }
});

export default MainNavigator;