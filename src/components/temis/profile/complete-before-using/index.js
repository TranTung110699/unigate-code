import React from 'react';
import withUserInfo from 'common/hoc/withUserInfo';
import lodashGet from 'lodash.get';
import Form from 'components/temis/profile/edit/Form';
import Warning from 'components/common/Warning';

const CompleteProfileBeforeUsing = ({ userInfo }) => {
  const userId = lodashGet(userInfo, 'id');

  const handleFormSubmitSuccess = () => {
    window.location.href = '/';
  };

  return (
    <div>
      <div className="text-center">
        <Warning>
          Xin hãy cung cấp đầy đử thông tin hồ sơ cá nhân để có thể tiếp tục sử
          dụng hệ thống
        </Warning>
      </div>
      <Form
        userId={userId}
        title={'THÔNG TIN HỒ SƠ CÁ NHÂN CỦA GIÁO VIÊN/CBQLCSGD'}
        markAsHaveEnterTemisProfileInfoWhenSubmit
        onSuccess={handleFormSubmitSuccess}
      />
    </div>
  );
};

export default withUserInfo(CompleteProfileBeforeUsing);
