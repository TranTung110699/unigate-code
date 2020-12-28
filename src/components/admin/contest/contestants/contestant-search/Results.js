import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t1, t3 } from 'translate';
import { reduxForm } from 'redux-form';
import lGet from 'lodash.get';
import {
  TableAsReduxFormField as Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';
import { timestampToDateTimeString } from 'common/utils/Date';
import userSagaActions from 'components/admin/user/actions/saga-creators';
import apiUrls from 'api-endpoints';
import contestApiUrls from 'components/admin/contest/endpoints';
import { Link } from 'react-router-dom';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import OrganizationsOrPhongBan from 'components/admin/group/common/OrganizationsOrPhongBanInResultTable';
import AcceptContestantToRetakeBtn from './AcceptContestantToRetakeBtn';
import { userPreviewLink } from 'components/admin/user/utils';
import sagaActions from '../../../../../actions/node/saga-creators';
import ActionBtnWithConfirmDialog from 'components/common/action-button/ActionBtnWithConfirmDialog';
import PreviewIcon from 'material-ui/svg-icons/action/visibility';
import ResetContestantResult from './ResetContestantResult';
import { confirmDialogText } from './utils';

class Results extends Component {
  constructor(props) {
    super(props);

    this.statusOnChanged = this.statusOnChanged.bind(this);
  }

  generateOtpForUser(uiid, contestIid) {
    const params = {
      uiid,
      contest_iid: contestIid,
      // exam_round_iid: examRoundIid,
    };

    this.props.dispatch(
      sagaActions.getDataRequest(
        {
          url: contestApiUrls.generate_otp_for_one_contestant,
          executeOnSuccess: () => {
            window.location.reload();
          },
        },
        params,
      ),
    );
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

  renderRoundInfo(info) {
    const examRoundName = lGet(info, 'exam_round_info.name', '');
    return `${examRoundName}`;
  }

  renderExamShiftInfo(info) {
    const examShiftName = lGet(info, 'exam_shift_info.name', '');
    const examShiftStartTime = timestampToDateTimeString(
      lGet(info, 'exam_shift_info.start_date', ''),
    );

    return (
      <div>
        {examShiftName}
        <div className="text-muted">{examShiftStartTime}</div>
      </div>
    );
  }

  render() {
    const {
      items,
      contest,
      examShift,
      resultTableFieldName,
      keyOfSelectedUsers = 'id',
      fieldToSaveInSelectedUsers = ['id', 'iid', 'name'],
    } = this.props;

    return (
      <div className="table-result">
        {items && items.length > 0 && (
          <Table
            multiSelectable
            name={resultTableFieldName}
            itemList={items}
            checkKey={keyOfSelectedUsers}
            keysSave={fieldToSaveInSelectedUsers}
          >
            <TableHeader>
              <TableRow>
                <TableHeaderColumn title={t1('code')}>
                  {t1('code')}
                </TableHeaderColumn>
                <TableHeaderColumn title={t1('full_name')}>
                  {t1('full_name')}
                </TableHeaderColumn>
                <TableHeaderColumn title={t1('organization')}>
                  {t1('organization')}
                </TableHeaderColumn>

                <TableHeaderColumn title={t1('exam_round')}>
                  {t1('exam_round')}
                </TableHeaderColumn>
                {contest && contest.require_otp && (
                  <TableHeaderColumn title={t1('otp')}>
                    {t3('otp')}
                  </TableHeaderColumn>
                )}
                <TableHeaderColumn title={t1('assigned_shift')}>
                  {t1('assigned_shift')}
                </TableHeaderColumn>
                <TableHeaderColumn width={'15%'}>
                  {t1('action')}
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>

            <TableBody>
              {items &&
                items.map((item) => (
                  <TableRow key={item.id}>
                    <TableRowColumn>
                      <div>{item.code}</div>
                      <div>{item.mail}</div>
                    </TableRowColumn>
                    <TableRowColumn>
                      <div className="d-flex" style={{ alignItems: 'center' }}>
                        <Link
                          to={userPreviewLink(item)}
                          target="_blank"
                          title={t1('preview')}
                        >
                          <PreviewIcon />
                        </Link>
                        &nbsp;
                        <span>{item.name}</span>
                      </div>
                    </TableRowColumn>
                    <TableRowColumn>
                      {item.user_organizations &&
                      item.user_organizations.length ? (
                        <OrganizationsOrPhongBan
                          item={item}
                          attr={'user_organizations'}
                          withLink
                        />
                      ) : (
                        '-'
                      )}
                    </TableRowColumn>
                    <TableRowColumn>
                      {item.current_contest &&
                        this.renderRoundInfo(item.current_contest)}
                    </TableRowColumn>
                    {contest && contest.require_otp && (
                      <TableRowColumn>
                        {lGet(item, 'current_contest.otp') && (
                          <span
                            style={{
                              fontSize: '16px',
                              marginRight: '10px',
                            }}
                          >
                            {lGet(item, 'current_contest.otp')}
                          </span>
                        )}
                        <ActionBtnWithConfirmDialog
                          title={t1('generate_OTP_for_this_user')}
                          label={this.props.title}
                          primary={1}
                          actionHandler={() => {
                            this.generateOtpForUser(
                              item.iid,
                              item.current_contest.contest_iid,
                            );
                          }}
                          icon="edit"
                          textConfirm={confirmDialogText(
                            item,
                            t1('generate_OTP_for_this_user?'),
                          )}
                        />
                      </TableRowColumn>
                    )}
                    <TableRowColumn>
                      {item.current_contest &&
                        this.renderExamShiftInfo(item.current_contest)}
                    </TableRowColumn>
                    <TableRowColumn width={'15%'}>
                      <div
                        className="d-flex"
                        style={{ justifyContent: 'space-between' }}
                      >
                        <AcceptContestantToRetakeBtn
                          title={t1('accept_contestant_to_retake')}
                          icon="autorenew"
                          data={{
                            user_iid: item.iid,
                            contest_code: contest.code,
                          }}
                          textConfirm={confirmDialogText(
                            item,
                            t1('do_you_want_to_accept_contestant_to_retake?'),
                          )}
                        />
                        <DeleteItem
                          alternativeApi={'/contest/api/remove-contestants'}
                          params={{
                            contest_iid: contest.iid,
                            user_iids: [item.iid],
                          }}
                          formid="user_search"
                          title={t1('remove_contestant_from_contest')}
                          icon="delete"
                          textConfirm={confirmDialogText(
                            item,
                            t1('do_you_want_to_remove_this_contestant?'),
                          )}
                        />
                        {localStorage.debug_exam ? (
                          <ResetContestantResult
                            contest={contest}
                            item={item}
                          />
                        ) : null}
                      </div>
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
    form: lGet(props, 'resultTableFormId'),
  };
}

export default connect(mapStateToProps)(reduxForm({})(Results));
