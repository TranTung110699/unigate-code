import React from 'react';
import AntTable from 'antd/lib/table';
import fetchData from '../../../../common/fetchData';
import { formatDataSourceFromDataServerToRenderTableAssess } from '../../util';
import { t1 } from '../../../../../translate';
import Tooltip from 'antd/lib/tooltip';
import get from 'lodash.get';

const labelAnswer = {
  0: 'CĐ',
  1: 'Đ',
  2: 'Kh',
  3: 'T',
};

class AssessmentInOrg extends React.Component {
  render() {
    const { items, rubrics, score_scale, loadingStatus } = this.props;

    if (loadingStatus !== 'finished') {
      return `${t1('loading')} ...`;
    }
    if (
      !Array.isArray(rubrics) ||
      !rubrics.length ||
      !score_scale ||
      !Array.isArray(score_scale.parts) ||
      !score_scale.parts.length
    ) {
      return <h3>{t1('no_content_to_assessment')}</h3>;
    }

    const parts = score_scale.parts;
    const listHeader = rubrics.filter((item) => !item.isHeader);

    const columns = [
      {
        title: 'STT',
        key: 'stt',
        width: '5%',
        render: (value, item, index) => index + 1,
      },
      {
        title: t1('full_name'),
        key: 'name',
        width: '15%',
        dataIndex: 'name',
      },
      {
        title: (
          <div className="text-center">
            <div>
              <strong>Kết quả đánh giá của tiêu chí</strong>
            </div>
            <em>Chưa đạt (CĐ); Đạt (Đ); Khá (Kh); Tốt (T)</em>
          </div>
        ),
        key: 'score',
        width: '70%',
        className: 'text-center',
        children: (Array.isArray(rubrics) ? rubrics : [])
          .filter(({ isHeader }) => !isHeader)
          .map(({ name, iid }, index) => ({
            title: <Tooltip title={name}>{index + 1}</Tooltip>,
            className: 'text-center',
            render: (row) => {
              const tasks = get(row, 'assessment.task');
              if (!Array.isArray(tasks) || !tasks.length) {
                return '';
              }
              const taskByRubric = tasks.find(
                ({ rubric_iid }) => String(rubric_iid) === String(iid),
              );
              const answer = get(taskByRubric, 'answer') || '__';

              return get(labelAnswer, answer);
            },
          })),
      },
      {
        title: 'Xếp loại',
        className: 'text-center',
        render: ({ assessment }) => {
          const take = get(assessment, 'task');
          const parts = get(assessment, 'score_scale');

          const result = get(assessment, 'result', {});
          if (typeof result.final === 'undefined') {
            return null;
          }

          const part = parts.find(
            ({ id }) => String(id) === String(result.final),
          );
          return get(part, 'name');
        },
      },
    ];

    return (
      <AntTable
        dataSource={Array.isArray(items) ? items : []}
        columns={columns}
        bordered
        className="white-background"
        rowKey="id"
        pagination={false}
      />
    );
  }
}

export default fetchData(({ rubricIid }) => ({
  baseUrl: '/assessment/api/get-data-to-assessment',
  params: {
    rubric_iid: rubricIid,
  },
  propKey: 'rubric',
  formatDataResult: ({ rubrics, score_scale, assessment_name } = {}) => {
    return {
      assessment_name,
      rubrics: formatDataSourceFromDataServerToRenderTableAssess(rubrics),
      score_scale,
    };
  },
  fetchCondition: !!rubricIid,
  refetchCondition: (prevProps) => rubricIid !== prevProps.rubricIid,
}))(AssessmentInOrg);
