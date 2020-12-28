import React from 'react';
import ViewAssessMyPeers from 'components/temis/assessment/peers-assessment/ViewAssessMyPeers';
import fetchData from 'components/common/fetchData';
import endpoints from 'components/temis/assessment/endpoints';
import { t1 } from 'translate';

const ViewAssessmentOfPeersInPhongBan = ({ peers, rubricIid } = {}) => {
  return (
    <div>
      <div className="text-center">
        <h2>
          BẢNH TỔNG HỢP KẾT QUẢ ĐÁNH GIÁ CỦA ĐỒNG NGHIỆP TRONG TỔ CHUYÊN MÔN
        </h2>
      </div>

      {!rubricIid || !Array.isArray(peers) || !peers.length ? (
        <div>{t1('there_is_no_data_to_report')}</div>
      ) : (
        <ViewAssessMyPeers rubricToAssessment={rubricIid} peers={peers} />
      )}
    </div>
  );
};

export default fetchData(() => ({
  baseUrl: endpoints.assessmentOfPeersInPhongBan,
  propKey: 'listOfPeersAssignedToAssessGroupByTCNN',
  formatDataResult: ({ rubric_iid, assessment_of_peers } = {}) => {
    if (
      !rubric_iid ||
      !Array.isArray(assessment_of_peers) ||
      !assessment_of_peers.length
    ) {
      return {};
    }
    return {
      rubricIid: rubric_iid,
      peers: assessment_of_peers.map(({ assessment, ...target }) => {
        return {
          rubric_iid,
          ...assessment,
          target,
          final_aggregate_assessment: true,
        };
      }),
    };
  },
  fetchCondition: true,
  refetchCondition: () => false,
}))(ViewAssessmentOfPeersInPhongBan);
