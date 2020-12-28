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
import { t, t1, t3 } from 'translate/index';
import { hoursStringify } from 'utils/Util';
import Positions from './Positions';
import { sexAsText } from 'common/sex';
import { layouts } from 'configs/constants';
import { createSelector } from 'reselect';
import { getThemeConfig } from 'utils/selectors';
import ChangeStaffStatus from 'components/admin/user/user-in-school/common/UpdateStaffStatus';
import lodashGet from 'lodash.get';
import PreviewUserInDialog from 'components/admin/user/account/common/PreviewInDialog';
import './stylesheet.scss';
import Avatar from 'antd/lib/avatar';

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
    const {
      items,
      renderBeforeResultTable,
      themeConfig,
      action,
      notShowCheckbox,
    } = this.props;
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

    return (
      <div className="user-account-table-result">
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
          <TableHeader
            displaySelectAll={!notShowCheckbox}
            adjustForCheckbox={!notShowCheckbox}
          >
            <TableRow>
              <TableHeaderColumn>{t1('name')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('phone')}</TableHeaderColumn>
              {mode === 'user' && (
                <TableHeaderColumn>{t1('is_staff')}</TableHeaderColumn>
              )}
              <TableHeaderColumn width={'10%'}>
                {t1('action')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody
            displayRowCheckbox={!notShowCheckbox}
            deselectOnClickaway={false}
          >
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn>
                    {item.avatar && <Avatar src={item.avatar} />}&nbsp;
                    <PreviewUserInDialog
                      user={item}
                      field={item.name ? 'name' : 'lname'}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <PreviewUserInDialog user={item} field="phone" />
                  </TableRowColumn>
                  {mode === 'user' && (
                    <TableRowColumn width={'20%'}>
                      <ChangeStaffStatus node={item} noLabel />
                    </TableRowColumn>
                  )}
                  <TableRowColumn width={'10%'}>
                    {this.props.renderActionCell
                      ? this.props.renderActionCell(item)
                      : null}
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
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
