import React from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';
import fetchData from 'components/common/fetchData';
import Loading from 'components/common/loading';
import HorizontalScrolling from 'components/common/html/horizontal-scrolling';
import AntdTable from 'antd/lib/table';
import endPoints from '../endpoints';
import { formatDataSourceFromDataServerToRenderTableAssess } from '../util';
import Icon from '../../../common/Icon';
import Form from '../edit/Form';
import DetailOnDialog from '../../../common/detail-on-dialog';
import Warning from '../../../common/Warning';

const dialogKey = 'assessment';

const getColumns = ({
  assessment_name,
  labelScoreById,
  peers,
  rubricToAssessment,
  handleRefetchListOfPeersAssignedToAssess = () => {},
}) => {
  const numberOfPeers = Array.isArray(peers) ? peers.length : 0;

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
            colSpan: isHeader ? 1 + (numberOfPeers || 1) : 1,
          },
        };
      },
    },
    {
      title: t1('result_result_peers_assessment'),
      className: 'text-center',
      children:
        numberOfPeers > 0
          ? peers.map(
              ({ target, final_aggregate_assessment, ...assessment }) => {
                const scoreScale = get(assessment, 'score_scale');
                let tasks = get(assessment, 'task');
                tasks = Array.isArray(tasks) ? tasks : [];

                return {
                  title: (
                    <div>
                      {target.name} <br />(
                      {(() => {
                        if (
                          !tasks.length ||
                          !Array.isArray(scoreScale) ||
                          !scoreScale.length
                        ) {
                          return (
                            <Warning style={{ color: '#D6C013' }} inline>
                              {t1('not_yet_assess')}
                            </Warning>
                          );
                        }

                        const final = String(get(assessment, 'result.final'));
                        const scaleOfFinal = scoreScale.find(
                          ({ id }) => String(id) == final,
                        );

                        return get(scaleOfFinal, 'name');
                      })()}
                      {!final_aggregate_assessment && [
                        <span>&ensp;</span>,
                        <DetailOnDialog
                          renderPreview={({ showFull }) => (
                            <Icon
                              icon="edit"
                              className="action"
                              onClick={showFull}
                              style={{ fontSize: 15 }}
                              title={t1('assessment')}
                            />
                          )}
                          renderFull={({ closeDialog }) => (
                            <Form
                              peerAssess
                              hiddenFields={{
                                target: {
                                  iid: target.iid,
                                  ntype: 'user',
                                },
                                rubric_iid: rubricToAssessment,
                                peer_assess: 1,
                              }}
                              userIid={target.iid}
                              node={assessment}
                              rubricIid={rubricToAssessment}
                              requestSuccessful={() => {
                                handleRefetchListOfPeersAssignedToAssess();
                                closeDialog();
                              }}
                              dialogKey={dialogKey}
                            />
                          )}
                          dialogKey={dialogKey}
                          dialogOptionsProperties={{
                            autoDetectWindowHeight: false,
                            handleClose: true,
                            top: '25px',
                            width: '80%',
                          }}
                        />,
                      ]}
                      )
                    </div>
                  ),
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

const ViewAssessMyPeers = ({
  peers,
  dataSource,
  labelScoreById,
  assessment_name,
  loadingStatus,
  rubricToAssessment,
  handleRefetchListOfPeersAssignedToAssess = () => {},
}) => {
  if (typeof loadingStatus !== 'undefined' && loadingStatus !== 'finished') {
    return <Loading />;
  }

  if (!Array.isArray(dataSource) || !dataSource.length) {
    return <div>{t1('there_are_no_rubric_to_assess')}</div>;
  }

  return (
    <HorizontalScrolling>
      <AntdTable
        columns={getColumns({
          assessment_name,
          labelScoreById,
          peers,
          rubricToAssessment,
          handleRefetchListOfPeersAssignedToAssess,
        })}
        dataSource={Array.isArray(peers) && peers.length ? dataSource : []}
        pagination={false}
        bordered
        size="middle"
      />
    </HorizontalScrolling>
  );
};

export default fetchData((props) => {
  const peers = get(props, 'peers');

  return {
    baseUrl: endPoints.dataToAssessment,
    params: {
      rubric_iid: props.rubricToAssessment,
    },
    propKey: 'rubric',
    formatDataResult: ({ rubrics, score_scale, assessment_name } = {}) => {
      const dataSource = formatDataSourceFromDataServerToRenderTableAssess(
        rubrics,
      );
      const parts = get(score_scale, 'parts');
      let labelScoreById = null;
      if (Array.isArray(parts) && parts.length) {
        labelScoreById = {};
        parts.forEach(({ id, name }) => {
          labelScoreById[id] = name;
        });
      }

      return {
        assessment_name,
        labelScoreById,
        dataSource,
      };
    },
    fetchCondition: Array.isArray(peers) && peers.length,
    refetchCondition: (prevProps) =>
      Array.isArray(peers) &&
      peers.length &&
      (!Array.isArray(get(prevProps, 'peers')) ||
        !get(prevProps, 'peers').length),
  };
})(ViewAssessMyPeers);
