import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import { v4 } from 'uuid';
import RaisedButton from 'components/common/mui/RaisedButton';

class Results extends Component {
  actionToggleDataSet = { on: 'approved', off: 'queued' };

  render() {
    const { items, formid, ntype } = this.props;

    const width = {
      name: '10%',
      type: '10%',
      grade: '5%',
      minimumCredits: '10%',
      period: '10%',
      status: '10%',
      action: '10%',
      schoolYear: '10%',
    };

    const { semester, grade, training_mode } = this.props.searchValues
      ? this.props.searchValues
      : {};

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn width={width.grade}>
                {t1('grade')}
              </TableHeaderColumn>

              <TableHeaderColumn width={width.grade}>
                {t1('training_mode')}
              </TableHeaderColumn>

              <TableHeaderColumn width={width.type}>
                {t1('program_modules')}
              </TableHeaderColumn>

              <TableHeaderColumn width={width.type}>
                {t1('applied_groups')}
              </TableHeaderColumn>

              <TableHeaderColumn width={width.period}>
                {t1('compulsory')}
              </TableHeaderColumn>

              <TableHeaderColumn width={width.period}>
                {t1('approve')}
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
                  {/*
                  <TableRowColumn width={width.name}>
                    {item.name} ({item.iid})
                  </TableRowColumn>

*/}
                  <TableRowColumn width={width.grade}>
                    {item.grade}
                  </TableRowColumn>

                  <TableRowColumn width={width.grade}>
                    {item.training_mode}
                  </TableRowColumn>

                  <TableRowColumn width={width.type}>
                    <a
                      href={`/admin/program/${item.program_iid}`}
                      target="_blank"
                    >
                      {item.modules ? (
                        item.modules.map((m) => (
                          <div key={v4()}>
                            {m.ntype === 'path' ? (
                              <b>{m.name}</b>
                            ) : (
                              <span className={'p-l-10'}>{m.name}</span>
                            )}
                          </div>
                        ))
                      ) : (
                        <span>{t1('no_modules')}</span>
                      )}
                    </a>
                  </TableRowColumn>

                  <TableRowColumn width={width.type}>
                    {item.groups ? (
                      item.groups.map((g) => (
                        <div key={v4()}>
                          <Link to={`/admin/group/${g.iid}/dashboard`}>
                            {g.name}
                          </Link>
                        </div>
                      ))
                    ) : (
                      <span>{t1('whole_grade')}</span>
                    )}
                  </TableRowColumn>

                  <TableRowColumn width={width.period}>
                    {item.compulsory ? (
                      t1('compulsory')
                    ) : (
                      <div>
                        {t1('optional')}
                        <div>
                          <Link
                            to={`/admin/enrolment-plan/${
                              item.enrolment_plan ? item.enrolment_plan.iid : ''
                            }`}
                          >
                            <RaisedButton
                              label={t1('manage_enrolment_plan')}
                              primary
                            />
                          </Link>
                        </div>
                      </div>
                    )}
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

                  <TableRowColumn width={width.action}>
                    {/*
                  <IconButton
                    title={t1('edit')}
                    iconClassName="mi mi-edit"
                    onClick={() => this.updateItem(item)}
                  />
                     */}

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
                      ntype={'training-plan'}
                      itemId={item.id}
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default connect()(Results);
