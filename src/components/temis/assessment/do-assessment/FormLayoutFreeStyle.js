import React from 'react';
import get from 'lodash.get';
import Widget from 'components/common/Widget';
import { radarChartResultsAssess } from '../util';

const LayoutFreeStyle = (props) => {
  const submitButton = get(props, 'submitButton');

  const fieldNames = get(props, 'groups.default.fieldNames', {});
  const task = get(props, 'formValues.task', []);
  const { tcnnType, dataSource, score_scale, finalAggregateAssessment } = get(
    props,
    'layoutOptionsProperties',
    {},
  );

  return (
    <div>
      <Widget title="Đánh giá TCNN" className="m-t-20">
        {fieldNames.task}
      </Widget>
      {!!fieldNames.overall_comment && (
        <Widget title="Nhận xét (ghi rõ)">
          <div className="row">{fieldNames.overall_comment}</div>
        </Widget>
      )}
      {!!fieldNames.personal_orientation && (
        <Widget title="Kế hoạch học tập, bồi dưỡng phát triển năng lực nghề nghiệp trong năm tiếp theo">
          <div className="row">{fieldNames.personal_orientation}</div>
        </Widget>
      )}
      {!!finalAggregateAssessment &&
        (() => {
          console.log(
            '-------',
            score_scale,
            get(props, 'layoutOptionsProperties.mySelfAssessment'),
          );
          const scoreFinal = get(
            props,
            'layoutOptionsProperties.mySelfAssessment.result.final',
          );
          const scaleFinal = get(score_scale, 'parts', []).find(
            ({ id }) => String(id) === String(scoreFinal),
          );
          return (
            <Widget
              title="Ý kiến tự nhận xét và đánh giá"
              className="m-t-20"
              noMinHeight
            >
              <ul>
                <li>{`Điểm mạnh: ${get(
                  props,
                  'layoutOptionsProperties.mySelfAssessment.overall_comment.strengths',
                )}`}</li>
                <li>{`Những vấn đề cần cải thiện: ${get(
                  props,
                  'layoutOptionsProperties.mySelfAssessment.overall_comment.weakness',
                )}`}</li>
                <li>{`Xếp loại kết quả đánh giá: ${get(
                  scaleFinal,
                  'name',
                )}`}</li>
              </ul>
            </Widget>
          );
        })()}

      {submitButton && (
        <div>
          <div className="col-md-6">
            {radarChartResultsAssess(dataSource, task, score_scale, tcnnType)}
          </div>
          <div className="col-md-6 m-t-100 text-center">{submitButton}</div>
        </div>
      )}
    </div>
  );
};

export default LayoutFreeStyle;
