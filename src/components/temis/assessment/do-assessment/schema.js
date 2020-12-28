import get from 'lodash.get';
import TableForm from './TableForm';
import { getOverallResultsOfTheAssessment, getTypeOfTCNN } from '../util';
import overallCommentSchema from './overallCommentSchema';
import personalOrientationSchema from './personalOrientationSchema';
import LayoutFreeStyle from './FormLayoutFreeStyle';

const schema = (
  formid,
  values,
  localStep,
  xpath,
  {
    mySelfAssessment,
    peersAssessment,
    peerAssess,
    chartOnly,
    compactMode,
    readOnly,
    tcnnType,
    assessment_name,
    dataSource,
    score_scale,
  },
) => ({
  task: {
    readOnly,
    chartOnly,
    peerAssess,
    compactMode,
    tcnnType,
    assessment_name,
    dataSource,
    score_scale,
    peersAssessment,
    mySelfAssessment,
    type: TableForm,
    fullWidth: true,
    rubricIid: get(values, 'rubric_iid'),
  },
  overall_comment: {
    type: 'section',
    schema: overallCommentSchema,
  },
  personal_orientation: {
    type: 'section',
    schema: personalOrientationSchema,
  },
});

const ui = (step, values, themeConfig, xpath, formid, { tcnnType }) => {
  const peerIid = get(values, 'peer_iid');
  const finalAggregateAssessment = get(values, 'final_aggregate_assessment');
  return [
    {
      id: 'default',
      fields: [
        'task',
        !finalAggregateAssessment && 'overall_comment',
        !peerIid &&
          !finalAggregateAssessment &&
          tcnnType === 'tcnn_gv' &&
          'personal_orientation',
      ].filter(Boolean),
    },
  ];
};

const finalProcessBeforeSubmit = (fullData, node) => {
  const result = getOverallResultsOfTheAssessment(
    get(fullData, 'task'),
    getTypeOfTCNN(get(fullData, 'rubric_iid')),
  );

  if (typeof result.final !== 'undefined') {
    fullData.result = result;
  }
  return fullData;
};

const layout = (
  step,
  values,
  xpath,
  { tcnnType, assessment_name, dataSource, score_scale, mySelfAssessment } = {},
) => {
  return {
    component: LayoutFreeStyle,
    freestyle: 1,
    optionsProperties: {
      finalAggregateAssessment: get(values, 'final_aggregate_assessment'),
      mySelfAssessment,
      tcnnType,
      assessment_name,
      dataSource,
      score_scale,
    },
  };
};

export default (node) => ({
  schema,
  ui,
  layout,
  finalProcessBeforeSubmit: (fullData) =>
    finalProcessBeforeSubmit(fullData, node),
});
