import React from 'react';
import get from 'lodash.get';
import Icon from 'components/common/Icon';
import DetailOnDialog from 'components/common/detail-on-dialog';
import DoAssessment from 'components/temis/assessment/do-assessment';
import { getTemisConfByUser } from 'common/hoc/withTemisConfig';
import { t1 } from 'translate';
import {
  timestampToDateString,
  timestampToDateTimeString,
} from 'common/utils/Date';

const getExtraPropsToRenderColumnsOfAsseesments = (assessments) => {
  let mySelfAssessment = null;
  let peersAssessment = [];
  if (!Array.isArray(assessments) || !assessments.length) {
    return { mySelfAssessment, peersAssessment };
  }

  assessments.forEach((assessment) => {
    if (assessment.final_aggregate_assessment) {
      return;
    } else if (
      String(get(assessment, 'peer.iid')) ===
      String(get(assessment, 'target.iid'))
    ) {
      mySelfAssessment = assessment;
      return;
    } else if (!get(assessment, 'peer') || !get(assessment, 'target')) {
      return;
    }
    peersAssessment.push(assessment);
  });

  return { mySelfAssessment, peersAssessment };
};

const elementEditFinalAggregateAssessment = ({
  user,
  searchFormId,
  assessmentOfPeersAssignedToAssess,
  assessment = {},
}) => {
  if (assessment && !assessment.final_aggregate_assessment) {
    assessment.overall_comment = '';
  }

  const { rubricToAssessment, ...temisConfByUser } = getTemisConfByUser(user);

  const hiddenFields = {
    target: {
      iid: user && user.iid,
      ntype: 'user',
    },
    rubric_iid: rubricToAssessment,
    peer_assess: 1,
    final_aggregate_assessment: 1,
  };

  return (
    <DetailOnDialog
      dialogOptionsProperties={{
        width: '90%',
        title: `Đánh giá TCNN "${get(user, 'name')}"`,
      }}
      renderFull={({ closeDialog }) => {
        return (
          <DoAssessment
            {...getExtraPropsToRenderColumnsOfAsseesments(
              assessmentOfPeersAssignedToAssess,
            )}
            hiddenFields={hiddenFields}
            peerAssess
            userIid={user && user.iid}
            requestSuccessful={closeDialog}
            searchFormId={searchFormId}
            rubricIid={rubricToAssessment}
            node={assessment}
          />
        );
      }}
      renderPreview={({ showFull }) => (
        <Icon className="action m-r-10" icon="edit" onClick={showFull} />
      )}
      dialogKey="edit-final-aggregate-assessment"
    />
  );
};

const FinalAggregateAssessment = ({
  user,
  searchFormId,
  assessmentOfPeersAssignedToAssess,
}) => {
  const assessment = Array.isArray(assessmentOfPeersAssignedToAssess)
    ? assessmentOfPeersAssignedToAssess.find(
        ({ final_aggregate_assessment }) => final_aggregate_assessment,
      )
    : null;

  const editFinal = elementEditFinalAggregateAssessment({
    user,
    searchFormId,
    assessmentOfPeersAssignedToAssess,
    assessment,
  });

  if (!assessment || !assessment.final_aggregate_assessment) {
    return <ul>{editFinal}</ul>;
  }

  const scale = get(assessment, 'score_scale', []).find(
    ({ id }) => String(id) === String(get(assessment, 'result.final')),
  );

  return (
    <ul>
      <li>
        {`${t1('graded_assessment')}: ${get(scale, 'name')}`}&ensp;{editFinal}
      </li>
      <li>
        {t1('last_updated')}: &ensp;
        <Icon type="clock-circle" antIcon />{' '}
        {timestampToDateTimeString(get(assessment, 'updated_ts'))}
      </li>
    </ul>
  );
};

export default FinalAggregateAssessment;
