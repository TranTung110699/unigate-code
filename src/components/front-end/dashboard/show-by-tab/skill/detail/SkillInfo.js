import React from 'react';
import getLodash from 'lodash.get';

import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import fetchData from 'components/common/fetchData';

class CreditSyllabusesOfSkill extends React.Component {
  render() {
    const { skillInfo, userInfo } = this.props;

    return (
      <h3>
        {t1('programs_of_skill')}: {skillInfo && skillInfo.name}
      </h3>
    );
  }
}

export default fetchData((props) => ({
  baseUrl: apiUrls.get_skill_info,
  keyState: `skillInfo_${getLodash(props, 'skillIid')}`,
  params: {
    iid: getLodash(props, 'skillIid'),
  },
  propKey: 'skillInfo',
  fetchCondition: getLodash(props, 'skillIid'),
  shouldRenderLoading: true,
}))(CreditSyllabusesOfSkill);
