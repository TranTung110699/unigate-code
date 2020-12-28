import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from 'actions/node/creators';
import { Table as MUTable } from 'components/common/mui/Table';
import { filterObjectKeys } from 'common/utils/object';

export class Table extends Component {
  getValue = () => {
    const { input, value } = this.props;
    if (typeof value !== 'undefined') {
      return value;
    }
    return input && input.value;
  };

  handleChange = (selectedItems) => {
    const { input, onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(selectedItems);
    } else if (input && typeof input.onChange === 'function') {
      input.onChange(selectedItems);
    }
  };

  getChildContext() {
    const {
      itemList,
      checkKey,
      selectable,
      sortable,
      sortData,
      displayRowCheckboxOnTheRightSide,
      bodyRowCheckBoxSpans,
    } = this.props;
    const selectedItems = this.getValue() || [];

    const selectedIndexes = this.getSelectedIndexes(
      selectedItems,
      itemList,
      checkKey,
    );

    const isHeaderSelected = this.areAllItemsSelected(
      selectedItems,
      itemList,
      checkKey,
    );

    return {
      onRowSelect: this.handleRowSelected,
      onColSortClick: this.handleColSortClick,
      selectedIndexes,
      isHeaderSelected,
      rowCheckboxSelectable: selectable,
      sortable,
      sortData,
      displayRowCheckboxOnTheRightSide,
      bodyRowCheckBoxSpans,
    };
  }

  handleColSortClick = (colKey, order) => {
    const { onSort } = this.props;
    if (typeof onSort === 'function') {
      onSort({
        [colKey]: order,
      });
    }
  };

  isItemAtIndexSelectable = (index) => {
    const { bodyRowCheckBoxSpans } = this.props;
    return !bodyRowCheckBoxSpans || bodyRowCheckBoxSpans[index];
  };

  getSelectedIndexes = (selectedItems, itemList, checkKey) => {
    let selectedIndexes = [];
    if (Array.isArray(itemList)) {
      itemList.forEach((item, index) => {
        if (!this.isItemAtIndexSelectable(index) || !item) {
          return;
        }
        if (
          Array.isArray(selectedItems) &&
          selectedItems.findIndex(
            (sItem) => sItem && sItem[checkKey] === item[checkKey],
          ) !== -1
        ) {
          selectedIndexes = selectedIndexes.concat([index]);
        }
      });
    }
    return selectedIndexes;
  };

  areAllItemsSelected = (selectedItems, itemList, checkKey) => {
    let selectedIndexes = this.getSelectedIndexes(
      selectedItems,
      itemList,
      checkKey,
    );

    return (
      Array.isArray(itemList) &&
      itemList.length > 0 &&
      itemList.every(
        (item, index) =>
          !this.isItemAtIndexSelectable(index) ||
          (Array.isArray(selectedIndexes) && selectedIndexes.includes(index)),
      )
    );
  };

  filteredByKeySave = (item) => {
    const { checkKey } = this.props;
    let { keysSave } = this.props;
    if (!keysSave) {
      return item;
    }
    if (keysSave.indexOf(checkKey) === -1) {
      keysSave = keysSave.concat([checkKey]);
    }
    return filterObjectKeys(item, keysSave);
  };

  handleAllRowsSelected = () => {
    const { itemList, checkKey } = this.props;
    const selectedItems = this.getValue() || [];
    if (!itemList) {
      return;
    }

    let newSelectedItems = selectedItems;
    if (this.areAllItemsSelected(selectedItems, itemList, checkKey)) {
      newSelectedItems = newSelectedItems.filter(
        (selectedItem) =>
          selectedItem &&
          itemList.findIndex(
            (itemInList) =>
              itemInList && itemInList[checkKey] === selectedItem[checkKey],
          ) === -1,
      );
    } else {
      itemList.forEach((itemInList, index) => {
        if (
          this.isItemAtIndexSelectable(index) &&
          itemInList &&
          selectedItems.findIndex(
            (selectedItem) =>
              itemInList && itemInList[checkKey] === selectedItem[checkKey],
          ) === -1
        ) {
          const filteredNewSelectedItem = this.filteredByKeySave(itemInList);
          newSelectedItems = newSelectedItems.concat([filteredNewSelectedItem]);
        }
      });
    }

    this.handleChange(newSelectedItems);
  };

