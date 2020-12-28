import React, { useState } from 'react';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import { submit } from 'redux-form';
import apiUrls from 'api-endpoints';
import aApiUrls from 'components/admin/abac-role/endpoints';
import { connect } from 'react-redux';
import AntdTable from 'antd/lib/table';
import fetchData from 'components/common/fetchData';
import Loading from 'components/common/loading';
import Avatar from 'components/common/avatar';
import Icon from 'components/common/Icon';
import Marking from 'components/admin/course/mainstage/score-and-marking/score-online/common/marking';
import sagaActions from 'actions/saga-creators';
import Link from 'components/common/router/Link';
import { getSubMenuLink } from 'routes/links';
import PassFailIcon from './PassFailIcon';
import SuccessAlert from 'components/common/SuccessAlert';
import Warning from 'components/common/Warning';
import ActionToggle from 'components/common/toggle/ActionToggle';
import {
  getKeyStateInfoTheTest,
  getKeyStateNodeReport,
} from '../score-online/utils/keyState';
import { filterTreeDataByWhiteList } from '../score-online/search/util';
import AntButton from 'antd/lib/button';
import commonSagaActions from 'actions/saga-creators';
import ButtonAction from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import ApiRequestBtnWithConfirmDialog from 'components/common/action-button/ApiRequestBtnWithConfirmDialog';
import Checkbox from 'material-ui/Checkbox';
import Communicate from '../../communication/Form';
import actions from 'actions/node/creators';
import DetailOnDialog from 'components/common/detail-on-dialog';
import { canTeacherManuallyMarkRubricAsPassed } from './utils';
import ProgressOfSyllabus from '../overview/ProgressOfSyllabus';
import OrganizationsOrPhongBan from 'components/admin/group/common/OrganizationsOrPhongBanInResultTable';
import Button from 'antd/lib/button';

const getRubricProgressToRender = (row, rubricIid) => {
  // console.log({row, rubricIid});
  const arr = lodashGet(row, 'progress.score_by_rubrik'); //.${rubricIid}`);
  if (Array.isArray(arr)) {
    return arr.find((el) => el.iid == rubricIid);
  }
  return null;
};

const columnsToRenderRubrics = (rubrics = [], saveProgress = () => {}) => {
  if (!Array.isArray(rubrics) || !rubrics.length) {
    return [];
  }

  return rubrics
    .map(({ children, sub_type, name, learning_items, ...rubric } = {}) => {
      let childrenToRender = [];
      if (Array.isArray(children) && children.length) {
        childrenToRender = columnsToRenderRubrics(children);
      }

      const result = {
        title: name,
        className: 'text-center',
      };

      if (childrenToRender.length) {
        result.children = childrenToRender;
      } else {
        result.render = (row) => {
          const rubricProgress = getRubricProgressToRender(
            row,
            lodashGet(rubric, 'iid'),
          );

          const score = lodashGet(rubricProgress, 'score');
          const passed = lodashGet(rubricProgress, 'passed');
          const allowMarking = canTeacherManuallyMarkRubricAsPassed(rubric);

          return {
            children: (
              <div>
                {passed ? (
                  <span title={t1('passed')}>
                    <SuccessAlert>{score}</SuccessAlert>
                  </span>
                ) : (
                  <span title={t1('failed')}>
                    <Warning inline>{score}</Warning>
                  </span>
                )}

                {allowMarking ? (
                  <Marking
                    label={
                      <span>
                        {score}
                        <Icon icon="edit" />
                      </span>
                    }
                    editingValue={score}
                    anythingValue
                    scoreScale="0_100"
                    scalePartIdAsValue
                    onChange={(newprogress) => {
                      saveProgress({
                        userIid: lodashGet(row, 'iid'),
                        _sand_real_time: 1,
                        progress: [
                          {
                            tco_iid: lodashGet(rubric, 'iid'),
                            p: newprogress,
                          },
                        ],
                      });
                    }}
                  />
                ) : null}
              </div>
            ),
            props: {
              className: 'text-center',
            },
          };
        };
      }

      return result;
    })
    .filter(Boolean);
};

