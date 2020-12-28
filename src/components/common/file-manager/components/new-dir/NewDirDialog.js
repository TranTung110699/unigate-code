import React from 'react';
import PropTypes from 'prop-types';
import NodeNew from 'components/admin/node/new';
import fileSchema from 'components/common/file-manager/schema/form';

class NewDirDialog extends React.PureComponent {
  render() {
    const { className, parentDirCode, dialogKey, searchFormId } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <div className={componentClassName}>
        <NodeNew
          dialogKey={dialogKey}
          formid="new_dir"
          searchFormId={searchFormId}
          mode="new"
          ntype="file"
          schema={fileSchema}
          step="dir"
          params={{
            parent_dir_code: parentDirCode,
            type: 'directory',
          }}
        />
      </div>
    );
  }
}

NewDirDialog.propTypes = {
  className: PropTypes.string,
};

NewDirDialog.defaultProps = {
  className: '',
};

export default NewDirDialog;
