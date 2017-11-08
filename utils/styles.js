import React from 'react';
import { StyleSheet } from 'react-native'
import { lightBlack, gray, white } from './colors'


const styles = StyleSheet.create({
    view: {
        paddingVertical: 50,
        paddingHorizontal: 50,
        flex: 1,
        justifyContent: 'space-between',
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
    deck: {
        paddingVertical: 10,
    },
    numberCard: {
        alignSelf: 'stretch',
        textAlign: 'center',
        fontSize: 15,
        color: white,
    },
    text: {
        fontSize: 16,
        alignSelf: 'stretch',
        textAlign: 'center',
        color: lightBlack,
    },

    badgeStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
        marginTop: 50
    },

    card: { flex: 1 },

    cardDetailView: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 25,
        marginTop: 25
    },
});

export default styles;