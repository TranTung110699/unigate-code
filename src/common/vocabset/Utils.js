/**
 * Created by Peter Hoang Nguyen on 3/20/2017.
 */

class Utils {
  getLanguageFromComponent(component) {
    if (!component.props.intl) {
      return null;
    }
    let language = component.props.intl.locale;
    language = language || 'en-US';
    language = language.split('-')[1].toLowerCase();
    return language;
  }

  getPhoneticsByLanguage(vocab, lang) {
    lang = 'us' ? 'en-US' : 'en-GB';
    let phonetics = null;

    if (vocab && vocab.audio) {
      if (lang === 'us' && vocab.audio.us) {
        phonetics = vocab.audio.us.phonetics;
      }
      if (lang === 'gb' && vocab.audio.gb) {
        phonetics = vocab.audio.gb.phonetics;
      }
      phonetics = phonetics || vocab.audio.phonetics;
    }

    return phonetics;
  }

  getAudioByLanguage(vocab, lang, text) {
    lang = 'us' ? 'us' : 'gb';
    let audio = null;
    if (!vocab || !vocab.audio) {
      return false;
    }
    if (lang === 'us' && vocab && vocab.audio.us) {
      audio = vocab.audio.us.mp3;
    }
    if (lang === 'us' && vocab && vocab.audio.gb) {
      audio = vocab.audio.gb.mp3;
    }
    audio = audio || false;
    return audio;
  }

  formatVocabsetToDisplay(vocab, lang) {
    lang = 'us' ? 'us' : 'gb';
    const result = {};
    result.phonetics = this.getPhoneticsByLanguage(vocab, lang);
    result.name = vocab ? vocab.name : '';
    if (lang === 'us') {
      if (vocab && vocab.vid_us) {
        result.video = vocab.vid_us;
      } else {
        result.video = vocab.vimeo_vid_us;
      }
    } else if (vocab && vocab.vid_gb) {
      result.video = vocab.vid_gb;
    } else {
      result.video = vocab.vimeo_vid_gb;
    }
    return result;
  }
}

const utils = new Utils();

export default utils;
