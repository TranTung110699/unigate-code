import React, { Component } from 'react';
import { t1 } from 'translate';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import IconButton from 'material-ui/IconButton';
import actions from 'actions/node/creators';
import routes from 'routes';
import ActionToggle from 'components/common/toggle/ActionToggle';
import { timestampToDateString } from 'common/utils/Date';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import { Link } from 'react-router-dom';

import UpdateForm from '../new/Form';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';

class Results extends Component {
  actionToggleDataSet = { on: 'approved', off: 'queued' };

  currentToggleDataSet = { on: 1, off: 0 };

  handleIsCurrentChange = () => {
    window.location.reload();
  };

  updateItem(item) {
    const { dispatch } = this.props;
    const node = { ...item };
    if (item.type === 'semester') {
      const schoolYear = node.school_year;
      if (schoolYear) {
        node.school_year = schoolYear.id;
      }
    }
    const title = t1(
      item.type === 'semester' ? 'edit_semester' : 'edit_school_year',
    );
    const contentDialog = (
      <UpdateForm
        mode="edit"
        title={title}
        node={node}
        step=""
        formid="edit_semester"
        searchFormId="semester_search"
      />
    );

    const optionsProperties = {
      handleClose: true,
      title,

      modal: true,
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  render() {
    const { items, formid, ntype, isSIS } = this.props;

    const width = {
      name: '10%',
      type: '10%',
      minimumCredits: '10%',
      period: '10%',
      status: '10%',
      action: '10%',
      schoolYear: '10%',
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
              <TableHeaderColumn width={width.name}>
                {t1('name')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.type}>
                {t1('type')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.period}>
                {t1('start_date')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.period}>
                {t1('end_date')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.minimumCredits}>
                {t1('minimum_credits')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.schoolYear}>
                {t1('school_year')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.status}>
                {t1('approved')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.status}>
                {t1('is_current')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.action}>
                {t1('actions')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow
                  key={item.id}
                  className={
                    item.status === 'deleted' && 'searchResultsDeletedRow'
                  }
                >
                  <TableRowColumn width={width.name}>
                    {item.type === 'school_year' ? (
                      item.name
                    ) : (
                      <Link
                        to={routes.url('node_edit', {
                          ...item,
                          step: 'dashboard',
                        })}
                      >
                        {item.name}
                      </Link>
                    )}
                  </TableRowColumn>
                  <TableRowColumn width={width.type}>
                    {t1(item.type)}
                  </TableRowColumn>
                  <TableRowColumn width={width.period}>
                    {timestampToDateString(item.start_date)}
                  </TableRowColumn>
                  <TableRowColumn width={width.period}>
                    {timestampToDateString(item.end_date)}
                  </TableRowColumn>
                  <TableRowColumn width={width.minimumCredits}>
                    {item.minimum_credits}
                  </TableRowColumn>
                  <TableRowColumn width={width.schoolYear}>
                    {item.school_year && item.school_year.name}
                  </TableRowColumn>

                  <TableRowColumn width={width.status} title={t1('approved')}>
                    <ActionToggle
                      hideLabel
                      baseURL={routes.url('node_update', {
                        ...item,
                        step: 'status',
                      })}
                      dataSet={this.actionToggleDataSet}
                      value={item.status || 'queued'}
                      name="status"
                    />
                  </TableRowColumn>

                  <TableRowColumn width={width.status} title={t1('current')}>
                    {item.type === 'semester' && item.status === 'approved' && (
                      <ActionToggle
                        hideLabel
                        baseURL={routes.url('node_update', {
                          ...item,
                          step: 'is_current',
                        })}
                        dataSet={this.currentToggleDataSet}
                        value={item.is_current || 0}
                        name="is_current"
                        handleChange={this.handleIsCurrentChange}
                      />
                    )}
                  </TableRowColumn>

                  <TableRowColumn width={width.action}>
                    {item.type === 'school_year' ? (
                      <IconButton
                        title={t1('edit')}
                        iconClassName="mi mi-edit"
                        onClick={() => this.updateItem(item)}
                      />
                    ) : (
                      <Link
                        to={routes.url('node_edit', {
                          ...item,
                          step: 'dashboard',
                        })}
                      >
                        <IconButton
                          title={t1('edit')}
                          iconClassName="mi mi-edit"
                        />
                      </Link>
                    )}

                    <DeleteItem
                      title={t1(
                        item.type === 'semester'
                          ? 'delete_semester'
                          : 'delete_school_year',
                      )}
                      textConfirm={t1(
                        `do_you_really_want_to_delete_this_${
                          item.type === 'semester' ? 'semester' : 'school_year'
                        }`,
                      )}
                      formid={formid}
                      ntype={ntype}
                      itemId={item.id}
                    />
                    {isSIS &&
                      item.type === 'semester' &&
                      item.status === 'approved' && (
                        <div
                          style={{ display: 'inline-block' }}
                          title={t1('set_semester_is_finished')}
                        >
                          <ActionToggle
                            hideLabel
                            baseURL={routes.url('node_update', {
                              ...item,
                              step: 'finished',
                            })}
                            dataSet={{ on: 1, off: 0 }}
                            value={item.finished || 0}
                            name="finished"
                            confirmToChange={(loggle) => {
                              return loggle
                                ? t1(
                                    'when_you_changed_to_finished,_the_system_will_be_summarised_learning_result_by_semester' +
                                      '_and_send_a_warning_to_students_with_low_accumulation_score.are_you_sure_you_want_to_do_this!',
                                  )
                                : t1(
                                    'when_you_changed_to_un-finished.if_a_change_to_finished_again,_the_system_will_be_re-summarised_learning_result_by_semester' +
                                      '_and_send_a_re-warning_to_students_with_low_accumulation_score.are_you_sure_you_want_to_do_this!',
                                  );
                            }}
                          />
                        </div>
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

export default withSchoolConfigs(Results);
