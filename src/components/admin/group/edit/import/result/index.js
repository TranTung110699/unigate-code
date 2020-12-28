/* eslint-disable jsx-a11y/anchor-is-valid,react/prop-types,no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    const sttLabel = t1('stt');
    const userCodeLabel = t1('user_code');
    const fullNameLabel = t1('full_name');
    const facultyLabel = t1('faculty');
    const majorLabel = t1('major');
    const trainingModeLabel = t1('training_mode');
    const trainingLevelLabel = t1('training_level');
    const icoLabel = t1('ico');
    const semestersLabel = t1('semesters');
    const noteLabel = t1('note');
    const statusLabel = t1('status');

    const sttWidth = '8%';
    const userCodeWidth = '10%';
    const fullNameWidth = '15%';
    const facultyWidth = '10%';
    const majorWidth = '10%';
    const trainingModeWidth = '10%';
    const trainingLevelWidth = '10%';
    const icoWidth = '10%';
    const semestersWidth = '10%';
    const noteWidth = '10%';
    const statusWidth = '15%';

    const styleCol = {
      whiteSpace: 'normal',
      height: '100%',
    };

    return (
      <div className="col-md-12">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn width={sttWidth} style={styleCol}>
                {sttLabel}
              </TableHeaderColumn>
              <TableHeaderColumn width={userCodeWidth} style={styleCol}>
                {userCodeLabel}
              </TableHeaderColumn>
              <TableHeaderColumn width={fullNameWidth} style={styleCol}>
                {fullNameLabel}
              </TableHeaderColumn>
              <TableHeaderColumn width={facultyWidth} style={styleCol}>
                {facultyLabel}
              </TableHeaderColumn>
              <TableHeaderColumn width={majorWidth} style={styleCol}>
                {majorLabel}
              </TableHeaderColumn>
              <TableHeaderColumn width={trainingModeWidth} style={styleCol}>
                {trainingModeLabel}
              </TableHeaderColumn>
              <TableHeaderColumn width={trainingLevelWidth} style={styleCol}>
                {trainingLevelLabel}
              </TableHeaderColumn>
              <TableHeaderColumn width={icoWidth} style={styleCol}>
                {icoLabel}
              </TableHeaderColumn>
              <TableHeaderColumn width={semestersWidth} style={styleCol}>
                {semestersLabel}
              </TableHeaderColumn>
              <TableHeaderColumn width={noteWidth} style={styleCol}>
                {noteLabel}
              </TableHeaderColumn>
              <TableHeaderColumn width={statusWidth} style={styleCol}>
                {statusLabel}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn width={sttWidth} style={styleCol}>
                    {item.content.stt}
                  </TableRowColumn>
                  <TableRowColumn width={userCodeWidth} style={styleCol}>
                    {item.content.user_code}
                  </TableRowColumn>
                  <TableRowColumn width={fullNameWidth} style={styleCol}>
                    {item.content.full_name}
                  </TableRowColumn>
                  <TableRowColumn width={facultyWidth} style={styleCol}>
                    {item.content.faculty}
                  </TableRowColumn>
                  <TableRowColumn width={majorWidth} style={styleCol}>
                    {item.content.major}
                  </TableRowColumn>
                  <TableRowColumn width={trainingModeWidth} style={styleCol}>
                    {item.content.training_mode}
                  </TableRowColumn>
                  <TableRowColumn width={trainingLevelWidth} style={styleCol}>
                    {item.content.training_level}
                  </TableRowColumn>
                  <TableRowColumn width={icoWidth} style={styleCol}>
                    {item.content.ico}
                  </TableRowColumn>
                  <TableRowColumn width={semestersWidth} style={styleCol}>
                    {item.content.semesters}
                  </TableRowColumn>
                  <TableRowColumn width={noteWidth} style={styleCol}>
                    {item.content.note}
                  </TableRowColumn>
                  <TableRowColumn
                    width={statusWidth}
                    style={styleCol}
                    className={item.status === 0 ? 'error' : 'success'}
                  >
                    {item.status === 1 &&
                    (!item.warning_messages ||
                      item.warning_messages.length === 0) ? (
                      t1('ok')
                    ) : (
                      <div>
                        {item &&
                          item.messages &&
                          item.messages.map((message) => (
                            <div>
                              <span>{message}</span>
                            </div>
                          ))}
                      </div>
                    )}
                    <div>
                      {item &&
                        item.warning_messages &&
                        item.warning_messages.map((message) => (
                          <div>
                            <span>{message}</span>
                          </div>
                        ))}
                    </div>
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
