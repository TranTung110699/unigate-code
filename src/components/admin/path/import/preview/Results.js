import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import sagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';
import { timestampToDateString } from 'common/utils/Date';

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
    const { items } = this.props;

    return (
      <div className="button-center col-md-12">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>{t1('id')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('org_id')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('name')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('content')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('target')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('start_date')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('end_date')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('purpose')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('status')}</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn>
                    {item && item.data && item.data.enterprise_path_id}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item && item.data && item.data.org_id}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item && item.data && item.data.name}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item && item.data && item.data.content}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item && item.data && item.data.target}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item &&
                      item.data &&
                      typeof item.data.start_date !== 'undefined' &&
                      timestampToDateString(item.data.start_date)}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item &&
                      item.data &&
                      typeof item.data.end_date !== 'undefined' &&
                      timestampToDateString(item.data.end_date)}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item && item.data && item.data.purpose}
                  </TableRowColumn>
                  <TableRowColumn
                    style={{
                      color:
                        item &&
                        item.validateErrors &&
                        item.validateErrors.length > 0
                          ? 'red'
                          : 'black',
                    }}
                  >
                    {item && item.status && t1(item.status)}
                    {item &&
                      item.validateErrors &&
                      item.validateErrors.length > 0 &&
                      item.validateErrors.map((error, eIdx) => (
                        <div key={eIdx}>
                          <span>{`${t1(error.field)}: ${t1(
                            error.message,
                          )}`}</span>
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

export default connect()(Results);
