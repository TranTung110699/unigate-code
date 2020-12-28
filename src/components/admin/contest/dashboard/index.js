import React from 'react';
import { t, t1 } from 'translate';
import { timestampToDateString } from 'common/utils/Date';
import { Link } from 'react-router-dom';
import Status from './Status';
import RequireOTP from './RequireOTP';
import Widget from 'components/common/Widget';
import ExamShiftList from 'components/admin/contest/exam-shift/search/Layout';
import ButtonNewExamShift from 'components/admin/course/new/ButtonNew';
import ButtonNewExamRound from 'components/admin/contest/exam-round/new/ButtonNew';
import ExamRoundLayout from '../exam-round/search/Layout';
import MyBadge from 'components/common/badge';
import lodashGet from 'lodash.get';
import routes from 'routes';
import Icon from 'components/common/Icon';
import FlatButton from 'components/common/mui/FlatButton';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import SuccessAlert from '../../../common/SuccessAlert';
import Warning from '../../../common/Warning';

const styles = {
  minHeight: '70px',
};

class ContestDashboard extends React.Component {
  render() {
    const { node, contestIid, ...props } = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Widget title={t1('basic_info')}>
              <div style={styles}>
                <div>
                  <b>{t('name')}</b>: {node.name}
                </div>
                <div>
                  <b>{t('code')}</b>: {node.code}
                </div>
                <div>
                  <b>{t1('contest_time_frame')}</b>:{' '}
                  {timestampToDateString(node.start_time)} {' - '}{' '}
                  {timestampToDateString(node.end_time)}
                  <div>
                    {node.ongoing_status == 'finished' && (
                      <SuccessAlert>{t1('contest_is_finished')}</SuccessAlert>
                    )}
                    {node.ongoing_status == 'ongoing' && (
                      <SuccessAlert>{t1('contest_is_ongoing')}</SuccessAlert>
                    )}
                    {node.ongoing_status == 'soon' && (
                      <Warning>{t1('contest_is_starting_soon')}</Warning>
                    )}
                  </div>
                </div>
                <div className="m-t-10">
                  <Link to={`#!/admin/contest/${node.iid}/information`}>
                    {t1('edit_basic_information')} <Icon icon={'edit'} />
                  </Link>
                </div>
              </div>
              <hr />
              <div>
                <b>{t1('require_otp')}</b>
                <div style={styles}>
                  <RequireOTP node={node} />
                </div>
              </div>

              <hr />
              <div>
                <b>{t1('contest_status')}</b>
                <div style={styles}>
                  <Status node={node} />
                </div>
              </div>

              <hr />
              <div>
                <b>{t1('delete_contest')}</b>
                <div style={styles}>
                  <DeleteItem
                    title={t1('delete_contest')}
                    textConfirm={t1(
                      'everything_related_to_this_contest_will_be_deleted_and_this_action_is_irreversible',
                    )}
                    ntype="contest"
                    itemId={node.id}
                    label={t1('delete_this_contest')}
                    newButton
                    dialogTitle={`${t1(
                      'are_you_sure_you_want_to_remove_this_contest',
                    )}?`}
                    onRequestSuccessful={() => {
                      window.location = '/admin/contest';
                    }}
                    buttonType="danger"
                  />
                </div>
              </div>
            </Widget>

            {/*

              <Widget title={t1('checklist_for_contest')}>
                <div style={styles}>
                  <TaskList contest={node} />
                </div>
              </Widget>
               */}

            {/*
              <Widget title={t1('contest_status')}>
              </Widget>
               */}
          </div>

          <div className="col-md-10">
            <Widget title={t1('contestants_list')} noMinHeight>
              <Link
                to={routes.url('node_edit', {
                  ...node,
                  step: 'contestants',
                })}
              >
                {t1('contestants')}:{' '}
                <MyBadge count={lodashGet(node, 'counter.contestants')} />{' '}
                <Icon icon={'edit'} />
              </Link>{' '}
              <span className="m-l-20">
                <Link
                  to={routes.url('node_edit', {
                    ...node,
                    step: 'invite',
                  })}
                >
                  <FlatButton
                    label={t1('enrol_new_contestants')}
                    icon={<Icon icon={'plus'} />}
                  />
                </Link>
              </span>
              <span className="m-l-20">
                <Link
                  to={routes.url('node_edit', {
                    ...node,
                    step: 'import-contestants',
                  })}
                >
                  <FlatButton
                    label={t1('import_contestants')}
                    icon={<Icon icon={'plus'} />}
                  />
                </Link>
              </span>
            </Widget>
            <Widget title={t1('exam_shifts')}>
              <ExamShiftList contestIid={contestIid} />
              <div className="m-t-10">
                <span className="pull-right">
                  <ButtonNewExamShift
                    formid="new_exam_shift"
                    searchFormId="exam_shift_search"
                    step="exam_shift"
                    mode="new"
                    contestIid={contestIid}
                  />
                </span>
                <div className="clearfix" />
              </div>
            </Widget>

            <Widget title={t1('exam_rounds')}>
              <ExamRoundLayout contestIid={contestIid} node={node} />
              <div className="m-t-10">
                <span className="pull-right">
                  <ButtonNewExamRound
                    searchFormId="exam_round_search"
                    buttonProps={{ primary: false }}
                  />
                </span>
                <div className="clearfix" />
              </div>
            </Widget>
          </div>
        </div>
      </div>
    );
  }
}

export default ContestDashboard;
