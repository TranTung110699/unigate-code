import React from 'react';
import { connect } from 'react-redux';
import nodeSagaActions from 'actions/node/saga-creators';
import Perm from 'common/utils/Perm';
import { openLoginDialog } from 'actions/auth/auth-dialog';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import VarDump from 'components/common/VarDump';
import { getLearnItemInfoSelector } from 'common/learn';
import { layouts, ScoreLabelMapping } from 'configs/constants';
import { extractObject } from 'common/utils/Array';
import { getThemeConfig } from 'utils/selectors';
import TeachersFeedback from '../TeachersFeedback';
import fetchAnswerAndFeedback, { questionTakeState } from '../utility';

class Api extends React.Component {
  divStyle = { background: 'none' };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    fetchAnswerAndFeedback(this.props);
  }

  componentDidMount() {
    if (Perm.isGuest()) {
      const dispatch = this.props.dispatch;
      dispatch(openLoginDialog());
    }
  }

  componentWillReceiveProps(nextProps) {
    const userAnswers = this.props.userAnswers || {};
    const { status } = userAnswers;
    if (
      nextProps &&
      nextProps.userAnswers &&
      nextProps.userAnswers.status &&
      nextProps.userAnswers.status !== status &&
      nextProps.userAnswers.status === 'have_ordered' &&
      nextProps.setUserAnswers
    ) {
      nextProps.setUserAnswers({ status: 'have_ordered' });
    }
  }

  submitPackageInfo(question, courseIid) {
    const { dispatch, exam } = this.props;
    const url = '/take/new';
    const keyState = questionTakeState(courseIid, question.id);
    const params = {
      course: courseIid,
      question: {
        iid: question.iid,
        type: question.type,
        weighted: question.weighted,
        saw_training_package: question.saw_training_package,
      },
      _sand_step: 'question',
      exam,
    };

    dispatch(
      nodeSagaActions.getDataRequest(
        {
          url,
          keyState,
          post: 1,
        },
        params,
      ),
    );
  }

  render() {
    const { question, userAnswers, courseIid, themeConfig } = this.props;

    const answer = userAnswers && userAnswers.answer;
    const score = userAnswers && userAnswers.score;

    const orderLabel = answer ? 'order_the_package_again' : 'order_the_package';

    const comments = userAnswers.comments || (answer && answer.comments);

    return (
      <div className="test-result-wrapper">
        <div className="text-center" style={this.divStyle}>
          <Icon icon="start_exam" className="icon" />
          <h3>
            {t1('Photoshop Practice Exercise')} <br />
            Your package: <b>{question.saw_training_package}</b>
          </h3>
          {userAnswers && userAnswers.status === 'have_ordered' && (
            <div>
              {t1(
                'Please_now_move_to_the_SAW_Training_System_to_do_the_editing',
              )}
              <div>
                {t1(
                  'If the image does not appear in the editor client after 2 minutes, please exit the editor client and re-enter',
                )}
              </div>
              <div>
                Nếu ảnh không xuất hiện trên Editor Client trong vòng 2 phút,
                hãy thoát Editor Client và mở lại.
              </div>
            </div>
          )}
          {score && (
            <span title={t1('score:_%s/%s', [score, question.weighted || 3])}>
              {userAnswers &&
                userAnswers.status === 'have_ordered' &&
                score && <p>{t1('previous_results')}</p>}
              <Icon icon="result" className="icon result" />
              {themeConfig.layout === layouts.PIXELZ ? (
                <span>
                  {ScoreLabelMapping[score] ||
                    `${score}/${question.weighted || 100}`}
                </span>
              ) : (
                <span>
                  {score}/{question.weighted || 100}
                </span>
              )}
            </span>
          )}
          {(!userAnswers || (!userAnswers.iid && !userAnswers.status)) && (
            <span>
              <Icon icon="result" className="icon result" />
              {t1('your_work_is_not_yet_marked')}
            </span>
          )}
          <br />
          {userAnswers && userAnswers.status === 'redo' && (
            <span>
              <Icon icon="result" className="icon result" />
              {t1('you_can_do_it_again')}
            </span>
          )}
          <div className="m-t-20">
            {(!userAnswers ||
              !userAnswers.iid ||
              !userAnswers.status ||
              userAnswers.status === 'redo') &&
              (!userAnswers ||
                (userAnswers && userAnswers.status !== 'have_ordered')) && (
                <button
                  className="btn btn-filled"
                  onClick={() => this.submitPackageInfo(question, courseIid)}
                >
                  {t1(orderLabel)}
                </button>
              )}
          </div>
        </div>
        <div>
          {comments && comments.length && (
            <TeachersFeedback comments={comments} />
          )}
        </div>
        {process.env.NODE_ENV !== 'production' && <VarDump data={answer} />}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const isTesting = props.mode === 'exam';
  const question = props.question || {};
  const courseIid = props.courseIid;
  const keyState = questionTakeState(courseIid, question.id);
  const userAnswers = state.dataApiResults[keyState] || {
    answer: props.userAnswers,
  };
  const itemIid = state.learn && state.learn.itemIid;
  const item = state.tree[itemIid];
  const info = isTesting
    ? getLearnItemInfoSelector(state)(itemIid)
    : Object.assign({}, state.tree[itemIid], {
        type: item && item.ntype,
        exam_type: item && item.ntype,
      });
  return {
    userAnswers,
    isTesting,
    exam: extractObject(info, [
      'iid',
      'type',
      'name',
      'exam_type',
      'exam_order',
      'duration',
    ]),
    themeConfig: getThemeConfig(state),
  };
};

export default connect(mapStateToProps)(Api);
