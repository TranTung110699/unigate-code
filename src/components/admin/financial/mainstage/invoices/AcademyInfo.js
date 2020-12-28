import React from 'react';
import apiUrls from 'api-endpoints';
import fetchData from 'components/common/fetchData';
import { userMajorStatus } from 'configs/constants';
import get from 'lodash.get';

const AcademicInfo = (props) => {
  const { userMajors } = props;

  if (!Array.isArray(userMajors) || !userMajors.length) {
    return null;
  }

  const userDetailInfo = userMajors[0].user;
  if (!userDetailInfo) {
    return null;
  }

  return (
    <div className="beneficiary-wrapper">
      <div className="row">
        <div className="col-md-6 beneficiary-info">
          <div>Người thụ hưởng / Beneficiary: {userDetailInfo.name}</div>
          <div>MSSV / ID Number: {userDetailInfo.code}</div>
        </div>
        <div className="col-md-6 class-groups">
          {userMajors.map((userMajor) => (
            <div>
              <div>Ngành / Major: {get(userMajor, 'majorObject.name')}</div>
              <div>Hệ đào tạo / Training Mode: {userMajor.training_mode}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default fetchData((props) => ({
  baseUrl: apiUrls.user_major_search,
  fetchCondition: !!props && props.userIid,
  refetchCondition: (prevProps) =>
    props.userIid && props.userIid !== prevProps.userIid,
  params: {
    user_iid: props.userIid,
    status: [userMajorStatus.STUDYING, userMajorStatus.QUALIFIED],
  },
  method: 'get',
  propKey: 'userMajors',
}))(AcademicInfo);
