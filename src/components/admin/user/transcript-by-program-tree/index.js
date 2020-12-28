import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Loading from 'components/common/loading';
import { t1 } from 'translate';
import getLodash from 'lodash.get';
import { ntype as allNtypes } from 'configs/constants';
import fetchData from 'components/common/fetchData';
import apiUrls from 'api-endpoints';
import Icon from 'components/common/Icon';
import MultiCheckbox from 'schema-form/elements/multi-checkbox/core';
import DetailOnDialog from 'components/common/detail-on-dialog';
import FlatButton from 'components/common/mui/FlatButton';
import EditScoreSubject from './EditScoreSubject';

class Transcript extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreScaleViewer: [],
    };
  }

  getHeaderColumn = ({
    index,
    headerRowSpan,
    scoreScaleViewer,
    scoreScaleOriginal,
    scoreScalesToShowFinalScore,
  }) => {
    if (index === 0) {
      return [
        <th rowSpan={headerRowSpan}>{t1('subject')}</th>,
        <th
          colSpan={
            1 +
            ((Array.isArray(scoreScaleViewer) && scoreScaleViewer.length) || 0)
          }
        >
          {headerRowSpan === 1 ? (
            <div>
              {t1('score')}
              &nbsp;
              <span className="text-muted">
                (
                {`${t1('score_scale')}: ${scoreScaleOriginal &&
                  scoreScaleOriginal.name}`}
                )
              </span>
            </div>
          ) : (
            t1('score')
          )}
        </th>,
        <th rowSpan={headerRowSpan}>{t1('passed')}</th>,
        <th rowSpan={headerRowSpan}>{t1('action')}</th>,
      ];
    }

    return [<th>{scoreScaleOriginal && scoreScaleOriginal.name}</th>].concat(
      Array.isArray(scoreScalesToShowFinalScore) &&
        scoreScalesToShowFinalScore
          .filter(
            (scoreScale) =>
              Array.isArray(scoreScaleViewer) &&
              scoreScaleViewer.includes(scoreScale.id),
          )
          .map((scoreScale, index) => (
            <th key={`col_scale-${scoreScale.id}_index-${index}`}>
              {scoreScale.name}
            </th>
          )),
    );
  };

  renderHeaderTableShowTranscript = ({
    scoreScaleOriginal,
    scoreScalesToShowFinalScore,
    scoreScaleViewer,
  }) => {
    const headerRowSpan =
      Array.isArray(scoreScaleViewer) && scoreScaleViewer.length ? 2 : 1;

    return (
      <thead>
        {Array(...Array(headerRowSpan)).map((value, index) => (
          <tr
            key={`key-header-index-${index}_${value}`}
            className="text-center"
          >
            {this.getHeaderColumn({
              index,
              headerRowSpan,
              scoreScaleViewer,
              scoreScaleOriginal,
              scoreScalesToShowFinalScore,
            })}
          </tr>
        ))}
      </thead>
    );
  };

  renderContentTableRowShowTranscript = ({ row, scoreScaleViewer, index }) => {
    if (!row) {
      return null;
    } else if (row.ntype === allNtypes.PATH) {
      return (
        <tr>
          <td
            colSpan={
              4 +
                (Array.isArray(scoreScaleViewer) && scoreScaleViewer.length) ||
              0
            }
          >
            <h3>
              <div style={{ paddingLeft: `${index * 20}px` }}>{row.name}</div>
            </h3>
          </td>
        </tr>
      );
    }

    const creditTransfert = getLodash(row, 'final_score.credit_transfert');

    return (
      <tr>
        <td>
          {row.name} <br />
          <span className="text-muted">{row.code}</span>
        </td>
        {creditTransfert ? (
          <td
            className="text-center"
            colSpan={
              2 +
                (Array.isArray(scoreScaleViewer) && scoreScaleViewer.length) ||
              0
            }
          >
            {t1('credit_transferted')}
          </td>
        ) : (
          [
            <td className="text-center">
              {getLodash(row, 'final_score.p_original')}
            </td>,
            Array.isArray(scoreScaleViewer) &&
              scoreScaleViewer.map((scoreScale) => (
                <td key={`${row.id}-${scoreScale}`} className="text-center">
                  {getLodash(row, `final_score.${scoreScale}`)}
                </td>
              )),
            <td className="text-center">
              {typeof getLodash(row, 'final_score.pf') !== 'undefined' && (
                <Icon
                  icon={getLodash(row, 'final_score.pf') ? 'check' : 'cancel'}
                  style={{
                    fontSize: 20,
                    color: getLodash(row, 'final_score.pf')
                      ? 'deepskyblue'
                      : 'red',
                  }}
                />
              )}
            </td>,
          ]
        )}
        <td>
          <DetailOnDialog
            dialogOptionsProperties={{
              width: '80%',
            }}
            renderPreview={({ showFull }) => (
              <FlatButton
                title={
                  getLodash(row, 'final_score') ? t1('edit') : t1('input_score')
                }
                icon={
                  <Icon
                    icon={getLodash(row, 'final_score') ? 'preview' : 'edit'}
                  />
                }
                onClick={showFull}
              />
            )}
            renderFull={({ closeDialog }) => (
              <EditScoreSubject
                updateSuccessFull={getLodash(this.props, 'handleRefetch')}
                closeDialog={closeDialog}
                scoreScale={getLodash(this.props, 'data.score_scale')}
                formOfTraining={getLodash(this.props, 'formOfTraining')}
                userIid={getLodash(this.props, 'userIid')}
                creditSyllabusIid={row.iid}
              />
            )}
            dialogKey="edit_score"
          />
        </td>
      </tr>
    );
  };

  renderBodyTableShowTranscript = ({
    rows,
    scoreScaleOriginal,
    scoreScalesToShowFinalScore,
    scoreScaleViewer,
    index,
  }) => {
    if (!Array.isArray(rows) || !rows.length) {
      return [];
    }

    return rows.reduce((result, row) => {
      if (!row) {
        return result;
      }
      result.push(
        this.renderContentTableRowShowTranscript({
          row,
          scoreScaleOriginal,
          scoreScalesToShowFinalScore,
          scoreScaleViewer,
          index,
        }),
      );
      return Array.isArray(row.children) && row.children.length
        ? result.concat(
            this.renderBodyTableShowTranscript({
              rows: row.children,
              scoreScaleOriginal,
              scoreScalesToShowFinalScore,
              scoreScaleViewer,
              index: index + 1,
            }),
          )
        : result;
    }, []);
  };

  renderElementTranscreipt = () => {
    const {
      scoreScaleOriginal,
      scoreScalesToShowFinalScore,
      program,
    } = this.props.data;
    const { scoreScaleViewer } = this.state;

    return (
      <div className="table-border">
        <table className="table">
          {this.renderHeaderTableShowTranscript({
            scoreScaleViewer,
            scoreScaleOriginal,
            scoreScalesToShowFinalScore,
          })}
          <tbody>
            {this.renderBodyTableShowTranscript({
              rows: program.children,
              scoreScaleViewer,
              scoreScaleOriginal,
              scoreScalesToShowFinalScore,
              index: 0,
            })}
          </tbody>
        </table>
      </div>
    );
  };

  elementScoreScaleViewerFilter = () => {
    const { scoreScalesToShowFinalScore } = this.props.data || {};
    if (
      !Array.isArray(scoreScalesToShowFinalScore) ||
      !scoreScalesToShowFinalScore.length
    ) {
      return null;
    }
    return (
      <div>
        <div className="col-md-6 text-center">
          <h3>{t1('score_scale_to_show_final_score')}</h3>
        </div>
        <div className="col-md-6">
          <MultiCheckbox
            inline
            defaultValue={
              Array.isArray(scoreScalesToShowFinalScore) &&
              scoreScalesToShowFinalScore.map(
                (scoreScale) => scoreScale && scoreScale.id,
              )
            }
            options={
              Array.isArray(scoreScalesToShowFinalScore) &&
              scoreScalesToShowFinalScore.map((scoreScale) => ({
                value: scoreScale.id,
                label: scoreScale.name,
              }))
            }
            onChange={(scoreScaleViewer) => this.setState({ scoreScaleViewer })}
          />
        </div>
      </div>
    );
  };

  renderNote = () => (
    <div>
      <div>{t1('note')}:</div>
      <div>
        - {t1('credit_transferted')} : {t1('note_credit_transferted')}
      </div>
    </div>
  );

  render() {
    const { data } = this.props;

    if (!data) {
      return <Loading />;
    }
    const { program } = data;

    if (!program || !program.children) {
      return <h3>{t1('not_yet_applied_program')}</h3>;
    }

    return (
      <Fragment>
        {this.elementScoreScaleViewerFilter()}
        {this.renderElementTranscreipt(program.children)}
        {this.renderNote()}
      </Fragment>
    );
  }
}

Transcript.propTypes = {
  formOfTraining: PropTypes.instanceOf(Object),
};

Transcript.defaultProps = {
  formOfTraining: null,
};

export default fetchData((props) => ({
  baseUrl: apiUrls.get_transcript_by_program_tree,
  params: {
    user_iid: getLodash(props, 'userIid'),
    major: getLodash(props, 'formOfTraining.major'),
    training_mode: getLodash(props, 'formOfTraining.training_mode'),
    training_level: getLodash(props, 'formOfTraining.training_level'),
    ico: getLodash(props, 'formOfTraining.ico'),
    specialization: getLodash(props, 'formOfTraining.specialization'),
  },
  propKey: 'data',
  fetchCondition:
    getLodash(props, 'formOfTraining.major') &&
    getLodash(props, 'formOfTraining.training_mode') &&
    getLodash(props, 'formOfTraining.training_level') &&
    getLodash(props, 'formOfTraining.ico'),
  refetchCondition: (prevProps) =>
    getLodash(props, 'formOfTraining.specialization') !==
    getLodash(prevProps, 'formOfTraining.specialization'),
}))(Transcript);
