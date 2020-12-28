import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate/index';
import Paper from 'material-ui/Paper';
import {
  TableAsReduxFormField as Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';

class SelectItemsToInviteElementSelect extends React.Component {
  style = { padding: '1em' };

  constructor(props) {
    super(props);
    this.state = {
      visitedItems: [],
    };
  }

  componentWillMount() {
    const { items } = this.props;
    this.handleItems(items);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.items !== nextProps.items) {
      this.handleItems(nextProps.items);
    }
  }

  handleItems = (items) => {
    if (!Array.isArray(items)) {
      return;
    }
    const { visitedItems } = this.state;
    let newSelectedItems = [];
    items.forEach((item) => {
      if (!item) {
        return;
      }
      const invitedItem = item.item;
      const history =
        item.histories &&
        item.histories.find(
          (h) => h.type === 'manually' && h.status !== 'delete',
        );
      if (
        history &&
        history.future_add &&
        !this.inArray(visitedItems, invitedItem)
      ) {
        newSelectedItems = newSelectedItems.concat([invitedItem]);
      }
    });
    const { selectedItems, setValue } = this.props;
    this.setState(
      {
        visitedItems: visitedItems.concat(newSelectedItems),
      },
      () => {
        if (!Array.isArray(selectedItems)) {
          setValue(newSelectedItems);
        } else {
          setValue(selectedItems.concat(newSelectedItems));
        }
      },
    );
  };

  isItemEqual = (item, anotherItem) =>
    item && anotherItem && String(item.iid) === String(anotherItem.iid);

  inArray = (array, item) =>
    Array.isArray(array) &&
    item &&
    array.findIndex((anotherItem) => this.isItemEqual(anotherItem, item)) !==
      -1;

  render() {
    const { fieldName, items, selectedItems } = this.props;
    const invitedItems =
      items && items.map((item) => item && item.item).filter((item) => !!item);

    if (!invitedItems || !Array.isArray(invitedItems) || !invitedItems.length) {
      return null;
    }

    const checkKey = 'iid';

    return (
      <Paper style={this.style}>
        <h3>
          {selectedItems &&
          Array.isArray(selectedItems) &&
          selectedItems.length > 0
            ? t1('%s_items_selected', [selectedItems.length])
            : t1('select_items')}
        </h3>
        <Table
          name={fieldName}
          itemList={invitedItems}
          checkKey={checkKey}
          multiSelectable
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>{t1('iid')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('name')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('type')}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox
            deselectOnClickaway={false}
            showRowHover
            stripedRows
          >
            {invitedItems &&
              invitedItems.map((invitedItem) => (
                <TableRow key={invitedItem.iid}>
                  <TableRowColumn>{invitedItem.iid}</TableRowColumn>
                  <TableRowColumn>{invitedItem.name}</TableRowColumn>
                  <TableRowColumn>{t1(invitedItem.ntype)}</TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

SelectItemsToInviteElementSelect.propTypes = {
  className: PropTypes.string,
  fieldName: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape()),
  selectedItems: PropTypes.arrayOf(PropTypes.shape()),
  setValue: PropTypes.func,
};

SelectItemsToInviteElementSelect.defaultProps = {
  className: '',
  fieldName: '',
  items: [],
  selectedItems: [],
  setValue: () => {},
};

export default SelectItemsToInviteElementSelect;
