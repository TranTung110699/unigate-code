/* eslint-disable quotes */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import lodashGet from 'lodash.get';
import { Link } from 'react-router-dom';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import PropTypes from 'prop-types';
import actions from 'actions/node/creators';
import Table from 'antd/lib/table';
// import UpdateForm from 'components/admin/contest/exam-round/new/Form';
// import { checkIfEnableExamTemplate } from 'common/conf';
import routes from 'routes';
import MarkScore from 'components/admin/contest/dashboard/MarkScore';
import { examRoundActions, examRoundUrl } from '../../routes';
import Warning from '../../../../common/Warning';
import ActionToggle from '../../../../common/toggle/ActionToggle';
import MyBadge from 'components/common/badge';
import { getSearch } from 'common/selectors/router';

class Results extends Component {
  render() {
    const { node, items, formid, contestIid, enableExamTemplate } = this.props;
    const contestantsLabel = t1('contestants');
    const editExamRoundLabel = t1('edit_exam_round');
    const removeLabel = t1('remove');
    const textConfirm = t1('are_you_sure_you_want_to_do_this');

    const width = {
      name: '30%',
      store: '20%',
      paper: '20%',
      contestants: '20%',
      action: '10%',
    };

    const columns = [
      {
        title: t1('basic_information'),
        render: (name, item) => {
          return (
            <React.Fragment>
              <p>
                <Link
                  to={examRoundUrl(
                    contestIid,
                    item,
                    examRoundActions.information,
                  )}
                >
                  {t1('edit_basic_information')} <Icon icon={'edit'} />
                </Link>
              </p>
              <p>
                1. {t1('name')}: {node && item.name}
              </p>
              <p>
                2. {t1('duration')}:{' '}
                {item.duration ? (
                  <b>{item.duration}</b>
                ) : (
                  <Warning inline>{t1('duration_not_set')}</Warning>
                )}
              </p>
              <p>
                3. {t1('can_do')}:{' '}
                {lodashGet(item, 'options.can_do') == -1 ? (
                  t1('unlimited_times')
                ) : (
                  <span>
                    <MyBadge count={lodashGet(item, 'options.can_do')} />
                    {t1('times')}
                  </span>
                )}
              </p>
              <p>
                4. {t1('instant_marking_on_finish')}:{' '}
                {lodashGet(item, 'options.instant_marking_on_finish')
                  ? t1('yes')
                  : t1('no')}
              </p>
              <p>
                6. {t1('exam_method')}:{' '}
                {item.exam_method ? (
                  <b>{t1(item.exam_method)}</b>
                ) : (
                  <Warning inline>{t1('exam_method_not_set')}</Warning>
                )}
              </p>
            </React.Fragment>
          );
        },
      },
      {
        title: t1('exam_scos'),
        render: (name, item) => {
          return (
            <Link
              to={examRoundUrl(contestIid, item, examRoundActions.examStore)}
            >
              {' '}
              {item.exam_scos_count ? (
                item.exam_scos_count
              ) : (
                <Warning inline>{t1('no_exam_scos')}</Warning>
              )}{' '}
              <Icon icon={'edit'} />
            </Link>
          );
        },
      },
      {
        title: t1('exam_papers'),
        render: (name, item) => {
          return (
            <Link to={examRoundUrl(contestIid, item, examRoundActions.paper)}>
              {' '}
              {item.paper_count ? (
                item.paper_count
              ) : (
                <Warning inline>{t1('no_exam_paper')}</Warning>
              )}{' '}
              <Icon icon={'edit'} />
            </Link>
          );
        },
      },
      {
        title: t1('contestants'),
        render: (name, item) => (
          <Link to={`/admin/contest/${contestIid}/contestants`}>
            {lodashGet(item, 'counter.contestants') > 0 ? (
              <span>
                {lodashGet(item, 'counter.contestants')} {contestantsLabel}
              </span>
            ) : (
              <Warning inline>{t1('no_contestants')}</Warning>
            )}
          </Link>
        ),
      },
      {
        title: t1('mark_score'),
        render: (name, item) => {
          return <MarkScore node={item} contest={node} />;
        },
      },
      {
        title: t1('publish_score'),
        render: (name, item) => {
          return (
            <ActionToggle
              title={t1('update_should_show_score')}
              hideLabel
              baseURL={routes.url('node_update', {
                ...item,
                step: 'should_show_score',
              })}
              params={{
                contest_code: node.code,
                contest_iid: node.iid,
                id: item.id,
                iid: item.iid,
                code: item.code,
              }}
              value={item.should_show_score || 0}
              name="should_show_score"
            />
          );
        },
      },
      // {
      //   title: t1('status'),
      //   render: (name, item) => {
      //     return (
      //       <ActionToggle
      //         title={t1(item.status)}
      //         readOnlyLabelSet={actionToggleReadOnlyLabelSet}
      //         hideLabel
      //         baseURL={routes.url('node_update', {
      //           ...item,
      //           step: 'status',
      //         })}
      //         dataSet={actionToggleReadOnlyLabelSet}
      //         value={item.status || 'queued'}
      //         name="status"
      //       />
      //     );
      //   },
      //   width: width.numberContestants,
      // },
      {
        title: t1('actions'),
        width: width.actions,
        render: (item) => {
          return (
            <React.Fragment>
              {/*
                {checkIfEnableExamTemplate(enableExamTemplate) && (
                  <Icon
                    icon={'settings'}
                    title={generatePracticeExamLabel}
                    className="action"
                    onClick={() => this.generatePracticeExam(item)}
                  />
                )}
                 */}
              <Link
                className="m-r-10"
                to={routes.url(
                  'node_edit',
                  Object.assign(node, {
                    step: `exam-round/${item.iid}/information`,
                  }),
                )}
              >
                <Icon icon={'edit'} title={editExamRoundLabel} />
              </Link>

              <span className="m-l-10">
                <DeleteItem
                  title={removeLabel}
                  textConfirm={textConfirm}
                  formid={formid}
                  ntype={'exam-round'}
                  itemId={item.id}
                  iconButton
                />
              </span>
            </React.Fragment>
          );
        },
      },
    ];

    return (
      <div className="table-result">
        <Table
          dataSource={items}
          columns={columns}
          childrenColumnName={null}
          rowKey="id"
          className="white-background"
          pagination={false}
        />
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

const mapStateToProps = (state) => {
  const queryString = require('query-string');

  return {
    ...queryString.parse(getSearch(state)),
    enableExamTemplate:
      state.domainInfo &&
      state.domainInfo.conf &&
      state.domainInfo.conf.enable_exam_template,
  };
};

export default connect(mapStateToProps)(Results);
