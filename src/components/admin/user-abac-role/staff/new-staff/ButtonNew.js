/* eslint-disable no-undef,jsx-a11y/anchor-is-valid,no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Icon from 'components/common/Icon';
import PrimaryButton from 'components/common/primary-button';
import { t1 } from 'translate';
import Form from './Form';

class New extends React.Component {
  renderPreview = ({ showFull }) => (
    <PrimaryButton
      name="submit"
      onClick={showFull}
      icon={<Icon icon="plus" />}
      label={t1('add_new_staff', 1)}
      type="submit"
    />
  );

  renderFull = ({ closeDialog }) => <Form {...this.props} />;

  render() {
    return (
      <DetailOnDialog
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
      />
    );
  }
}

New.propTypes = {
  className: PropTypes.string,
};

New.defaultProps = {
  className: '',
};

export default New;
