import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t1 } from 'translate';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';

class Results extends Component {
  render() {
    const { items } = this.props;

    return (
      <div>
        <Table name="result">
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn title={t1('user_iid')}>
                {t1('user_iid')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('user_name')}>
                {t1('user_name')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('grade')}>
                {t1('grade')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('number_of_answers')}>
                {t1('number_of_answers')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('score')}>
                {t1('score')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('start_time')}>
                {t1('start_time')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('finished_time')}>
                {t1('finished_time')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('spent_time')}>
                {t1('spent_time')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('real_spent_time')}>
                {t1('real_spent_time')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('doing_status')}>
                {t1('doing_status')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('total_violation')}>
                {t1('total_violation')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('violation_history')}>
                {t1('violation_history')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.u_id}>
                  <TableRowColumn title={item.u_iid}>
                    {item.u_iid}
                  </TableRowColumn>
                  <TableRowColumn title={item.u_name}>
                    {item.u_name}
                  </TableRowColumn>
                  <TableRowColumn title={item.grade}>
                    {item.grade}
                  </TableRowColumn>
                  <TableRowColumn title={item.number_of_answers}>
                    {item.number_of_answers}
                  </TableRowColumn>
                  <TableRowColumn title={item.score}>
                    {item.score}
                  </TableRowColumn>
                  <TableRowColumn title={item.start_time}>
                    {item.start_time}
                  </TableRowColumn>
                  <TableRowColumn title={item.finished_time}>
                    {item.finished_time}
                  </TableRowColumn>
                  <TableRowColumn title={item.spent_time}>
                    {item.spent_time}
                  </TableRowColumn>
                  <TableRowColumn title={item.real_spent_time}>
                    {item.real_spent_time}
                  </TableRowColumn>
                  <TableRowColumn title={item.doing_status}>
                    {item.doing_status}
                  </TableRowColumn>
                  <TableRowColumn title={item.violation_total}>
                    {item.violation_total}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.violation_history.map((history) => (
                      <div key={history} title={history}>
                        {history}
                      </div>
                    ))}
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