const getColumns = (
  rootRubric = {},
  course = {},
  saveProgress = () => {},
  treeData = {},
  changePassItem = () => {},
  searchFormId,
  renderContentDialog,
  checkboxChecked,
  sendMessage,
) => {
  return (
    [
      {
        title: t1('stt'),
        key: 'id',
        render: (text, row, index) => ({
          children: index + 1,
          props: {
            className: 'text-center',
          },
        }),
      },
      {
        title: t1('name'),
        key: 'id',
        render: (user) => (
          <span>
            <Avatar user={user} size={30} /> &nbsp; {lodashGet(user, 'name')}
          </span>
        ),
      },
      {
        title: t1('mail'),
        key: 'mail',
        render: (user) => <span>{lodashGet(user, 'mail')}</span>,
      },
      {
        title: t1('organization'),
        width: '30%',
        key: 'organization',
        render: (item) => {
          return {
            children: lodashGet(item, '__expand.user_organizations') ? (
              <OrganizationsOrPhongBan
                item={item}
                attr={'user_organizations'}
                showParentsInfo
              />
            ) : lodashGet(item, 'user_organizations_info', []) ? (
              lodashGet(item, 'user_organizations_info', []).map(
                (org) => org.name,
              )
            ) : (
              ''
            ),
          };
        },
      },
      {
        title: <strong>{t1('completion_progress')}</strong>,
        className: 'text-center',
        render: (row) => {
          const progress = lodashGet(row, 'progress');
          return {
            children: <strong>{lodashGet(progress, 'cp')}</strong>,
            // children: lodashGet(progress, 'cp'),
            props: {
              className: 'text-center',
            },
          };
        },
      },
      {
        title: <strong>{t1('score')}</strong>,
        className: 'text-center',
        render: (row) => {
          const progress = lodashGet(row, 'progress');
          return {
            children: <strong>{lodashGet(progress, 'progress')}</strong>,
            props: {
              className: 'text-center',
            },
          };
        },
      },
      {
        title: <strong>{t1('passed')}</strong>,
        className: 'text-center',
        render: (row, index) => {
          let progress = lodashGet(row, 'progress');
          progress = progress && progress[treeData.iid];
          const pf = lodashGet(row, 'progress.passed');
          const passed = progress && progress.pf ? 1 : 0;
          return {
            children: (
              <>
                <PassFailIcon passed={pf} />
                {canTeacherManuallyMarkRubricAsPassed(rootRubric) ? (
                  <ActionToggle
                    baseURL={aApiUrls.has_permissions}
                    params={{
                      actions: ['course:set:passed'], // Permission_Const_Course::COURSE_ACTION_CAN_SWITCH_THE_LEARNING_STATUS
                      resources: [course],
                    }}
                    value={passed}
                    name={`status_${index}`}
                    permission={1}
                    handleChange={(res, value) => {
                      changePassItem(row, treeData, value);
                    }}
                    noLabel
                  />
                ) : null}
              </>
            ),
            props: {
              className: 'text-center',
            },
          };
        },
      },
    ]
      // we don't draw the root rubrics
      .concat(
        columnsToRenderRubrics(lodashGet(rootRubric, 'children'), saveProgress),
      )
      .concat({
        title: t1('actions'),
        key: 'actions',
        className: 'text-center',
        render: (row) => {
          return (
            <>
              <AntButton
                className="m-l-5 m-r-5"
                icon="mail"
                onClick={() =>
                  sendMessage({
                    node: course,
                    hiddenFields: {
                      targets: [
                        {
                          iid: row.iid,
                          type: 'user',
                          name: row.name,
                        },
                      ],
                    },
                  })
                }
              />

              <DetailOnDialog
                renderPreview={({ showFull }) => (
                  <AntButton
                    className="m-l-5 m-r-5"
                    icon="eye"
                    onClick={showFull}
                  />
                )}
                renderFull={({ closeDialog }) => {
                  return <ProgressOfSyllabus course={course} user={row} />;
                }}
                dialogOptionsProperties={{ width: '80%' }}
              />

              <ApiRequestBtnWithConfirmDialog
                url={'/course/progress/sync-course-progress-by-rubrik'}
                title={t1('sync_course_progress_by_rubric_for_this_user')}
                icon="autorenew"
                params={{
                  iid: course.iid,
                  uiid: row.iid,
                }}
                textConfirm={`${t1(
                  'do_you_really_want_to_recalculate_user_score',
                )}?`}
                formid={searchFormId}
                closeModal
                modalKey={`resync-score-for-user`}
              />
              {process.env.NODE_ENV == 'development' ? (
                <ButtonAction
                  alternativeApi={'/course/progress/reset-progress'}
                  title={t1('auto_reset_progress')}
                  icon="autorenew"
                  params={{
                    course_iid: course.iid,
                    user_iid: row.iid,
                  }}
                  formid={searchFormId}
                />
              ) : null}
              {/*

                <ButtonAction
                  alternativeApi={'/invite/api/remove'}
                  contentDialog={renderContentDialog}
                  params={{
                    items: {
                      iid: course.iid,
                      ntype: course.ntype,
                    },
                    targets: { iid: row.iid, type: 'user' },
                    remove_learn_item: checkboxChecked ? 1 : 0,
                  }}
                  formid={searchFormId}
                />
                 */}
            </>
          );
        },
      })
      .filter(Boolean)
  );
};

