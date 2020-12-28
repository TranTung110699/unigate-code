import React from 'react';
import PropTypes from 'prop-types';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Icon from 'components/common/Icon';
import FlatButton from 'components/common/mui/NewButton';
import { t1 } from 'translate';
import Form from './Form';

class New extends React.Component {
  renderPreview = ({ showFull }) => (
    <FlatButton
      onClick={showFull}
      icon={<Icon icon="plus" />}
      label={t1('add_new_staff', 1)}
    />
  );

  renderFull = () => <Form {...this.props} />;

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
