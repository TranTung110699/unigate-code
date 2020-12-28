import React from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import RaisedButton from 'components/common/mui/RaisedButton';
import hrmsEvnApiUrls from 'components/admin/hrms-data/evn/endpoints';
import ResyncDataFromShareDBBtn from '../../common/ResyncDataFromShareDBBtn';
import Perm from 'common/utils/Perm';

class SearchFormDetailFreestyle extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  divStyle = { textAlign: 'center' };

  render() {
    const { groups, message, readOnly } = this.props;

    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    return (
      <div className="container-fluid elementGroup">
        {message && (
          <div className="row">
            <h3 style={this.h3Style}>{message}</h3>
          </div>
        )}
        <div className="row">
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.ns_id}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.ns_id_operator}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.ns_number}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.ns_number_operator}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.full_name}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.full_name_operator}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.login_name}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.login_name_operator}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.phone}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.phone_operator}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.mail}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.mail_operator}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.user_ad}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.user_ad_operator}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.user_enable}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.user_enable_operator}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.org_id}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.org_id_operator}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.org_name}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.org_name_operator}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.vtri_id}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.vtri_id_operator}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.position_name}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.position_name_operator}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.dept_id}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.dept_id_operator}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.dept_name}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.dept_name_operator}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.hrms_status}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.hrms_status_operator}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 m-b-15 p-t-15">
            <RaisedButton
              type="submit"
              name="search"
              id="search"
              icon={<Icon icon={'search'} />}
              label={t1('search')}
              primary
            />
            {Perm.hasPerm('root') && (
              <ResyncDataFromShareDBBtn
                className={'m-b-10 m-l-10'}
                raisedButton
                title={t1('update_elearning_updated_at')}
                label={t1('update_elearning_updated_at')}
                labelPosition="after"
                secondary
                icon="retry"
                resyncDataFromShareDBUrl={
                  hrmsEvnApiUrls.update_elearning_updated_at_to_evn_hrms_users
                }
                searchFormId={'hrms_user_search'}
                textConfirm={t1(
                  'do_you_want_update_elearning_updated_at_to_evn_hrms_users?',
                )}
              />
            )}
          </div>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    form: state.form,
  };
}

export default connect(mapStateToProps)(SearchFormDetailFreestyle);
