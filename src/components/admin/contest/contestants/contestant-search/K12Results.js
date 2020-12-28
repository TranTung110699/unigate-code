import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t1 } from 'translate/index';
import { reduxForm } from 'redux-form';
import lGet from 'lodash.get';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import { timestampToDateTimeString } from 'common/utils/Date';
import userSagaActions from 'components/admin/user/actions/saga-creators';
import apiUrls from 'api-endpoints';
import { Link } from 'react-router-dom';
import actions from 'actions/node/creators';
import UpdateForm from '../../../user/new/Form';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import AcceptContestantToRetakeBtn from './AcceptContestantToRetakeBtn';
import { userPreviewLink } from 'components/admin/user/utils';

class Results extends Component {
  constructor(props) {
    super(props);

    this.statusOnChanged = this.statusOnChanged.bind(this);
  }

  changeExamShift(item) {
    const { dispatch, contest } = this.props;

    const formid = `update_contest_${item.id}`;
    const hiddenFields = {
      contest_code: contest && contest.code,
    };

    const contentDialog = (
      <UpdateForm
        mode="edit"
        title={t1('arrange_exam_shift_of_current_contests')}
        node={item}
        hiddenFields={hiddenFields}
        step="update_contest"
        formid={formid}
        searchFormId="user_search"
      />
    );

    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('arrange_exam_shift'),
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  statusOnChanged(status, userId) {
    const { id, dispatch } = this.props;

    const params = {
      status,
      id: userId,
      _sand_step: 'change_status',
      formid: id,
    };

    dispatch(
      userSagaActions.changeStatusRequest(apiUrls.update_node('user'), params),
    );
  }

  renderDetailInfo(info, mode) {
    if (mode === 'exam-round') {
      const examRoundName = lGet(info, 'exam_round_info.name', '');
      return `${examRoundName}`;
    } else if (mode === 'exam-shift') {
      const examShiftName = lGet(info, 'exam_shift_info.name', '');
      const examShiftTime = timestampToDateTimeString(
        lGet(info, 'exam_shift_info.start_date', ''),
      );

      return `${examShiftName}${
        examShiftTime && examShiftName ? ',' : ''
      } ${examShiftTime}`;
    }
    return null;
  }

  render() {
    const { items, contest } = this.props;
    const editUserLabel = t1('edit_user');
    const viewUserLabel = t1('view_user');
    const arrangeExamShiftLabel = t1('arrange_exam_shift');

    return (
      <div className="table-result">
        {items && items.length > 0 && (
          <Table>
            <TableHeader
              displaySelectAll={false}
              enableSelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn title={t1('code')}>
                  {t1('code')}
                </TableHeaderColumn>
                <TableHeaderColumn title={t1('full_name')}>
                  {t1('full_name')}
                </TableHeaderColumn>
                <TableHeaderColumn title={t1('grade')}>
                  {t1('grade')}
                </TableHeaderColumn>
                <TableHeaderColumn title={t1('group')}>
                  {t1('group')}
                </TableHeaderColumn>
                <TableHeaderColumn title={t1('current_round')}>
                  {t1('current_round')}
                </TableHeaderColumn>
                {contest && contest.require_otp && (
                  <TableHeaderColumn title={t1('otp')}>
                    {t1('otp')}
                  </TableHeaderColumn>
                )}
                <TableHeaderColumn title={t1('assigned_shift')}>
                  {t1('assigned_shift')}
                </TableHeaderColumn>
                <TableHeaderColumn title={t1('action')} width={'15%'}>
                  {t1('action')}
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>

            <TableBody displayRowCheckbox={false} showRowHover stripedRows>
              {items &&
                items.map((item) => (
                  <TableRow key={item.id}>
                    <TableRowColumn>
                      <Link to={userPreviewLink(item)}>{item.code}</Link>
                    </TableRowColumn>
                    <TableRowColumn>
                      <Link to={userPreviewLink(item)}>{item.name}</Link>
                    </TableRowColumn>

                    <TableRowColumn>
                      {item.school && item.school.grade}
                    </TableRowColumn>
                    <TableRowColumn>
                      {item.school && item.school.grade_name}
                    </TableRowColumn>
                    <TableRowColumn>
                      {item.current_contest &&
                        this.renderDetailInfo(
                          item.current_contest,
                          'exam-round',
                        )}
                    </TableRowColumn>
                    {contest && contest.require_otp && (
                      <TableRowColumn>
                        {lGet(
                          item,
                          'current_contest.exam_round_info.require_otp',
                        ) === 1 &&
                          lGet(item, 'current_contest.otp') && (
                            <sicopan>{item.current_contest.otp}</sicopan>
                          )}
                      </TableRowColumn>
                    )}
                    <TableRowColumn>
                      {item.current_contest &&
                        this.renderDetailInfo(
                          item.current_contest,
                          'exam-shift',
                        )}
                    </TableRowColumn>
                    <TableRowColumn width={'15%'}>
                      <AcceptContestantToRetakeBtn
                        style={{ marginRight: '20px' }}
                        title={t1('accept_contestant_to_retake')}
                        icon="plus"
                        data={{
                          user_iid: item.iid,
                          contest_code: contest.code,
                        }}
                        textConfirm={t1(
                          'do_you_want_to_accept_contestant_to_retake?',
                        )}
                      />
                      {/*
                      <IconButton
                        title={arrangeExamShiftLabel}
                        iconClassName="mi mi-timer"
                        onClick={() => this.changeExamShift(item)}
                      />
                      <Link to={`/admin/user/${item.iid}/edit`}>
                        <IconButton
                          title={editUserLabel}
                          iconClassName="mi mi-edit"
                        />
                      </Link>
                      <Link to={getUrl('admin_view_student', item)}>
                        <IconButton
                          title={viewUserLabel}
                          iconClassName="mi mi-visibility"
                        />
                      </Link>
                         */}
                      <DeleteItem
                        alternativeApi={'/invite/api/remove'}
                        params={{
                          items: {
                            iid: contest && contest.iid,
                            ntype: 'contest',
                          },
                          targets: { iid: item.iid, type: 'user' },
                        }}
                        formid="user_search"
                        title={t1('remove_contestant_from_contest')}
                      />
                    </TableRowColumn>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

Results.defaultProps = {
  items: [],
};

function mapStateToProps(state, props) {
  let statuses = [];

  if (
    state.formSchemaConfigs[props.id] &&
    state.formSchemaConfigs[props.id].status
  ) {
    statuses = state.formSchemaConfigs[props.id].status;
  }

  return {
    statuses,
  };
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'user_search_result',
  })(Results),
);
