import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import sagaActions from 'actions/node/saga-creators';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import RaisedButton from 'components/common/mui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import { confSelector } from 'common/selectors';
import lodashGet from 'lodash.get';
import { isEnrolmentPlanProgram } from 'components/admin/node/utils';
import { getThemeConfig } from 'utils/selectors';
import { filterDuplicate } from 'common/utils/Array';

import DeepClone from '../DeepClone';
import Cell from './Cell';
import detectColumns from './columns-configs';

import './stylesheet.scss';
import { Link } from 'react-router-dom';
import AntButton from 'antd/lib/button';

const width = {
  check: 50,
};

const style = {
  check: {
    marginLeft: 10,
  },
};

class Results extends Component {
  state = {
    fixedHeader: this.props.fixedHeader,
    selectable: this.props.selectable,
    multiSelectable: this.props.multiSelectable,
    enableSelectAll: this.props.enableSelectAll,
    showCheckboxes: this.props.showCheckboxes,
    deselectOnClickaway: this.props.deselectOnClickaway,
    showRowHover: this.props.showRowHover,
    stripedRows: this.props.stripedRows,
    selectedRows: {},
  };

  /**
   * @param node could be an array of nodes
   */
  addNodeToMetadataWithoutClone = (node) => {
    const {
      editingItem,
      dispatch,
      fieldEdit,
      formid,
      editingItemAncestors,
      handleAddNodeSuccessful,
    } = this.props;

    if (typeof handleAddNodeSuccessful === 'function') {
      handleAddNodeSuccessful(node);
      return;
    }

    let metadata = editingItem[fieldEdit] || [];
    metadata = metadata.concat(Array.isArray(node) ? node : [node]);
    metadata = filterDuplicate(metadata, (item) =>
      String(lodashGet(item, 'iid')),
    );

    const dataUpdate = {
      ntype: editingItem.ntype,
      iid: editingItem.iid,
      id: editingItem.id,
      type:
        editingItem.ntype === 'path' &&
        (editingItem.type === 'classgroup' ||
          editingItem.type === 'subjectgroup')
          ? editingItem.type
          : '',
    };

    // send syllabus iid along so that the server can check for permission
    const syllabus =
      editingItemAncestors &&
      editingItemAncestors.find((item) => item && item.ntype === 'syllabus');

    if (syllabus && syllabus.iid) {
      dataUpdate.syllabus = syllabus.iid;
    }

    dataUpdate[fieldEdit] = metadata;
    dispatch(
      sagaActions.updateNodeRequest({
        step: fieldEdit,
        iid: editingItem.iid,
        data: dataUpdate,
        closeModal: false,
        searchFormId: formid,
        requestSuccessful: () => {
          if (Object.keys(this.state.selectedRows).length) {
            this.setState({ selectedRows: {} });
          }
        },
      }),
    );
  };

  addNodeToMetadataWithDeepClone = (node) => {
    const { dispatch } = this.props;

    dispatch(
      sagaActions.deepCloneNodeRequest({
        data: node,
        iid: node.iid,
        ntype: node.ntype,
        requestSuccessful: (result) => {
          this.addNodeToMetadataWithoutClone(result);
        },
      }),
    );
  };

  addNodeToMetadata = (node, shouldDeepClone = false) => {
    const { editingItem } = this.props;
    if (!editingItem.iid && !node.iid) {
      return;
    }
    if (!shouldDeepClone) {
      this.addNodeToMetadataWithoutClone(node);
    } else {
      this.addNodeToMetadataWithDeepClone(node);
    }
  };

  detectType = (items) => {
    if (!Array.isArray(items) || items.length === 0) return '';
    const item = items[0];
    if (!item) return '';
    if (item.ntype === 'syllabus' || item.ntype === 'path') return item.type;

    return item.ntype;
  };

  handleAddSelectedNodes = () => {
    const { selectedRows } = this.state;
    if (!selectedRows) return;

    const nodes = Object.keys(selectedRows).map((key) => selectedRows[key]);
    this.addNodeToMetadataWithoutClone(nodes);
  };

  /**
   * TODO: this is currently not working. It only adds 1 element
   */
  handleCloneAndAddSelectedNodes = () => {
    const { selectedRows } = this.state;
    if (!selectedRows) return;

    const nodes = Object.keys(selectedRows).map((key) => selectedRows[key]);

    if (nodes.length)
      nodes.map((node) => this.addNodeToMetadataWithDeepClone(node));
  };

  handleOnCheckItem = (index, items) => {
    const rows = this.state.selectedRows;
    if (rows[index]) {
      delete rows[index];
    } else {
      rows[index] = items[index];
    }

    this.setState({ selectedRows: rows });
  };

  handleOnCheckAllItem = () => {
    const { items } = this.props;
    if (!items) return;

    let rows = this.state.selectedRows || {};
    if (items.length === Object.keys(rows).length) {
      rows = {};
    } else {
      items.forEach((item, index) => {
        rows[index] = item;
      });
    }

    this.setState({ selectedRows: rows });
  };

