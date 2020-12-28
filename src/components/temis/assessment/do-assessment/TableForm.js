import React from 'react';
import get from 'lodash.get';
import { t1 } from 'translate/index';
import AntdTable from 'antd/lib/table';
import Checkbox from 'antd/lib/checkbox';
import fetchData from 'components/common/fetchData';
import Html from 'components/common/html/index';
import Widget from 'components/common/Widget';
import { ListAttachmentsToDownloadAsTable } from 'components/common/attachment/DownloadAttachments';
import DetailOnDialog from 'components/common/detail-on-dialog';
import makeReduxFormCompatible from 'components/common/makeReduxFormCompatible';
import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';
import { radarChartResultsAssess } from '../util';
import './style.scss';
import AntdSelectField from 'schema-form/elements/select/AntdSelectField';
import apiUrls from 'components/temis/endpoints';
import NewEvidence from './new-evidence';
import { pushToSet } from 'common/utils/Array';

const canEvidenceAppliedToAnswer = (evidence, answer) => {
  const tieuChiIid = get(answer, 'rubric_iid');

  return (get(evidence, 'attach_to_assessments') || []).some((cond) => {
    return get(cond, 'tieu_chi_iid') == tieuChiIid;
  });
};

const getPercentWidthToDisplay = (numberColumn) => {
  return Math.floor(100 / numberColumn);
};

