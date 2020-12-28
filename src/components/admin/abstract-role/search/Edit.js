import React from 'react';
import PropTypes from 'prop-types';
import DetailOnDialog from 'components/common/detail-on-dialog';
import IconButton from 'material-ui/IconButton';
import Form from '../new/Form';

class Edit extends React.PureComponent {
  renderPreview = ({ showFull }) => {
    return <IconButton onClick={showFull} iconClassName="mi mi-edit" />;
  };

  renderFull = ({ closeDialog }) => {
    const { node, searchFormId } = this.props;
    return (
      <Form
        formid="edit_abstract_role"
        mode="edit"
        step="abstract"
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
