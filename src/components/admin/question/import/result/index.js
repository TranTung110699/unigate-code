import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import Table from 'antd/lib/table';
import Tag from 'antd/lib/tag';
import sagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';
import { importQuestionTypes } from '../common';
import './stylesheet.scss';

class Results extends Component {
  handleClick = () => {
    const { dispatch, metadata } = this.props;
    const url = apiUrls.import_students_action_request;
    const params = {
      id: metadata.import_id,
    };
    dispatch(sagaActions.confirmImportDataRequest(url, params));
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

    const sttWidth = '3%';
    const categoryWidth = '10%';
    const levelWidth = '5%';
    const typeWidth = '5%';
    const codeWidth = '8%';
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
    const getCorrectAnswers = (option, line = false) => {
      let answers = '';
      let i = 0;
      Object.keys(option).forEach((key) => {
        if (key.includes('option')) {
          if (answers === '') {
            answers = `<li>${option[key]}</li>`;
          } else {
            answers += `<li>${option[key]}</li>${
              i % 2 === 0 && line ? '<hr/>' : ''
            }`;
            i++;
          }
        }
      });
      return { __html: answers };
    };

    const getQuestion = (question) => {
      if (!question) return {};

      let regex1 = question.match(/\[(.*?)]/g);
      let regex2 = question.match(/__([^-]+)__/g);
      let q;
      if (regex1) {
        q = question.replace(regex1, '_____');
      } else if (regex2) {
        q = question.replace(regex2, '_____');
      } else {
        q = question;
      }

      return q;
    };
    const getItemOption = (item) => {
      switch (item.content.type) {
        case importQuestionTypes.TYPE_MC:
          return getCorrectAnswers(item.content);
        case importQuestionTypes.TYPE_TRUE_FALSE:
          return getCorrectAnswers(item.content);
        case importQuestionTypes.TYPE_MMC:
          return getCorrectAnswers(item.content);
        case importQuestionTypes.TYPE_MATCHING_PAIRS:
          return getCorrectAnswers(item.content, true);
        case importQuestionTypes.TYPE_INLINE:
          let answers = '';
          let question = item.content.content;
          let regex1 = question.match(/\[(.*?)]/g);
          let regex2 = question.match(/__([^-]+)__/g);
          let correctAnswers = [];
          if (regex1) {
            correctAnswers = regex1
              .toString()
              .replace(/[\][]/g, '')
              .split(', ');
          } else if (regex2) {
            correctAnswers = regex2
              .toString()
              .replace(/__/g, '')
              .split('/');
          }
          correctAnswers.map((a) => {
            return (answers += `<li>${a}</li>`);
          });
          return { __html: answers };
        case importQuestionTypes.TYPE_REORDER:
          return getCorrectAnswers(item.content);
        default:
          getCorrectAnswers(item.content);
      }
    };
    const columns = [
      {
        title: t1('stt'),
        key: 'stt',
        width: sttWidth,
        render(item) {
          return {
            props: {
              style: { styleCol },
              className: 'text-center',
            },
            children: item.content.stt,
          };
        },
      },
      {
        title: categoryLabel,
        key: 'category',
        width: categoryWidth,
        render(item) {
          return item.content.category;
        },
      },
      {
        title: levelLabel,
        key: 'level',
        width: levelWidth,
        render(item) {
          return {
            props: {
              className: 'text-center',
            },
            children: item.content.level,
          };
        },
      },
      {
        title: typeLabel,
        key: 'type',
        width: typeWidth,
        render(item) {
          return {
            props: {
              style: { styleCol },
            },
            children: item.content.type,
          };
        },
      },
      /*      {
        title: codeLabel,
        key: 'code',
        width: codeWidth,
        render(item) {
          return {
            props: {
              style: { styleColBreak },
            },
            children: item.content.code,
          };
        },
      },*/
      {
        title: contentLabel,
        key: 'content',
        width: contentWidth,
        render(item) {
          return {
            props: {
              style: { styleCol },
            },
            children: getQuestion(item.content.content),
          };
        },
      },
      {
        title: answerLabel,
        key: 'answer',
        width: answerWidth,
        render(item) {
          return {
            props: {
              style: { styleCol },
            },
            children: (
              <ol
                className="bank-import-list-answer"
                dangerouslySetInnerHTML={getItemOption(item)}
              />
            ),
          };
        },
      },
      {
        title: correctAnswerLabel,
        key: 'correctAnswer',
        width: correctAnswerWidth,
        render(item) {
          return {
            props: {
              style: { styleCol },
              className: 'text-center',
            },
            children:
              item.content.type === importQuestionTypes.TYPE_INLINE
                ? 1
                : item.content.result,
          };
        },
      },
      {
        title: difficultyLevelLabel,
        key: 'difficultyLevel',
        width: difficultyLevelWidth,
        render(item) {
          return {
            props: {
              style: { styleColBreak },
            },
            children: item.content.difficulty,
          };
        },
      },
      {
        title: statusLabel,
        key: 'status',
        width: statusWidth,
        render(item) {
          return {
            props: {
              style: { styleCol },
            },
            children: (
              <React.Fragment>
                <div className="text-center m-b-10">
                  {item.status === 1 ? (
                    <Tag color="#87d068">{t1('ok')}</Tag>
                  ) : (
                    <Tag color="#f5222d">{t1('errors')}</Tag>
                  )}
                </div>

                {Array.isArray(item.warning_messages) &&
                  item.warning_messages.map((message) => (
                    <div>
                      <Tag color="#DAA520">{message}</Tag>
                    </div>
                  ))}

                {Array.isArray(item.messages) &&
                  item.messages.map((message) => (
                    <div>
                      <Tag color="#faad14">
                        {message}
                        <br />
                      </Tag>
                    </div>
                  ))}
              </React.Fragment>
            ),
          };
        },
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={items}
        rowKey="id"
        bordered
        pagination={false}
        childrenColumnName={null}
        className="white-background"
      />
    );
  }
}

export default connect()(Results);
