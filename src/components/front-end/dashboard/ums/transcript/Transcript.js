import React from 'react';
import { t1, t4 } from 'translate';
import lodashGet from 'lodash.get';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import sagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints/index';
import Loading from 'components/common/loading';
import Button from 'components/common/mui/NewButton';
import Icon from 'components/common/Icon';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { parseScoreToString } from 'common/utils/Score';
import HorizontalScrolling from 'components/common/html/horizontal-scrolling';
import ShowTranscriptBySemester from './ShowTranscriptBySemester';
import ShowTranscriptBySubject from './ShowTranscriptBySubject';
import { scoreScaleTypes, userMajorStatus } from 'configs/constants';

class Transcript extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transcript: [],
      scoreScale: '0_10',
      groupBy: null,
      testColSpan: 0,
      finalExamColSpan: 0,
      surveysToTake: [],
    };
  }

  stylePaper = {
    marginTop: 20,
    padding: 10,
  };

  handleExportTranscript = (type = 'graduation_transcript') => {
    this.handleClosePopover();
    const { dispatch, formOfTraining, userIid } = this.props;
    const specialization =
      this.state.specialization ||
      lodashGet(formOfTraining, 'specializations.[0].iid');

    const exportUrl = apiUrls.export_transcript;
    dispatch(
      sagaActions.exportDataRequest(exportUrl, {
        type,
        major: formOfTraining.major,
        training_mode: formOfTraining.training_mode,
        training_level: formOfTraining.training_level,
        ico: formOfTraining.ico,
        user_iid: userIid,
        specialization,
      }),
    );
  };

  schemaFilterData = (specializations) => ({
    schema: () => ({
      specialization: {
        type: 'select',
        fullWidth: true,
        options: Array.isArray(specializations)
          ? specializations.map((specialization) => ({
              value: specialization.iid,
              label: specialization.name,
              primaryText: specialization.name,
            }))
          : [],
        defaultValue: lodashGet(specializations, '[0].iid'),
        floatingLabelText: t1('specialization'),
        classWrapper: 'col-md-6',
      },
      group_by: {
        type: 'radio',
        hintText: t1('display_data_group_by'),
        defaultValue: 'semester',
        inline: true,
        classWrapper: 'col-md-6 m-t-10',
        options: [
          {
            value: 'semester',
            label: t1('semester'),
          },
          {
            value: 'subject',
            label: t1('subject'),
          },
        ],
        errorText: '',
      },
    }),
    ui: () => [
      {
        id: 'id', // you still have to have this id even for freestyle
        fields: [
          Array.isArray(specializations) &&
            specializations.length > 1 &&
            'specialization',
          'group_by',
        ].filter(Boolean),
      },
    ],
  });

  getAccumulation = () => {
    return this.state.accumulation || {};
  };

  setDataViewer = ({
    accumulation,
    groupBy,
    scoreScale,
    transcript,
    surveysToTake,
    scoreScalesToShowFinalScore,
    largestNumberOfRepeatSubject,
    largestNumberOfTestPerSubjectInTranscript,
    largestNumberOfFinalExamPerSubjectInTranscript,
  } = {}) =>
    this.setState({
      groupBy: groupBy || 'no_result',
      accumulation,
      transcript,
      scoreScale,
      surveysToTake,
      testColSpan: largestNumberOfTestPerSubjectInTranscript,
      finalExamColSpan: largestNumberOfFinalExamPerSubjectInTranscript,
      scoreScalesToShowFinalScore:
        (Array.isArray(scoreScalesToShowFinalScore) &&
          scoreScalesToShowFinalScore.filter(
            (scale) => scale !== scoreScale,
          )) ||
        [],
      largestNumberOfRepeatSubject,
    });

  elementShowAccumulation = () => {
    const { scoreScale, groupBy } = this.state;

    if (groupBy === 'subject') {
      return null;
    }

    const accumulation = this.getAccumulation();

    //TODO: ?????? phụ thuộc vào bài toán. Hiện tại chưa cần tính toán
    if (scoreScale === scoreScaleTypes.pmd) {
      return null;
    }

    const {
      average_score,
      classification,
      credit_accumulation,
      average_score_by_0_4,
    } = accumulation;
    let classificationLetter = '';
    switch (classification) {
      case 1: {
        classificationLetter = t1('classification_excellent');
        break;
      }
      case 2: {
        classificationLetter = t1('classification_good');
        break;
      }
      case 3: {
        classificationLetter = t1('classification_average');
        break;
      }
      case 4: {
        classificationLetter = t1('classification_below_average');
        break;
      }
      default: {
        classificationLetter = t1('classification_weak');
      }
    }
    return (
      <div>
        <div className="col-md-4 col-xs-6">
          <p>{t1('classification:_%s', [classificationLetter])}</p>
          <p>
            {t1('total_accumulated_credits:_%s', [credit_accumulation || 0])}
          </p>
        </div>
        <div className="col-md-4 col-xs-6">
          <p>
            {t1(
              [scoreScaleTypes.pmd, scoreScaleTypes['0_4']].includes(scoreScale)
                ? 'average_score:_%s'
                : 'average_score_(scale_0_4):_%s',
              [
                parseScoreToString(
                  (scoreScale === scoreScaleTypes.pmd
                    ? average_score
                    : average_score_by_0_4) || 0,
                  scoreScale,
                ),
              ],
            )}
          </p>
          {![scoreScaleTypes.pmd, scoreScaleTypes['0_4']].includes(
            scoreScale,
          ) && (
            <p>
              {t1(`average_score_(scale_${scoreScale}):_%s`, [
                parseScoreToString(average_score, scoreScale),
              ])}
            </p>
          )}
        </div>
      </div>
    );
  };

  renderElementViewerTranscriptDetail = () => {
    const {
      groupBy,
      transcript,
      scoreScale,
      testColSpan,
      surveysToTake,
      finalExamColSpan,
      scoreScalesToShowFinalScore,
      largestNumberOfRepeatSubject,
    } = this.state;

    if (!Array.isArray(transcript) || !transcript.length) {
      return <div>{t1('no_credits_learned')}</div>;
    }

    return (
      <div>
        {this.elementShowAccumulation()}
        {groupBy === 'subject' ? (
          <ShowTranscriptBySubject
            transcript={transcript}
            scoreScale={scoreScale}
            testColSpan={testColSpan}
            finalExamColSpan={finalExamColSpan}
            scoreScalesToShowFinalScore={scoreScalesToShowFinalScore}
            largestNumberOfRepeatSubject={largestNumberOfRepeatSubject}
          />
        ) : (
          <ShowTranscriptBySemester
            transcript={transcript}
            scoreScale={scoreScale}
            testColSpan={testColSpan}
            accumulationBySemester={
              this.getAccumulation()['accumulation_by_semester']
            }
            scoreScalesToShowFinalScore={scoreScalesToShowFinalScore}
            finalExamColSpan={finalExamColSpan}
            surveysToTake={surveysToTake}
            isAdmin={this.props.isAdmin}
            elementExportTranscript={this.elementExportTranscript}
          />
        )}
      </div>
    );
  };

  handleClosePopover = () => {
    this.setState({
      popoverOpen: false,
    });
  };

  elementExportTranscript = (disabled = false, title = null) => {
    const { formOfTraining, isAdmin } = this.props;
    let disabledExportGraduation = false;
    let titleDisabledExportGraduation = null;

    if (
      isAdmin &&
      ![userMajorStatus.PASSED, userMajorStatus.certified].includes(
        lodashGet(formOfTraining, 'status'),
      )
    ) {
      disabledExportGraduation = true;
      titleDisabledExportGraduation = t1(
        'enable_export_when_the_student_has_graduated',
      );
    }
    return [
      <Button
        name="submit"
        type="submit"
        title={title}
        disabled={disabled}
        icon={<Icon icon="export" />}
        label={t1('export')}
        onClick={(event) => {
          if (disabled) {
            return;
          }
          if (!isAdmin) {
            this.handleExportTranscript('process_transcript');
            return;
          }
          event.preventDefault();
          this.setState({
            popoverOpen: true,
            popoverAnchorEl: event.currentTarget,
          });
        }}
      />,
      isAdmin && (
        <Popover
          open={this.state.popoverOpen}
          anchorEl={this.state.popoverAnchorEl}
          anchorOrigin={{ horizontal: 'middle', vertical: 'top' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleClosePopover}
        >
          <Menu>
            <MenuItem
              primaryText={
                <Icon icon="path" className="icon">
                  &nbsp;
                  {t1('process_transcript')}
                </Icon>
              }
              onClick={() => this.handleExportTranscript('process_transcript')}
            />
            <MenuItem
              disabled={disabledExportGraduation}
              title={titleDisabledExportGraduation}
              primaryText={
                <Icon icon="path" className="icon">
                  &nbsp;
                  {t1('graduation_transcript')}
                </Icon>
              }
              onClick={() =>
                this.handleExportTranscript('graduation_transcript')
              }
            />
          </Menu>
        </Popover>
      ),
    ];
  };

  renderElementGetTranscript = () => {
    const { userIid, formOfTraining, isAdmin } = this.props;

    const hiddenFields = {
      user_iid: userIid,
      major: formOfTraining.major,
      ico: formOfTraining.ico,
      training_level: formOfTraining.training_level,
      training_mode: formOfTraining.training_mode,
    };

    if (!isAdmin) {
      hiddenFields.group_by = 'semester';
    }

    return (
      <div>
        <div className={isAdmin ? 'col-md-9' : 'displayNone'}>
          <SearchWrapper
            schema={this.schemaFilterData(formOfTraining.specializations)}
            hiddenFields={hiddenFields}
            onChange={({ specialization }) =>
              this.setState({ groupBy: null, specialization })
            }
            formid="search-transcript"
            renderResultsComponent={this.setDataViewer}
            showResult
            hidePagination
            showSearchButton={false}
            autoSearchWhenStart
            autoSearchWhenValuesChange
            alternativeApi={apiUrls.get_transcript}
          />
        </div>
        {isAdmin && (
          <div className="col-md-3 m-t-25">
            {this.elementExportTranscript()}
          </div>
        )}
      </div>
    );
  };

  render() {
    const { formOfTraining, isAdmin } = this.props;
    const { groupBy } = this.state;

    if (!formOfTraining) {
      return null;
    }

    return (
      <div>
        {isAdmin ? (
          <Paper style={this.stylePaper}>
            <div className="row">{this.renderElementGetTranscript()}</div>
          </Paper>
        ) : (
          this.renderElementGetTranscript()
        )}
        {(() => {
          if (!groupBy) {
            return <Loading />;
          }
          if (groupBy === 'no_result') {
            return <div className="text-center m-t-30">{t1('no_result')}</div>;
          }
          return (
            <HorizontalScrolling className="m-t-30">
              {this.renderElementViewerTranscriptDetail()}
            </HorizontalScrolling>
          );
        })()}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { userIid } = props;
  return {
    isAdmin: String(lodashGet(state, 'user.info.iid')) !== String(userIid),
  };
};
export default connect(mapStateToProps)(Transcript);
