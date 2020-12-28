import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import { getFormValues, reduxForm } from 'redux-form';
import hrmsEvnApiUrls from 'components/admin/hrms-data/evn/endpoints';

import {
  TableAsReduxFormField as Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';

import ResyncDataFromShareDBBtn from './../common/ResyncDataFromShareDBBtn';

const label = {
  dept_id: t1('dept_id'),
  org_id: t1('org_id'),
  name: t1('name'),
  short_name: t1('short_name'),
  // dept_type_id: t1('dept_type_id'),
  dept_parent_id: t1('dept_parent_id'),
  // dept_level: t1('dept_level'),
  dept_root_id: t1('dept_root_id'),
  // show_sdtc: t1('show_sdtc'),
  active_status: t1('active_status'),
  hrms_status: t1('hrms_status'),
  // is_deleted: t1('is_deleted'),
  established_and_end_date: t1('established_date/_end_date'),
  time: t1('created_at/_updated_at'),
  elearning_updated_at: t1('elearning_updated_at'),
};

const width = {
  org_id: '5%',
  active_status: '5%',
  hrms_status: '5%',
};

class Results extends Component {
  formatSelectedDepartmentIds = (selectedDepartmentIds) => {
    return selectedDepartmentIds.map(
      (selectedDepartmentId) => selectedDepartmentId.DEPARTMENT_ID,
    );
  };

  renderTableHeader = (label, searchFormId, width) => {
    return (
      <TableRow>
        <TableHeaderColumn>{label.dept_id}</TableHeaderColumn>
        <TableHeaderColumn width={width.org_id}>
          {label.org_id}
        </TableHeaderColumn>
        <TableHeaderColumn>{label.name}</TableHeaderColumn>
        <TableHeaderColumn>{label.short_name}</TableHeaderColumn>
        {/*<TableHeaderColumn>{label.dept_type_id}</TableHeaderColumn>*/}
        <TableHeaderColumn>{label.dept_parent_id}</TableHeaderColumn>
        {/*<TableHeaderColumn>{label.dept_level}</TableHeaderColumn>*/}
        <TableHeaderColumn>{label.dept_root_id}</TableHeaderColumn>
        {/*<TableHeaderColumn>{label.show_sdtc}</TableHeaderColumn>*/}
        <TableHeaderColumn width={width.active_status}>
          {label.active_status}
        </TableHeaderColumn>
        <TableHeaderColumn width={width.hrms_status}>
          {label.hrms_status}
        </TableHeaderColumn>
        {/*<TableHeaderColumn>{label.is_deleted}</TableHeaderColumn>*/}
        <TableHeaderColumn>{label.established_and_end_date}</TableHeaderColumn>
        <TableHeaderColumn>{label.time}</TableHeaderColumn>
        <TableHeaderColumn>{label.elearning_updated_at}</TableHeaderColumn>
      </TableRow>
    );
  };

  renderTableBody = (items) => {
    return (
      items &&
      items.map((item) => (
        <TableRow key={item.DEPARTMENT_ID}>
          <TableRowColumn title={item.DEPARTMENT_ID}>
            {item.DEPARTMENT_ID}
          </TableRowColumn>
          <TableRowColumn title={item.ORGANIZATION_ID} width={width.org_id}>
            {item.ORGANIZATION_ID}
          </TableRowColumn>
          <TableRowColumn title={item.DEPARTMENT_NAME}>
            {item.DEPARTMENT_NAME}
          </TableRowColumn>
          <TableRowColumn title={item.DEPARTMENT_SHORTNAME}>
            {item.DEPARTMENT_SHORTNAME}
          </TableRowColumn>
          {/*<TableRowColumn title={item.DEPT_TYPE_ID}>*/}
          {/*  {item.DEPT_TYPE_ID}*/}
          {/*</TableRowColumn>*/}
          <TableRowColumn title={item.DEPT_PARENT_ID}>
            {item.DEPT_PARENT_ID}
          </TableRowColumn>
          {/*<TableRowColumn title={item.DEPT_LEVEL}>*/}
          {/*  {item.DEPT_LEVEL}*/}
          {/*</TableRowColumn>*/}
          <TableRowColumn title={item.DEPT_ROOT_ID}>
            {item.DEPT_ROOT_ID}
          </TableRowColumn>
          {/*<TableRowColumn title={item.SHOW_SDTC}>*/}
          {/*  {item.SHOW_SDTC}*/}
          {/*</TableRowColumn>*/}
          <TableRowColumn title={item.TTRANG_HDONG} width={width.active_status}>
            {item.TTRANG_HDONG}
          </TableRowColumn>
          <TableRowColumn title={item.hrms_status} width={width.hrms_status}>
            {item.hrms_status}
          </TableRowColumn>
          {/*<TableRowColumn title={item.isdeleted}>*/}
          {/*  {item.isdeleted}*/}
          {/*</TableRowColumn>*/}
          <TableRowColumn>
            {item.NGAY_TLAP} <br />
            {item.NGAY_KT_HD}
          </TableRowColumn>
          <TableRowColumn title={item.time}>
            {item.created_at} <br />
            {item.updated_at}
          </TableRowColumn>
          <TableRowColumn title={item.elearning_updated_at}>
            {item.elearning_updated_at}
          </TableRowColumn>
        </TableRow>
      ))
    );
  };

  render() {
    const { items, searchFormId, selectedDepartmentIds } = this.props;
    const itemList = items && items.filter((item) => !!item);
    if (!itemList) {
      return null;
    }

    const checkKey = 'DEPARTMENT_ID';
    const keysSave = ['DEPARTMENT_ID'];

    return (
      <div className="table-result">
        <div>
          {selectedDepartmentIds && selectedDepartmentIds.length > 0 && (
            <span className="m-r-10">
              {t1('%d_departments_selected', [selectedDepartmentIds.length])}
            </span>
          )}
          <ResyncDataFromShareDBBtn
            className={'m-b-10 m-r-10'}
            raisedButton
            title={t1('resync_selected_departments')}
            label={t1('resync_selected_departments')}
            labelPosition="after"
            primary
            icon="retry"
            data={{
              department_ids: this.formatSelectedDepartmentIds(
                selectedDepartmentIds,
              ),
            }}
            disabled={
              !selectedDepartmentIds || selectedDepartmentIds.length === 0
            }
            resyncDataFromShareDBUrl={
              hrmsEvnApiUrls.resync_phongbans_from_evn_share_db
            }
            searchFormId={searchFormId}
            textConfirm={t1('do_you_want_to_resync_selected_departments?')}
          />
          <ResyncDataFromShareDBBtn
            className={'m-b-10 m-r-10'}
            raisedButton
            title={t1('resync_all_phongbans')}
            label={t1('resync_all_phongbans')}
            labelPosition="after"
            secondary
            icon="retry"
            data={{
              all_phongbans: true,
            }}
            resyncDataFromShareDBUrl={
              hrmsEvnApiUrls.resync_phongbans_from_evn_share_db
            }
            searchFormId={searchFormId}
            textConfirm={t1('do_you_want_to_resync_all_phongbans?')}
          />
        </div>
        <Table
          name="department_ids"
          itemList={itemList}
          checkKey={checkKey}
          keysSave={keysSave}
          multiSelectable
        >
          <TableHeader>
            {this.renderTableHeader(label, searchFormId, width)}
          </TableHeader>
          <TableBody deselectOnClickaway={false} showRowHover stripedRows>
            {this.renderTableBody(items)}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  searchFormId: PropTypes.string,
};

Results.defaultProps = {
  items: [],
  searchFormId: '',
};

function mapStateToProps(state, props) {
  const accountSearchResultValues = getFormValues(props.form)(state);

  const selectedDepartmentIds =
    accountSearchResultValues && accountSearchResultValues.department_ids
      ? accountSearchResultValues.department_ids
      : [];

  return {
    selectedDepartmentIds,
  };
}

export default connect(mapStateToProps)(reduxForm({})(Results));
