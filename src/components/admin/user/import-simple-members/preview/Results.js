import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import sagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import { layouts } from 'configs/constants';
import { createSelector } from 'reselect';
import { getThemeConfig } from 'utils/selectors';

class Results extends Component {
  handleClick = () => {
    const { dispatch, metadata } = this.props;
    const url = apiUrls.import_students_action_request;
    const params = {
      id: metadata.import_id,
    };
    dispatch(sagaActions.confirmImportDataRequest(url, params));
  };

  render() {
    const { items, themeConfig } = this.props;

    return (
      <div className="button-center col-md-12">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>{t1('stt')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('code')}</TableHeaderColumn>
              {themeConfig &&
                themeConfig.layout === layouts.EVN && [
                  <TableHeaderColumn>{t1('ns_number')}</TableHeaderColumn>,
                  <TableHeaderColumn>{t1('org_code')}</TableHeaderColumn>,
                  <TableHeaderColumn>{t1('login_name')}</TableHeaderColumn>,
                ]}
              <TableHeaderColumn>{t1('name')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('position')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('phongban')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('organization')}</TableHeaderColumn>
              <TableHeaderColumn width="10%">{t1('status')}</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn>{item.stt}</TableRowColumn>
                  <TableRowColumn>{item.code}</TableRowColumn>
                  {themeConfig &&
                    themeConfig.layout === layouts.EVN && [
                      <TableRowColumn>{item.ns_number}</TableRowColumn>,
                      <TableRowColumn>{item.org_code}</TableRowColumn>,
                      <TableRowColumn>{item.lname}</TableRowColumn>,
                    ]}
                  <TableRowColumn>{item.name}</TableRowColumn>
                  <TableRowColumn>{item.position}</TableRowColumn>
                  <TableRowColumn>{item.phongban}</TableRowColumn>
                  <TableRowColumn>{item.organization}</TableRowColumn>
                  <TableRowColumn
                    width="10%"
                    style={{
                      color:
                        item && item.err && item.err.length > 0
                          ? 'red'
                          : 'black',
                    }}
                  >
                    {t1(item.status)}
                    {item.err &&
                      item.err.map((error) => (
                        <div>
                          <span>{t1(error.field)}:</span>
                          <span>{t1(error.messages)}</span>
                        </div>
                      ))}
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

export default connect(mapStateToProps)(Results);
