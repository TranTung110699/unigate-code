import React, { Component } from 'react';
import { t1 } from 'translate';
import { Link } from 'react-router-dom';
import routes from 'routes';
import FlatButton from 'components/common/mui/FlatButton';
import commonSagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';

import Icon from 'components/common/Icon';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import ActionToggle from 'components/common/toggle/ActionToggle';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';

const width = {
  iid: '10%',
  status: '10%',
  privacyStatus: '10%',
  action: '15%',
  price: '10%',
};

class Results extends Component {
  actionToggleDataSet = { on: 'approved', off: 'queued' };
  actionTogglePrivacyStatus = { on: 1, off: 0 };

  changeRelationWithPath(pathIid, userIid, url) {
    const { id, dispatch } = this.props;

    const params = {
      oid: pathIid,
      sid: userIid,
      object: 'path',
      subject: 'user',
      rt: 1,
      formid: id,
    };

    dispatch(commonSagaActions.changeRelationRequest(url, params));
  }

  unlockPath(pathIid, userIid) {
    console.log('info: ', pathIid, userIid);
    this.changeRelationWithPath(pathIid, userIid, apiUrls.add_relation);
  }

  removeUnlockedPath(pathIid, userIid) {
    this.changeRelationWithPath(pathIid, userIid, apiUrls.remove_relation);
  }

  render() {
    const { items, formid, ntype, type, userIid } = this.props;

    const label = {
      name: t1('name'),
      iid: t1('code'),
      price: t1('price'),
      status: t1('approved'),
      action: t1('action'),
      editPath: t1('edit_path'),
      remove: t1('remove'),
      textConfirm: t1('are_you_sure_you_want_to_do_this'),
      privacyStatus: t1('privacy_status'),
      editIcon: <Icon title={this.editPath} icon="edit" />,
    };

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn width={width.iid}>
                {label.iid}
              </TableHeaderColumn>
              <TableHeaderColumn>{label.name}</TableHeaderColumn>
              <TableHeaderColumn width={width.privacyStatus}>
                {label.privacyStatus}
              </TableHeaderColumn>
              {type === 'unlock' && (
                <TableHeaderColumn
                  width={width.price}
                  style={{ textAlign: 'right' }}
                >
                  {label.price}
                </TableHeaderColumn>
              )}
              {type !== 'unlock' && (
                <TableHeaderColumn width={width.status}>
                  {label.status}
                </TableHeaderColumn>
              )}
              <TableHeaderColumn className="text-center" width={width.action}>
                {label.action}
              </TableHeaderColumn>
              ,
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow
                  key={item.iid}
                  className={
                    item.status === 'deleted' && 'searchResultsDeletedRow'
                  }
                >
                  <TableRowColumn width={width.iid}>
                    <Link to={routes.url('node_edit', item)}>{item.code}</Link>
                  </TableRowColumn>
                  <TableRowColumn>
                    <Link to={routes.url('node_edit', item)}>{item.name}</Link>
                  </TableRowColumn>
                  <TableRowColumn width={width.privacyStatus}>
                    <ActionToggle
                      hideLabel
                      baseURL={routes.url('node_update', {
                        ...item,
                        step: 'private',
                      })}
                      dataSet={this.actionTogglePrivacyStatus}
                      value={item.private || 0}
                      name="private"
                      title={t1('change_privacy_status')}
                    />
                  </TableRowColumn>
                  {type !== 'unlock' && (
                    <TableRowColumn width={width.status}>
                      <ActionToggle
                        hideLabel
                        baseURL={routes.url('node_update', {
                          ...item,
                          step: 'status',
                        })}
                        dataSet={this.actionToggleDataSet}
                        value={item.status || 'queued'}
                        name="status"
                        title={t1('approve_or_queue_path')}
                      />
                    </TableRowColumn>
                  )}
                  {type === 'unlock' && (
                    <TableRowColumn
                      width={width.price}
                      style={{ textAlign: 'right' }}
                    >
                      {item.price}
                    </TableRowColumn>
                  )}
                  <TableRowColumn
                    width={width.action}
                    className="text-center"
                    style={{ fontSize: '120%' }}
                  >
                    {type !== 'unlock'
                      ? [
                          <Link to={routes.url('node_edit', item)}>
                            <Icon icon={label.editIcon} />
                          </Link>,
                          <DeleteItem
                            title={label.remove}
                            textConfirm={label.confirmDelete}
                            formid={formid}
                            ntype={ntype}
                            itemId={item.id}
                            iconButton
                          />,
                        ]
                      : item.price > 0 && (
                          <Icon
                            icon={item.unlocked ? 'unlock_path' : 'lock_path'}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              item.unlocked
                                ? this.removeUnlockedPath(item.iid, userIid)
                                : this.unlockPath(item.iid, userIid);
                            }}
                          />
                        )}
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Results;
