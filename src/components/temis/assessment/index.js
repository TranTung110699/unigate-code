import React, { Component } from 'react';
import withTemisConfig from 'common/hoc/withTemisConfig';
import Icon from 'components/common/Icon';
import fetchData from 'components/common/fetchData';
import lodashGet from 'lodash.get';
import { timestampToDateTimeString } from 'common/utils/Date';
import Warning from 'components/common/Warning';
import { t1 } from 'translate';
import withUserInfo from 'common/hoc/withUserInfo';
import ProfileList from './assessments-in-organization/index';
import MyAssessment from './my-assessment/Dashboard';
import Tabs from 'components/common/tabs';

const lastUpdated = (ts) => {
  return ts ? (
    <span>
      {' '}
      {t1('last_updated')}: {timestampToDateTimeString(ts)}{' '}
    </span>
  ) : (
    <span>
      <Warning inline>{t1('never_updated')}</Warning> <Icon icon="edit" />
    </span>
  );
};

const iconStyle = {
  fontSize: '800%',
  marginBottom: '20px',
};

class TemisAssessmentIndex extends Component {
  render() {
    const { userInfo } = this.props;

    return (
      <div className="container-fluid">
        <Tabs
          tabs={[
            {
              label: t1('my_self_assessment'),
              content: <MyAssessment />,
            },
            {
              label: t1('Biểu mẫu hồ sơ trong đơn vị'),
              content: <ProfileList userInfo={userInfo} />,
            },
          ]}
        />
      </div>
    );
  }
}

export default fetchData((props) => ({
  baseUrl: '/temis/temis/get',
  fetchCondition:
    !!props && lodashGet(props, 'userId') && lodashGet(props, 'userId'),
  refetchCondition: (prevProps) =>
    lodashGet(props, 'userId') !== lodashGet(props, 'userId'),
  params: {
    id: lodashGet(props, 'userId'),
  },
  method: 'get',
  propKey: 'temisInfo',
}))(withTemisConfig(withUserInfo(TemisAssessmentIndex)));
