export const examResult = (
  contestCode,
  courseIid,
  examIid,
  examOrder,
  userIid,
) =>
  `/exam/result/${contestCode}/${courseIid}/${examIid}/${examOrder}${
    userIid ? '/' + userIid : ''
  }`;

export const contestLink = (contestCode) => `/exam/take/${contestCode}`;
