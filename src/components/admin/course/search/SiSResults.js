/**
 * Created by hungvo on 19/04/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import actions from 'actions/node/creators';
import ActionToggle from 'components/common/toggle/ActionToggle';
import { Link } from 'react-router-dom';
import routes from 'routes';
import lGet from 'lodash.get';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import { timestampToDateString } from 'common/utils/Date';
import CourseCellAction from './CourseCellAction';
import { CourseActions } from 'configs/constants/permission';

const label = {
  code: t1('code'),
  information: t1('course_information'),
  time: t1('time'),
  name: t1('name'),
  staff: t1('staff'),
  status: t1('approved'),
  learningType: t1('learning_type'),
  organizations: t1('organizations'),
  actions: t1('actions'),
  edit: t1('edit'),
  preview: t1('preview'),
  titleDel: t1('delete'),
  createdDate: t1('created_date'),
  category: t1('category'),
  textConfirm: t1('are you sure you want to do this'),
  transcript: t1('transcript'),
  training: t1('training'),
  registering: t1('registering'),
  start: t1('start'),
  approvedTranscript: t1('approved'),
  upload_file: t1('upload_file'),
  major: t1('major'),
};

const width = {
  name: '20%',
  major: '10%',
  startDate: '10%',
  registeringDate: '10%',
  approvedTranscript: '10%',
  fileUpload: '10%',
  status: '10%',
  learning_type: '10%',
  actions: '10%',
};

class Results extends Component {
  actionToggleReadOnlyLabelSet = { on: 'approved', off: 'queued' };
  actionToggleDataSet = { on: 1, off: 0 };

  deepCloneSuccessFul = () => {
    const { dispatch, formid } = this.props;
    dispatch(submit(formid));
  };

  renderHeader = ({ readOnly, renderActionCell }) => (
    <TableHeader
      displaySelectAll={false}
      enableSelectAll={false}
      adjustForCheckbox={false}
    >
      <TableRow>
        <TableHeaderColumn colSpan={2}>{label.information}</TableHeaderColumn>
        <TableHeaderColumn width={'30%'} colSpan={3}>
          {label.time}
        </TableHeaderColumn>
        <TableHeaderColumn width={'20%'} colSpan={2}>
          {label.transcript}
        </TableHeaderColumn>
        <TableHeaderColumn rowSpan={2} width={width.status}>
          {t1('status')}
        </TableHeaderColumn>
        {(!readOnly || typeof renderActionCell === 'function') && (
          <TableHeaderColumn rowSpan={2} width={width.actions}>
            {label.actions}
          </TableHeaderColumn>
        )}
      </TableRow>
      <TableRow>
        <TableHeaderColumn width={'20%'}>{label.name}</TableHeaderColumn>
        <TableHeaderColumn width={'10%'}>{label.major}</TableHeaderColumn>
        <TableHeaderColumn width={width.learning_type}>
          {label.learningType}
        </TableHeaderColumn>
        <TableHeaderColumn width={width.registeringDate}>
          {label.registing}
        </TableHeaderColumn>
        <TableHeaderColumn width={width.startDate}>
          {label.start}
        </TableHeaderColumn>
        <TableHeaderColumn width={width.approvedTranscript}>
          {label.approvedTranscript}
        </TableHeaderColumn>
        <TableHeaderColumn width={width.uploadFile}>
          {label.upload_file}
        </TableHeaderColumn>
      </TableRow>
    </TableHeader>
  );

  renderRow = ({
    item,
    ntypesDeepCloneEnable,
    readOnly,
    formid,
    renderActionCell,
    hasPermissionUpdate,
    hasPermissionDelete,
  }) => (
    <TableRow
      key={item.id}
      selected={item.selected}
      className={item.status === 'deleted' ? 'searchResultsDeletedRow' : ''}
    >
      <TableRowColumn width={width.name}>
        {['deleted', 'finished'].includes(item.status) ? (
          item.name
        ) : (
          <Link
            to={routes.url('node_edit', {
              ...item,
              step: 'dashboard',
            })}
          >
            {item.name}
          </Link>
        )}{' '}
        <br />
        <span className="text-muted">
          (#
          {item.code})
        </span>
      </TableRowColumn>
      <TableRowColumn width={width.major}>{item.major}</TableRowColumn>
      <TableRowColumn width={width.learning_type}>
        {item.learning_type}
      </TableRowColumn>
      <TableRowColumn width={width.registeringDate}>
        {timestampToDateString(item.start_reg_time)}
      </TableRowColumn>
      <TableRowColumn width={width.startDate}>
        {timestampToDateString(item.start_date)}
      </TableRowColumn>
      <TableRowColumn width={width.approvedTranscript}>
        {item.transcript_status === 'approved' ? t1('approved') : t1('queued')}
      </TableRowColumn>
      <TableRowColumn width={width.fileUpload}>
        {lGet(item, 'attach_result_files.length') > 0
          ? t1('uploaded')
          : t1('empty')}
      </TableRowColumn>
      <TableHeaderColumn width={width.status}>
        {['deleted', 'finished'].includes(item.status) ? (
          t1(item.status)
        ) : (
          <ActionToggle
            title={t1(item.status)}
            readOnly={readOnly}
            readOnlyLabelSet={this.actionToggleReadOnlyLabelSet}
            hideLabel
            baseURL={routes.url('node_update', {
              ...item,
              step: 'status',
            })}
            dataSet={this.actionToggleReadOnlyLabelSet}
            value={item.status || 'queued'}
            name="status"
          />
        )}
      </TableHeaderColumn>
      {(!readOnly || typeof renderActionCell === 'function') && (
        <TableRowColumn width={width.action}>
          {['deleted', 'finished'].includes(
            item.status,
          ) ? null : typeof renderActionCell === 'function' ? (
            renderActionCell(item)
          ) : (
            <CourseCellAction
              item={item}
              ntypesDeepCloneEnable={ntypesDeepCloneEnable}
              formid={formid}
              deepCloneSuccessFul={this.deepCloneSuccessFul}
              hasPermissionUpdate={hasPermissionUpdate}
              hasPermissionDelete={hasPermissionDelete}
            />
          )}
          {item.status === 'approved' && item.transcript_status === 'approved' && (
            <ActionToggle
              title={t1('marked_as_completed_course')}
              readOnly={readOnly}
              readOnlyLabelSet={{ on: 'finished', off: 'approved' }}
              hideLabel
              baseURL={routes.url('node_update', {
                ...item,
                step: 'status',
              })}
              searchFormId={formid}
              confirmToChange={t1(
                'if_marked_to_the_course_is_completed,_cannot_change_or_edit_any_of_the_course_information._are_you_sure_you_want_to_do_this?',
              )}
              dataSet={{ on: 'finished', off: 'approved' }}
              value={item.status}
              name="status"
            />
          )}
        </TableRowColumn>
      )}
    </TableRow>
  );

  render() {
    const {
      items,
      formid,
      ntypesDeepCloneEnable,
      readOnly,
      renderActionCell,
      hasPermission,
      permissions,
    } = this.props;

    const hasPermissionUpdate =
      hasPermission &&
      hasPermission(CourseActions.COURSE_ACTION_UPDATE, null, permissions);
    const hasPermissionDelete =
      hasPermission &&
      hasPermission(CourseActions.COURSE_ACTION_DELETE, null, permissions);

    return (
      <div className="table-result" style={{ width: '100%' }}>
        <Table style={{ tableLayout: 'auto' }}>
          {this.renderHeader({
            readOnly,
            renderActionCell,
          })}
          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {Array.isArray(items) &&
              !!items.length &&
              items.map((item) =>
                this.renderRow({
                  item,
                  ntypesDeepCloneEnable,
                  readOnly,
                  formid,
                  renderActionCell,
                  hasPermissionUpdate,
                  hasPermissionDelete,
                }),
              )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  dispatch: PropTypes.func,
  formid: PropTypes.string,
  ntype: PropTypes.string,
  ntypesDeepCloneEnable: PropTypes.array,
};

Results.defaultProps = {
  items: [],
  dispatch: () => {},
  className: PropTypes.string,
  formid: '',
  ntype: '',
  ntypesDeepCloneEnable: [],
};

const mapStateToProps = (state) => {
  const ntypesDeepCloneEnable =
    state.domainInfo &&
    state.domainInfo.conf &&
    state.domainInfo.conf.ntypes_deep_clone_enable;

  return {
    ntypesDeepCloneEnable,
  };
};

export default connect(mapStateToProps)(Results);
