import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import DetailOnDialog from 'components/common/detail-on-dialog';
import IconButton from 'material-ui/IconButton';
import Form from 'components/admin/abac-role/concrete-role/new-and-edit/Form';

class Edit extends React.PureComponent {
  renderPreview = ({ showFull }) => {
    return (
      <IconButton
        onClick={showFull}
        iconClassName="mi mi-edit"
        title={t1('edit_permissions_for_this_role')}
      />
    );
  };

  renderFull = ({ closeDialog }) => {
    const { node, type, searchFormId } = this.props;
    return (
      <Form
        formid={`edit_abac_role_type_${type}`}
        mode="edit"
        step={type}
        node={node}
        searchFormId={searchFormId}
      />
    );
  };

  render() {
    return (
      <DetailOnDialog
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
        dialogOptionsProperties={{
          handleClose: true,
          width: '80%',
        }}
      />
    );
  }
}

Edit.propTypes = {
  className: PropTypes.string,
};

Edit.defaultProps = {
  className: '',
};

export default Edit;
