/**
 * Created by Peter Hoang Nguyen on 3/29/2017.
 */
import { vsprintf } from 'sprintf-js';
import { translationsLocalStorage } from 'common/utils/Data';
import Request from 'common/network/http/Request';

const missingKeys = [];
const getMessagesFromStore = () =>
  translationsLocalStorage('messages', true) || {};
const getLanguageFromStore = () =>
  translationsLocalStorage('language', true) || 'en';
const getIsTranslatingFromStore = () =>
  translationsLocalStorage('isTranslating', true) || 'no';

export const capitalize = ([first, ...rest]) =>
  first.toUpperCase() + rest.join('');

export const capitalizeString = (message) => {
  if (!message || message.length <= 0) {
    return message;
  }
  let result = message[0].toUpperCase();
  for (let i = 1; i < message.length; i += 1) {
    if (message[i - 1] === ' ' && message[i] !== ' ') {
      result += message[i].toUpperCase();
    } else if (message[i - 1] !== ' ' && message[i] !== ' ') {
      result += message[i].toLowerCase();
    } else if (message[i - 1] !== ' ' && message[i] === ' ') {
      result += message[i];
    }
  }
  return result;
};

class Translate {
  MESSAGES_NORMAL = 0;
  MESSAGES_UPPERCASE = 1;
  MESSAGES_LOWERCASE = 2;
  MESSAGES_UPPERCASE_FIRST_CHAR = 3;
  MESSAGES_UPPERCASE_FIRST_CHAR_OF_WORD = 4;

  formatMessage(id, type, properties) {
    if (id == '' || !id || typeof id !== 'string') {
      return '';
    }
    const messageType = type || this.MESSAGES_NORMAL;
    const messages = getMessagesFromStore();
    let message = id;
    try {
      if (messages[id]) {
        message = messages[id];
      } else if (message && !messages[id]) {
        if (
          missingKeys.indexOf(id) === -1 &&
          getIsTranslatingFromStore() === 'yes'
        ) {
          Request.post(
            `${window.APP_SERVER_API_URL}/translate/index/insert-missing-key`,
            { key: id, language: getLanguageFromStore() },
          )
            .then((response) => {
              if (response.success) {
                missingKeys.push(id);
              } else {
                console.log('something went wrong', response);
              }
            })
            .catch((error) => {});
        }
        message = message.replace(/_/g, ' ');
      }
      message = vsprintf(message, properties);
    } catch (e) {
      // ToDo
    }

    switch (messageType) {
      case this.MESSAGES_NORMAL:
        break;
      case this.MESSAGES_LOWERCASE:
        message = message.toLowerCase();
        break;
      case this.MESSAGES_UPPERCASE:
        message = message.toUpperCase();
        break;
      case this.MESSAGES_UPPERCASE_FIRST_CHAR:
        message = capitalize(message);
        break;
      case this.MESSAGES_UPPERCASE_FIRST_CHAR_OF_WORD:
        message = capitalizeString(message);
        break;
      default:
        break;
    }
    return message;
  }
}

const translate = new Translate();

// example t('%d_is_a_%s', [12, 'abc'])
export const t = (id, properties, type = translate.MESSAGES_NORMAL) =>
  translate.formatMessage(id, type, properties);

export const t1 = (id, properties) =>
  translate.formatMessage(
    id,
    translate.MESSAGES_UPPERCASE_FIRST_CHAR,
    properties,
  );

export const t2 = (id, properties) =>
  translate.formatMessage(
    id,
    translate.MESSAGES_UPPERCASE_FIRST_CHAR_OF_WORD,
    properties,
  );

export const t3 = (id, properties) =>
  translate.formatMessage(id, translate.MESSAGES_UPPERCASE, properties);

export const t4 = (id, properties) =>
  translate.formatMessage(id, translate.MESSAGES_LOWERCASE, properties);

export default t;
