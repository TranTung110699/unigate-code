import React from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';
import fetchData from 'components/common/fetchData';
import AntdTable from 'antd/lib/table';
import AntToggle from 'antd/lib/switch';

const getPercentWidthToDisplay = (numberColumn) => {
  return Math.floor(100 / numberColumn);
};

const getColumns = ({
  score_scale = {},
  data,
  assessment_name,
  percentMode,
  setModeViewer,
}) => {
  const numberOfParts = score_scale.parts.length;
  const percentWidth = getPercentWidthToDisplay(numberOfParts + 4);

  return [
    {
      title: (
        <div>
          {assessment_name}
          <div
            title={
              percentMode
                ? t1('display_report_is_number')
                : t1('display_report_as_a_percentage')
            }
          >
            {t1('view_percent')}
            <AntToggle checked={percentMode} onChange={setModeViewer} />
          </div>
        </div>
      ),
      width: `${100 - percentWidth * (2 + numberOfParts)}%`,
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
            colSpan: isHeader ? 2 + numberOfParts : 1,
          },
        };
      },
    },
    {
      title: t1('the_total_has_assessed_by_%s', [score_scale.name]),
      key: 'code',
      children: score_scale.parts.map(({ id, name }) => ({
        title: `${name}${percentMode ? ' (%)' : ''}`,
        width: `${percentWidth}%`,
        className: 'text-center',
        render: ({ isHeader, iid }) => {
          const countByScaleIds = data.find(
            ({ rubric_iid }) => String(rubric_iid) === String(iid),
          );
          const total = get(countByScaleIds, 'total') || 0;
          const countByScaleId = Array.isArray(
            countByScaleIds && countByScaleIds.count_by_scale_id,
          )
            ? countByScaleIds.count_by_scale_id.find(
                ({ score_scale_id }) => String(score_scale_id) === String(id),
              )
            : {};

          let text = '';
          if (total) {
            text = get(countByScaleId, 'count') || 0;
            if (percentMode) {
              text = ((100 * text) / total).toFixed(0);
            }
          }

          return {
            children: text,
            props: {
              colSpan: isHeader ? 0 : 1,
              className: 'text-center',
            },
          };
        },
      })),
    },
    {
      title: t1('the_total_has_assessed'),
      width: `${percentWidth}%`,
      className: 'text-center',
      render: ({ isHeader, iid }) => {
        const countByScaleIds = data.find(
          ({ rubric_iid }) => String(rubric_iid) === String(iid),
        );
        return {
          children: get(countByScaleIds, 'total') || 0,
          props: {
            colSpan: isHeader ? 0 : 1,
            className: 'text-center',
          },
        };
      },
    },
  ];
};

const QuestionOEReport = ({
  loadingStatus,
  dataSource,
  score_scale,
  data,
  assessment_name,
}) => {
  const [percentMode, setModeViewer] = React.useState(false);

  if (loadingStatus !== 'finished') {
    return `${t1('loading')} ...`;
  }

  return [
    // <h2>{t1('the_report_by_%s_of_question', [`"${score_scale.name}"`])}</h2>,
    <AntdTable
      className="white-background temis-assessment-table"
      dataSource={Array.isArray(dataSource) ? dataSource : []}
      columns={getColumns({
        score_scale,
        data,
        assessment_name,
        percentMode,
        setModeViewer,
      })}
      pagination={false}
      bordered
      size="middle"
    />,
  ];
};

const formatDataSourceFromDataServer = (
  rubrics,
  depth = 0,
  rubricIidsToShowMarking = null,
) => {
  if (!Array.isArray(rubrics) || !rubrics.length) {
    return [];
  }

  return rubrics.reduce((result, { children, ...rubric }) => {
    const isHeader = Array.isArray(children) && children.length > 0;
    rubric.isHeader = isHeader;

    const added =
      rubricIidsToShowMarking === null ||
      (Array.isArray(rubricIidsToShowMarking) &&
        rubricIidsToShowMarking.includes(rubric.iid));

    const flatChildren = formatDataSourceFromDataServer(
      children,
      depth + 1,
      added ? null : rubricIidsToShowMarking,
    );

    if (added || flatChildren.length) {
      return result.concat([{ ...rubric, depth }], flatChildren);
    }

    return result.concat([]);
  }, []);
};

export default fetchData((props) => ({
  baseUrl: '/report/data/question-openended-marking-by-rubric',
  params: {
    id: get(props, 'question.id'),
    peer_marking: get(props, 'peerMarking') ? 1 : 0,
    rubric_iid: get(props, 'question.rubric_marking.0.iid'),
    course_iid:
      get(props, 'nodeEditer.ntype') === 'course' &&
      get(props, 'nodeEditer.iid'),
  },
  formatDataResult: ({ rubrics, score_scale, assessment_name, data } = {}) => {
    const dataSource = formatDataSourceFromDataServer(
      rubrics,
      0,
      props.rubricIidsToShowMarking,
    );
    return {
      assessment_name,
      dataSource,
      score_scale,
      data: Array.isArray(data) ? data : [],
    };
  },
  fetchCondition: true,
  refetchCondition: () => false,
}))(QuestionOEReport);
