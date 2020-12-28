import React from 'react';
import { connect } from 'react-redux';
import contestApiUrls from 'components/admin/contest/endpoints';
import sagaActions from 'actions/node/saga-creators';
import { createSelector } from 'reselect';
import { t1, t3 } from 'translate';
import { withRouter } from 'react-router';
import nodeActions from 'actions/node/creators';
import './stylesheet.scss';

const GET_CURRENT_EXAM_SHIFT = 'current_exam_shift';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { examShift: null };
  }

  componentWillMount() {
    const { dispatch, user, contestCode } = this.props;
    dispatch(
      sagaActions.getDataRequest(
        {
          url: contestApiUrls.get_exam_shifts_available_for_user,
          keyState: GET_CURRENT_EXAM_SHIFT,
        },
        { user_iid: user && user.iid, contest_code: contestCode },
      ),
    );
  }

  handleOnSelectContest = (object) => {
    this.setState({ examShift: object.target && object.target.value });
  };

  handleChangeExamShift = () => {
    const { examShift } = this.state;
    const { contestCode, dispatch, user } = this.props;

    if (examShift) {
      dispatch(
        sagaActions.getDataRequest(
          {
            url: contestApiUrls.change_exam_shift_for_user,
            post: true,
            executeOnSuccess: () => {
              window.location.reload();
            },
          },
          {
            id: user && user.id,
            contest_code: contestCode,
            shift_exam: examShift,
            _sand_step: 'change_shift_exam',
          },
        ),
      );
    } else {
      const { dispatch } = this.props;
      dispatch(
        nodeActions.snackbar(true, t1('you_need_to_select_a_exam_shift')),
      );
    }
  };

  render() {
    const { examShifts, currentExamShift } = this.props;
    const items =
      examShifts &&
      examShifts.filter(
        (item) =>
          (item && item.iid) !== (currentExamShift && currentExamShift.iid),
      );
    return [
      <div className="select-exam-shift-wrapper">
        <div className="content">
          <h3 className="title">{t1('you_were_late')}</h3>
          {(!items || items.length <= 0) && (
            <div className="title">
              {t1('you_dont_have_any_exam_shift_to_change')}
            </div>
          )}
          {items &&
            items.length > 0 && [
              <div className="title">
                {t1(
                  'you_may_choose_another_exam_shift_to_continue_in_the_competition',
                )}
              </div>,
              <select
                className="select-exam-shift"
                onChange={this.handleOnSelectContest}
              >
                <option disabled selected value hidden>
                  {t1('select_exam_shift')}
                </option>
                {items.map((item) => (
                  <option className="option" value={item.id}>
                    {item.display_name}
                  </option>
                ))}
              </select>,
            ]}
        </div>
      </div>,
      items &&
        items.length > 0 && [
          <button
            className="btn btn-filled"
            onClick={this.handleChangeExamShift}
          >
            {t3('choose_exam_shift')}
          </button>,
        ],
    ];
  }
}

const mapStateToProps = createSelector(
  (state) => state.user && state.user.info,
  (state) => state.dataApiResults[GET_CURRENT_EXAM_SHIFT],
  (user, examShifts) => ({
    user,
    examShifts,
  }),
);

export default withRouter(connect(mapStateToProps)(Index));
