import React from 'react';
import lodashGet from 'lodash.get';
import TakeDetail from 'components/admin/report/dashboard/utils/marking/index.js';
import fetchData from 'components/common/fetchData';
import apiUrls from 'api-endpoints';

const Index = ({
  userIid,
  node,
  question,
  defaultCommentIdToFocus,
  peerMarking = false,
  courseIid = null,
}) => {
  if (!question) {
    return null;
  }

  return (
    <TakeDetail
      peerMarking={peerMarking}
      courseIid={courseIid}
      userIid={userIid}
      nodeIid={lodashGet(node, 'iid')}
      item={question}
      defaultCommentIdToFocus={defaultCommentIdToFocus}
    />
  );
};

const fetchQuestion = fetchData(({ questionIid }) => ({
  baseUrl: apiUrls.fetch_node,
  params: {
    ntype: 'question',
    iid: questionIid,
  },
  propKey: 'question',
}));

export default fetchQuestion(Index);