const TableResult = ({
  rubric,
  course,
  loadingStatus,
  items,
  saveProgress = () => {},
  treeData,
  changePassItem,
  searchFormId,
  sendMessage,
  exportResult,
  paramsToFilter,
  total,
}) => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  if (loadingStatus !== 'finished') {
    return <Loading />;
  }

  if (!rubric) {
    return (
      <Warning>
        {t1('this_course_has_no_rubrics')}
        <Link to={getSubMenuLink('course', course, 'rubric')}>
          {t1('setup_rubric_for_the_course')}
        </Link>
      </Warning>
    );
  }

  const rubrics = lodashGet(rubric, 'children');

  const renderContentDialog = () => (
    <Checkbox
      label={t1('cannot_continue_to_learn_this_item')}
      checked={checkboxChecked}
      title={t1('cannot_continue_to_learn_this_item')}
      onCheck={(e, checked) => {
        setCheckboxChecked(checked);
      }}
    />
  );

  const iidInCurrentPage = Array.isArray(items)
    ? items.map(({ iid }) => iid)
    : [];

  return [
    <AntdTable
      className="white-background"
      columns={getColumns(
        rubric,
        course,
        saveProgress,
        treeData,
        changePassItem,
        searchFormId,
        renderContentDialog(),
        checkboxChecked,
        sendMessage,
      )}
      dataSource={Array.isArray(items) ? items : []}
      pagination={false}
      bordered
      size="middle"
      rowKey="iid"
      rowSelection={{
        selectedRowKeys,
        hideDefaultSelections: true,
        onChange: setSelectedRowKeys,
        selections: [
          {
            key: 'select_current_page',
            text: t1('select_data_in_current_page'),
            onSelect: () => {
              const currentSelectedRowKeys = Array.isArray(selectedRowKeys)
                ? selectedRowKeys
                : [];
              setSelectedRowKeys(
                currentSelectedRowKeys.concat(
                  iidInCurrentPage
                    .map((iid) => !currentSelectedRowKeys.includes(iid) && iid)
                    .filter(Boolean),
                ),
              );
            },
          },
          {
            key: 'invert_current_page',
            text: t1('invert_data_in_current_page'),
            onSelect: () => {
              setSelectedRowKeys(
                (Array.isArray(selectedRowKeys) ? selectedRowKeys : []).filter(
                  (iid) => !iidInCurrentPage.includes(iid),
                ),
              );
            },
          },
          Array.isArray(selectedRowKeys) &&
            !!selectedRowKeys.length &&
            !selectedRowKeys.every((id) => iidInCurrentPage.includes(id)) && {
              key: 'remove_all',
              text: t1('remove_all_data_selected'),
              onSelect: () => {
                setSelectedRowKeys([]);
              },
            },
        ].filter(Boolean),
      }}
    />,
    <div>
      <Button
        disabled={!Array.isArray(selectedRowKeys) || !selectedRowKeys.length}
        onClick={() =>
          sendMessage({
            node: {
              ...course,
            },
            hiddenFields: {
              targets: selectedRowKeys.map((iid) => ({ iid, type: 'user' })),
              send_all: 0,
            },
          })
        }
        icon="mail"
      >
        {t1('notify_warning')}
      </Button>
      ,
      <Button
        disabled={!total}
        onClick={() => exportResult(paramsToFilter)}
        icon="export"
      >
        {t1('export')}
      </Button>
    </div>,
  ];
};

