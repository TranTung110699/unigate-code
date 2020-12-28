import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getFormValues, reduxForm } from 'redux-form';
import { getThemeConfig } from 'utils/selectors';
import hrmsEvnApiUrls from 'components/admin/hrms-data/evn/endpoints';
import './stylesheet.scss';

import {
  TableAsReduxFormField as Table,
  TableBody,
  TableHeader,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';

import Positions from 'components/admin/group/edit/member/search-results/Positions';
import OrganizationsOrPhongBan from 'components/admin/group/common/OrganizationsOrPhongBanInResultTable';
import actions from 'actions/node/creators';
import ResyncDataFromShareDBBtn from './../common/ResyncDataFromShareDBBtn';
import { allowSyncUsersOnAbnormalAccountScreen } from 'common/conf';
import { userPreviewLink } from 'components/admin/user/utils';
import { timestampToDateString } from 'common/utils/Date';
import Avatar from 'antd/lib/avatar';

const label = {
  iidCode: t1('code'),
  name: t1('name'),
  mail: t1('mail'),
  status: t1('status'),
  actions: t1('actions'),
  other_info: t1('other_info'),
  created_date: t1('created_date'),
};

const width = {
  actions: '10%',
};

class Results extends Component {
  actionToggleDataSet = { on: 'activated', off: 'unactivated' };

  formatSelectedNsIds = (selectedNsIds) => {
    return selectedNsIds.map((selectedNsId) => selectedNsId.ns_id);
  };

  renderTableHeader = (label) => {
    return (
      <TableRow>
        <TableRowColumn>{label.iidCode}</TableRowColumn>
        <TableRowColumn>{label.name}</TableRowColumn>
        <TableRowColumn>{label.mail}</TableRowColumn>
        <TableRowColumn>{label.other_info}</TableRowColumn>
        <TableRowColumn>{label.created_date}</TableRowColumn>
      </TableRow>
    );
  };

  renderTableBody = (items) => {
    return (
      items &&
      items.map((item) => {
        return (
          <TableRow key={item.ns_id}>
            <TableRowColumn title={item.code}>
              <Link to={userPreviewLink(item, 'user', 'view')}>
                {item.code}
              </Link>
            </TableRowColumn>
            <TableRowColumn title={item.name}>
              {item.avatar && <Avatar src={item.avatar} />}
              &nbsp;
              <Link to={userPreviewLink(item, 'user', 'view')}>
                {item.name}
              </Link>
            </TableRowColumn>
            <TableRowColumn title={item.mail}>
              <Link to={userPreviewLink(item, 'user', 'view')}>
                {item.mail}
              </Link>
            </TableRowColumn>
            <TableRowColumn>
              {item.positions && item.positions.length ? (
                <Positions item={item} textOnly={true} />
              ) : (
                ''
              )}
              {item.user_organizations && item.user_organizations.length ? (
                <OrganizationsOrPhongBan
                  item={item}
                  attr={'user_organizations'}
                  showParentsInfo
                />
              ) : (
                ''
              )}
              {item.phongbans && item.phongbans.length ? (
                <OrganizationsOrPhongBan
                  item={item}
                  attr={'phongbans'}
                  showParentsInfo={false}
                />
              ) : (
                ''
              )}
            </TableRowColumn>
            <TableRowColumn>
              {timestampToDateString(item.ts, { type: 'full_date' })}
            </TableRowColumn>
          </TableRow>
        );
      })
    );
  };

  render() {
    const {
      items,
      searchFormId,
      selectedNsIds,
      allowSyncUsersOnAbnormalAccountScreenFlag,
    } = this.props;
    const itemList = items && items.filter((item) => !!item);
    if (!itemList) {
      return null;
    }

    const checkKey = 'ns_id';
    const keysSave = ['ns_id'];

    return (
      <div className="user-account-table-result">
        {searchFormId &&
          searchFormId === 'abnormal_account_search' &&
          !!allowSyncUsersOnAbnormalAccountScreenFlag && (
            <div>
              {selectedNsIds && selectedNsIds.length > 0 && (
                <span className="m-r-10">
                  {t1('%d_users_selected', [selectedNsIds.length])}
                </span>
              )}
              <ResyncDataFromShareDBBtn
                raisedButton
                className={'m-b-10'}
                title={t1('resync_selected_users_from_evn_share_db')}
                label={t1('resync_selected_users_from_evn_share_db')}
                labelPosition="after"
                secondary
                icon="retry"
                data={{
                  ns_ids: this.formatSelectedNsIds(selectedNsIds),
                }}
                disabled={!selectedNsIds || selectedNsIds.length === 0}
                resyncDataFromShareDBUrl={
                  hrmsEvnApiUrls.resync_users_from_evn_share_db
                }
                searchFormId={searchFormId}
                textConfirm={t1(
                  'do_you_want_to_resync_selected_users_from_evn_share_db?',
                )}
              />
            </div>
          )}
        <Table
          name="ns_ids"
          itemList={itemList}
          checkKey={checkKey}
          keysSave={keysSave}
          multiSelectable
        >
          <TableHeader className="user-account-table-result-header">
            {this.renderTableHeader(label)}
          </TableHeader>
          <TableBody
            deselectOnClickaway={false}
            className="user-account-table-result-body"
          >
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
  const domainInfo = state.domainInfo;
  return {
    selectedNsIds,
    themeConfig: getThemeConfig(state),
    allowSyncUsersOnAbnormalAccountScreenFlag: allowSyncUsersOnAbnormalAccountScreen(
      state.domainInfo,
    ),
    domain: domainInfo && domainInfo.domain,
  };
}

export default connect(mapStateToProps)(reduxForm({})(Results));
