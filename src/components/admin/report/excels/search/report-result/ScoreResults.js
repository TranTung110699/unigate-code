import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';

class ScoreResults extends Component {
  render() {
    const { items } = this.props;

    const scoreStyle = {
      textAlign: 'center',
    };

    const actionStyle = {
      textAlign: 'right',
    };

    return (
      <div>
        <Table>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn rowSpan="2" title={t1('full_name')}>
                {t1('full_name')}
              </TableHeaderColumn>
              <TableHeaderColumn rowSpan="2" title={t1('parent_email')}>
                {t1('parent_email')}
              </TableHeaderColumn>
              <TableHeaderColumn rowSpan="2" title={t1('school')}>
                {t1('school')}
              </TableHeaderColumn>
              <TableHeaderColumn
                rowSpan="2"
                width="8%"
                title={t1('spent_time')}
              >
                {t1('spent_time')}
              </TableHeaderColumn>
              <TableHeaderColumn
                colSpan="3"
                style={scoreStyle}
                width="15%"
                title={t1('result')}
              >
                {t1('result')}
              </TableHeaderColumn>
              <TableHeaderColumn
                rowSpan="2"
                style={scoreStyle}
                width="8%"
                title={t1('score')}
              >
                {t1('score')}
              </TableHeaderColumn>
              <TableHeaderColumn
                rowSpan="2"
                width="10%"
                title={t1('number_of_answers')}
              >
                {t1('number_of_answers')}
              </TableHeaderColumn>
            </TableRow>

            <TableRow>
              <TableHeaderColumn
                style={scoreStyle}
                width="5%"
                title={t1('reading_score')}
              >
                {t1('reading')}
              </TableHeaderColumn>
              <TableHeaderColumn
                style={scoreStyle}
                width="5%"
                title={t1('listening_score')}
              >
                {t1('listening')}
              </TableHeaderColumn>
              <TableHeaderColumn
                style={scoreStyle}
                width="5%"
                title={t1('writing_score')}
              >
                {t1('writing')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn>
                    {item && item.user && item.user.name}
                  </TableRowColumn>
                  <TableRowColumn
                    title={`${t1('parent')} ${item &&
                      item.user &&
                      item.user.parent &&
                      item.user.parent.name}: ${item &&
                      item.user &&
                      item.user.parent &&
                      item.user.parent.phone}`}
                  >
                    {item &&
                      item.user &&
                      item.user.parent &&
                      item.user.parent.mail}
                  </TableRowColumn>
                  <TableRowColumn
                    title={
                      item &&
                      item.user &&
                      item.user.school &&
                      item.user.school.name
                    }
                  >
                    {t1('grade')}{' '}
                    {item &&
                      item.user &&
                      item.user.school &&
                      item.user.school.grade}{' '}
                    -{' '}
                    {item &&
                      item.user &&
                      item.user.school &&
                      item.user.school.name}
                  </TableRowColumn>
                  <TableRowColumn width="8%" title={item.spent_time}>
                    {item.spent_time}
                  </TableRowColumn>
                  <TableRowColumn style={scoreStyle} width="5%">
                    {item.read_score}
                  </TableRowColumn>
                  <TableRowColumn style={scoreStyle} width="5%">
                    {item.listen_score}
                  </TableRowColumn>
                  <TableRowColumn style={scoreStyle} width="5%">
                    {item.write_score}
                  </TableRowColumn>
                  <TableRowColumn style={scoreStyle} width="8%">
                    {item.score}
                  </TableRowColumn>
                  <TableRowColumn style={actionStyle} width="10%">
                    {item.number_of_answers}
                    <Icon icon="preview" title={t1('preview')} />
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default connect()(ScoreResults);
