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
import sagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';

class Results extends Component {
  handleClick = () => {
    const { dispatch, metadata } = this.props;
    const url = apiUrls.import_students_action_request;
    const params = {
      id: metadata.import_id,
    };
    dispatch(sagaActions.confirmImportDataRequest(url, params));
  };

  getOptions = (item) => {
    let answers = '';

    Object.keys(item.content).forEach((key) => {
      if (key.includes('option')) {
        if (answers === '') {
          answers = item.content[key];
        } else {
          answers += `,${item.content[key]}`;
        }
      }
    });

    return answers;
  };

  render() {
    const { items } = this.props;
    const categoryLabel = t1('category');
    const levelLabel = t1('level');
    const typeLabel = t1('type');
    const codeLabel = t1('code');
    const contentLabel = t1('question_content');
    const answerLabel = t1('answers');
    const correctAnswerLabel = t1('correct_answer');
    const difficultyLevelLabel = t1('difficulty');
    const statusLabel = t1('status');

    const categoryWidth = '15%';
    const typeWidth = '5%';
    const codeWidth = '13%';
    const contentWidth = '25%';
    const answerWidth = '20%';
    const correctAnswerWidth = '5%';
    const difficultyLevelWidth = '5%';
    const statusWidth = '12%';

    const styleCol = {
      whiteSpace: 'normal',
      height: '100%',
    };

    const styleColBreak = {
      whiteSpace: 'normal',
      height: '100%',
      wordBreak: 'break-all',
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
              <TableHeaderColumn width={typeWidth} style={styleCol}>
                #
              </TableHeaderColumn>
              <TableHeaderColumn width={categoryWidth} style={styleCol}>
                {categoryLabel} {levelLabel}
              </TableHeaderColumn>
              <TableHeaderColumn width={typeWidth} style={styleCol}>
                {typeLabel}
              </TableHeaderColumn>
              <TableHeaderColumn width={codeWidth} style={styleColBreak}>
                {codeLabel}
              </TableHeaderColumn>
              <TableHeaderColumn width={contentWidth} style={styleCol}>
                {contentLabel}
              </TableHeaderColumn>
              <TableHeaderColumn width={answerWidth} style={styleCol}>
                {answerLabel}
              </TableHeaderColumn>
              <TableHeaderColumn width={correctAnswerWidth} style={styleCol}>
                {correctAnswerLabel}
              </TableHeaderColumn>
              <TableHeaderColumn
                width={difficultyLevelWidth}
                style={styleColBreak}
              >
                {difficultyLevelLabel}
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
                  <TableRowColumn width={typeWidth} style={styleCol}>
                    {item.content.stt}
                  </TableRowColumn>
                  <TableRowColumn width={categoryWidth} style={styleCol}>
                    {item.content.category} {item.content.level}
                  </TableRowColumn>

                  <TableRowColumn width={typeWidth} style={styleCol}>
                    {item.content.type}
                  </TableRowColumn>
                  <TableRowColumn width={codeWidth} style={styleColBreak}>
                    {item.content.code}
                  </TableRowColumn>
                  <TableRowColumn width={contentWidth} style={styleCol}>
                    {item.content.content}
                  </TableRowColumn>
                  <TableRowColumn width={answerWidth} style={styleCol}>
                    {this.getOptions(item)}
                  </TableRowColumn>
                  <TableRowColumn width={correctAnswerWidth} style={styleCol}>
                    {item.content.result}
                  </TableRowColumn>
                  <TableRowColumn
                    width={difficultyLevelWidth}
                    style={styleColBreak}
                  >
                    {item.content.difficulty}
                  </TableRowColumn>
                  <TableRowColumn
                    width={statusWidth}
                    style={styleCol}
                    className={item.status === 0 ? 'error' : 'success'}
                  >
                    {item.status === 1 ? (
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
