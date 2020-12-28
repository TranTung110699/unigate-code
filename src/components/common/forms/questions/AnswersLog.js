import React from 'react';
import { t1 } from 'translate';
import { timeStampToTime } from 'common/utils/Date';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from '../../mui/Table';

class AnswersLog extends React.Component {
  getAnswersLogOfQuestion = (question, answersLog) => {
    return (
      (question && question.id && answersLog && answersLog[question.id]) || {}
    );
  };

  render() {
    const { question, answersLog } = this.props;
    const answersLogOfQuestion = this.getAnswersLogOfQuestion(
      question,
      answersLog,
    );

    const width = {
      time: '20%',
      answer: '80%',
    };

    // console.log(question, answersLog);
    return (
      <div className="row">
        {answersLogOfQuestion && answersLogOfQuestion.length > 0 && (
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h4 style={{ marginBottom: 0 }}>{t1('answers_log:')}</h4>
            <Table>
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
                stripedRows
              >
                <TableRow>
                  <TableHeaderColumn width={width.time}>
                    {t1('time_of_selected_answer')}
                  </TableHeaderColumn>
                  <TableHeaderColumn width={width.answer}>
                    {t1('selected_answer')}
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>

              <TableBody displayRowCheckbox={false} showRowHover stripedRows>
                {answersLogOfQuestion &&
                  answersLogOfQuestion.map((logEntry) => (
                    <TableRow key={logEntry.ts}>
                      <TableRowColumn width={width.courseCode}>
                        {timeStampToTime(logEntry.ts)}
                      </TableRowColumn>
                      <TableRowColumn width={width.answer}>
                        {question &&
                          question.mc_answers &&
                          question.mc_answers[logEntry.answer[0]] &&
                          question.mc_answers[logEntry.answer[0]].text}
                      </TableRowColumn>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    );
  }
}

export default AnswersLog;
