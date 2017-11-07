import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';
const NOTIFICATION_KEY = 'MobileFlashcards:notification';


// const DECKS_STORAGE_KEY = 'mobile-flashcards:decks';
// const NOTIFICATION_KEY = 'mobile-flashcards:notification';

export function saveDeck(deck) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
    const decks = results ? JSON.parse(results) : [];
    decks.push(deck);
    return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
  });
}

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(
    results => (results ? JSON.parse(results) : []),
  );
}

export function updateDeck(deck) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
    const decks = JSON.parse(results).map(
      item => (item.title === deck.title ? deck : item),
    );
    return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
  });
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data !== null) {
        return;
      }

      Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
        if (status !== 'granted') {
          return;
        }

        Notifications.cancelAllScheduledNotificationsAsync();
        
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(20);
        tomorrow.setMinutes(0);

        Notifications.scheduleLocalNotificationAsync(
          {
            title: 'Play Flash Card!',
            body: "👋 Don't forget to play a flash card for today!",
            ios: { sound: true },
            android: {
              sound: true,
              priority: 'high',
              sticky: false,
              vibrate: true,
            },
          },
          { time: tomorrow, repeat: 'day' },
        );

        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
      });
    });
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync,
  );
}
