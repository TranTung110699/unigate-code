import getLodash from 'lodash.get';
import apiUrls from 'api-endpoints';

const fetchSkillsByJobPositions = (props) => ({
  baseUrl: apiUrls.dashboard_configs('mySkills'),
  params: {
    user_iid: getLodash(props, 'userInfo.iid'),
  },
  keyState: `positionsOfUserWithSkills_${getLodash(props, 'userInfo.iid')}`,
  propKey: 'positionsOfUserWithSkills',
  fetchCondition: getLodash(props, 'userInfo.iid'),
  shouldRenderLoading: true,
});

export default fetchSkillsByJobPositions;
