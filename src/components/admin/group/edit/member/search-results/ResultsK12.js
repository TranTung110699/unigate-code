import React, { Component } from 'react';
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
import Ava from 'components/common/avatar';
import { userPreviewLink } from 'components/admin/user/utils';

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
    const { items, dataNotToShow, renderBeforeResultTable } = this.props;
    const itemList = this.props.itemList || items;
    const checkKey = this.props.checkKey || 'id';
    const keysSave = this.props.keysSave || ['id', 'iid', 'name'];
    const resultTableFieldName = this.props.resultTableFieldName || 'targets';

    const width = { avatar: '10%' };
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
              <TableHeaderColumn width={width.avatar}>
                {t1('avatar')}
              </TableHeaderColumn>
              <TableHeaderColumn>{t1('code')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('name')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('grade')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('group')}</TableHeaderColumn>
              <TableHeaderColumn width={'10%'}>
                {t1('action')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody
            displayRowCheckbox
            deselectOnClickaway={false}
            showRowHover
            stripedRows
          >
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn width={width.avatar}>
                    <Ava user={item} />
                  </TableRowColumn>
                  <TableRowColumn>{item.code}</TableRowColumn>

                  <TableRowColumn>
                    <Link to={userPreviewLink(item)}>{item.name}</Link>
                    {item && item.ns_number ? ` (${item.ns_number})` : ''}
                  </TableRowColumn>

                  <TableRowColumn>
                    {item.school ? item.school.grade : ''}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.school ? item.school.grade_name : ''}
                  </TableRowColumn>
                  <TableRowColumn width={'10%'}>
                    {this.props.renderActionCell
                      ? this.props.renderActionCell(item)
                      : null}
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

export default ResultsEnterprise;
