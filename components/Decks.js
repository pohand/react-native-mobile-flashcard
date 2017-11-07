import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { purple, white } from '../utils/colors'
import { bindActionCreators } from 'redux'
import { getDecks } from '../actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Decks extends Component {
  componentDidMount() {
    this.props.actions.getDecks();
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
  actions: PropTypes.shape({
    getDecks: PropTypes.func.isRequired,
  }).isRequired,
  decks: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = ({decks }) => ({ decks });

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getDecks }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks);

const styles = StyleSheet.create({
  deck: {
    paddingVertical: 10,
  },

  title: {
    alignSelf: 'stretch',
  },

  numberCard: {
    alignSelf: 'stretch',
    textAlign: 'center',
    fontSize: 15,
    color: white,
  },

});