const getColumns = ({
  score_scale = {},
  value,
  onChange,
  assessment_name,
  readOnly,
  peerAssess = false,
  peersAssessment = null,
  mySelfAssessment = null,
  assessmentEvidences = [],
  refetchAssessmentEvidenceOptions,
}) => {
  const numberOfParts =
    score_scale.parts.length +
    (mySelfAssessment ? 2 : 0) +
    (Array.isArray(peersAssessment) ? peersAssessment.length : 0);
  const percentWidth = getPercentWidthToDisplay(
    numberOfParts + (peerAssess ? 3 : 5),
  );

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
            colSpan: isHeader ? 2 + numberOfParts : 1,
          },
        };
      },
    },
  ].concat(
    mySelfAssessment
      ? [
          {
            title: `"${get(mySelfAssessment, 'peer.name')}" tự đánh giá`,
            children: [
              {
                title: 'Kết quả đánh giá',
                width: `${percentWidth}%`,
                className: 'text-center',
                render: ({ isHeader, iid }) => {
                  const answerByRubric = get(mySelfAssessment, 'task', []).find(
                    (as) => String(iid) === String(as && as.rubric_iid),
                  );
                  let part = {};
                  if (
                    answerByRubric &&
                    typeof answerByRubric.answer !== 'undefined'
                  ) {
                    part = score_scale.parts.find(
                      ({ id }) => String(id) === String(answerByRubric.answer),
                    );
                  }
                  return {
                    children: get(part, 'name'),
                    props: {
                      colSpan: isHeader ? 0 : 1,
                      style: { maxWidth: 150 },
                    },
                  };
                },
              },
              {
                title: 'Minh chứng',
                render: ({ isHeader, iid, scaled_children, ...row }) => {
                  const answerByRubric = get(mySelfAssessment, 'task', []).find(
                    (as) => String(iid) === String(as && as.rubric_iid),
                  );

                  if (
                    !answerByRubric ||
                    !Array.isArray(answerByRubric.evidence_iids) ||
                    !answerByRubric.evidence_iids.length ||
                    !Array.isArray(assessmentEvidences) ||
                    !assessmentEvidences.length
                  ) {
                    return {
                      children: '',
                      props: {
                        colSpan: isHeader ? 0 : 1,
                        style: { minWidth: 150 },
                      },
                    };
                  }

                  const evidenceIids = answerByRubric.evidence_iids.map(
                    (edIid) => String(edIid),
                  );
                  const evidenceSelected = assessmentEvidences.filter((ed) =>
                    evidenceIids.includes(String(ed.iid)),
                  );

                  return {
                    children: (
                      <ul>
                        {evidenceSelected.map(({ content, name }) => {
                          if (
                            !content.text &&
                            Array.isArray(content.attachments) &&
                            !content.attachments.length
                          ) {
                            return null;
                          }

                          return (
                            <DetailOnDialog
                              dialogKey="view_evidence"
                              renderPreview={({ showFull }) => {
                                return (
                                  <li
                                    style={{ cursor: 'pointer' }}
                                    onClick={showFull}
                                    title={t1('view_detail')}
                                  >
                                    {name}
                                  </li>
                                );
                              }}
                              renderFull={({ closeDialog }) => (
                                <div>
                                  {content.text && (
                                    <Widget title={t1('text_evidence')}>
                                      <Html content={content.text} />
                                    </Widget>
                                  )}
                                  {Array.isArray(content.attachments) &&
                                    !!content.attachments.length && (
                                      <Widget title={t1('files_evidence')}>
                                        <ListAttachmentsToDownloadAsTable
                                          attachments={content.attachments}
                                        />
                                      </Widget>
                                    )}
                                </div>
                              )}
                            />
                          );
                        })}
                      </ul>
                    ),
                    props: {
                      colSpan: isHeader ? 0 : 1,
                      style: { minWidth: 150 },
                    },
                  };
                },
              },
            ],
          },
        ]
      : [],
    Array.isArray(peersAssessment) && !!peersAssessment.length
      ? [
          {
            title: 'Kết quả đánh giá của đồng nghiệp',
            children: peersAssessment.map(
              ({ peer, target, ...peerAssessment }) => {
                return {
                  title: get(peer, 'name'),
                  width: `${percentWidth}%`,
                  className: 'text-center',
                  render: ({ isHeader, iid }) => {
                    const answerByRubric = get(peerAssessment, 'task', []).find(
                      (as) => String(iid) === String(as && as.rubric_iid),
                    );
                    let part = {};
                    if (
                      answerByRubric &&
                      typeof answerByRubric.answer !== 'undefined'
                    ) {
                      part = score_scale.parts.find(
                        ({ id }) =>
                          String(id) === String(answerByRubric.answer),
                      );
                    }
                    return {
                      children: get(part, 'name'),
                      props: {
                        colSpan: isHeader ? 0 : 1,
                        style: { maxWidth: 150 },
                      },
                    };
                  },
                };
              },
            ),
          },
        ]
      : [],
    [
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
                value.find(
                  (val) => String(get(val, 'rubric_iid')) === String(iid),
                )) ||
              {};

            return {
              children: [
                <Checkbox
                  checked={String(get(currentValue, 'answer')) === String(id)}
                  onChange={(event) => {
                    if (readOnly) {
                      return;
                    }
                    const checked = get(event, 'target.checked');
                    onChange({
                      rubric_iid: iid,
                      answer: checked ? id : null,
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
                colSpan: isHeader ? 0 : 1,
                className: 'text-center',
                style: {
                  position: 'relative',
                },
              },
            };
          },
        })),
      },
      !peerAssess && {
        title: 'Minh chứng',
        className: 'text-center',
        width: `${2 * percentWidth}%`,
        render: ({ isHeader, name, iid, ancestor_iids }) => {
          const currentValue =
            (Array.isArray(value) &&
              value.find(
                (val) => String(get(val, 'rubric_iid')) === String(iid),
              )) ||
            {};

          const currentEvidenceIids = get(currentValue, 'evidence_iids');

          const assessmentEvidenceOptions = (assessmentEvidences || [])
            .filter((evidence) =>
              canEvidenceAppliedToAnswer(evidence, currentValue),
            )
            .map((e) => ({
              value: get(e, 'iid'),
              label: get(e, 'name'),
            }));

          return {
            children: [
              <div style={{ display: 'flex' }}>
                <div style={{ flexGrow: 1 }}>
                  <AntdSelectField
                    className="temis-assessment-table__evidence"
                    options={assessmentEvidenceOptions}
                    value={get(currentValue, 'evidence_iids')}
                    multiple
                    onChange={(evidenceIids) => {
                      onChange({
                        rubric_iid: iid,
                        evidence_iids: evidenceIids,
                      });
                    }}
                  />
                </div>
                <div style={{ padding: '10px 10px 0 10px' }}>
                  <NewEvidence
                    tieuChiIid={iid}
                    tieuChuanIid={get(ancestor_iids, 0)}
                    assessmentRubricIid={get(ancestor_iids, 1)}
                    onNewEvidence={(evidence) => {
                      onChange({
                        rubric_iid: iid,
                        evidence_iids: pushToSet(
                          currentEvidenceIids,
                          get(evidence, 'iid'),
                        ),
                      });
                      if (
                        typeof refetchAssessmentEvidenceOptions === 'function'
                      ) {
                        refetchAssessmentEvidenceOptions();
                      }
                    }}
                  />
                </div>
              </div>,
            ],
            props: {
              colSpan: isHeader ? 0 : 1,
              style: { maxWidth: 150 },
            },
          };
        },
      },
    ].filter(Boolean),
  );
};

