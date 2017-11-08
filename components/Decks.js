import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { purple, white } from '../utils/colors'
import { bindActionCreators } from 'redux'
import { getDecks } from '../actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from '../utils/styles'

class Decks extends Component {
  componentDidMount() {
    this.props.getDecks();
  }

  render() {
    const { decks, navigation } = this.props;
    return (
      <View >
        <List containerStyle={{ marginBottom: 20 }}>
          {
            decks.map((deck) => (
              <TouchableOpacity key={deck.title}
                onPress={() => navigation.navigate('Deck', { deck })}>
                <ListItem
                  leftIcon={{name: 'folder'}}  
                  key={deck.title}
                  title={deck.title}
                  subtitle={`${deck.cards.length} cards`}
                />
              </TouchableOpacity>
            ))
          }
        </List>
      </View>
    );
  }
}

Decks.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  decks: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = ({decks }) => ({ decks });

export default connect(mapStateToProps, {getDecks})(Decks);

