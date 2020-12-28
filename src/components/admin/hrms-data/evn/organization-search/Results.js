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
  org_id: t1('org_id'),
  code: t1('code'),
  name: t1('name'),
  level: t1('level'),
  parent_code: t1('parent_code'),
  is_tct: t1('is_tct'),
  is_active: t1('is_active'),
  hrms_status: t1('hrms_status'),
  created_at: t1('created_at'),
  updated_at: t1('updated_at'),
  elearning_updated_at: t1('elearning_updated_at'),
};

const width = {
  org_id: '5%',
  level: '5%',
  is_tct: '5%',
  is_active: '5%',
  hrms_status: '5%',
};

class Results extends Component {
  formatSelectedOrgIds = (selectedOrgIds) => {
    return selectedOrgIds.map((selectedOrgId) => selectedOrgId.org_id);
  };

  renderTableHeader = (label, searchFormId, width) => {
    return (
      <TableRow>
        <TableHeaderColumn width={width.org_id}>
          {label.org_id}
        </TableHeaderColumn>
        <TableHeaderColumn>{label.code}</TableHeaderColumn>
        <TableHeaderColumn>{label.name}</TableHeaderColumn>
        <TableHeaderColumn width={width.level}>{label.level}</TableHeaderColumn>
        <TableHeaderColumn>{label.parent_code}</TableHeaderColumn>
        <TableHeaderColumn width={width.is_tct}>
          {label.is_tct}
        </TableHeaderColumn>
        <TableHeaderColumn width={width.is_active}>
          {label.is_active}
        </TableHeaderColumn>
        <TableHeaderColumn width={width.hrms_status}>
          {label.hrms_status}
        </TableHeaderColumn>
        <TableHeaderColumn>{label.created_at}</TableHeaderColumn>
        <TableHeaderColumn>{label.updated_at}</TableHeaderColumn>
        <TableHeaderColumn>{label.elearning_updated_at}</TableHeaderColumn>
      </TableRow>
    );
  };

  renderTableBody = (items) => {
    return (
      items &&
      items.map((item) => (
        <TableRow key={item.org_id}>
          <TableRowColumn title={item.org_id} width={width.org_id}>
            {item.org_id}
          </TableRowColumn>
          <TableRowColumn title={item.code}>{item.code}</TableRowColumn>
          <TableRowColumn title={item.name}>{item.name}</TableRowColumn>
          <TableRowColumn title={item.level} width={width.level}>
            {item.level}
          </TableRowColumn>
          <TableRowColumn title={item.parent_code}>
            {item.parent_code}
          </TableRowColumn>
          <TableRowColumn title={item.is_tct} width={width.is_tct}>
            {item.is_tct}
          </TableRowColumn>
          <TableRowColumn title={item.is_active} width={width.is_active}>
            {item.is_active}
          </TableRowColumn>
          <TableRowColumn title={item.hrms_status} width={width.hrms_status}>
            {item.hrms_status}
          </TableRowColumn>
          <TableRowColumn title={item.created_at}>
            {item.created_at}
          </TableRowColumn>
          <TableRowColumn title={item.updated_at}>
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
    const { items, searchFormId, selectedOrgIds } = this.props;
    const itemList = items && items.filter((item) => !!item);
    if (!itemList) {
      return null;
    }

    const checkKey = 'org_id';
    const keysSave = ['org_id'];

    return (
      <div className="table-result">
        <div>
          {selectedOrgIds && selectedOrgIds.length > 0 && (
            <span className="m-r-10">
              {t1('%d_organizations_selected', [selectedOrgIds.length])}
            </span>
          )}
          <ResyncDataFromShareDBBtn
            className={'m-b-10 m-r-10'}
            raisedButton
            title={t1('resync_selected_organizations')}
            label={t1('resync_selected_organizations')}
            labelPosition="after"
            primary
            icon="retry"
            data={{
              org_ids: this.formatSelectedOrgIds(selectedOrgIds),
            }}
            disabled={!selectedOrgIds || selectedOrgIds.length === 0}
            resyncDataFromShareDBUrl={
              hrmsEvnApiUrls.resync_organizations_from_evn_share_db
            }
            searchFormId={searchFormId}
            textConfirm={t1('do_you_want_to_resync_selected_organizations?')}
          />
          <ResyncDataFromShareDBBtn
            className={'m-b-10 m-r-10'}
            raisedButton
            title={t1('resync_selected_organizations_included_children')}
            label={t1('resync_selected_organizations_included_children')}
            labelPosition="after"
            primary
            icon="retry"
            data={{
              org_ids: this.formatSelectedOrgIds(selectedOrgIds),
              include_sub_organizations: true,
            }}
            disabled={!selectedOrgIds || selectedOrgIds.length === 0}
            resyncDataFromShareDBUrl={
              hrmsEvnApiUrls.resync_organizations_from_evn_share_db
            }
            searchFormId={searchFormId}
            textConfirm={t1(
              'do_you_want_to_resync_selected_organizations_included_children?',
            )}
          />
          <ResyncDataFromShareDBBtn
            className={'m-b-10 m-r-10'}
            raisedButton
            title={t1('resync_users_of_selected_organizations')}
            label={t1('resync_users_of_selected_organizations')}
            labelPosition="after"
            primary
            icon="retry"
            data={{
              org_ids: this.formatSelectedOrgIds(selectedOrgIds),
            }}
            disabled={!selectedOrgIds || selectedOrgIds.length === 0}
            resyncDataFromShareDBUrl={
              hrmsEvnApiUrls.resync_users_from_evn_share_db
            }
            searchFormId={searchFormId}
            textConfirm={t1(
              'do_you_want_to_resync_users_of_selected_organizations?',
            )}
          />
          <ResyncDataFromShareDBBtn
            className={'m-b-10 m-r-10'}
            raisedButton
            title={t1(
              'resync_users_of_selected_organizations_included_children',
            )}
            label={t1(
              'resync_users_of_selected_organizations_included_children',
            )}
            labelPosition="after"
            primary
            icon="retry"
            data={{
              org_ids: this.formatSelectedOrgIds(selectedOrgIds),
              include_sub_organizations: true,
            }}
            disabled={!selectedOrgIds || selectedOrgIds.length === 0}
            resyncDataFromShareDBUrl={
              hrmsEvnApiUrls.resync_users_from_evn_share_db
            }
            searchFormId={searchFormId}
            textConfirm={t1(
              'do_you_want_to_resync_users_of_selected_organizations_included_children?',
            )}
          />
          <ResyncDataFromShareDBBtn
            className={'m-b-10 m-r-10'}
            raisedButton
            title={t1('resync_all_organizations')}
            label={t1('resync_all_organizations')}
            labelPosition="after"
            secondary
            icon="retry"
            data={{
              all_organizations: true,
            }}
            resyncDataFromShareDBUrl={
              hrmsEvnApiUrls.resync_organizations_from_evn_share_db
            }
            searchFormId={searchFormId}
            textConfirm={t1('do_you_want_to_resync_all_organizations?')}
          />
        </div>
        <Table
          name="org_ids"
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

  const selectedOrgIds =
    accountSearchResultValues && accountSearchResultValues.org_ids
      ? accountSearchResultValues.org_ids
      : [];

  return {
    selectedOrgIds,
  };
}

export default connect(mapStateToProps)(reduxForm({})(Results));
