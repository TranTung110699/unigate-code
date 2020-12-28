import React from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';
import AntdTable from 'antd/lib/table';
import Checkbox from 'antd/lib/checkbox';
import fetchData from 'components/common/fetchData';
import Html from 'components/common/html';
import makeReduxFormCompatible from 'components/common/makeReduxFormCompatible';
import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';
import Description from 'schema-form/elements/ant-input/ContentInput';
import Attachments from 'schema-form/elements/attachments';
import endPoints from 'components/temis/assessment/endpoints';

const getPercentWidthToDisplay = (numberColumn) => {
  return Math.floor(100 / numberColumn);
};

const getColumns = ({
  score_scale = {},
  value,
  onChange,
  assessment_name,
  readOnly,
}) => {
  const numberOfParts = score_scale.parts.length;
  const percentWidth = getPercentWidthToDisplay(numberOfParts + 5);

  return [
    {
      title: assessment_name,
      width: `${100 - percentWidth * (2 + numberOfParts)}%`,
      render: ({ isHeader, name, depth, ...row }) => {
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
            // colSpan: isHeader ? numberOfParts + 2 : 1,
          },
        };
      },
    },
    {
      title: score_scale.name,
      key: 'code',
      children: score_scale.parts.map(({ id, name }) => ({
        title: name,
        width: `${percentWidth}%`,
        className: 'text-center',
        render: ({ isHeader, iid, scaled_children, ...row }) => {
          const scaledCell =
            Array.isArray(scaled_children) &&
            scaled_children.find(
              ({ scale_id }) => String(scale_id) === String(id),
            );
          const description =
            get(scaledCell, 'detailed_description') ||
            get(scaledCell, 'description');
          const currentValue =
            (Array.isArray(value) &&
              value.find((val) => String(get(val, 'iid')) === String(iid))) ||
            {};

          return {
            children: [
              <Checkbox
                checked={String(get(currentValue, 'score')) === String(id)}
                onChange={(event) => {
                  if (readOnly) {
                    return;
                  }
                  const checked = get(event, 'target.checked');
                  onChange({
                    iid: iid,
                    score: checked ? id : null,
                  });
                }}
              />,
              description && (
                <span style={{ position: 'absolute', top: 0, right: 0 }}>
                  <Tooltip
                    title={<Html content={description} />}
                    placement="topRight"
                  >
                    <Icon
                      type="question-circle"
                      style={{ color: 'rgba(0,0,0,.45)' }}
                    />
                  </Tooltip>
                </span>
              ),
            ],
            props: {
              // colSpan: isHeader ? 0 : 1,
              className: 'text-center',
              style: {
                position: 'relative',
              },
            },
          };
        },
      })),
    },
    {
      title: t1('document'),
      className: 'text-center',
      width: `${2 * percentWidth}%`,
      render: ({ isHeader, name, iid, ...row }) => {
        const currentValue =
          (Array.isArray(value) &&
            value.find((val) => String(get(val, 'iid')) === String(iid))) ||
          {};

        return {
          children: [
            <div className="temis-assessment-table-document">
              <Description
                multiLine
                rows={1}
                value={get(currentValue, 'description') || ''}
                onChange={(event) => {
                  onChange({
                    iid: iid,
                    description: get(event, 'target.value'),
                  });
                }}
              />
              <Attachments
                noFileManager
                allowDownload
                compactMode
                compactModeButtonIconOnly
                readOnly={readOnly}
                value={get(currentValue, 'attachments') || []}
                onChange={(files) => {
                  onChange({
                    iid: iid,
                    attachments: files,
                  });
                }}
              />
            </div>,
          ],
          props: {
            // colSpan: isHeader ? 0 : 1,
            style: { maxWidth: 150 },
          },
        };
      },
    },
  ];
};

const isNormalInteger = (str) => {
  if (Number.isInteger(str)) {
    return true;
  }
  var n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n >= 0;
};

