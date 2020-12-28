import React from 'react';
import getLodash from 'lodash.get';
import { t1 } from 'translate/index';
import Paper from 'material-ui/Paper';
import Title from 'schema-form/field-set/Title';
import apiUrls from 'api-endpoints';
import NodeNew from 'components/admin/node/new/index';
import RaisedButton from 'components/common/mui/RaisedButton';
import DetailOnDialog from 'components/common/detail-on-dialog/index';
import addNewSchema from '../schema/form';

const stylePaper = {
  marginBottom: 10,
  padding: 10,
};

class Index extends React.PureComponent {
  dialogOptionsProperties = {
    width: '80%',
  };

  renderCreate = ({ closeDialog }) => (
    <NodeNew
      ntype="req"
      formid="new_req"
      schema={addNewSchema({
        hiddenFields: getLodash(this.props, 'hiddenFields'),
      })}
      searchFormId={getLodash(this.props, 'formid')}
      alternativeApi={apiUrls.post_new_node('req')}
      requestSuccessful={closeDialog}
    />
  );

  render() {
    const fieldNames = getLodash(this.props, 'groups.id.fieldNames') || {};
    const userIid = getLodash(this.props, 'hiddenFields.requester_iid');
    return (
      <div className="col-md-12">
        {fieldNames.requester && (
          <Paper style={stylePaper}>
            <Title title={t1('requester_filter')} />
            <div className="row">
              <div className="col-md-12">{fieldNames.requester}</div>
            </div>
          </Paper>
        )}
        <Paper style={stylePaper}>
          <Title title={t1('simple_filter')} />
          <div className="row">
            <div className="col-md-12">
              {fieldNames.request_type && (
                <div
                  className={
                    fieldNames.request_type_iid
                      ? 'col-md-3 col-sm-6 m-t-10'
                      : 'col-md-4 col-sm-12  m-t-10'
                  }
                >
                  {fieldNames.request_type}
                </div>
              )}
              {fieldNames.request_type_iid && (
                <div className="col-md-3 col-sm-6 m-t-10">
                  {fieldNames.request_type_iid}
                </div>
              )}
              <div
                className={
                  fieldNames.request_type_iid
                    ? 'col-md-3 col-sm-6'
                    : 'col-md-4 col-sm-6'
                }
              >
                {fieldNames.start_date}
              </div>
              <div
                className={
                  fieldNames.request_type_iid
                    ? 'col-md-3 col-sm-6'
                    : 'col-md-4 col-sm-6'
                }
              >
                {fieldNames.end_date}
              </div>
              {fieldNames.status && (
                <div className="col-sm-12">{fieldNames.status}</div>
              )}
            </div>
          </div>
        </Paper>
        {fieldNames.request_data && (
          <Paper style={stylePaper}>
            <Title title={t1('request_data_filter')} />
            <div className="row">
              <div className="col-md-12">{fieldNames.request_data}</div>
            </div>
          </Paper>
        )}
        {fieldNames.organization_and_job_position && (
          <Paper style={stylePaper}>
            <Title title={t1('organization_and_job_position')} />
            <div className="row">
              <div className="col-md-12">
                {fieldNames.organization_and_job_position}
              </div>
            </div>
          </Paper>
        )}
        <div className="col-md-12 text-center m-t-20">
          {getLodash(this.props, 'submitButton')}
          {userIid && (
            <DetailOnDialog
              renderPreview={({ showFull }) => (
                <RaisedButton
                  primary
                  className="m-l-10 m-r-10"
                  onClick={showFull}
                  label={t1('add_new')}
                />
              )}
              renderFull={this.renderCreate}
              dialogOptionsProperties={this.dialogOptionsProperties}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Index;
