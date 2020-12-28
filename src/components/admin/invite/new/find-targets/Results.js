import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';
import { getThemeConfig } from 'utils/selectors';
import { connect } from 'react-redux';
import { schoolTypes } from 'configs/constants';
import get from 'lodash.get';
import Avatar from 'components/common/avatar';
import resultWrapper from './resultsWrapper';

const addUsersToFieldInvite = t1('add_users');

class Results extends Component {
  render() {
    const {
      items,
      formid,
      checkKey,
      keysSave,
      multiSelectable,
      addUsersToField,
      themeConfig,
    } = this.props;

    const isSis = get(themeConfig, 'school.type', schoolTypes.SIS);

    return (
      <Table
        formid={formid}
        itemList={items}
        checkKey={checkKey}
        keysSave={keysSave}
        multiSelectable={multiSelectable}
      >
        <TableHeader adjustForCheckbox enableSelectAll>
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
            {isSis && (
              <TableHeaderColumn title={t1('note')}>
                {t1('note')}
              </TableHeaderColumn>
            )}
            <TableHeaderColumn title={t1('action')}>
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
              <TableRow key={item.id} selected={item.selected}>
                <TableRowColumn>{item.code}</TableRowColumn>
                <TableRowColumn>
                  <Avatar user={item} size={30} />
                  &nbsp; {item.name}{' '}
                  <span className="text-muted">{item.iid}</span>
                </TableRowColumn>
                <TableRowColumn>{item.mail}</TableRowColumn>
                <TableRowColumn>{item.phone}</TableRowColumn>
                {isSis && (
                  <TableRowColumn>
                    {item.debit_status ? t1('debit_fee') : ''}
                  </TableRowColumn>
                )}
                <TableRowColumn>
                  <IconButton
                    title={addUsersToFieldInvite}
                    iconClassName="mi mi-add"
                    onClick={() => addUsersToField([item])}
                  />
                </TableRowColumn>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

Results.defaultProps = {
  items: [],
};

export default resultWrapper(connect(getThemeConfig)(Results));
