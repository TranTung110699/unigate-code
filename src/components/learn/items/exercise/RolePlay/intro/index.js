import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import './stylesheet.scss';

class RolePlayIntro extends React.Component {
  render() {
    const { onStartButtonClick, description } = this.props;
    const mainClass = 'role-play-intro';

    return (
      <div className={mainClass}>
        <div className={`${mainClass}__description`}>{description}</div>
        <div className={`${mainClass}__button`}>
          <RaisedButton onClick={onStartButtonClick}>
            {t1('start')}
          </RaisedButton>
        </div>
      </div>
    );
  }
}

RolePlayIntro.propTypes = {
  description: PropTypes.string,
  onStartButtonClick: PropTypes.func,
};

RolePlayIntro.defaultProps = {
  description: '',
  onStartButtonClick() {},
};

export default RolePlayIntro;