const getColumnsCompactMode = ({
  score_scale = {},
  value,
  assessment_name,
}) => {
  return [
    {
      title: assessment_name,
      width: '70%',
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
            colSpan: isHeader ? 2 : 1,
          },
        };
      },
    },
    {
      title: t1('result'),
      key: 'result',
      width: '30%',
      className: 'text-center',
      render: ({ isHeader, iid }) => {
        const parts = score_scale.parts;
        const currentAnswer =
          (Array.isArray(value) &&
            value.find(
              (val) => String(get(val, 'rubric_iid')) === String(iid),
            )) ||
          {};

        const currentPart =
          Array.isArray(parts) &&
          parts.find(
            (part) =>
              String(get(part, 'input_value')) === String(currentAnswer.answer),
          );

        return {
          children: [<strong>{get(currentPart, 'name', null)}</strong>],
          props: {
            colSpan: isHeader ? 0 : 1,
          },
        };
      },
    },
  ];
};

const handleRowOnChange = (onChange, dataSource, values, valueChanged = {}) => {
  if (typeof onChange !== 'function') {
    return;
  }

  onChange(
    dataSource
      .map(({ isHeader, iid }) => {
        if (isHeader) {
          return false;
        }

        const currentValue =
          (Array.isArray(values) &&
            values.find(
              (value) => String(get(value, 'rubric_iid')) === String(iid),
            )) ||
          {};
        const newValue =
          String(valueChanged.rubric_iid) === String(iid) ? valueChanged : {};

        return Object.assign({}, currentValue, newValue, { rubric_iid: iid });
      })
      .filter(Boolean),
  );
};

const TableDoTask = ({
  dataSource,
  score_scale,
  value,
  onChange,
  assessment_name,
  readOnly,
  compactMode,
  chartOnly,
  peerAssess = false,
  assessmentEvidences,
  tcnnType,
  peersAssessment,
  mySelfAssessment,
  refetchAssessmentEvidenceOptions,
}) => {
  if (chartOnly) {
    return Array.isArray(value) && value.length ? (
      radarChartResultsAssess(dataSource, value, score_scale, tcnnType)
    ) : (
      <h3>{t1('no_content_to_assessment')}</h3>
    );
  }

  return (
    <AntdTable
      className="white-background temis-assessment-table"
      dataSource={Array.isArray(dataSource) ? dataSource : []}
      columns={
        compactMode
          ? getColumnsCompactMode({
              score_scale,
              value,
              assessment_name,
              readOnly,
            })
          : getColumns({
              score_scale,
              value,
              onChange: (newValue) =>
                handleRowOnChange(onChange, dataSource, value, newValue),
              assessment_name,
              readOnly,
              peerAssess,
              peersAssessment,
              mySelfAssessment,
              assessmentEvidences,
              refetchAssessmentEvidenceOptions,
            })
      }
      pagination={false}
      bordered
      size="middle"
    />
  );
};

const fetchAssessmentEvidenceOptions = fetchData((props) => {
  const evidenceIids = get(props, 'mySelfAssessment.task', []).reduce(
    (result, { evidence_iids }) =>
      result.concat(Array.isArray(evidence_iids) ? evidence_iids : []),
    [],
  );
  return {
    baseUrl: apiUrls.get_evidences_to_do_assessment,
    loadingStatusPropKey: 'loadingAssessmentEvidencesStatus',
    params: {
      evidence_iids: evidenceIids,
    },
    fetchCondition: !props.peerAssess || !!evidenceIids.length,
    refetchCondition: () => false,
    propKey: 'assessmentEvidences',
    fetchFunctionPropKey: 'refetchAssessmentEvidenceOptions',
  };
});

export default fetchAssessmentEvidenceOptions(
  makeReduxFormCompatible({})(TableDoTask),
);
