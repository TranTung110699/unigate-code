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
      score,
      graduated,
      offlineExamIid,
    } = this.props;
    return (
      <Form
        user={user}
        node={node}
        score={score}
        graduated={graduated}
        offlineExamIid={offlineExamIid}
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
        dialogOptionsProperties={this.dialogOptionsProperties}
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
