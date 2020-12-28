import React from 'react';
import { t1 } from 'translate';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import {
  questionTypeInTextAbbreviated,
  types,
} from 'components/admin/question/schema/question-types';
import { v4 } from 'uuid';
import { wordBreadcrumb, stripHTML } from 'common/utils/string';
import DisplayHtml from 'components/common/html';
import DetailOnDialog from 'components/common/detail-on-dialog';
import lodashGet from 'lodash.get';

export const QuestionType = ({ item }) => {
  return questionTypeInTextAbbreviated(item);
};

export const QuestionSkill = ({ item }) => {
  return item && item.skillsObject && item.skillsObject.length ? (
    <ul style={{ listStyleType: 'none' }} className="m-p-0">
      {item.skillsObject.map((skill) => (
        <li key={v4()}>{skill.name}</li>
      ))}
    </ul>
  ) : null;
};

export const QuestionCode = ({ item }) => {
  return item && item.code;
};

export const QuestionContent = ({ item }) => {
  return (
    item && (
      <DetailOnDialog
        textPreview={`${wordBreadcrumb(stripHTML(item.content), 20)}`}
        renderFull={() => <DisplayHtml content={item.content} />}
      />
    )
  );
};

export const QuestionAnswer = ({ item }) => {
  return (
    item && (
      <React.Fragment>
        {item.type === types.TYPE_MC ? (
          <ul style={{ listStyle: 'none' }} className="m-0 p-5">
            {item.answers2 &&
              item.answers2.map((i) => (
                <li key={v4()}>{i.is_answer ? <b>{i.text}</b> : i.text}</li>
              ))}
          </ul>
        ) : null}

        {item.type === types.TYPE_INLINE ? (
          <ul style={{ listStyle: 'none' }} className="m-0 p-5">
            {item.answers &&
              item.answers.map((i) => <li key={v4()}>{i[0]}</li>)}
          </ul>
        ) : null}

        {item.type === types.TYPE_MATCHING_PAIRS ? (
          <div>
            <ul style={{ listStyle: 'none' }} className="m-0 p-5">
              {item.l_pair &&
                item.l_pair.map((i) => (
                  <li key={v4()}>
                    {typeof i === 'string' ? i : lodashGet(i, 'content')}
                  </li>
                ))}
            </ul>
            ---
            <ul style={{ listStyle: 'none' }} className="m-0 p-5">
              {item.r_pair &&
                item.r_pair.map((i) => (
                  <li key={v4()}>
                    {typeof i === 'string' ? i : lodashGet(i, 'content')}
                  </li>
                ))}
            </ul>
          </div>
        ) : null}
      </React.Fragment>
    )
  );
};

export const QuestionDifficultyLevel = ({ item }) => {
  return (item && item.difficulty) || null;
};

export const QuestionsPreviewColumns = {
  TYPE: 'type',
  CATEGORY: 'category',
  CODE: 'code',
  CONTENT: 'content',
  ANSWER: 'answer',
  DIFFICULTY_LEVEL: 'difficulty_level',
  ACTIONS: 'actions',
};

const QuestionsPreview = ({ items, columnsNotToShow = [], renderActions }) => {
  const categoryLabel = t1('skills');
  const levelLabel = t1('level');
  const typeLabel = t1('type');
  const codeLabel = t1('code');
  const contentLabel = t1('question_content');
  const answerLabel = t1('answers');
  const correctAnswerLabel = t1('correct_answer');
  const difficultyLevelLabel = t1('difficulty');
  const actionsLabel = t1('actions');

  const categoryWidth = '15%';
  const typeWidth = '5%';
  const codeWidth = '13%';
  const contentWidth = '25%';
  const answerWidth = '20%';
  const correctAnswerWidth = '5%';
  const difficultyLevelWidth = '5%';
  const actionsWidth = '12%';

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
    <Table>
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
        enableSelectAll={false}
      >
        <TableRow>
          {!columnsNotToShow.includes(QuestionsPreviewColumns.TYPE) && (
            <TableHeaderColumn width={typeWidth} style={styleCol}>
              {typeLabel}
            </TableHeaderColumn>
          )}
          {!columnsNotToShow.includes(QuestionsPreviewColumns.CATEGORY) && (
            <TableHeaderColumn width={categoryWidth} style={styleCol}>
              {categoryLabel}
            </TableHeaderColumn>
          )}
          {!columnsNotToShow.includes(QuestionsPreviewColumns.CODE) && (
            <TableHeaderColumn width={codeWidth} style={styleColBreak}>
              {codeLabel}
            </TableHeaderColumn>
          )}
          {!columnsNotToShow.includes(QuestionsPreviewColumns.CONTENT) && (
            <TableHeaderColumn width={contentWidth} style={styleCol}>
              {contentLabel}
            </TableHeaderColumn>
          )}
          {!columnsNotToShow.includes(QuestionsPreviewColumns.ANSWER) && (
            <TableHeaderColumn width={answerWidth} style={styleCol}>
              {answerLabel}
            </TableHeaderColumn>
          )}
          {!columnsNotToShow.includes(
            QuestionsPreviewColumns.DIFFICULTY_LEVEL,
          ) && (
            <TableHeaderColumn
              width={difficultyLevelWidth}
              style={styleColBreak}
            >
              {difficultyLevelLabel}
            </TableHeaderColumn>
          )}
          {!columnsNotToShow.includes(QuestionsPreviewColumns.ACTIONS) && (
            <TableHeaderColumn width={actionsWidth} style={styleCol}>
              {actionsLabel}
            </TableHeaderColumn>
          )}
        </TableRow>
      </TableHeader>

      <TableBody displayRowCheckbox={false} showRowHover stripedRows>
        {items &&
          items.map((item) => (
            <TableRow key={item.id}>
              {!columnsNotToShow.includes(QuestionsPreviewColumns.TYPE) && (
                <TableRowColumn width={typeWidth} style={styleCol}>
                  <QuestionType item={item} />
                </TableRowColumn>
              )}
              {!columnsNotToShow.includes(QuestionsPreviewColumns.CATEGORY) && (
                <TableRowColumn width={categoryWidth} style={styleCol}>
                  <QuestionSkill item={item} />
                </TableRowColumn>
              )}
              {!columnsNotToShow.includes(QuestionsPreviewColumns.CODE) && (
                <TableRowColumn width={codeWidth} style={styleColBreak}>
                  <QuestionCode item={item} />
                </TableRowColumn>
              )}
              {!columnsNotToShow.includes(QuestionsPreviewColumns.CONTENT) && (
                <TableRowColumn width={contentWidth} style={styleCol}>
                  <QuestionContent item={item} />
                </TableRowColumn>
              )}
              {!columnsNotToShow.includes(QuestionsPreviewColumns.ANSWER) && (
                <TableRowColumn width={answerWidth} style={styleCol}>
                  <QuestionAnswer item={item} />
                </TableRowColumn>
              )}
              {!columnsNotToShow.includes(
                QuestionsPreviewColumns.DIFFICULTY_LEVEL,
              ) && (
                <TableRowColumn
                  width={difficultyLevelWidth}
                  style={styleColBreak}
                >
                  <QuestionDifficultyLevel item={item} />
                </TableRowColumn>
              )}
              {!columnsNotToShow.includes(QuestionsPreviewColumns.ACTIONS) && (
                <TableRowColumn width={actionsWidth} style={styleCol}>
                  {typeof renderActions === 'function'
                    ? renderActions(item)
                    : null}
                </TableRowColumn>
              )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default QuestionsPreview;
