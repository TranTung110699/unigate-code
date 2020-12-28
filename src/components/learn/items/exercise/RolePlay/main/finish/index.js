import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import './stylesheet.scss';

class RolePlayFinish extends React.Component {
  cssClass = 'role-play-finish-message';

  render() {
    const { score, onReviewButtonClick } = this.props;
    return (
      <div className={this.cssClass}>
        <div className={`${this.cssClass}__message`}>
          {t1('you_have_finished_the_role_play_exercise')}
        </div>
        <div className={`${this.cssClass}__result`}>
          {`${t1('result')}: ${score}%`}
        </div>
        <div className={`${this.cssClass}__buttons`}>
          <div className={`${this.cssClass}__button`}>
            <RaisedButton onClick={onReviewButtonClick}>
              {t1('review')}
            </RaisedButton>
          </div>
        </div>
      </div>
    );
  }
}

RolePlayFinish.propTypes = {
  onReviewButtonClick: PropTypes.func,
  score: PropTypes.number,
};

RolePlayFinish.defaultProps = {
  onReviewButtonClick: () => {},
  score: null,
};

export default RolePlayFinish;
