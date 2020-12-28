import React, { Component } from 'react';

import Form from 'components/admin/user/new/Form';
import Info from './index';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import Widget from 'components/common/Widget';

class InfoV2 extends Component {
  render() {
    const { formattedUser, roleUser, user, isK12, isSIS } = this.props;

    const updateApi = '/user/update';

    const highSchoolRecords = (
      <div>
        <Form
          key="high-school-records"
          mode="edit"
          node={formattedUser}
          alternativeApi={updateApi}
          formid="edit_school_info"
          title={user.name}
          step="school_info"
        />
      </div>
    );

    const admissionStatus = (
      <Form
        key="admission_status"
        mode="edit"
        node={formattedUser}
        alternativeApi={updateApi}
        formid="edit_admission_status"
        title={user.name}
        step="admission_status"
      />
    );

    const contact = (
      <Form
        key="contact"
        mode="edit"
        node={formattedUser}
        alternativeApi={updateApi}
        formid="edit_contact"
        title={user.name}
        step="contact"
      />
    );

    return (
      <div>
        {/*<h1>{t1('basic_information')}</h1>*/}
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <Info
                user={formattedUser}
                step={isSIS && 'basic_information'}
                roleUser={roleUser}
              />
            </div>
            <div className="col-md-6">
              {roleUser === 'student' && isK12 && (
                <Widget>{highSchoolRecords}</Widget>
              )}
              {roleUser === 'student' && isSIS && (
                <Widget>{admissionStatus}</Widget>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withSchoolConfigs(InfoV2);
// export default InfoV2;