const handleRowOnChange = ({
  onChange,
  setScore,
  iidsMarking,
  iidsToSetScore,
  values,
  valueOnRow = {},
  maxScoreScale = 0,
  readOnly,
}) => {
  if (typeof onChange !== 'function' || readOnly) {
    return;
  }

  let numberOfQuestion = 0;
  let totalScoreByScoreScale = 0;
  let totalQuestionSetScore = 0;

  onChange(
    iidsMarking
      .map((iid) => {
        const currentValue =
          (Array.isArray(values) &&
            values.find(
              (value) => String(get(value, 'iid')) === String(iid),
            )) ||
          {};
        const newValue = Object.assign(
          {},
          currentValue,
          String(valueOnRow.iid) === String(iid) ? valueOnRow : {},
          { iid: iid },
        );
        if (
          Array.isArray(iidsToSetScore) &&
          iidsToSetScore.includes(String(iid))
        ) {
          totalQuestionSetScore += 1;
          totalScoreByScoreScale += isNormalInteger(newValue.score)
            ? parseInt(newValue.score)
            : 0;
        }

        numberOfQuestion += 1;
        return newValue;
      })
      .filter(Boolean),
  );

  const maxScore = totalQuestionSetScore * maxScoreScale;
  const score =
    maxScore > 0 ? ((100 * totalScoreByScoreScale) / maxScore).toFixed(0) : 0;
  if (typeof setScore === 'function') {
    setScore(score);
  }
};

const getDataToRenderFromDataServer = (rubrics, iids, depth = 0) => {
  let dataSource = [];
  let iidsMarking = [];
  let iidsToSetScore = [];

  if (!Array.isArray(rubrics) || !rubrics.length) {
    return { dataSource, iidsMarking, iidsToSetScore };
  }

  rubrics.forEach(({ children, ...rubric }) => {
    const isHeader = Array.isArray(children) && children.length > 0;
    rubric.isHeader = isHeader;
    rubric.depth = depth;
    if (!isHeader) {
      iidsToSetScore.push(String(rubric.iid));
    }
    iidsMarking.push(rubric.iid);
    const reserve =
      !Array.isArray(iids) || !iids.length || iids.includes(String(rubric.iid));
    const tmp = getDataToRenderFromDataServer(
      children,
      reserve ? null : iids,
      depth + 1,
    );

    if (reserve || tmp.dataSource.length) {
      dataSource.push(rubric);
    }

    iidsMarking = iidsMarking.concat(tmp.iidsMarking);
    iidsToSetScore = iidsToSetScore.concat(tmp.iidsToSetScore);
    dataSource = dataSource.concat(tmp.dataSource);
  });

  return { dataSource, iidsMarking, iidsToSetScore };
};

const MarkingByRubric = ({
  loadingStatus,
  rubrics,
  score_scale,
  value,
  onChange,
  setScore,
  assessment_name,
  readOnly,
  rubricIidsToShowMarking,
}) => {
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

  const {
    dataSource,
    iidsMarking,
    iidsToSetScore,
  } = getDataToRenderFromDataServer(rubrics, rubricIidsToShowMarking, 0);

  return (
    <AntdTable
      className="white-background temis-assessment-table"
      dataSource={dataSource}
      columns={getColumns({
        score_scale,
        value,
        onChange: (valueOnRow) =>
          handleRowOnChange({
            readOnly,
            onChange,
            iidsMarking,
            iidsToSetScore,
            values: value,
            valueOnRow,
            setScore,
            maxScoreScale: Math.max.apply(
              Math,
              score_scale.parts.map(({ id }) => id),
            ),
          }),
        assessment_name,
        readOnly,
      })}
      pagination={false}
      bordered
      size="middle"
    />
  );
};

export default fetchData((props) => ({
  baseUrl: endPoints.dataToAssessment,
  params: {
    rubric_iid: props.rubricIid,
  },
  propKey: 'rubric',
  formatDataResult: ({ rubrics, score_scale, assessment_name } = {}) => {
    return {
      assessment_name,
      rubrics,
      score_scale,
    };
  },
  fetchCondition: true,
  refetchCondition: () => false,
}))(makeReduxFormCompatible({})(MarkingByRubric));
