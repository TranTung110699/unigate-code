import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import ButtonAction from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ActionToggle from 'components/common/toggle/ActionToggle';
import { timestampToDateString } from 'common/utils/Date';
import routes from 'routes';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import { submit } from 'redux-form';
import { Link } from 'react-router-dom';

const label = {
  iid: t1('iid'),
  code: t1('code'),
  name: t1('name'),
  actions: t1('action'),
  syncFee: t1('synchronizer_fee'),
  status: t1('status'),
  date: t1('date'),
  confirmDelete: t1('are_you_sure_you_want_to_do_this'),
  confirmSync: t1('are_you_sure_you_want_to_do_this'),
  messageSync: { success: t1('async_successfully'), error: t1('async_error') },
};

class Results extends Component {
  actionToggleDataSet = { on: 'approved', off: 'queued' };

  handleRefreshForm = () => {
    const { dispatch, formid } = this.props;
    dispatch(submit(formid));
  };

  render() {
    const { items, formid } = this.props;

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>{label.code}</TableHeaderColumn>
              <TableHeaderColumn>{label.name}</TableHeaderColumn>
              <TableHeaderColumn>{label.date}</TableHeaderColumn>
              <TableHeaderColumn>{label.status}</TableHeaderColumn>
              <TableHeaderColumn>{label.actions}</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn>{item.code}</TableRowColumn>
                  <TableRowColumn>
                    <Link
                      to={routes.url('node_edit', {
                        ...item,
                        step: 'applied-fees',
                      })}
                    >
                      {item.name}
                    </Link>{' '}
                    <span className="text-muted">
                      (#
                      {item.iid})
                    </span>
                  </TableRowColumn>
                  <TableRowColumn>
                    {`${t1('from')}: ${
                      item.start_date
                        ? timestampToDateString(item.start_date)
                        : '--/--/--'
                    } ${t1('to')}:
                     ${
                       item.end_date
                         ? timestampToDateString(item.end_date)
                         : '--/--/--'
                     }`}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.status !== 'deleted' ? (
                      <ActionToggle
                        baseURL={routes.url('node_update', {
                          ...item,
                          step: 'status',
                        })}
                        dataSet={this.actionToggleDataSet}
                        value={item.status || 'queued'}
                        name="status"
                        handleChange={this.handleRefreshForm}
                      />
                    ) : (
                      t1(item.status)
                    )}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item && item.iid && item.status === 'approved' && (
                      <ButtonAction
                        icon="sync"
                        title={label.syncFee}
                        textConfirm={label.confirmSync}
                        alternativeApi={`/fcp/api/create-fees-from-fee-collecting-phase?iid=${item &&
                          item.iid}`}
                        itemId={item.id}
                        message={label.messageSync}
                      />
                    )}
                    {item.status !== 'deleted'
                      ? [
                          <Link
                            to={routes.url('node_edit', {
                              ...item,
                              step: 'applied-fees',
                            })}
                          >
                            <IconButton
                              title={label.edit}
                              iconClassName="mi mi-edit"
                            />
                          </Link>,
                          <ButtonAction
                            title={label.delete}
                            textConfirm={label.confirmDelete}
                            formid={formid}
                            ntype={item.ntype}
                            itemId={item.id}
                          />,
                        ]
                      : '---'}
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
