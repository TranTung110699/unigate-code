import React, { Component } from 'react';
import ButtonAction from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import DetailOnDialog from 'components/common/detail-on-dialog';
import { Redirect } from 'react-router-dom';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import apiUrls from 'api-endpoints';
import RaisedButton from 'material-ui/RaisedButton';
import NodeNew from 'components/admin/node/new';
import Preview from './preview';
import getSchema from './schema/form';
import DownloadTemplate from './template';

class ImportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      importId: null,
      updateView: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.importId !== nextProps.importId) {
      this.setState({ importId: null });
    }
  }

  render() {
    const { importId } = this.props;
    const style = {
      padding: 20,
      width: '100%',
    };

    if (importId) {
      return (
        <Preview
          importId={importId}
          updateView={this.state.updateView}
          confirmImport={
            <ButtonAction
              alternativeApi={apiUrls.import_rubrics_action_request}
              title={t1('import')}
              icon="synch"
              raisedButton
              label={t1('confirm_import')}
              params={{
                import_id: importId,
              }}
              onRequestSuccessful={() =>
                this.setState((state) => ({ updateView: !state.updateView }))
              }
            />
          }
        />
      );
    }

    if (this.state.importId) {
      return (
        <Redirect to={`${window.location.pathname}/${this.state.importId}`} />
      );
    }

    return (
      <NodeNew
        schema={getSchema}
        formif="import_rubrics"
        alternativeApi={apiUrls.import_rubrics_request}
        requestSuccessful={(res) => {
          if (res && res.success && res.result && res.result.import_id) {
            this.setState({
              importId: res.result.import_id,
            });
          }
        }}
        submitButton={
          <div className="text-center">
            <RaisedButton
              className="m-l-10 m-r-10"
              icon={<Icon icon="fileUpload" />}
              label={t1('import')}
              primary
              type="submit"
            />
            <DetailOnDialog
              renderPreview={({ showFull }) => (
                <RaisedButton
                  className="m-l-10 m-r-10"
                  label={t1('download_file_template')}
                  icon={<Icon icon="fileDownload" />}
                  onClick={showFull}
                  primary
                />
              )}
              renderFull={() => <DownloadTemplate />}
            />
          </div>
        }
      />
    );
  }
}

export default ImportForm;
