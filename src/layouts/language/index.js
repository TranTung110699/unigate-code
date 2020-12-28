/**
 * Created by hungvo on 06/01/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Perm from 'common/utils/Perm';
import { getLanguage } from 'utils/selectors';
import Icon from 'components/common/Icon';
import { languages } from 'configs/constants';
import actions from 'actions/creators';
import { loginSuccess } from 'actions/auth';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';
import EnglishFlag from './resources/English-Flag.png';
import JapanFlag from './resources/Japan-Flag.png';
import VietnamFlag from './resources/Vietnam-Flag.png';
import './stylesheet.scss';

const ImageMapping = {
  en: EnglishFlag,
  vn: VietnamFlag,
  jp: JapanFlag,
};

class SettingLanguage extends React.Component {
  cssClass = 'setting-language';

  handleOnChange = (language) => {
    const { dispatch, user } = this.props;
    if (Perm.isGuest()) {
      dispatch(actions.saveTranslations({ language }));
    } else {
      const params = {
        settings__language: language,
        _sand_step: 'language',
      };
      const url = apiUrls.update_node('user');
      dispatch(
        sagaActions.getDataRequest(
          {
            url,
            executeOnSuccess: () => {
              const settings = Object.assign({}, user && user.settings, {
                language,
              });
              dispatch(loginSuccess({ ...user, settings }, ['settings']));
            },
          },
          params,
        ),
      );
    }
  };

  render() {
    const { language } = this.props;
    return (
      <ul className={`${this.props.className} ${this.cssClass}`}>
        <li className={`${this.cssClass}__icon`}>
          <Icon icon="language" />
        </li>
        &nbsp;
        {languages.map((item) => (
          <li
            key={`setting-language-${item.value}`}
            className={`${this.cssClass}__item ${
              item.value === language ? 'active' : ''
            }`}
            onClick={() => this.handleOnChange(item.value)}
          >
            <img src={ImageMapping[item.value]} />
            {item.label}
          </li>
        ))}
      </ul>
    );
  }
}

SettingLanguage.propTypes = {
  language: PropTypes.string,
};

SettingLanguage.defaultProps = {
  language: 'en',
};

const mapStateToProp = (state) => ({
  language: getLanguage(state),
  user: state.user && state.user.info,
});

export default connect(mapStateToProp)(SettingLanguage);
