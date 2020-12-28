import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import apiUrls from 'api-endpoints';
import fileApiUrls from 'components/common/file-manager/endpoints';

class Form extends Component {
  render() {
    return (
      <div>
        <h1>upload file in local server to cdn</h1>
        <NodeNew
          ntype={'academic_category'}
          schema={{
            schema: () => ({
              local_file_paths: {
                type: 'text',
                hintText: 'local_file_paths',
                floatingLabelText: 'local_file_paths',
                defaultValue: '',
                errorText: '',
                fullWidth: true,
              },
            }),
            ui: () => [
              {
                id: 'default',
                fields: ['local_file_paths'],
              },
            ],
          }}
          formid={'upload_and_save_local_file_info'}
          alternativeApi={fileApiUrls.upload_and_save_local_file_info}
        />
      </div>
    );
  }
}

export default connect()(Form);
