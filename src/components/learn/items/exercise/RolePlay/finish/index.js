import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import './stylesheet.scss';

class RolePlayFinish extends React.Component {
  cssClass = 'role-play-finish';

  render() {
    const { score, onRedoButtonClick } = this.props;
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
            <RaisedButton onClick={onRedoButtonClick}>
              {t1('redo')}
            </RaisedButton>
          </div>
        </div>
      </div>
    );
  }
}

RolePlayFinish.propTypes = {
  onDoneButtonClick: PropTypes.func,
  onRedoButtonClick: PropTypes.func,
  score: PropTypes.number,
};

RolePlayFinish.defaultProps = {
  onDoneButtonClick: () => {},
  onRedoButtonClick: () => {},
  score: null,
};

export default RolePlayFinish;
