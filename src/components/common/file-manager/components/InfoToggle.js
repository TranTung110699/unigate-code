import React from 'react';
import PropTypes from 'prop-types';
import InfoIcon from 'material-ui/svg-icons/action/info';
import IconButton from 'material-ui/IconButton';
import { t1 } from 'translate';

class InfoToggle extends React.PureComponent {
  render() {
    const { className, on, onClick } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <IconButton
        title={t1('hide/show_file_info')}
        className={componentClassName}
        iconStyle={{
          fill: on ? '#00bcd4' : 'currentColor',
        }}
        onClick={onClick}
      >
        <InfoIcon />
      </IconButton>
    );
  }
}

InfoToggle.propTypes = {
  className: PropTypes.string,
};

InfoToggle.defaultProps = {
  className: '',
};

export default InfoToggle;
