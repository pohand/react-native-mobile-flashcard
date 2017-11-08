import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import * as api from '../utils/api'
import { lightBlack, purple } from '../utils/colors'
import { ListItem, Button, Card, Badge } from 'react-native-elements'
import { connect } from 'react-redux'
import styles from '../utils/styles'

const initialState = {
  isFinished: false,
  index: 0,
  correctAnswersNo: 0,
  isFlipped: false,
};

class Quiz extends Component {
  static navigationOptions = () => ({ title: 'Quiz' });
  state = initialState;

  flipCard = () => {
    this.setState(previousState => ({ isFlipped: !previousState.isFlipped }));
  };

  submitAnswer = isCorrect => {
    this.setState((previousState, props) => {
      const { cards } = props;
      const isFinished = previousState.index === cards.length - 1;

      if (isFinished) {
        api.clearLocalNotification()
          .then(() => api.setLocalNotification());
      }

      return {
        isFinished,
        index: previousState.index + (isFinished ? 0 : 1),
        correctAnswersNo: previousState.correctAnswersNo + (isCorrect ? 1 : 0),
        isFlipped: false,
      };
    });
  };

  restart = () => this.setState(initialState);

  render() {
    const { index, isFinished, isFlipped, correctAnswersNo } = this.state;
    const { cards, navigation } = this.props;

    const card = cards[index];

    if (isFinished) {
      const correctAnswersPercent = Math.round(
        correctAnswersNo / cards.length * 100,
      );

      return (
        <View style={styles.view}>
          <View style={styles.cardDetailView}>
            <Text style={[styles.text, styles.title]}>
              {`You have ${correctAnswersPercent}% of correct answers`}
            </Text>
          </View>
          <Button
            raised
            icon={{ name: 'undo' }}
            title='BACK'
            backgroundColor='#4B9B40'
            onPress={() => navigation.goBack()}
          />
          <View style={styles.divider}>
            <Button
              raised
              icon={{ name: 'cached' }}
              title='RESTART QUIZ'
              backgroundColor='#397af8'
              onPress={this.restart}
            />
          </View>          
        </View>
      );
    }

    const showIndex = index + 1;
    const deckLengh = cards.length;

    const cardTitle = (text, cardText) => (
      <View style={styles.card} >
        <View style={styles.cardDetailView} >
          <TouchableOpacity onPress={this.flipCard}>
            <Card title={`${showIndex} / ${deckLengh}`}  >
              <Text style={styles.text} >
                {text}
              </Text>
              <View style={styles.badgeStyle}>
                <Badge
                  containerStyle={{ backgroundColor: 'violet' }}
                  onPress={this.flipCard}
                >
                  <Text>
                    {cardText}
                  </Text>
                </Badge>
              </View>              
            </Card>
          </TouchableOpacity>
        </View>

        <View style={styles.divider}>
          <Button
            raised
            icon={{ name: 'check' }}
            title='CORRECT'
            backgroundColor='#397af8'
            onPress={() => this.submitAnswer(true)}
          />
          <View style={styles.divider}>
            <Button
              raised
              icon={{ name: 'close' }}
              title='INCORRECT'
              backgroundColor='#EC0707'
              onPress={() => this.submitAnswer(false)}
            />
          </View>
        </View>
      </View>
    );

    return (
      <View style={styles.view}>
        {!isFlipped && cardTitle(card.question, 'VIEW ANSWER')}
        {isFlipped && cardTitle(card.answer, 'VIEW QUESTION')}

      </View>
    );
  }
}

Quiz.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired
};

function mapStateToProps(state, { navigation }) {
  const { cards } = navigation.state.params;

  return { cards };
}

export default connect(mapStateToProps)(Quiz);
