import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'components/common/mui/FlatButton';
import { t1 } from 'translate';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Form from './Form';

class Finalize extends React.Component {
  dialogOptionsProperties = {
    handleClose: true,
  };

  cssClass = 'admin-graduation-finalize';

  renderFull = ({ closeDialog }) => {
    const {
      user,
      node,
      executeOnSuccess,
      allowedToTest,
      graduated,
      userIid,
      requestSuccessful,
    } = this.props;
    return (
      <Form
        userIid={userIid}
        user={user}
        node={node}
        allowedToTest={allowedToTest}
        executeOnSuccess={() => {
          if (typeof executeOnSuccess === 'function') {
            executeOnSuccess();
          }
          closeDialog();
        }}
      />
    );
  };

  renderPreview = ({ showFull }) => {
    let { className, Component, label, ...rest } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    Component = Component || FlatButton;
    label = label || t1('finalize');

    return (
      <Component
        {...rest}
        onClick={showFull}
        className={componentClassName}
        label={label}
      />
    );
  };

  render() {
    return (
      <DetailOnDialog
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
        timeRender={this.props.timeRender}
        dialogOptionsProperties={this.dialogOptionsProperties}
        dialogKey={this.props.dialogKey}
      />
    );
  }
}

Finalize.propTypes = {
  className: PropTypes.string,
};

Finalize.defaultProps = {
  className: '',
};

export default Finalize;
