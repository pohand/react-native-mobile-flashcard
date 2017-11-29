import React, { Component } from 'react'
import { StyleSheet, View, TextInput, KeyboardAvoidingView } from 'react-native'
import { bindActionCreators } from 'redux'
import { lightGray } from '../utils/colors'
import { addCardToDeck } from '../actions'
import { Button, FormInput, FormLabel } from 'react-native-elements'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from '../utils/styles'

const initialState = { question: '', answer: '' };

class AddCard extends Component {

  static navigationOptions = () => ({ title: 'Add Card' });
  
  state = initialState;

  submit = () => {
    const { deck, navigation } = this.props;
    const { question, answer } = this.state;
    const changedDeck = { ...deck };

    changedDeck.cards.push({ question, answer });
    this.props.addCardToDeck(changedDeck);
    this.setState(initialState);
    navigation.goBack();
  };

  render() {
    const { question, answer } = this.state;

    const questionEmpty = this.state.question === ''
    const answerEmpty = this.state.answer === ''
    const disabled = questionEmpty || answerEmpty

    return (
      <KeyboardAvoidingView style={styles.view}>
        <FormLabel>Question</FormLabel>
        <FormInput
          value={question}
          onChangeText={newQuestion => this.setState({ question: newQuestion })}
          placeholder="Please enter your question"
        />
        <View style={styles.divider}>
          <FormLabel>Answer</FormLabel>
          <FormInput
            value={answer}
            onChangeText={newAnswer => this.setState({ answer: newAnswer })}
            placeholder="Please enter your answer"
          />
        </View>
        <View style={styles.divider}>
          <Button
            raised
            icon={{ name: 'code' }}
            title='SUBMIT'
            backgroundColor='#397af8'
            onPress={this.submit}
            disabled={disabled}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

AddCard.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,  
  deck: PropTypes.shape({
    title: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired,
  }).isRequired
};

function mapStateToProps(state, { navigation }) {
  const { deck } = navigation.state.params;

  return { deck };
}

export default connect(mapStateToProps, {addCardToDeck})(AddCard);