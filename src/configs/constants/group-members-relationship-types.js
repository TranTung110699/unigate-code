// see Category_Model_Category:: at server
const rt = {
  USER_RT_CURRENT: 1,
  USER_RT_PENDING: 2,
  USER_RT_REDUNDANT: 3, // members not matching the conditions any more
  USER_RT_REMOVED: 4, // members kicked out of the group. We still maintain for history
  USER_RT_REJECTED: 5,
};

export default rt;
