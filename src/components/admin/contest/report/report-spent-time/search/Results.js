import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import HorizontalScrolling from 'components/common/html/horizontal-scrolling';
import { getFormValues } from 'redux-form';

class Results extends Component {
  render() {
    const {
      items,
      numberOfQuestionList,
      highlightQuestionHasSpentTimeLessThan,
    } = this.props;
    const itemList = items && items.filter((item) => !!item);
    if (!itemList) {
      return null;
    }

    return (
      <div className="table-result">
        <HorizontalScrolling>
          <table
            className="table table-border whitebox m-t-20"
            style={{ width: '100%' }}
          >
            <thead>
              <th width="30px" style={{ width: '30px' }}>
                {t1('user_code')}
              </th>
              <th width="30px" style={{ width: '30px' }}>
                {t1('full_name')}
              </th>
              {[...Array(numberOfQuestionList)].map((x, i) => (
                <th key={i}>{t1('q_%s', [i + 1])}</th>
              ))}
            </thead>
            <tbody displayRowCheckbox={false} showRowHover stripedRows>
              {Array.isArray(items) &&
                items.map((item) => {
                  const code = item.user && item.user.code;
                  const name = item.user && item.user.name;
                  return (
                    <tr key={item.id}>
                      <td>{code}</td>
                      <td>{name}</td>
                      {item &&
                        item.spentTimeOfQuestionList &&
                        [...Array(numberOfQuestionList)].map((x, index) => (
                          <td
                            title={
                              item.spentTimeOfQuestionList[
                                'q_' + parseInt(index + 1)
                              ]
                            }
                          >
                            {highlightQuestionHasSpentTimeLessThan &&
                            item.spentTimeOfQuestionList[
                              'q_' + parseInt(index + 1)
                            ] &&
                            parseInt(highlightQuestionHasSpentTimeLessThan) >
                              parseInt(
                                item.spentTimeOfQuestionList[
                                  'q_' + parseInt(index + 1)
                                ],
                              ) ? (
                              <span style={{ color: 'red' }}>
                                {
                                  item.spentTimeOfQuestionList[
                                    'q_' + parseInt(index + 1)
                                  ]
                                }
                              </span>
                            ) : (
                              <span>
                                {
                                  item.spentTimeOfQuestionList[
                                    'q_' + parseInt(index + 1)
                                  ]
                                }
                              </span>
                            )}
                          </td>
                        ))}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </HorizontalScrolling>
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

function mapStateToProps(state, props) {
  let numberOfQuestionList = 0;
  const key = props.searchResultKey || props.formid;
  const resultFromStore = state.searchResults[key];

  if (
    resultFromStore &&
    resultFromStore.objects &&
    resultFromStore.objects.number_of_questions
  ) {
    numberOfQuestionList = resultFromStore.objects.number_of_questions;
  }
  const reportSpentTimeSearchFormValueSelector = getFormValues(props.formid);
  const highlightQuestionHasSpentTimeLessThan = reportSpentTimeSearchFormValueSelector(
    state,
    'highlight_question_has_spent_time_less_than',
  );

  return {
    numberOfQuestionList,
    highlightQuestionHasSpentTimeLessThan:
      highlightQuestionHasSpentTimeLessThan &&
      highlightQuestionHasSpentTimeLessThan.highlight_question_has_spent_time_less_than,
  };
}

export default connect(mapStateToProps)(Results);
