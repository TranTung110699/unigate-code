/* eslint-disable no-undef */
import React, { Component } from 'react';
import get from 'lodash.get';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import DownloadTemplate from './DownloadTemplate';
import { Redirect } from 'react-router-dom';
import Attachments from 'schema-form/elements/attachments';

class ImportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      import_id: null,
    };
  }

  render() {
    if (this.state.import_id) {
      return (
        <Redirect to={`${window.location.pathname}/${this.state.import_id}`} />
      );
    }

    const hiddenFields = get(this.props, 'node.iid')
      ? {
          import_for_item: {
            id: get(this.props, 'node.id'),
            iid: get(this.props, 'node.iid'),
            ntype: get(this.props, 'node.ntype'),
          },
        }
      : {};

    return (
      <NodeNew
        className="white-box border-round"
        schema={{
          schema: () => ({
            import_file: {
              name: 'import_file',
              type: Attachments,
              accept: ['.xlsx', '.xls', '.xlsm', '.csv'],
              hintText: t1('import_file'),
              fullWidth: true,
              allowDownload: true,
              limit: 1,
              noFileManager: true,
            },
          }),
          ui: () => [
            {
              id: 'default',
              fields: ['import_file'],
            },
          ],
          finalProcessBeforeSubmit: (fullData) =>
            Object.assign({}, fullData, {
              import_file: get(fullData, `import_file.0.link`),
            }),
        }}
        hiddenFields={hiddenFields}
        formid="import-users"
        alternativeApi={'user/data/import-users-temp-to-process'}
        requestSuccessful={({ result }) => {
          this.setState({ import_id: result && result.import_id });
        }}
        submitButton={(formValues) => (
          <div>
            <RaisedButton
              name="submit"
              type="submit"
              className="m-l-10 m-r-10"
              disabled={!formValues || !formValues.import_file}
              label={t1('submit')}
              primary
              icon="save"
            />
            <DownloadTemplate
              template={get(this.props, 'node.iid') && 'import-users-in-node'}
              icon="download"
            />
          </div>
        )}
      />
    );
  }
}

export default connect()(ImportForm);
