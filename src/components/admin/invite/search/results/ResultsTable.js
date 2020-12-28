import React, { Component } from 'react';
import { t1 } from 'translate';
import {
  TableAsReduxFormField as Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';
import Avatar from 'components/common/avatar';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router-dom';
import { getUrl } from 'routes/links/common';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import { handleInviteCourseRequest } from 'actions/learn/saga-creators';
import { displayStatusInvited } from 'configs/constants';
import {
  populateRowSpanInfoToRenderListOfItemAsTable,
  unwind,
} from 'common/utils/Array';
import lodashGet from 'lodash.get';
import OrganizationsOrPhongBan from 'components/admin/group/common/OrganizationsOrPhongBanInResultTable';
import SinvitesInItem from './sinvites-in-item/Button';

const invitedStatus = ['compulsory', 1, 'delete', 5, 'accept', 2, 'reject', 4];

class ResultsTable extends Component {
  handleInviteChange = () => {
    const { handleInviteChange } = this.props;
    if (typeof handleInviteChange === 'function') {
      handleInviteChange();
    }
  };

  inviteSuccess = () => {
    const { onSubmit } = this.props;
    if (onSubmit) {
      onSubmit();
    }
    this.handleInviteChange();
  };

  handleInvite = (item, action) => {
    const { dispatch } = this.props;
    const target = {
      iid: item.user && item.user.iid,
      type: 'user',
    };
    const params = { item: item.item.iid, act: action, target };
    dispatch(
      handleInviteCourseRequest(params, this.inviteSuccess, {
        success: t1(`${action}_success`),
        error: t1(`${action}_error`),
      }),
    );
  };

  render() {
    const {
      ntype,
      checkKey,
      keysSave,
      items,
      searchFormId,
      node,
      fieldName,
      resultId,
      hasPermUpdate,
    } = this.props;
    const width = {
      type: '5%',
      status: '10%',
      action: '10%',
    };

    if (!items) {
      return null;
    }

    // we unwind the histories array because we will display each history record as a separated row
    let rows = unwind(
      items,
      'histories',
      'history',
      (item, sinviteIndex, historyIndexInSinvite) => {
        return Object.assign({}, item, {
          key: `invite-${lodashGet(item, 'id')}-${historyIndexInSinvite}`,
        });
      },
    );

    // some sinvites may take more than 1 row (if there are more than one history record)
    const keyToGroupSinvite = 'id';

    rows = populateRowSpanInfoToRenderListOfItemAsTable(rows, [
      keyToGroupSinvite,
    ]);

    const bodyRowCheckBoxSpans = rows.map((item) =>
      lodashGet(item, `rowSpans[${keyToGroupSinvite}]`),
    );

    return (
      <div className="table-result">
        <Table
          selectable={hasPermUpdate}
          itemList={rows}
          checkKey={checkKey}
          keysSave={keysSave}
          multiSelectable={hasPermUpdate}
          bodyRowCheckBoxSpans={bodyRowCheckBoxSpans}
          name={fieldName}
        >
          <TableHeader displaySelectAll enableSelectAll adjustForCheckbox>
            <TableRow>
              <TableHeaderColumn>{t1('code')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('name')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('organization')}</TableHeaderColumn>
              {(!node || !node.iid) && (
                <TableHeaderColumn>
                  {t1('major')} / {t1('ico')}
                </TableHeaderColumn>
              )}
              {(!node || !node.iid) && (
                <TableHeaderColumn>
                  {t1('training_mode')} / {t1('training_level')}
                </TableHeaderColumn>
              )}
              {(!node || !node.iid) && (
                <TableHeaderColumn>{t1('credit_syllabus')}</TableHeaderColumn>
              )}
              {(!node || !node.iid) && (
                <TableHeaderColumn title={t1('learn_item')}>
                  {t1('learn_item')}
                </TableHeaderColumn>
              )}
              <TableHeaderColumn title={t1('invite_time')}>
                {t1('invite_time')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('status')} width={width.status}>
                {t1('status')}
              </TableHeaderColumn>
              {hasPermUpdate && (
                <TableHeaderColumn title={t1('actions')} width={width.action}>
                  {t1('actions')}
                </TableHeaderColumn>
              )}
            </TableRow>
          </TableHeader>

          <TableBody
            displayRowCheckbox
            showRowHover={false}
            stripedRows={false}
            key={resultId}
          >
            {rows &&
              rows.map((item) => {
                const history = lodashGet(item, 'history');
                const sinviteRowSpan = lodashGet(
                  item,
                  `rowSpans[${keyToGroupSinvite}]`,
                );
                return (
                  <TableRow key={lodashGet(item, 'key')}>
                    {sinviteRowSpan && (
                      <TableRowColumn rowSpan={sinviteRowSpan}>
                        {item.user && item.user.iid && (
                          <div>
                            <Link to={getUrl('admin_view_student', item.user)}>
                              {item.user.code || item.user.iid}
                            </Link>
                          </div>
                        )}
                      </TableRowColumn>
                    )}
                    {sinviteRowSpan && (
                      <TableRowColumn rowSpan={sinviteRowSpan}>
                        {item.user && item.user.iid && (
                          <Link to={getUrl('admin_view_student', item.user)}>
                            <Avatar user={item.user} size={30} />
                            &nbsp; {item.user && item.user.name}{' '}
                            {/*
                            <span className="text-muted">
                              {item.user && item.user.iid}
                            </span>
*/}
                          </Link>
                        )}
                      </TableRowColumn>
                    )}

                    <TableRowColumn>
                      <OrganizationsOrPhongBan
                        item={lodashGet(item, 'user')}
                        attr={'user_organizations'}
                        showParentsInfo
                      />
                    </TableRowColumn>

                    {sinviteRowSpan && (!node || !node.iid) && (
                      <TableRowColumn rowSpan={sinviteRowSpan}>
                        {lodashGet(item, 'item.major_name') &&
                          `${lodashGet(item, 'item.major_name')} / `}
                        {lodashGet(item, 'item.ico_name')}
                      </TableRowColumn>
                    )}
                    {sinviteRowSpan && (!node || !node.iid) && (
                      <TableRowColumn rowSpan={sinviteRowSpan}>
                        {lodashGet(item, 'item.training_mode') &&
                          `${t1(lodashGet(item, 'item.training_mode'))} / `}
                        {t1(lodashGet(item, 'item.training_level'))}
                      </TableRowColumn>
                    )}
                    {sinviteRowSpan && (!node || !node.iid) && (
                      <TableRowColumn rowSpan={sinviteRowSpan}>
                        {lodashGet(item, 'item.credit_syllabus_name') &&
                          lodashGet(item, 'item.credit_syllabus_name')}
                      </TableRowColumn>
                    )}
                    {sinviteRowSpan && (!node || !node.iid) && (
                      <TableRowColumn rowSpan={sinviteRowSpan}>
                        {item.item && item.item.iid && (
                          <SinvitesInItem item={item.item} />
                        )}
                      </TableRowColumn>
                    )}
                    <TableRowColumn>
                      {history && history.ts && history.time_invite && (
                        <div>{history.time_invite}</div>
                      )}
                      {history && history.note && (
                        <div className="text-muted">
                          <span
                            contentEditable="false"
                            dangerouslySetInnerHTML={{ __html: history.note }}
                          />
                        </div>
                      )}
                    </TableRowColumn>
                    <TableRowColumn width={width.status}>
                      {history && displayStatusInvited(history.status)}
                    </TableRowColumn>
                    {hasPermUpdate && (
                      <TableRowColumn width={width.action}>
                        <div>
                          {(!ntype || ntype !== 'contest') && (
                            <span>
                              {history &&
                                !invitedStatus.includes(history.status) && (
                                  <IconButton
                                    title={t1('accept')}
                                    iconClassName="mi mi-done"
                                    onClick={() =>
                                      this.handleInvite(item, 'accept')
                                    }
                                  />
                                )}
                              {history &&
                                !invitedStatus.includes(history.status) && (
                                  <IconButton
                                    title={t1('reject')}
                                    iconClassName="mi mi-close"
                                    onClick={() =>
                                      this.handleInvite(item, 'reject')
                                    }
                                  />
                                )}
                            </span>
                          )}
                          <DeleteItem
                            alternativeApi="/invite/api/delete"
                            params={{
                              target: {
                                type: 'user',
                                iid: item.user && item.user.iid,
                              },
                              historyId: history && history.ts,
                            }}
                            itemId={item.id}
                            formid={searchFormId}
                            onRequestSuccessful={this.handleInviteChange}
                          />
                        </div>
                      </TableRowColumn>
                    )}
                  </TableRow>
                );
              })}
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default ResultsTable;
