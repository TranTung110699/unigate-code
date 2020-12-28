import React from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';
import withTemisConfig from 'common/hoc/withTemisConfig';
import fetchData from 'components/common/fetchData';
import HorizontalScrolling from 'components/common/html/horizontal-scrolling';
import AntdTable from 'antd/lib/table';
import endPoints from '../endpoints';

const getColumns = ({
  assessment_name,
  score_scale,
  assessments,
  selfAssess,
}) => {
  const parts = get(score_scale, 'parts');
  let labelScoreById = null;
  if (Array.isArray(parts) && parts.length) {
    labelScoreById = {};
    parts.forEach(({ id, name }) => {
      labelScoreById[id] = name;
    });
  }

  const numberOfAssess = Array.isArray(assessments) ? assessments.length : 0;

  return [
    {
      title: assessment_name,
      render: ({ isHeader, name, depth }) => {
        return {
          children: (
            <p
              style={{
                fontWeight: isHeader ? 'bold' : '',
                marginLeft: 20 * depth,
              }}
            >
              {name}
            </p>
          ),
          props: {
            colSpan: isHeader ? 1 + (numberOfAssess || 1) : 1,
          },
        };
      },
    },
    {
      title: t1('results_assessment_about_myself'),
      className: 'text-center',
      children:
        numberOfAssess > 0
          ? assessments.map(
              ({
                peer_iid,
                target: { iid, name },
                peer,
                task,
                result,
                score_scale,
              }) => {
                if (!iid) {
                  return false;
                }

                const final = String(get(result, 'final'));
                const scaleOfFinal =
                  Array.isArray(score_scale) &&
                  score_scale.find(({ id }) => String(id) == final);

                const tasks = Array.isArray(task) ? task : [];
                return {
                  title: [
                    peer_iid ? (
                      get(peer, 'name')
                    ) : (
                      <span style={{ fontWeight: 'bold' }}>
                        {t1('self_assess')}
                      </span>
                    ),
                    <br />,
                    get(scaleOfFinal, 'name') !== undefined &&
                      `(${get(scaleOfFinal, 'name')})`,
                  ],
                  className: 'text-center',
                  render: ({ isHeader, iid }) => {
                    const answerByRubric = tasks.find(
                      ({ rubric_iid }) => String(rubric_iid) == String(iid),
                    );

                    return {
                      children: get(
                        labelScoreById,
                        get(answerByRubric, 'answer'),
                      ),
                      props: {
                        colSpan: isHeader ? 0 : 1,
                      },
                    };
                  },
                };
              },
            )
          : null,
    },
  ].filter(Boolean);
};

const ResultAssess = ({
  selfAssess,
  assessOfPeers = [],
  dataSource,
  labelScoreById,
  assessment_name,
  score_scale,
}) => {
  if (!Array.isArray(dataSource) || !dataSource.length) {
    return <div>{t1('there_are_no_rubric_to_assess')}</div>;
  }

  const assessments = [selfAssess]
    .concat(Array.isArray(assessOfPeers) ? assessOfPeers : [])
    .filter(({ updated_ts }) => !!updated_ts);

  return (
    <HorizontalScrolling>
      <AntdTable
        columns={getColumns({
          assessment_name,
          score_scale,
          assessments,
          selfAssess,
        })}
        dataSource={assessments.length ? dataSource : []}
        pagination={false}
        bordered
        size="middle"
      />
    </HorizontalScrolling>
  );
};

export default fetchData((props) => {
  const assessments = get(props, 'assessments');

  return {
    baseUrl: endPoints.assessOfPeers,
    params: {
      rubric_iid: props.rubricToAssessment,
    },
    propKey: 'assessOfPeers',
    fetchCondition: true,
    refetchCondition: () => false,
  };
})(withTemisConfig(ResultAssess));
