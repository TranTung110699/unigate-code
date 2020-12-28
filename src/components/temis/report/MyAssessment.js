import React from 'react';
import Widget from 'components/common/Widget';
import Form from 'components/temis/assessment/edit/Form';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from '../../../translate';
import Icon from '../../common/Icon';

const MyAssessment = ({ user, rubricIid } = {}) => {
  return (
    <div>
      <div className="text-center">
        <h2>PHIẾU TỰ ĐÁNH GIÁ TCNN</h2>
      </div>
      {/* TODO: Thông tin cá nhân

   <Widget noMinHeight className="m-t-20 m-b-10" title="Thông tin cá nhân">
      <div className="row">
        <div className="col-md-12">Họ và tên giáo viên: </div>
        <div className="col-md-12">Trường:</div>
        <div className="col-md-6">Môn dạy:</div>
        <div className="col-md-6">Chủ nhiệm lớp:</div>
        <div className="col-md-6">Quận/huyện:</div>
        <div className="col-md-6">Tỉnh/Thành phố:</div>
      </div>
    </Widget>
    */}
      <Form rubricIid={rubricIid} userIid={user && user.iid} readOnly />
      <RaisedButton
        className="m-t-20"
        label={t1('export_pdf')}
        icon={<Icon icon="export" />}
      />
    </div>
  );
};

export default MyAssessment;
