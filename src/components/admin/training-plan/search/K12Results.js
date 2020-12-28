import React, { Component } from 'react';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import { timestampToDateTimeString } from 'common/utils/Date';
import lodashGet from 'lodash.get';
import { Link } from 'react-router-dom';
import LinkWithIcon from 'components/common/router/LinkWithIcon';
import DeleteBtn from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import routes from 'routes';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';

class Results extends Component {
  render() {
    const { items, formid } = this.props;
    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              {/*
              <TableHeaderColumn>{t1('code')}</TableHeaderColumn>
                 */}
              <TableHeaderColumn>{t1('name')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('school_year')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('groups')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('created_date')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('created_by')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('action')}</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.filter(Boolean).map((item) => {
                const editLink = routes.url(
                  'node_edit',
                  Object.assign(
                    {
                      ntype: 'training_plan',
                    },
                    item,
                  ),
                );

                return (
                  <TableRow key={item.id}>
                    {/*

                    <TableRowColumn>
                      <Link to={editLink}>{item.code}</Link>
                    </TableRowColumn>
                       */}
                    <TableRowColumn>
                      <Link to={editLink}>{item.name}</Link>
                    </TableRowColumn>
                    <TableRowColumn>
                      {timestampToDateTimeString(item.start_date)}
                    </TableRowColumn>
                    <TableRowColumn>
                      {timestampToDateTimeString(item.end_date)}
                    </TableRowColumn>
                    <TableRowColumn>
                      {timestampToDateTimeString(item.ts)}
                    </TableRowColumn>
                    <TableRowColumn>{lodashGet(item, 'u.name')}</TableRowColumn>
                    <TableRowColumn>
                      <LinkWithIcon icon="edit" to={editLink} />{' '}
                      <DeleteBtn
                        formid={formid}
                        ntype={'training_plan'}
                        itemId={item.id}
                      />
                    </TableRowColumn>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default Results;
