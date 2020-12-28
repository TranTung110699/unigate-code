import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import Avatar from 'components/common/avatar';
import apiUrls from 'api-endpoints';

class Results extends Component {
  render() {
    const { items, searchFormId, group } = this.props;
    const removeLabel = t1('remove_from_group');
    const { textConfirm } = this.props;

    return (
      <div className="table-result">
        <Table selectable={false}>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn title={t1('code')}>
                {t1('code')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('name')}>
                {t1('name')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('email')}>
                {t1('email')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('phone_number')}>
                {t1('phone_number')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('action')}>
                {t1('action')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover>
            {items &&
              items.map(
                (item) =>
                  item && (
                    <TableRow key={item.id}>
                      <TableRowColumn>{item.code}</TableRowColumn>
                      <TableRowColumn>
                        <Avatar user={item} /> {item.name}
                      </TableRowColumn>
                      <TableRowColumn>{item.mail}</TableRowColumn>
                      <TableRowColumn>{item.phone}</TableRowColumn>
                      <TableRowColumn>
                        <DeleteItem
                          title={removeLabel}
                          textConfirm={textConfirm}
                          params={{
                            oid: item.iid,
                            sid: group.iid,
                            object: 'user',
                            subject: 'category',
                            formid: searchFormId,
                          }}
                          formid={searchFormId}
                          alternativeApi={apiUrls.remove_relation}
                        />
                      </TableRowColumn>
                    </TableRow>
                  ),
              )}
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

export default connect()(Results);
