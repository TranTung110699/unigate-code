import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TableAsReduxFormField as Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';
import { Link } from 'react-router-dom';
import { t, t1, t3 } from 'translate/index';
import { hoursStringify } from 'utils/Util';
import Positions from './Positions';
import { sexAsText } from 'common/sex';
import { layouts } from 'configs/constants';
import { createSelector } from 'reselect';
import { getThemeConfig } from 'utils/selectors';
import { userPreviewLink } from 'components/admin/user/utils';
import ChangeStaffStatus from 'components/admin/user/user-in-school/common/UpdateStaffStatus';
import lodashGet from 'lodash.get';
import Icon from 'components/common/Icon';
import PreviewUserInDialog from 'components/admin/user/account/common/PreviewInDialog';
import OrganizationsOrPhongBan from 'components/admin/group/common/OrganizationsOrPhongBanInResultTable';

class ResultsEnterprise extends Component {
  divStyle = {
    marginTop: '20px',
    textAlign: 'center',
  };
  raisedButtonStyle = {
    color: '#ffffff',
  };

  getExperience = (startUnixTimestamp) => {
    if (!startUnixTimestamp) {
      return t3('n/a');
    }

    const durationInSeconds =
      Math.floor(Date.now() / 1000) - startUnixTimestamp;
    const durationInHours = Math.floor(durationInSeconds / (60 * 60));

    return (
      hoursStringify(['year', 'month'])(durationInHours) || `< 1 ${t('month')}`
    );
  };

  render() {
    const { items, renderBeforeResultTable, themeConfig, action } = this.props;
    const itemList = this.props.itemList || items;
    const checkKey = this.props.checkKey || 'id';
    const keysSave = this.props.keysSave || ['id', 'iid', 'name'];
    const resultTableFieldName = this.props.resultTableFieldName || 'targets';

    const isLayoutVT =
      themeConfig &&
      (themeConfig.layout === layouts.VT ||
        themeConfig.layout === layouts.HPU2 ||
        themeConfig.layout === layouts.BLUE);

    const mode = action === 'accounts' ? 'user' : 'student';

    const width = {
      name: '15%',
      birth: '10%',
      sex: '5%',
      jobPosition: '10%',
      org: '15%',
      phone: '8%',
      email: '15%',
      isStaff: '5%',
      action: '10%',
    };

    return (
      <React.Fragment>
        {typeof renderBeforeResultTable === 'function' &&
          renderBeforeResultTable()}
        <Table
          key="result-table"
          name={resultTableFieldName}
          itemList={itemList}
          checkKey={checkKey}
          keysSave={keysSave}
          multiSelectable
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn style={{ width: width.name }}>
                {t1('name')}
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: width.email }}>
                {t1('contact')}
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: width.org }}>
                {t1('organization')}
              </TableHeaderColumn>
              {mode === 'user' && (
                <TableHeaderColumn style={{ width: width.isStaff }}>
                  {t1('is_staff')}
                </TableHeaderColumn>
              )}
              <TableHeaderColumn width={width.action}>
                {t1('action')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox deselectOnClickaway={false}>
            {items &&
              items.map((item = {}) => (
                <TableRow key={item.id}>
                  <TableRowColumn style={{ width: width.name }}>
                    <PreviewUserInDialog user={item} />
                  </TableRowColumn>
                  <TableRowColumn style={{ width: width.email }}>
                    {item.phone || item.mail}
                  </TableRowColumn>
                  <TableRowColumn style={{ width: width.org }}>
                    <OrganizationsOrPhongBan
                      item={item}
                      attr={'user_organizations'}
                    />
                  </TableRowColumn>
                  {mode === 'user' && (
                    <TableRowColumn
                      width={'20%'}
                      style={{ width: width.isStaff }}
                    >
                      <ChangeStaffStatus node={item} noLabel />
                    </TableRowColumn>
                  )}
                  <TableRowColumn width={width.action}>
                    {this.props.renderActionCell
                      ? this.props.renderActionCell(item)
                      : null}
                    &nbsp;
                    <Link
                      to={userPreviewLink(item, mode, 'view')}
                      title={t1('preview')}
                    >
                      <Icon icon="edit" />
                    </Link>
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createSelector(
  getThemeConfig,
  (themeConfig) => ({
    themeConfig,
  }),
);

export default connect(mapStateToProps)(ResultsEnterprise);
