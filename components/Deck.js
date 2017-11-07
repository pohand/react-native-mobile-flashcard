import React from 'react'
import { Button } from 'react-native-elements'
import { StyleSheet, View, Text } from 'react-native'
import { lightBlack, gray, purple } from '../utils/colors'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Deck = props => {
  const { deck, navigation } = props;
  const { cards } = deck;

  return (
    <View style={styles.view}>
      <View style={styles.deck}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.cards}>{cards.length} cards</Text>
      </View>      
      <Button
        raised
        backgroundColor='#397af8'
        icon={{ name: 'add-circle' }}
        title='ADD CARD'
        onPress={() => navigation.navigate('AddCard', { deck })}
      />
      <View style={styles.divider}>
        <Button
          raised
          backgroundColor='#229966'
          icon={{ name: 'stars' }}
          title='START QUIZ'
          onPress={() => navigation.navigate('Quiz', { cards })}
          disabled={!cards.length}
        />        
      </View>
    </View>
  );
};

Deck.propTypes = {
  deck: PropTypes.shape({
    title: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

Deck.navigationOptions = ({ navigation }) => {
  return{
    title: `Deck`
  }
}

function mapStateToProps({ decks }, { navigation }) {
  const { title } = navigation.state.params.deck;
  const deck = decks.find(item => item.title === title) == null ? navigation.state.params.deck : decks.find(item => item.title === title);

  return { deck };
}

export default connect(mapStateToProps)(Deck);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingBottom: 50,
    paddingHorizontal: 50,
  },
  deck: {
    flex: 1,
    justifyContent: 'center',
  },  
  title: {
    fontSize: 30,
    alignSelf: 'stretch',
    color: lightBlack,    
    textAlign: 'center',
  },
  cards: {
    fontSize: 15,
    color: gray,
    textAlign: 'center',
    alignSelf: 'stretch',   
    marginTop: 5,
  },
  divider: {
    marginTop: 10,
  },
});
