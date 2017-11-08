import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { lightGray } from '../utils/colors'
import { bindActionCreators } from 'redux'
import { NavigationActions } from 'react-navigation'
import { saveDeckTitle } from '../actions'
import { connect } from 'react-redux'
import styles from '../utils/styles'

const initialState = { title: '' };

class AddDeck extends Component {
  
  state = initialState;

  submit = () => {
    const { navigation } = this.props;
    const { title } = this.state;

    this.props.saveDeckTitle({ title, cards: [] });
    this.setState(initialState);

    this.props.navigation.dispatch(
         NavigationActions.navigate({
              routeName: 'Deck',
              params: { deck : {title : title, cards: []} },
          }
        )
    );
  };

  render() {
    const { title } = this.state;
    const titleEmpty = this.state.title === ''
    const disabled = titleEmpty

    return (
      <View style={styles.view}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <FormInput
          value={title}
          onChangeText={newTitle => this.setState({ title: newTitle })}
          placeholder="Please enter your deck title"
        />        
        <Button raised
        icon={{name: 'cached'}}
        title='SUBMIT' 
        backgroundColor = '#397af8'        
        onPress={this.submit}
        disabled={disabled}
        />
      </View>
    );
  }  
}

AddDeck.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
  }).isRequired  
};

export default connect(null, { saveDeckTitle })(AddDeck);