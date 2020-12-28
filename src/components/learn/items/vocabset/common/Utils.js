import { vocabProgressLevels } from '../types/vocab-progress-levels';

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

  getVocabsetSkill(vocabset) {
    let localSkill = 'complete';
    if (vocabset.vcs_skills) {
      localSkill = Object.keys(vocabset.vcs_skills)[0];
    }

    return localSkill;
  }

  /**
   * vocabProgresses = [
   *    {
   *       iid: 31079,
   *       p0: 3,
   *       p1: 3,
   *       p2: 3,
   *       p3: 3,
   *    },
   *    {
   *       iid: 31080,
   *       p0: 3,
   *       p1: 3,
   *       p2: 3,
   *       p3: 3,
   *    }
   * ]
   *
   * skillDetails = {
   *   p1: 'read',
   *   p2: 'listen',
   * }
   *
   * =>
   * newVocabProgresses = [
   *    {
   *       iid: 31079,
   *       p1: 3,
   *       p2: 3,
   *    },
   *    {
   *       iid: 31080,
   *       p1: 3,
   *       p2: 3,
   *    }
   * ]
   *
   * @param skillDetails
   * @param vocabProgresses
   */
  getVocabsProgressesBySkill(skillDetails, vocabProgresses) {
    const newVocabProgresses = [];
    vocabProgresses.forEach((vocabProgress) => {
      let newVocabProgress = [];
      Object.keys(vocabProgress).forEach((key) => {
        if (skillDetails[key]) {
          newVocabProgress = { ...newVocabProgress, [key]: vocabProgress[key] };
        }
      });

      newVocabProgress = {
        ...newVocabProgress,
        iid: vocabProgress.iid,
        tco_iid: vocabProgress.iid,
        p: vocabProgress.p,
      };

      newVocabProgresses.push(newVocabProgress);
    });

    return newVocabProgresses;
  }

  updateProgressForVocab(iid, skill, correct, vocabsProgresses, skillConfigs) {
    const newVocabsProgresses = vocabsProgresses;
    const skillCode = Object.keys(skillConfigs).find(
      (key) => skillConfigs[key] === skill,
    );

    let vocab = [];
    Object.keys(vocabsProgresses).forEach((index) => {
      if (vocabsProgresses[index].iid === iid) {
        vocab = vocabsProgresses[index];
      }
    });

    if (correct) {
      vocab[skillCode] = vocabProgressLevels.COMPLETE;
    } else if (vocab[skillCode] === vocabProgressLevels.COMPLETE) {
      vocab[skillCode] = vocabProgressLevels.FORGOTTEN;
    } else {
      vocab[skillCode] = vocabProgressLevels.STRUGGLING;
    }

    let totalOfProgress = 0;
    for (const i in skillConfigs) {
      if (vocab[i]) {
        totalOfProgress += parseInt(vocab[i], 10);
      }
    }
    vocab.p = Math.ceil(totalOfProgress / Object.keys(skillConfigs).length);

    newVocabsProgresses[iid] = vocab;

    return newVocabsProgresses;
  }
}

const utils = new Utils();

export default utils;
