import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import { getFormValues, reduxForm } from 'redux-form';
import hrmsEvnApiUrls from 'components/admin/hrms-data/evn/endpoints';
import DetailOnDialog from 'components/common/detail-on-dialog/index';
import {
  TableAsReduxFormField as Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';

import ResyncDataFromShareDBBtn from './../common/ResyncDataFromShareDBBtn';
import DepartmentDetails from './DepartmentDetails';

const dialogOptionsProperties = {
  handleClose: true,
  width: '80%',
};

const label = {
  ns_id: t1('ns_id'),
  full_name: t1('full_name'),
  login_name: t1('login_name'),
  contact: t1('contact'),
  org_id: t1('org_id'),
  ns_number: t1('ns_number'),
  dept_id: t1('dept_id'),
  vtri_id: t1('vtri_id'),
  user_ad: t1('user_ad'),
  user_enable: t1('user_enable'),
  hrms_status: t1('hrms_status'),
  sex_and_birthday: t1('sex/_birthday'),
  time: t1('created_at/_updated_at'),
  elearning_updated_at: t1('elearning_updated_at'),
};

const width = {
  ns_number: '5%',
  org_id: '5%',
  user_ad: '5%',
  user_enable: '5%',
  hrms_status: '5%',
};

class Results extends Component {
  formatSelectedNsIds = (selectedNsIds) => {
    return selectedNsIds.map((selectedNsId) => selectedNsId.ns_id);
  };

  renderTableHeader = (label, searchFormId, width) => {
    return (
      <TableRow>
        <TableHeaderColumn>{label.ns_id}</TableHeaderColumn>
        <TableHeaderColumn>{label.full_name}</TableHeaderColumn>
        <TableHeaderColumn>{label.login_name}</TableHeaderColumn>
        <TableHeaderColumn>{label.contact}</TableHeaderColumn>
        <TableHeaderColumn>{label.sex_and_birthday}</TableHeaderColumn>
        <TableHeaderColumn width={width.org_id}>
          {label.org_id}
        </TableHeaderColumn>
        <TableHeaderColumn width={width.ns_number}>
          {label.ns_number}
        </TableHeaderColumn>
        <TableHeaderColumn>{label.dept_id}</TableHeaderColumn>
        <TableHeaderColumn>{label.vtri_id}</TableHeaderColumn>
        <TableHeaderColumn width={width.user_ad}>
          {label.user_ad}
        </TableHeaderColumn>
        <TableHeaderColumn width={width.user_enable}>
          {label.user_enable}
        </TableHeaderColumn>
        <TableHeaderColumn width={width.hrms_status}>
          {label.hrms_status}
        </TableHeaderColumn>
        <TableHeaderColumn>{label.time}</TableHeaderColumn>
        <TableHeaderColumn>{label.elearning_updated_at}</TableHeaderColumn>
      </TableRow>
    );
  };

  renderTableBody = (items) => {
    return (
      items &&
      items.map((item) => (
        <TableRow key={item.ns_id}>
          <TableRowColumn title={item.ns_id} width={width.ns_id}>
            {item.ns_id}
          </TableRowColumn>
          <TableRowColumn title={item.full_name}>
            {item.full_name}
          </TableRowColumn>
          <TableRowColumn title={item.login_name}>
            {item.login_name}
          </TableRowColumn>
          <TableRowColumn>
            <span title={item.mail}>{item.mail} </span>
            <br />
            <span title={item.phone}>{item.phone} </span>
          </TableRowColumn>
          <TableRowColumn>
            {item.sex ? t1('male') : t1('female')} <br />
            {item.birthday &&
              item.birthday.split(' ') &&
              item.birthday.split(' ')[0]}{' '}
            <br />
          </TableRowColumn>
          <TableRowColumn title={item.org_id} width={width.org_id}>
            {item.org_id}
          </TableRowColumn>
          <TableRowColumn title={item.ns_number} width={width.ns_number}>
            {item.ns_number}
          </TableRowColumn>
          <TableRowColumn title={item.dept_id}>
            <DetailOnDialog
              renderPreview={({ showFull }) => (
                <span title={'click'} onClick={showFull}>
                  {item.dept_id}
                </span>
              )}
              dialogKey={item.dept_id}
              renderFull={({ closeDialog }) => {
                return (
                  <DepartmentDetails deptId={item.dept_id} nsId={item.ns_id} />
                );
              }}
              dialogOptionsProperties={dialogOptionsProperties}
            />
          </TableRowColumn>
          <TableRowColumn title={item.vtri_id}>{item.vtri_id}</TableRowColumn>
          <TableRowColumn title={item.user_ad} width={width.user_ad}>
            {item.user_ad}
          </TableRowColumn>
          <TableRowColumn title={item.user_enable} width={width.user_enable}>
            {item.user_enable}
          </TableRowColumn>
          <TableRowColumn title={item.hrms_status} width={width.hrms_status}>
            {item.hrms_status}
          </TableRowColumn>
          <TableRowColumn>
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
    const { items, searchFormId, selectedNsIds } = this.props;
    const itemList = items && items.filter((item) => !!item);
    if (!itemList) {
      return null;
    }

    const checkKey = 'ns_id';
    const keysSave = ['ns_id'];

    return (
      <div className="table-result">
        <div>
          {selectedNsIds && selectedNsIds.length > 0 && (
            <span className="m-r-10">
              {t1('%d_users_selected', [selectedNsIds.length])}
            </span>
          )}
          <ResyncDataFromShareDBBtn
            className={'m-b-10 m-r-10'}
            raisedButton
            title={t1('resync_selected_users')}
            label={t1('resync_selected_users')}
            labelPosition="after"
            primary
            icon="retry"
            data={{
              ns_ids: this.formatSelectedNsIds(selectedNsIds),
            }}
            disabled={!selectedNsIds || selectedNsIds.length === 0}
            resyncDataFromShareDBUrl={
              hrmsEvnApiUrls.resync_users_from_evn_share_db
            }
            searchFormId={searchFormId}
            textConfirm={t1('do_you_want_to_resync_selected_users?')}
          />
          <ResyncDataFromShareDBBtn
            className={'m-b-10 m-r-10'}
            raisedButton
            title={t1('resync_all_users')}
            label={t1('resync_all_users')}
            labelPosition="after"
            secondary
            icon="retry"
            data={{
              all_users: true,
            }}
            resyncDataFromShareDBUrl={
              hrmsEvnApiUrls.resync_users_from_evn_share_db
            }
            searchFormId={searchFormId}
            textConfirm={t1('do_you_want_to_resync_all_users?')}
          />
        </div>
        <Table
          name="ns_ids"
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

  const selectedNsIds =
    accountSearchResultValues && accountSearchResultValues.ns_ids
      ? accountSearchResultValues.ns_ids
      : [];

  return {
    selectedNsIds,
  };
}

export default connect(mapStateToProps)(reduxForm({})(Results));
