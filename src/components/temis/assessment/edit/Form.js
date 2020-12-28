import React from 'react';
import DoAssessment from '../do-assessment';
import fetchData from 'components/common/fetchData';
import lodashGet from 'lodash.get';
import Loading from 'components/common/loading';
import endPoints from '../endpoints';

const TcnnAssessment = ({
  loadingStatus,
  node,
  rubricIid,
  userIid,
  peerAssess,
  handleRefetch,
  compactMode,
  chartOnly,
  readOnly,
  requestSuccessful = null,
  dialogKey,
}) => {
  if (typeof loadingStatus !== 'undefined' && loadingStatus !== 'finished') {
    return <Loading />;
  }

  const hiddenFields = {
    target: {
      iid: userIid,
      ntype: 'user',
    },
    rubric_iid: rubricIid,
  };
  if (peerAssess) {
    hiddenFields.peer_assess = 1;
  }

  return (
    <DoAssessment
      readOnly={readOnly}
      hiddenFields={hiddenFields}
      peerAssess={peerAssess}
      rubricIid={rubricIid}
      requestSuccessful={requestSuccessful || (() => handleRefetch())}
      node={node || {}}
      compactMode={compactMode}
      chartOnly={chartOnly}
      dialogKey={dialogKey}
    />
  );
};

export default fetchData(({ node, peerAssess, ...props }) => ({
  baseUrl: endPoints.assessmentResult,
  fetchCondition:
    !node &&
    !!props &&
    lodashGet(props, 'rubricIid') &&
    lodashGet(props, 'userIid'),
  refetchCondition: (prevProps) =>
    lodashGet(props, 'rubricIid') !== lodashGet(props, 'rubricIid') ||
    lodashGet(props, 'userIid') != lodashGet(props, 'userIid'),
  params: {
    rubricIid: props.rubricIid,
    userIid: props.userIid,
    peer_assess: peerAssess ? 1 : 0,
  },
  method: 'get',
  propKey: !node && 'node',
}))(TcnnAssessment);