  handleOneRowSelected = (rowNumber) => {
    const { itemList, checkKey, multiSelectable } = this.props;
    const selectedItems = this.getValue() || [];
    const selectedIndexes = this.getSelectedIndexes(
      selectedItems,
      itemList,
      checkKey,
    );

    if (!itemList) {
      return;
    }

    const newSelectedItem = itemList[rowNumber];
    if (!newSelectedItem) {
      return;
    }

    let newSelectedItems = selectedItems;
    if (selectedIndexes.includes(rowNumber)) {
      newSelectedItems = newSelectedItems.filter(
        (item) => item[checkKey] !== newSelectedItem[checkKey],
      );
    } else {
      const filteredNewSelectedItem = this.filteredByKeySave(newSelectedItem);
      if (multiSelectable) {
        newSelectedItems = newSelectedItems.concat([filteredNewSelectedItem]);
      } else {
        newSelectedItems = [filteredNewSelectedItem];
      }
    }

    this.handleChange(newSelectedItems);
  };

  handleRowSelected = (rowNumber) => {
    if (rowNumber === 'all') {
      this.handleAllRowsSelected();
    } else {
      this.handleOneRowSelected(rowNumber);
    }
  };

  render() {
    const { children } = this.props;
    return <MUTable {...this.props}>{children}</MUTable>;
  }
}

Table.propTypes = {
  checkKey: PropTypes.string,
  children: PropTypes.node,
  dispatch: PropTypes.func,
  formid: PropTypes.string,
  input: PropTypes.shape(),
  itemList: PropTypes.arrayOf(PropTypes.any),
  keysSave: PropTypes.arrayOf(PropTypes.any),
  multiSelectable: PropTypes.bool,
  selectable: PropTypes.bool,
  sortable: PropTypes.bool,
  sortData: PropTypes.shape(),
  displayRowCheckboxOnTheRightSide: PropTypes.bool,
  bodyRowCheckBoxSpans: PropTypes.arrayOf(PropTypes.number),
};

Table.defaultProps = {
  children: null,
  itemList: null,
  formid: '',
  input: {},
  checkKey: '',
  keysSave: null,
  multiSelectable: false,
  selectable: true,
  sortable: false,
  sortData: {},
  displayRowCheckboxOnTheRightSide: false,
  bodyRowCheckBoxSpans: null,
};

Table.childContextTypes = {
  onRowSelect: PropTypes.func,
  selectedIndexes: PropTypes.arrayOf(PropTypes.number),
  isHeaderSelected: PropTypes.bool,
  rowCheckboxSelectable: PropTypes.bool,
  sortable: PropTypes.bool,
  onColSortClick: PropTypes.func,
  sortData: PropTypes.func,
  displayRowCheckboxOnTheRightSide: PropTypes.bool,
  bodyRowCheckBoxSpans: PropTypes.arrayOf(PropTypes.number),
};

const mapStateToProps = (state, props) => {
  const { formid } = props;
  const result = state.searchResults[formid] || {};
  const selectedItems = result.selectedItems || [];
  return {
    selectedItems,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  onChange: (values) => {
    const { checkKey, formid } = props;
    dispatch(
      actions.updateSearchResults({ selectedItems: values, checkKey }, formid),
    );
  },
});

const mergeProps = (stateProps, dispatchProps, props) => {
  const { selectedItems } = stateProps;
  const { onChange } = dispatchProps;
  const input = {
    value: selectedItems,
    onChange,
  };
  return {
    ...props,
    ...stateProps,
    ...dispatchProps,
    input,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Table);
