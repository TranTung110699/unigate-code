import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import Details from '../details/Button';
import NotificationButton from './notification/Button';

class Results extends React.Component {
  render() {
    const {
      node,
      items,
      columnsNotToShow,
      disableNotification,
      searchFormId,
    } = this.props;

    return (
      <div className="table-result">
        <Table key="result-table" multiSelectable={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              {!(columnsNotToShow || []).includes('organization') && (
                <TableHeaderColumn>{t1('organization')}</TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('members') && (
                <TableHeaderColumn>{t1('members')}</TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('action') && (
                <TableHeaderColumn>{t1('action')}</TableHeaderColumn>
              )}
              {!(columnsNotToShow || []).includes('notification') && (
                <TableHeaderColumn>{t1('notification')}</TableHeaderColumn>
              )}
            </TableRow>
          </TableHeader>

          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={false}
            showRowHover
            stripedRows
          >
            {items &&
              items.filter(Boolean).map((item) => (
                <TableRow key={item.id}>
                  {!(columnsNotToShow || []).includes('organization') && (
                    <TableRowColumn>
                      {lodashGet(item, 'organization.name')}
                    </TableRowColumn>
                  )}
                  {!(columnsNotToShow || []).includes('members') && (
                    <TableRowColumn>{item.count}</TableRowColumn>
                  )}
                  {!(columnsNotToShow || []).includes('action') && (
                    <TableRowColumn>
                      <Details
                        node={node}
                        organization={lodashGet(item, 'organization')}
                        searchFormId={searchFormId}
                      />
                    </TableRowColumn>
                  )}
                  {!(columnsNotToShow || []).includes('notification') && (
                    <TableRowColumn>
                      <NotificationButton
                        disabled={disableNotification}
                        node={node}
                        organization={lodashGet(item, 'organization')}
                      />
                    </TableRowColumn>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  searchFormId: PropTypes.string,
};

Results.defaultProps = {
  items: [],
  searchFormId: '',
};

export default Results;
