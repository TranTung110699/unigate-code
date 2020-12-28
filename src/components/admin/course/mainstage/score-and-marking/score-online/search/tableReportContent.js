/* eslint-disable react/prop-types,no-undef,react/sort-comp,jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';
import ButtonAction from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import actions from 'actions/node/creators';
import Communicate from 'components/admin/course/mainstage/communication/Form';
import Checkbox from 'material-ui/Checkbox';
import sagaActions from 'actions/saga-creators';
import { ntype as ntypeDefine } from 'configs/constants';
import apiUrls from 'api-endpoints';
import aApiUrls from 'components/admin/abac-role/endpoints';
import ActionToggle from 'components/common/toggle/ActionToggle';
import TakeDetail from '../utils/marking';
import { getContentColumTable } from './util';
import lodashGet from 'lodash.get';
import AntTable from 'antd/lib/table';
import Perm from 'common/utils/Perm';
import styled from 'styled-components';
import { v4 } from 'uuid';
import AntButton from 'antd/lib/button';

const INVITE_TYPE_MANUALL = 'manually';

const Table = styled(AntTable)`
  .ant-table td {
    white-space: nowrap;
  }
`;

const width = {
  code: '10%',
  name: '10%',
  score: '5%',
  progress: '5%',
  passed: '5%',
  actions: 150,
  cell: 80,
};

class ReportContent extends React.Component {
  // style = { fontSize: 15, color: '#ec0324' };
  bStyle = { textTransform: 'uppercase' };
  cssClass = 'table-dashboard-report-content';

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  changePassItem = (user, item, value) => {
    const { dispatch } = this.props;
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
  };

  sendMessage = (targets) => {
    if (!targets && !targets.length) {
      return;
    }
    const { dispatch, node } = this.props;

    const contentDialog = (
      <Communicate
        modal={1}
        node={{ targets }}
        params={{ targets: { node_type: node.ntype, node_iid: node.iid } }}
      />
    );
    const title =
      targets.length > 1
        ? t1('communication')
        : t1('communication:_%s', [targets[0] && targets[0].name]);
    const optionsProperties = {
      handleClose: true,
      title,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  viewerTakeDetail = (user, node, item) => {
    const { dispatch, formid } = this.props;

    const contentDialog = (
      <TakeDetail
        assignmentGroupForMarkingIid={this.getAssignmentGroupForMarking()}
        searchFormId={formid}
        userIid={lodashGet(user, 'iid')}
        nodeIid={lodashGet(node, 'iid')}
        item={item}
      />
    );
    const optionsProperties = {
      handleClose: true,
      title: t1('take'),
      width: '90%',
    };

    if (item && item.ntype === ntypeDefine.QUESTION) {
      if (
        user &&
        user.iid &&
        user.iid === this.getAssignmentGroupForMarking()
      ) {
        // TODO: should we clear progress for the whole group ???
      } else {
        optionsProperties.actions = [
          <ButtonAction
            alternativeApi={apiUrls.reset_progress}
            title={t1('auto_reset_progress')}
            icon="autorenew"
            label={t1('redo')}
            style={this.style}
            params={{
              node: {
                iid: node.iid,
                ntype: node.ntype,
              },
              target: { iid: user && user.iid, type: 'user' },
              item: {
                iid: item && item.iid,
                ntype: item && item.ntype,
              },
            }}
            formid={formid}
            closeDialogAfterActionSuccessFull
          />,
        ];
      }
    }
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  renderContentDialog = () => (
    <Checkbox
      label={t1('cannot_continue_to_learn_this_item')}
      checked={this.state.checked}
      title={t1('cannot_continue_to_learn_this_item')}
      onCheck={(e, checked) => {
        this.setState({ checked });
      }}
    />
  );

  getAssignmentGroupForMarking = () => {
    const { isMarkingForAssignment, groups } = this.props;
    if (
      isMarkingForAssignment &&
      Array.isArray(groups) &&
      groups.length === 1
    ) {
      return groups[0];
    }
    return null;
  };

  isRowForMarkingGroup = (row) => {
    const { isMarkingForAssignment } = this.props;
    return (
      isMarkingForAssignment &&
      row &&
      String(row.iid) === String(this.getAssignmentGroupForMarking())
    );
  };

  getColumns = ({
    notShowProgress,
    notShowPassed,
    nodeEditer,
    treeData,
    node,
    dataHeader,
    keyDisplay,
    formid,
    items,
    notShowSendMessageOption,
    syncProgress,
    groups,
    columnData,
    hideGeneralActions,
  }) => {
    return [
      {
        title: t1('code'),
        key: 'code',
        fixed: 'left',
        // width: width.code,
        render: (row) => !this.isRowForMarkingGroup(row) && row.code,
      },
      {
        title: t1('name'),
        key: 'name',
        fixed: 'left',
        // width: width.name,
        render: (row) => (
          <span title={row.mail ? `${row.name}-(${row.mail})` : row.name}>
            {this.isRowForMarkingGroup(row) ? (
              <b style={this.bStyle}>{row.name}</b>
            ) : (
              row.name
            )}
          </span>
        ),
      },
      ...(!notShowProgress
        ? [
            {
              title: t1('score'),
              key: 'score',
              // width: width.score,
              className: 'text-center',
              fixed: 'left',
              render: (row) =>
                getContentColumTable(
                  nodeEditer,
                  row,
                  treeData,
                  node,
                  '',
                  this.changePassItem,
                  this.viewerTakeDetail,
                ),
            },
            {
              title: t1('progress'),
              key: 'progress',
              fixed: 'left',
              className: 'text-center',
              // width: width.progress,
              render: (row) =>
                getContentColumTable(
                  nodeEditer,
                  row,
                  treeData,
                  node,
                  'cp',
                  this.changePassItem,
                  this.viewerTakeDetail,
                ),
            },
          ]
        : []),
      ...(!notShowPassed
        ? [
            {
              title: t1('passed'),
              key: 'passed',
              fixed: 'left',
              // width: width.passed,
              className: 'text-center',
              render: (row, index) => {
                let { progress } = row;
                progress = progress && progress[treeData.iid];
                const passed = progress && progress.pf ? 1 : 0;
                return (
                  <ActionToggle
                    baseURL={aApiUrls.has_permissions}
                    params={{
                      actions: ['course:set:passed'], // Permission_Const_Course::COURSE_ACTION_CAN_SWITCH_THE_LEARNING_STATUS
                      resources: [node],
                    }}
                    value={passed}
                    name={`status_${index}`}
                    permission={1}
                    handleChange={(res, value) => {
                      this.changePassItem(row, treeData, value);
                    }}
                    noLabel={true}
                  />
                );
              },
            },
          ]
        : []),
      ...(!!(columnData && columnData.length)
        ? columnData.map((column, index) => {
            const children = lodashGet(column, 'children', []);
            return {
              title: column.nameDisplay,
              key: `column-${index}`,
              children:
                !!(children && children.length) &&
                children.map((child) => {
                  const childChildren = lodashGet(child, 'children', []).filter(
                    (c) => {
                      return child.iid !== c.iid;
                    },
                  );

                  return {
                    title: child.nameDisplay,
                    key: `child-name-${v4()}`,
                    width: width.cell,
                    ...(!!(childChildren && childChildren.length)
                      ? {
                          children: childChildren
                            .map((c) => ({
                              title: c.nameDisplay,
                              key: `c-name-${v4()}`,
                              width: width.cell,
                              render: (item) =>
                                getContentColumTable(
                                  nodeEditer,
                                  item,
                                  c,
                                  node,
                                  '',
                                  this.changePassItem,
                                  this.viewerTakeDetail,
                                  formid,
                                ),
                            }))
                            .concat(
                              {
                                title: t1('score'),
                                key: `score-${v4()}`,
                                width: width.cell,
                                className: 'text-center',
                                render: (item) =>
                                  getContentColumTable(
                                    nodeEditer,
                                    item,
                                    child,
                                    node,
                                    '',
                                    this.changePassItem,
                                    this.viewerTakeDetail,
                                    formid,
                                  ),
                              },
                              {
                                title: t1('passed'),
                                key: `passed-${v4()}`,
                                width: width.cell,
                                className: 'text-center',
                                render: (item) =>
                                  getContentColumTable(
                                    nodeEditer,
                                    item,
                                    child,
                                    node,
                                    'pass',
                                    this.changePassItem,
                                    this.viewerTakeDetail,
                                    formid,
                                  ),
                              },
                              ...(Perm.nodeEditer(nodeEditer)
                                ? [
                                    {
                                      title: t1('action'),
                                      key: `action-${v4()}`,
                                      width: width.cell,
                                      className: 'text-center',
                                      render: (item) =>
                                        getContentColumTable(
                                          nodeEditer,
                                          item,
                                          child,
                                          node,
                                          'reset-take',
                                          this.changePassItem,
                                          this.viewerTakeDetail,
                                          formid,
                                        ),
                                    },
                                  ]
                                : []),
                            ),
                        }
                      : {
                          render: (item) =>
                            getContentColumTable(
                              nodeEditer,
                              item,
                              child,
                              node,
                              '',
                              this.changePassItem,
                              this.viewerTakeDetail,
                              formid,
                            ),
                        }),
                  };
                }),
            };
          })
        : []),
      ...(nodeEditer && !hideGeneralActions
        ? [
            {
              title: t1('actions'),
              key: 'actions',
              width: width.actions,
              fixed: 'right',
              className: 'text-center',
              render: (row) => {
                return (
                  <AntButton.Group>
                    {!notShowSendMessageOption && (
                      <AntButton
                        icon="mail"
                        onClick={() =>
                          this.sendMessage([
                            {
                              iid: row.iid,
                              type: 'user',
                              name: row.name,
                            },
                          ])
                        }
                      />
                    )}
                    {syncProgress && (
                      <ButtonAction
                        alternativeApi={'/take/data/migrate-progress-question'}
                        title={t1('synchronize_progress_from_data')}
                        icon="sync"
                        params={{
                          course: node && node.iid,
                          user: row && row.iid,
                        }}
                        formid={formid}
                      />
                    )}
                    <ButtonAction
                      alternativeApi={apiUrls.reset_progress}
                      title={t1('auto_reset_progress')}
                      icon="autorenew"
                      params={{
                        node: {
                          iid: node.iid,
                          ntype: node.ntype,
                        },
                        target: { iid: row.iid, type: 'user' },
                      }}
                      formid={formid}
                    />
                    {(!groups || !groups.length) &&
                      row.invite_type === INVITE_TYPE_MANUALL && (
                        <ButtonAction
                          alternativeApi={'/invite/api/remove'}
                          contentDialog={this.renderContentDialog()}
                          params={{
                            items: {
                              iid: node.iid,
                              ntype: node.ntype,
                            },
                            targets: { iid: row.iid, type: 'user' },
                            remove_learn_item: this.state.checked ? 1 : 0,
                          }}
                          formid={formid}
                        />
                      )}
                  </AntButton.Group>
                );
              },
            },
          ]
        : []),
    ];
  };

  render() {
    const {
      className,
      dataHeader,
      keyDisplay,
      nodeEditer,
      treeData,
      node,
      groups,
      formid,
      hideGeneralActions,
      syncProgress,
      notShowProgress,
      notShowPassed,
      notShowSendMessageOption,
      columnData,
      items,
    } = this.props;

    return (
      <Table
        columns={this.getColumns({
          notShowProgress,
          nodeEditer,
          treeData,
          node,
          notShowPassed,
          dataHeader,
          keyDisplay,
          formid,
          items,
          notShowSendMessageOption,
          syncProgress,
          groups,
          columnData,
          hideGeneralActions,
        })}
        dataSource={items}
        rowKey="id"
        bordered
        scroll={{ x: true }}
        className={`${className} white-background score-ant-table`}
        pagination={false}
        childrenColumnName={null}
        size="middle"
      />
    );
  }
}

ReportContent.propTypes = {
  className: PropTypes.string,
};

ReportContent.defaultProps = {
  className: '',
};

export default connect()(ReportContent);
