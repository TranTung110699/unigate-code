import React, { Component } from 'react';
import { connect } from 'react-redux';
import routes from 'routes';
import { submit } from 'redux-form';
import { t1 } from 'translate';
import ButtonAction from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import ActionToggle from 'components/common/toggle/ActionToggle';
import DetailOnDialog from 'components/common/detail-on-dialog';
import apiUrls from 'api-endpoints';
import FormNewInvite from '../new/FormNewInvite';
import {
  timestampToDateString,
  timestampToDateTimeString,
} from 'common/utils/Date';
import lodashGet from 'lodash.get';

const dialogOptionsProperties = {
  handleClose: true,
  width: '90%',
};

class Results extends Component {
  actionToggleDataSet = { on: 'approved', off: 'queued' };

  handleRefreshForm = () => {
    const { dispatch, formid } = this.props;
    dispatch(submit(formid));
  };

  renderPreview = ({ showFull, item }) => (
    <Icon
      className="action"
      style={{ fontSize: 20 }}
      icon={item && item.status === 'queued' ? 'edit' : 'preview'}
      onClick={showFull}
    />
  );

  handleEditEnrolmentSession = ({ item, closeDialog }) => (
    <FormNewInvite
      alternativeApi={routes.url('node_update', { ...item, ntype: 'invite' })}
      node={item}
      mode="edit"
      searchFormId={this.props.formid}
      readOnly={!(item && item.status === 'queued')}
      inviteSuccessFull={closeDialog}
    />
  );

  render() {
    const { items, formid } = this.props;

    const label = {
      iid: t1('iid'),
      ts: t1('created_at'),
      start_date: t1('start_date'),
      deadline: t1('deadline'),
      organizations: t1('organizations'),
      name: `${t1('name')} (${t1('code')})`,
      actions: t1('action'),
      syncFee: t1('synchronizer_fee'),
      learning_items: t1('learning_items'),
      learners: t1('learners'),
      approved: t1('approved'),
      executed: t1('executed'),
      date: t1('date'),
      confirmDelete: t1('are_you_sure_you_want_to_do_this'),
      confirmSync: t1('are_you_sure_you_want_to_do_this'),
      messageSync: {
        success: t1('async_successfully'),
        error: t1('async_error'),
      },
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
              <TableHeaderColumn>{label.name}</TableHeaderColumn>
              <TableHeaderColumn>{label.organizations}</TableHeaderColumn>
              <TableHeaderColumn>{label.learning_items}</TableHeaderColumn>
              <TableHeaderColumn>{label.learners}</TableHeaderColumn>
              <TableHeaderColumn>{label.ts}</TableHeaderColumn>
              <TableHeaderColumn>{label.start_date}</TableHeaderColumn>
              <TableHeaderColumn>{label.deadline}</TableHeaderColumn>
              <TableHeaderColumn width="5%">{label.approved}</TableHeaderColumn>
              <TableHeaderColumn width="5%">{label.executed}</TableHeaderColumn>
              <TableHeaderColumn width="10%">{label.actions}</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn>
                    {item.name} ({item.code})
                  </TableRowColumn>
                  <TableRowColumn>
                    <ul style={{ paddingLeft: 12 }}>
                      {lodashGet(item, '__expand.organizations', []).map(
                        (org) => org && <li>{org.name}</li>,
                      )}
                    </ul>
                  </TableRowColumn>
                  <TableRowColumn>
                    {Array.isArray(item.learning_items) &&
                      item.learning_items.length > 0 && (
                        <ol style={{ paddingLeft: 12 }}>
                          {item.learning_items.map((learningItem) => (
                            <li>
                              <Icon icon={learningItem.ntype} />
                              {`${t1(learningItem.ntype)}: ${
                                learningItem.name
                              }`}
                            </li>
                          ))}
                        </ol>
                      )}
                  </TableRowColumn>
                  <TableRowColumn>
                    {Array.isArray(item.learners) && item.learners.length > 0 && (
                      <ol style={{ paddingLeft: 12 }}>
                        {item.learners.map((learner) => (
                          <li>
                            <Icon icon="user" />
                            {`${t1(learner.type)}: ${learner.name}`}
                          </li>
                        ))}
                      </ol>
                    )}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.ts && timestampToDateTimeString(item.ts)}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.start_date && timestampToDateString(item.start_date)}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.deadline && timestampToDateString(item.deadline)}
                  </TableRowColumn>
                  <TableRowColumn width="5%">
                    {(() => {
                      if (item.status === 'executed') {
                        return '';
                      }
                      return (
                        <ActionToggle
                          baseURL={routes.url('node_update', {
                            ...item,
                            ntype: 'invite',
                            step: 'status',
                          })}
                          dataSet={this.actionToggleDataSet}
                          value={item.status || 'queued'}
                          name="status"
                          handleChange={this.handleRefreshForm}
                        />
                      );
                    })()}
                  </TableRowColumn>
                  <TableRowColumn width="5%">
                    {(() => {
                      switch (item.status) {
                        case 'executed': {
                          return t1('executed');
                        }
                        case 'approved': {
                          return (
                            <ActionToggle
                              baseURL={apiUrls.execute_enrolment_session(
                                item.id,
                              )}
                              value={item.status === 'executed'}
                              name="executed"
                              handleChange={this.handleRefreshForm}
                            />
                          );
                        }
                        default: {
                          return t1('wait_for_approval');
                        }
                      }
                    })()}
                  </TableRowColumn>
                  <TableRowColumn width="10%">
                    <DetailOnDialog
                      renderPreview={({ showFull }) =>
                        this.renderPreview({ showFull, item })
                      }
                      renderFull={({ closeDialog }) =>
                        this.handleEditEnrolmentSession({ item, closeDialog })
                      }
                      dialogOptionsProperties={{
                        ...dialogOptionsProperties,
                        title: t1(
                          item.status === 'queued' ? 'edit_%s' : 'review_%s',
                          [item.name],
                        ),
                      }}
                      dialogKey="enrolment-session-edit"
                    />
                    {item.status === 'queued' && (
                      <ButtonAction
                        title={label.delete}
                        textConfirm={label.confirmDelete}
                        formid={formid}
                        ntype="invite"
                        step="enrolment-session"
                        itemId={item.id}
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

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default connect()(Results);
