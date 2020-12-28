import React from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import RaisedButton from 'components/common/mui/RaisedButton';
import Alert from 'antd/lib/alert';

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
        <h3>{t1('get_result_from_sql_command')}</h3>
        <Alert
          message="Tên các bảng: user, organization, S_DEPARTMENT, L_VTRICDANH, L_VTRICDANH_TDUONG, L_VTRICDANH_TDUONGEVN"
          type="success"
          className={'m-t-10'}
        />
        <Alert
          message="SELECT COUNT(*) FROM share_db.dbo.[user] where ns_id = 1235000000009556 AND mail like '%hant%' AND login_name like '%evncpc%'"
          type="info"
          className={'m-t-10'}
        />
        <Alert
          message="SELECT TOP 10 * FROM share_db.dbo.[user]  where vtri_id = 18000000000071 AND dept_id = 23000000000106"
          type="warning"
          className={'m-t-10'}
        />
        <Alert
          message="SELECT full_name, mail, ns_id, org_id FROM share_db.dbo.[user] where org_id = 18 OR org_id = 124"
          type="error"
          className={'m-t-10'}
        />
        <Alert
          message="SELECT COUNT(*) FROM share_db.dbo.[organization] where org_id = 18"
          type="info"
          className={'m-t-10'}
        />

        {message && (
          <div className="row">
            <h3 style={this.h3Style}>{message}</h3>
          </div>
        )}
        <div className="row">
          <div className="col-md-9 element-item">
            {groups.id.fieldNames.sql}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 m-b-15 p-t-15">
            <RaisedButton
              type="submit"
              name="search"
              id="search"
              icon={<Icon icon={'retry'} />}
              label={t1('execute')}
              primary
            />
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
