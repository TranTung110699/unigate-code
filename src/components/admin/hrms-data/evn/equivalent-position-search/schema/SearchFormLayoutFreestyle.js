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
            {groups.id.fieldNames.VTRICDANH_TDUONG_ID}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.equivalent_position_id_operator}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.VTRICDANH_TDUONG_CODE}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.equivalent_position_code_operator}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.VTRICDANH_TDUONG}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.equivalent_position_name_operator}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.org_id}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.org_id_operator}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.CDANHTDUONG_EVN_ID}
          </div>
          <div className="col-md-3 element-item">
            {groups.id.fieldNames.top_equivalent_position_id_operator}
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
                  hrmsEvnApiUrls.update_elearning_updated_at_to_evn_hrms_equivalent_positions
                }
                searchFormId={'hrms_equivalent_position_search'}
                textConfirm={t1(
                  'do_you_want_update_elearning_updated_at_to_evn_hrms_equivalent_positions?',
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
