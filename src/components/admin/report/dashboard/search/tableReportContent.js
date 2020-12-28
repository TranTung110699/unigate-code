/* eslint-disable react/prop-types,no-undef,react/sort-comp,jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';
import ButtonAction from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import HorizontalScrolling from 'components/common/html/horizontal-scrolling';
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
import './tableStyle.scss';

const INVITE_TYPE_MANUALL = 'manually';

class ReportContent extends React.Component {
  style = { fontSize: 15, color: '#ec0324' };
  style1 = { display: 'flex' };
  tableRowColumnStyle = { minWidth: 60, height: 60 };
  tableBodyStyle = { overflow: 'initial' };
  tableRowColumnStyle1 = { minWidth: 120, height: 60 };
  tableRowColumnStyle2 = { width: 60, height: 60 };
  tableRowColumnStyle3 = { width: 150, height: 60 };
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

  render() {
    const {
      className,
      dataHeader,
      keyDisplay,
      nodeEditer,
      items,
      treeData,
      node,
      groups,
      formid,
      hideGeneralActions,
      syncProgress,
      notShowProgress,
      notShowPassed,
      notShowSendMessageOption,
    } = this.props;

    const tableStyle = {
      minWidth: `${keyDisplay.length * 60}px`,
      overflow: 'initial',
    };

    return (
      <div
        className={`${className || ''} ${this.cssClass}`}
        style={this.style1}
      >
        <div className={`${this.cssClass}__fixed`}>
          <Table
            selectable={false}
            style={{ maxWidth: keyDisplay.length > 7 ? 310 : 'none' }}
          >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn
                  className={`${this.cssClass}--iid`}
                  style={{ height: (dataHeader.length || 1) * 56 }}
                  tooltip={t1('code')}
                >
                  {t1('code')}
                </TableHeaderColumn>
                <TableHeaderColumn
                  className={`${this.cssClass}--name`}
                  style={{ height: (dataHeader.length || 1) * 56 }}
                  tooltip={t1('user_name')}
                >
                  {t1('user_name')}
                </TableHeaderColumn>
                {!notShowProgress && [
                  <TableHeaderColumn
                    style={{ height: (dataHeader.length || 1) * 56 }}
                    className={`${this.cssClass}--progress`}
                    tooltip={t1('score')}
                  >
                    {t1('score')}
                  </TableHeaderColumn>,
                  <TableHeaderColumn
                    style={{ height: (dataHeader.length || 1) * 56 }}
                    className={`${this.cssClass}--progress`}
                    tooltip={t1('progress')}
                  >
                    {t1('progress')}
                  </TableHeaderColumn>,
                ]}
                {!notShowPassed && (
                  <TableHeaderColumn
                    style={{ height: (dataHeader.length || 1) * 56 }}
                    className={`${this.cssClass}--pass`}
                    tooltip={t1('passed')}
                  >
                    {t1('passed')}
                  </TableHeaderColumn>
                )}
              </TableRow>
            </TableHeader>

            <TableBody displayRowCheckbox={false}>
              {items &&
                items.map((row, index) => {
                  let { progress } = row;
                  progress = progress && progress[treeData.iid];
                  const passed = progress && progress.pf ? 1 : 0;

                  return (
                    <TableRow
                      key={`fixed-user_report_${index}`}
                      style={
                        this.isRowForMarkingGroup(row)
                          ? {
                              backgroundColor: '#f5f5f5',
                            }
                          : null
                      }
                    >
                      <TableRowColumn
                        className={`${this.cssClass}--iid`}
                        style={this.tableRowColumnStyle}
                      >
                        {!this.isRowForMarkingGroup(row) && row.code}
                      </TableRowColumn>
                      <TableRowColumn
                        className={`${this.cssClass}--name`}
                        style={this.tableRowColumnStyle1}
                      >
                        <span
                          title={
                            row.mail ? `${row.name}-(${row.mail})` : row.name
                          }
                        >
                          {this.isRowForMarkingGroup(row) ? (
                            <b style={this.bStyle}>{row.name}</b>
                          ) : (
                            row.name
                          )}
                        </span>
                      </TableRowColumn>
                      {!notShowProgress && [
                        <TableRowColumn
                          className={`${this.cssClass}--progress`}
                          style={this.tableRowColumnStyle}
                        >
                          {getContentColumTable(
                            nodeEditer,
                            row,
                            treeData,
                            node,
                            '',
                            this.changePassItem,
                            this.viewerTakeDetail,
                          )}
                        </TableRowColumn>,
                        <TableRowColumn
                          className={`${this.cssClass}--progress`}
                          style={this.tableRowColumnStyle}
                        >
                          {getContentColumTable(
                            nodeEditer,
                            row,
                            treeData,
                            node,
                            'cp',
                            this.changePassItem,
                            this.viewerTakeDetail,
                          )}
                        </TableRowColumn>,
                      ]}
                      {!notShowPassed && (
                        <TableRowColumn
                          className={`${this.cssClass}--pass`}
                          style={this.tableRowColumnStyle}
                        >
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
                        </TableRowColumn>
                      )}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <div className={`${this.cssClass}__viewer`}>
          <HorizontalScrolling>
            <Table
              selectable={false}
              style={tableStyle}
              bodyStyle={this.tableBodyStyle}
            >
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                {dataHeader.length > 1 ? (
                  dataHeader.map((headerRow, index) => (
                    <TableRow key={`header-${index}`}>
                      {headerRow.length &&
                        headerRow.map((subHeader, subIndex) => (
                          <TableHeaderColumn
                            key={`sub-header-${index}-${subIndex}`}
                            colSpan={subHeader.colSpan || 1}
                            rowSpan={subHeader.rowSpan || 1}
                            tooltip={`${subHeader.name}-(${subHeader.iid})`}
                            width={`${(subHeader.colSpan || 1) * 60}`}
                          >
                            {subHeader.nameDisplay}
                          </TableHeaderColumn>
                        ))}
                      {!index && nodeEditer === true && !hideGeneralActions && (
                        <TableHeaderColumn
                          rowSpan={dataHeader.length || 1}
                          tooltip={t1('actions')}
                          width="150px"
                        >
                          {t1('actions')}
                        </TableHeaderColumn>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    {dataHeader[0] &&
                      dataHeader[0].length &&
                      dataHeader[0].map((subHeader, subIndex) => (
                        <TableHeaderColumn
                          key={`sub-header-one-${subIndex}`}
                          colSpan={subHeader.colSpan || 1}
                          tooltip={`${subHeader.name}-(${subHeader.iid})`}
                          width={`${(subHeader.colSpan || 1) * 60}`}
                        >
                          {subHeader.nameDisplay}
                        </TableHeaderColumn>
                      ))}
                    {nodeEditer === true && !hideGeneralActions && (
                      <TableHeaderColumn width="150px">
                        {t1('actions')}
                      </TableHeaderColumn>
                    )}
                  </TableRow>
                )}
              </TableHeader>

              <TableBody displayRowCheckbox={false}>
                {items &&
                  items.map((row, index) => (
                    <TableRow
                      key={`user_report_${index}`}
                      style={
                        this.isRowForMarkingGroup(row)
                          ? {
                              backgroundColor: '#f5f5f5',
                            }
                          : null
                      }
                    >
                      {keyDisplay &&
                        keyDisplay.map((krow, kindex) => (
                          <TableRowColumn
                            style={this.tableRowColumnStyle2}
                            tooltip={krow.name}
                            key={`col-user-report-${index}-${kindex}`}
                          >
                            {getContentColumTable(
                              nodeEditer,
                              row,
                              krow,
                              node,
                              '',
                              this.changePassItem,
                              this.viewerTakeDetail,
                              formid,
                            )}
                          </TableRowColumn>
                        ))}
                      {nodeEditer && !hideGeneralActions && (
                        <TableRowColumn style={this.tableRowColumnStyle3}>
                          {!notShowSendMessageOption && (
                            <span className="m-l-10">
                              <Icon
                                flatButton
                                flatButtonStyle={{
                                  color: 'black',
                                  fontSize: '16px',
                                  minWidth: '43px !important',
                                  top: '-7px',
                                }}
                                icon="email"
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
                            </span>
                          )}
                          {syncProgress && (
                            <span className="m-l-10">
                              <ButtonAction
                                alternativeApi={
                                  '/take/data/migrate-progress-question'
                                }
                                title={t1('synchronize_progress_from_data')}
                                icon="sync"
                                params={{
                                  course: node && node.iid,
                                  user: row && row.iid,
                                }}
                                formid={formid}
                              />
                            </span>
                          )}
                          <span className="m-l-10">
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
                          </span>
                          {(!groups || !groups.length) &&
                            row.invite_type === INVITE_TYPE_MANUALL && (
                              <span className="m-l-10">
                                <ButtonAction
                                  alternativeApi={'/invite/api/remove'}
                                  contentDialog={this.renderContentDialog()}
                                  params={{
                                    items: { iid: node.iid, ntype: node.ntype },
                                    targets: { iid: row.iid, type: 'user' },
                                    remove_learn_item: this.state.checked
                                      ? 1
                                      : 0,
                                  }}
                                  formid={formid}
                                />
                              </span>
                            )}
                        </TableRowColumn>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </HorizontalScrolling>
        </div>
      </div>
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
