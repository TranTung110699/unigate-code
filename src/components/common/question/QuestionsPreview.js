import React from 'react';
import { t1, t4 } from 'translate';
import Table from 'antd/lib/table';
import { showInTable } from 'common/utils/antd';
import {
  questionTypeInTextAbbreviated,
  types,
} from 'components/admin/question/schema/question-types';
import { v4 } from 'uuid';
import { stripHTML, wordBreadcrumb } from 'common/utils/string';
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
          <ul className="m-0 p-5 p-l-15">
            {item.answers2 &&
              item.answers2.map((i) => (
                <li key={v4()}>
                  {i.is_answer ? (
                    <span>
                      <b>{i.text}</b> ({t4('is_answer')})
                    </span>
                  ) : (
                    i.text
                  )}
                </li>
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

export const UserAnswer = ({ item, userAnswer }) => {
  return (
    item && (
      <React.Fragment>
        {item.type === types.TYPE_MC ? (
          <ul className="m-0 p-5">
            {item.answers2 &&
              item.answers2.map((i) => (
                <li key={v4()}>
                  {i.is_answer ? (
                    <span>
                      <b>{i.text}</b> ({t4('is_answer')})
                    </span>
                  ) : (
                    i.text
                  )}
                </li>
              ))}
          </ul>
        ) : null}

        {item.type === types.TYPE_INLINE ? (
          <ul style={{ listStyle: 'none' }} className="m-0 p-5">
            {item.answers &&
              item.answers.map((i) => <li key={v4()}>{i[0]}</li>)}
          </ul>
        ) : null}

        {item.type === types.TYPE_OPEN_ENDED ? (
          <DisplayHtml
            content={lodashGet(userAnswer, 'content')}
            showLessMore
            lessWordCount={100}
          />
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

export const QuestionFullPreview = ({ item }) => {
  if (!item) return null;

  return (
    <div>
      <DisplayHtml content={item.content} />
      <div className="p-l-10">
        <QuestionAnswer item={item} />
      </div>
    </div>
  );
};

export const QuestionDifficultyLevel = ({ item }) => {
  if (item && item.difficulty) {
    return t1(item.difficulty);
  }
  return null;
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

const QuestionsPreview = ({
  items,
  readOnly = false,
  columnsNotToShow = [],
  renderActions,
  categoryMappingWithTheSkills,
  elementDeleteQuestions = null,
}) => {
  let [selectedRowKeys, onSelectChange] = React.useState(false);
  const categoryLabel = t1('category');
  const skillsLabel = t1('skills');
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

  const isRenderActions = (item) =>
    typeof renderActions === 'function' ? renderActions(item) : null;

  const columns = [
    {
      title: typeLabel,
      key: QuestionsPreviewColumns.TYPE,
      width: typeWidth,
      render(item) {
        return {
          props: {
            style: styleCol,
          },
          children: <QuestionType item={item} />,
        };
      },
    },
    categoryMappingWithTheSkills && {
      title: skillsLabel,
      key: QuestionsPreviewColumns.CATEGORY,
      width: categoryWidth,
      render(item) {
        return {
          props: {
            style: styleCol,
          },
          children: <QuestionSkill item={item} />,
        };
      },
    },
    !categoryMappingWithTheSkills && {
      title: categoryLabel,
      key: QuestionsPreviewColumns.CATEGORY,
      width: categoryWidth,
      render(item) {
        return {
          props: {
            style: styleCol,
          },
          children: (Array.isArray(item.tags) ? item.tags : []).join(','),
        };
      },
    },
    !categoryMappingWithTheSkills && {
      title: levelLabel,
      key: QuestionsPreviewColumns.CATEGORY,
      render(item) {
        return {
          props: {
            style: styleCol,
          },
          children: item.level,
        };
      },
    },
    /*    {
      title: codeLabel,
      key: QuestionsPreviewColumns.CODE,
      width: codeWidth,
      render(item) {
        return {
          props: {
            style: styleColBreak,
          },
          children: <QuestionCode item={item} />,
        };
      },
    },*/
    {
      title: contentLabel,
      key: QuestionsPreviewColumns.CONTENT,
      width: contentWidth,
      render(item) {
        return {
          props: {
            style: styleCol,
          },
          children: <QuestionContent item={item} />,
        };
      },
    },
    {
      title: answerLabel,
      key: QuestionsPreviewColumns.ANSWER,
      width: answerWidth,
      render(item) {
        return {
          props: {
            style: styleCol,
          },
          children: <QuestionAnswer item={item} />,
        };
      },
    },
    {
      title: difficultyLevelLabel,
      key: QuestionsPreviewColumns.DIFFICULTY_LEVEL,
      width: difficultyLevelWidth,
      render(item) {
        return {
          props: {
            style: styleColBreak,
          },
          children: <QuestionDifficultyLevel item={item} />,
        };
      },
    },
    !readOnly && {
      title: actionsLabel,
      key: QuestionsPreviewColumns.ACTIONS,
      width: actionsWidth,
      render(item) {
        return {
          props: {
            style: styleCol,
          },
          children: isRenderActions(item),
        };
      },
    },
  ].filter(Boolean);

  return [
    !readOnly &&
      elementDeleteQuestions &&
      elementDeleteQuestions(selectedRowKeys, () => {
        onSelectChange([]);
      }),
    <Table
      columns={showInTable(columns, columnsNotToShow)}
      dataSource={items}
      pagination={false}
      rowKey="id"
      bordered
      childrenColumnName={null}
      className="white-background"
      rowSelection={
        !elementDeleteQuestions || readOnly
          ? null
          : {
              selectedRowKeys,
              onChange: onSelectChange,
            }
      }
    />,
  ];
};

export default QuestionsPreview;
