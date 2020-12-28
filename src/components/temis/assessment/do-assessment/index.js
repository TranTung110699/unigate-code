import React from 'react';
import get from 'lodash.get';
import fetchData from 'components/common/fetchData';
import { t1 } from 'translate/index';
import NodeNew from 'components/admin/node/new/index';
import RaisedButton from 'components/common/mui/RaisedButton';
import schema from './schema';
import endPoints from '../endpoints';
import {
  formatDataSourceFromDataServerToRenderTableAssess,
  getTypeOfTCNN,
} from '../util';

const Form = ({
  hiddenFields,
  node,
  searchFormId,
  readOnly,
  peerAssess = false,
  requestSuccessful = () => {},
  compactMode,
  chartOnly,
  dialogKey,
  tcnnType,
  assessment_name,
  dataSource,
  score_scale,
  mySelfAssessment,
  peersAssessment,
  loadingStatus,
}) => {
  if (loadingStatus !== 'finished') {
    return <div>{t1('loading')}...</div>;
  }

  if (
    !Array.isArray(dataSource) ||
    !dataSource.length ||
    !score_scale ||
    !Array.isArray(score_scale.parts) ||
    !score_scale.parts.length
  ) {
    return <h3>{t1('no_content_to_assessment')}</h3>;
  }

  return (
    <NodeNew
      tcnnType={tcnnType}
      assessment_name={assessment_name}
      dataSource={dataSource}
      score_scale={score_scale}
      mySelfAssessment={mySelfAssessment}
      peersAssessment={peersAssessment}
      peerAssess={peerAssess}
      schema={schema(node)}
      node={node}
      readOnly={readOnly}
      searchFormId={searchFormId}
      hiddenFields={hiddenFields}
      alternativeApi="/assessment/api/do-assessment"
      formid="do-evaluation-criteria"
      requestSuccessful={requestSuccessful}
      submitButton={(formValues) => {
        const task = get(formValues, 'task');

        if (
          readOnly ||
          !task ||
          !Array.isArray(task) ||
          !task.length ||
          compactMode ||
          chartOnly
        ) {
          return null;
        }

        const enabled = task.find(
          ({ answer }) => typeof answer !== 'undefined' && answer !== '',
        );

        return (
          <RaisedButton
            name="submit"
            type="submit"
            className="m-20"
            disabled={!enabled}
            label={t1('send_assessment')}
            primary
          />
        );
      }}
      closeModal={!!dialogKey}
      dialogKey={dialogKey}
      compactMode={compactMode}
      chartOnly={chartOnly}
    />
  );
};

const fetchAssessmentData = fetchData((props) => {
  const rubricIid =
    get(props, 'hiddenFields.rubric_iid') || get(props, 'rubricIid');
  return {
    baseUrl: endPoints.dataToAssessment,
    params: {
      rubric_iid: rubricIid,
    },
    propKey: 'rubric',
    formatDataResult: ({ rubrics, score_scale, assessment_name } = {}) => {
      const dataSource = formatDataSourceFromDataServerToRenderTableAssess(
        rubrics,
        rubricIid,
      );

      return {
        tcnnType: getTypeOfTCNN(rubricIid),
        assessment_name,
        dataSource,
        score_scale,
      };
    },
    fetchCondition: true,
    refetchCondition: () => false,
  };
});

export default fetchAssessmentData(Form);
