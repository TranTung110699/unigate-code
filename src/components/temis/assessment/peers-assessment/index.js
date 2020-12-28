import React from 'react';
import get from 'lodash.get';
import Widget from 'components/common/Widget';
import { t1 } from 'translate';
import endpoints from '../endpoints';
import withTemisConfig from 'common/hoc/withTemisConfig';
import ViewAssessMyPeers from './ViewAssessMyPeers';
import fetchData from 'components/common/fetchData';
import Loading from 'components/common/loading';

import { getTypeOfTCNN } from '../util';

const getTitleWidgetByRubricToAssessment = (iid) => {
  const tcnn = getTypeOfTCNN(iid);

  return t1(`list_of_peers_belong_to_${tcnn}_assigned_to_assess`);
};

const AssessMyPeers = ({
  listOfPeersAssignedToAssessGroupByTCNN,
  loadingStatus,
  handleRefetch,
}) => {
  if (loadingStatus !== 'finished') {
    return <Loading />;
  }

  if (
    !Array.isArray(listOfPeersAssignedToAssessGroupByTCNN) ||
    !listOfPeersAssignedToAssessGroupByTCNN.length
  ) {
    return <div>{t1('there_are_not_assigned_to_assessment_of_peers ')}</div>;
  }

  return (
    <div className="container-fluid">
      <div className="col-md-12">
        {listOfPeersAssignedToAssessGroupByTCNN.map(({ id, targets }) => {
          return (
            <Widget title={getTitleWidgetByRubricToAssessment(id)}>
              <ViewAssessMyPeers
                rubricToAssessment={id}
                peers={targets}
                handleRefetchListOfPeersAssignedToAssess={handleRefetch}
              />
            </Widget>
          );
        })}
      </div>
    </div>
  );
};

export default fetchData((props) => ({
  baseUrl: endpoints.listOfPeersAssignedToAssess,
  propKey: 'listOfPeersAssignedToAssessGroupByTCNN',
  fetchCondition: true,
  refetchCondition: () => false,
}))(withTemisConfig(AssessMyPeers));