  render() {
    const {
      items,
      shouldDeepCloneItem,
      displayType,
      formid,
      themeConfig,
    } = this.props;
    const type = this.detectType(items);
    const columns = detectColumns(
      type,
      displayType,
      shouldDeepCloneItem,
      themeConfig,
    );
    const selectedRowsLength = Object.keys(this.state.selectedRows).length || 0;

    const titleDel = t1('delete');
    const textConfirm = t1('are_you_sure_you_want_to_do_this');
    let canPreview = false;
    if (
      items[0].ntype === 'credit' ||
      items[0].ntype === 'slug' ||
      items[0].ntype === 'name' ||
      items[0].ntype === 'sco' ||
      items[0].ntype === 'syllabus' ||
      items[0].ntype === 'path'
    ) {
      canPreview = true;
    } else {
      columns.pop();
    }

    return (
      <div className="table-result bank-table">
        <div className="selected-rows">
          {selectedRowsLength > 0 && (
            <span className="m-r-10">
              {t1('%d_selected', [selectedRowsLength])}
            </span>
          )}
          {displayType !== 'view_bank' && (
            <RaisedButton
              label={t1('add')}
              primary
              disabled={!selectedRowsLength}
              onClick={this.handleAddSelectedNodes}
            />
          )}
          {/*
            <span>{' - '}</span>,
            <RaisedButton
              label={t1('clone_and_add')}
              primary
              disabled={!selectedRowsLength}
              onClick={this.handleCloneAndAddSelectedNodes}
            />,
            */}
        </div>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              {displayType !== 'view_bank' && (
                <TableHeaderColumn width={width.check}>
                  <Checkbox
                    center
                    style={style.check}
                    iconRight
                    iconType="material"
                    checked={(items && items.length) === selectedRowsLength}
                    onCheck={this.handleOnCheckAllItem}
                  />
                </TableHeaderColumn>
              )}
              {columns.map((column) => (
                <TableHeaderColumn {...column}>{column.name}</TableHeaderColumn>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody
            displayRowCheckbox={false}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {items.map((item, index) => (
              <TableRow key={item.id}>
                {displayType !== 'view_bank' && (
                  <TableRowColumn width={width.check}>
                    <Checkbox
                      center
                      iconRight
                      style={style.check}
                      iconType="material"
                      checked={this.state.selectedRows[index]}
                      onCheck={() => this.handleOnCheckItem(index, items)}
                    />
                  </TableRowColumn>
                )}
                {columns.map(
                  (column) =>
                    column.key !== 'action' &&
                    column.key !== 'delete' &&
                    column.key !== 'clone' &&
                    column.key !== 'add' &&
                    column.key !== 'preview' && (
                      <TableRowColumn key={`${column.key}-${item.id}`}>
                        <Cell column={column.key} item={item} />
                      </TableRowColumn>
                    ),
                )}

                {displayType !== 'view_bank' && (
                  <TableRowColumn key={`add-${item.id}`}>
                    <AntButton
                      type="dashed"
                      shape="circle"
                      icon="plus-circle"
                      onClick={() => this.addNodeToMetadata(item)}
                    />
                  </TableRowColumn>
                )}

                {displayType !== 'view_bank' && shouldDeepCloneItem && (
                  <TableRowColumn key={`clone-${item.id}`}>
                    <DeepClone
                      node={item}
                      deepCloneSuccessFul={(newNode) =>
                        this.addNodeToMetadataWithoutClone(newNode)
                      }
                    />
                  </TableRowColumn>
                )}

                {displayType === 'view_bank' && (
                  <TableRowColumn key={`delete-${item.id}`}>
                    <DeleteItem
                      title={titleDel}
                      textComfirm={textConfirm}
                      ntype={item.ntype}
                      itemId={item.id}
                      formid={formid}
                    />
                  </TableRowColumn>
                )}
                {canPreview && (
                  <TableRowColumn key={`delete-${item.id}`}>
                    <Link
                      target="_blank"
                      to={`/admin/${item.ntype}/${item.iid}`}
                    >
                      <AntButton icon="eye" />
                    </Link>
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
  fixedHeader: PropTypes.bool,
  selectable: PropTypes.bool,
  multiSelectable: PropTypes.bool,
  enableSelectAll: PropTypes.bool,
  showCheckboxes: PropTypes.bool,
  deselectOnClickaway: PropTypes.bool,
  showRowHover: PropTypes.bool,
  stripedRows: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      iid: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  subType: PropTypes.string,
  fieldEdit: PropTypes.string,
};

Results.defaultProps = {
  fixedHeader: true,
  selectable: false,
  multiSelectable: true,
  enableSelectAll: false,
  showCheckboxes: true,
  deselectOnClickaway: false,
  showRowHover: true,
  stripedRows: true,
  items: [
    {
      id: 'nothing',
      iid: 'nothing',
      name: 'available',
    },
  ],
  subType: null,
  fieldEdit: 'metadata',
};

function mapStateToProps(state, props) {
  const { editingItemIid } = props;
  const nodes = state.tree;
  const editingItem = nodes[editingItemIid] || {};

  let shouldDeepCloneItem = lodashGet(
    confSelector(state),
    'ntypes_deep_clone_enable',
    [],
  ).includes(editingItem && editingItem.ntype);

  if (isEnrolmentPlanProgram(editingItem)) {
    shouldDeepCloneItem = false;
  }

  let fieldEdit = props.fieldEdit || 'metadata';
  fieldEdit =
    fieldEdit === 'children' || fieldEdit === 'financial'
      ? 'metadata'
      : fieldEdit;

  return {
    fieldEdit,
    editingItem,
    shouldDeepCloneItem,
    themeConfig: getThemeConfig(state),
  };
}

export default connect(mapStateToProps)(Results);
