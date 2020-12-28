import React from 'react';
import MUIFlatButton from 'material-ui/FlatButton';
import DarkFlatButton from 'components/common/primary-button'; //new button
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import PropTypes from 'prop-types';

class FlatButton extends React.Component {
  render() {
    const { isFeatureEnabled, ...props } = this.props;
    if (isFeatureEnabled(features.NEW_UI_JULY_2019) && !this.props.flatButton) {
      return <DarkFlatButton {...props} flatButton />;
    }
    return <MUIFlatButton {...props} />;
  }
}

FlatButton.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'ghost', 'dashed', 'danger', 'link']),
  buttonType: PropTypes.oneOf(['primary', 'ghost', 'dashed', 'danger', 'link']),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  ghost: PropTypes.bool,
  href: PropTypes.string,
  htmlType: PropTypes.oneOf(['button', 'reset', 'submit']),
  shape: PropTypes.oneOf(['round', 'circle', 'circle-outline']),
  size: PropTypes.oneOf(['small', 'default', 'large']),
  target: PropTypes.string,
  block: PropTypes.bool,
};

export default withFeatureFlags()(FlatButton);
