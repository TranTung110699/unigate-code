import React from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';
import AntdTable from 'antd/lib/table';
import Checkbox from 'antd/lib/checkbox';
import fetchData from 'components/common/fetchData';
import Html from 'components/common/html';
import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';
import Attachments from 'schema-form/elements/attachments';
import Tabs from 'antd/lib/tabs';
import Portal, { portals } from 'components/common/portal';
import PeerAssessment from './PeerAssessment';
import avatar from './avatar.jpg';
import endPoints from 'components/temis/assessment/endpoints';

const getPercentWidthToDisplay = (numberColumn) => {
  return Math.floor(100 / numberColumn);
};

const getColumns = ({ score_scale = {}, value, assessment_name }) => {
  const numberOfParts = score_scale.parts.length;
  const percentWidth = getPercentWidthToDisplay(numberOfParts + 5);

  return [
    {
      title: assessment_name,
      width: `${100 - percentWidth * (2 + numberOfParts)}%`,
      render: ({ isHeader, name, depth }) => {
        return {
          children: (
            <span style={{ display: 'inline-block' }}>
              <p
                style={{
                  fontWeight: isHeader ? 'bold' : '',
                  marginLeft: 40 * depth,
                }}
              >
                {name}
              </p>
            </span>
          ),
          props: {
            // colSpan: isHeader ? numberOfParts + 2 : 1,
          },
        };
      },
    },
  ].concat(
    score_scale.parts.map(({ id, name }) => ({
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
    [
      {
        title: t1('document'),
        className: 'text-center',
        width: `${2 * percentWidth}%`,
        render: ({ isHeader, name, iid, ...row }) => {
          const currentValue =
            (Array.isArray(value) &&
              value.find((val) => String(get(val, 'iid')) === String(iid))) ||
            {};

          const description = get(currentValue, 'description');
          const attachments = get(currentValue, 'attachments');

          return {
            children: [
              <Html content={description} />,
              Array.isArray(attachments) && !!attachments.length && (
                <Attachments
                  noFileManager
                  allowDownload
                  compactMode
                  compactModeButtonIconOnly
                  readOnly
                  value={attachments}
                />
              ),
            ],
            props: {
              // colSpan: isHeader ? 0 : 1,
              style: { maxWidth: 150 },
            },
          };
        },
      },
    ],
  );
};

const filterDataSourseByRubricIidsToShowMarking = (
  rubrics,
  iids,
  depth = 0,
) => {
  if (!Array.isArray(rubrics) || !rubrics.length) {
    return [];
  }

  return rubrics
    .map(({ children, ...rubric }) => {
      rubric.depth = depth;
      const reserve =
        !Array.isArray(iids) ||
        !iids.length ||
        iids.includes(String(rubric.iid));
      const newChildren = filterDataSourseByRubricIidsToShowMarking(
        children,
        reserve ? null : iids,
        depth + 1,
      );

      let isHeader = false;
      if (Array.isArray(newChildren) && newChildren.length > 0) {
        isHeader = true;
        rubric.children = newChildren;
      }

      rubric.isHeader = isHeader;

      if (reserve || isHeader) {
        return rubric;
      }

      return false;
    })
    .filter(Boolean);
};

const tableViewerResultMaked = ({
  dataSource,
  score_scale,
  value,
  assessment_name,
  user,
}) => {
  return (
    <AntdTable
      className="white-background"
      dataSource={dataSource}
      columns={getColumns({
        score_scale,
        value,
        assessment_name,
        user,
      })}
      indentSize={0}
      pagination={false}
      bordered
      size="middle"
    />
  );
};

const style = { minHeight: 100 };

const MarkingByRubric = ({
  loadingStatus,
  rubrics,
  score_scale,
  resultMarked,
  assessment_name,
  rubricIidsToShowMarking,
  question,
  courseIid,
  takeId,
}) => {
  if (loadingStatus !== 'finished') {
    return null;
  }

  if (
    !Array.isArray(rubrics) ||
    !rubrics.length ||
    !score_scale ||
    !Array.isArray(score_scale.parts) ||
    !score_scale.parts.length
  ) {
    return null;
  }

  const dataSource = filterDataSourseByRubricIidsToShowMarking(
    rubrics,
    rubricIidsToShowMarking,
  );

  if (!Array.isArray(dataSource) || !dataSource.length) {
    return null;
  }

  return (
    <Portal id={portals.MARKING_ASSESSMENT_RESULT}>
      <div className="p-10">
        <Tabs defaultActiveKey="teacher">
          <Tabs.TabPane
            tab={
              <span>
                <Icon type="edit" /> {t1('teacher_assessment')}
              </span>
            }
            key="teacher"
          >
            <div style={style}>
              {!!get(resultMarked, 'score_by_rubric.detail') ? (
                <div className="container-fluid" style={style}>
                  <div className="row">
                    <div className="col-md-11">
                      {tableViewerResultMaked({
                        dataSource,
                        score_scale,
                        value: get(resultMarked, 'score_by_rubric.detail'),
                        assessment_name,
                      })}
                    </div>
                    <div className="col-md-1">
                      <h2>{get(resultMarked, 'score')}</h2>
                      <img src={avatar} />
                    </div>
                  </div>
                </div>
              ) : (
                <div>{t1('no_markings')}</div>
              )}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <Icon type="usergroup-add" /> {t1('peer_assessment')}
              </span>
            }
            key="peer"
          >
            <PeerAssessment
              questionId={get(question, 'iid')}
              question={question}
              courseIid={courseIid}
              takeId={takeId}
              rubricIidsToShowMarking={rubricIidsToShowMarking}
              viewDetailMarked={(value) =>
                tableViewerResultMaked({
                  dataSource,
                  score_scale,
                  value,
                  assessment_name,
                })
              }
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Portal>
  );
};

export default fetchData((props) => {
  return {
    baseUrl: endPoints.dataToAssessment,
    params: {
      rubric_iid: get(props, 'question.rubric_marking.0.iid'),
    },
    propKey: 'rubric',
    formatDataResult: ({ rubrics, score_scale, assessment_name } = {}) => {
      return {
        assessment_name,
        rubrics,
        score_scale,
      };
    },
    fetchCondition: !!get(props, 'question.rubric_marking.0.iid'),
    refetchCondition: () => false,
  };
})(MarkingByRubric);