const mapStateToProps = (state, props) => {
  const node = props.course || {};
  const keyState = getKeyStateNodeReport(node);
  const groups = props.groups;
  const groupDetails = [];
  const nodes = state.tree;
  if (groups && groups.length) {
    groups.forEach((group) => {
      if (nodes && nodes[group]) {
        groupDetails.push(nodes[group]);
      }
    });
  }

  let modules = lodashGet(state, 'domainInfo.school.modules');

  if (props.modulesToShow) {
    modules = props.modulesToShow.filter(
      (module) => modules && modules.includes(module),
    );
  }

  let treeData = state.dataApiResults[keyState];
  const { whiteListItemsToShow } = props;
  if (whiteListItemsToShow) {
    treeData = filterTreeDataByWhiteList(treeData, whiteListItemsToShow);
  }

  return {
    treeData,
    groupDetails,
    infoTheTests: state.dataApiResults[getKeyStateInfoTheTest(node)],
    modules,
    // courseItemsFilters: lodashGet(state, 'domain.school')
  };
};
const mapDispatchToProps = (dispatch, { searchFormId, course }) => {
  return {
    saveProgress: (data) =>
      dispatch(
        sagaActions.trackerProgressSave(data, null, () => {
          if (searchFormId) {
            dispatch(submit(searchFormId));
          }
        }),
      ),
    changePassItem: (user, item, value) => {
      const progress = [
        {
          tco_iid: item.iid,
          pf: value ? 1 : 0,
        },
      ];

      const data = {
        progress,
        userIid: user.iid,
      };

      dispatch(sagaActions.trackerProgressSave(data));
    },
    sendMessage: (propsRender) => {
      const targets =
        lodashGet(propsRender, 'targets') ||
        lodashGet(propsRender, 'hiddenFields.targets') ||
        [];

      const contentDialog = <Communicate {...propsRender} modal={1} />;

      const title =
        targets.length === 1 && lodashGet(targets, '0.name')
          ? t1('communication:_%s', [lodashGet(targets, '0.name')])
          : t1('communication_for_%s_member_selected', [targets.length]);
      const optionsProperties = {
        handleClose: true,
        title,
      };
      dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
    },
    exportResult: (paramsToFilter) => {
      dispatch(
        commonSagaActions.exportDataRequest('/rubrik/api/export-score', {
          ...paramsToFilter,
          rubric_iid_of_course: lodashGet(course, 'rubric_iid'),
        }),
      );
    },
  };
};

export default fetchData((props) => {
  const iid = lodashGet(props, 'course.rubric_iid');
  const ntype = 'skill'; // lodashGet(props, 'course.rubric.ntype');
  return {
    baseUrl: apiUrls.get_snippet,
    fetchCondition: !!iid && !!ntype,
    params: {
      ntype,
      iid,
      depth: -1,
      editing_syllabus: 2,
    },
    propKey: 'rubric',
    refetchCondition: () => false,
  };
})(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(TableResult),
);
