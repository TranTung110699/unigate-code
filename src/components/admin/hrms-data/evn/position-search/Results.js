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
  position_id: t1('position_id'),
  position_name: t1('position_name'),
  org_id: t1('org_id'),
  equivalent_position_id: t1('equivalent_position_id'),
  CDANH_QLY: t1('CDANH_QLY'),
  DANG_SD: t1('DANG_SD'),
  created_at: t1('created_at'),
  updated_at: t1('updated_at'),
  elearning_updated_at: t1('elearning_updated_at'),
};

const width = {
  org_id: '5%',
  CDANH_QLY: '5%',
  DANG_SD: '5%',
};

class Results extends Component {
  formatSelectedPositionIds = (selectedPositionIds) => {
    return selectedPositionIds.map(
      (selectedPositionId) => selectedPositionId.VTRI_ID,
    );
  };

  renderTableHeader = (label, searchFormId, width) => {
    return (
      <TableRow>
        <TableHeaderColumn>{label.position_id}</TableHeaderColumn>
        <TableHeaderColumn>{label.position_name}</TableHeaderColumn>
        <TableHeaderColumn width={width.org_id}>
          {label.org_id}
        </TableHeaderColumn>
        <TableHeaderColumn>{label.equivalent_position_id}</TableHeaderColumn>
        <TableHeaderColumn width={width.CDANH_QLY}>
          {label.CDANH_QLY}
        </TableHeaderColumn>
        <TableHeaderColumn width={width.DANG_SD}>
          {label.DANG_SD}
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
        <TableRow key={item.VTRI_ID}>
          <TableRowColumn title={item.VTRI_ID}>{item.VTRI_ID}</TableRowColumn>
          <TableRowColumn title={item.TEN_VTRICDANH}>
            {item.TEN_VTRICDANH}
          </TableRowColumn>
          <TableRowColumn title={item.org_id} width={width.org_id}>
            {item.org_id}
          </TableRowColumn>
          <TableRowColumn title={item.VTRICDANH_TDUONG_ID}>
            {item.VTRICDANH_TDUONG_ID}
          </TableRowColumn>
          <TableRowColumn title={item.CDANH_QLY} width={width.CDANH_QLY}>
            {item.CDANH_QLY}
          </TableRowColumn>
          <TableRowColumn title={item.DANG_SD} width={width.DANG_SD}>
            {item.DANG_SD}
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
    const { items, searchFormId, selectedPositionIds } = this.props;
    const itemList = items && items.filter((item) => !!item);
    if (!itemList) {
      return null;
    }

    const checkKey = 'VTRI_ID';
    const keysSave = ['VTRI_ID'];

    return (
      <div className="table-result">
        <div>
          {selectedPositionIds && selectedPositionIds.length > 0 && (
            <span className="m-r-10">
              {t1('%d_positions_selected', [selectedPositionIds.length])}
            </span>
          )}
          <ResyncDataFromShareDBBtn
            className={'m-b-10 m-r-10'}
            raisedButton
            title={t1('resync_selected_positions')}
            label={t1('resync_selected_positions')}
            labelPosition="after"
            primary
            icon="retry"
            data={{
              position_ids: this.formatSelectedPositionIds(selectedPositionIds),
            }}
            disabled={!selectedPositionIds || selectedPositionIds.length === 0}
            resyncDataFromShareDBUrl={
              hrmsEvnApiUrls.resync_positions_from_evn_share_db
            }
            searchFormId={searchFormId}
            textConfirm={t1('do_you_want_to_resync_selected_positions?')}
          />
          <ResyncDataFromShareDBBtn
            className={'m-b-10 m-r-10'}
            raisedButton
            title={t1('resync_all_positions')}
            label={t1('resync_all_positions')}
            labelPosition="after"
            secondary
            icon="retry"
            data={{
              all_positions: true,
            }}
            resyncDataFromShareDBUrl={
              hrmsEvnApiUrls.resync_positions_from_evn_share_db
            }
            searchFormId={searchFormId}
            textConfirm={t1('do_you_want_to_resync_all_positions?')}
          />
        </div>
        <Table
          name="position_ids"
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

  const selectedPositionIds =
    accountSearchResultValues && accountSearchResultValues.position_ids
      ? accountSearchResultValues.position_ids
      : [];

  return {
    selectedPositionIds,
  };
}

export default connect(mapStateToProps)(reduxForm({})(Results));
