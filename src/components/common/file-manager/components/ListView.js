import React from 'react';
import PropTypes from 'prop-types';
import {
  TableBody,
  TableCore as Table,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';
import { t1 } from 'translate';
import { timestampToDateTimeString } from 'common/utils/Date';
import { getDisplayFileSize, getFileFullName } from 'common/utils/File';
import styled from 'styled-components';
import Icon from './Icon';

const getIcon = (item) => item && <Icon item={item} />;

const getOwners = (item) =>
  item &&
  Array.isArray(item.owners) &&
  item.owners.map(
    (person) => person && <div key={person && person.id}>{person.name}</div>,
  );

const getCreatedTime = (item) =>
  item && item.ts && timestampToDateTimeString(item.ts);

const getModifiedTime = (item) =>
  item && item.updated_ts && timestampToDateTimeString(item.updated_ts);

const getType = (item) => item && item.display_type;

const getSize = (item) => item && item.size && getDisplayFileSize(item.size);

const Name = styled.a`
  cursor: pointer;
  &:hover {
    color: cornflowerblue;
  }
`;

class ListView extends React.PureComponent {
  handleSort = (sortData) => {
    const { onSortDataChange } = this.props;
    if (typeof onSortDataChange === 'function') {
      onSortDataChange(sortData);
    }
  };

  render() {
    const {
      className,
      items,
      sortData,
      onFileDoubleClick,
      selectedItems,
      onSelectedItemschange,
      multiSelectable,
    } = this.props;
    return (
      <div className={`${className || ''} ${this.cssClass || ''}`}>
        <Table
          name="files"
          multiSelectable={!!multiSelectable}
          sortable
          itemList={items}
          checkKey="code"
          sortData={sortData}
          onSort={this.handleSort}
          onChange={onSelectedItemschange}
          value={selectedItems}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn colKey="name">{t1('name')}</TableHeaderColumn>
              <TableHeaderColumn colKey="owners.name">
                {t1('owners')}
              </TableHeaderColumn>
              <TableHeaderColumn colKey="ts">{t1('created')}</TableHeaderColumn>
              <TableHeaderColumn colKey="updated_ts">
                {t1('last_modified')}
              </TableHeaderColumn>
              <TableHeaderColumn colKey="display_type">
                {t1('type')}
              </TableHeaderColumn>
              <TableHeaderColumn colKey="size">{t1('size')}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody showRowHover>
            {Array.isArray(items) &&
              items.map((item) => (
                <TableRow key={item && item.id}>
                  <TableRowColumn title={getFileFullName(item)}>
                    <Name
                      onDoubleClick={(event) => {
                        if (typeof onFileDoubleClick === 'function') {
                          onFileDoubleClick(item);
                        }
                        event.stopPropagation();
                        event.preventDefault();
                      }}
                    >
                      {getIcon(item)} {getFileFullName(item)}
                    </Name>
                  </TableRowColumn>
                  <TableRowColumn>{getOwners(item)}</TableRowColumn>
                  <TableRowColumn>{getCreatedTime(item)}</TableRowColumn>
                  <TableRowColumn>{getModifiedTime(item)}</TableRowColumn>
                  <TableRowColumn>{getType(item)}</TableRowColumn>
                  <TableRowColumn>{getSize(item)}</TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

ListView.propTypes = {
  className: PropTypes.string,
};

ListView.defaultProps = {
  className: '',
};

export default ListView;
