import React, { Component } from 'react';
import get from 'lodash.get';
import isEqual from 'lodash.isequal';
import { withRouter } from 'react-router';
import { t1 } from 'translate';
import Icon from 'antd/lib/icon';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Comment from './Comment';
import { extractObject } from 'common/utils/Array';
import actions from 'actions/node/creators';
import sagaActions from 'actions/node/saga-creators';
import getChildrenTypes from 'components/admin/node/edit/metadata/add-item/utils';
import QuestionsGroupSwitch from 'components/admin/node/edit/controls/QuestionsGroupSwitch';
import Table from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { getActionFilters } from '../metadata/utils-configs';
import { hasDuration, hasSequential } from 'components/admin/node/configs';
import { isExam } from 'common/learn';
import { checkIfEnableExamTemplate } from 'common/conf';
import ItemTitle from './item-title/';
import ItemWeight from './weight';
import ItemActions from './actions';
import HeaderTitle from './HeaderTitle';
import TableFooter from './TableFooter';
import DragSorting from './DragSorting';

import './styles.scss';
import { Scrollbars } from 'react-custom-scrollbars';

const defaultPageSize = 50;

/**
 * Get the nav item (item which appears in the course nav bar) we're editing
 * so we can highlight it in compact mode
 * Note that, we don't highlight it because in compact mode we're not showing questions
 * @param itemAncestors
 * @return {*}
 */
const getEditingItem = (itemAncestors) => {
  let editingItemIid;
  if (itemAncestors.length) {
    for (let i = itemAncestors.length - 1; i >= 0; i--) {
      if (itemAncestors[i].ntype != 'question') return itemAncestors[i].iid;
    }
  }

  editingItemIid = itemAncestors.length
    ? itemAncestors[itemAncestors.length - 1].iid
    : null;

  return editingItemIid;
};

class MetadataContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drag: false,
      loading: false,
      expandedRowKeys: null, //keys đang trạng thái expanded
      fetchedNodeIids: [], //Danh sách các iid đã fetch
    };
  }

  componentDidMount() {
    const expandedRowKeys = this.props.defaultExpandedRowKeys;
    if (
      Array.isArray(expandedRowKeys) &&
      expandedRowKeys.length &&
      get(this.state, 'expandedRowKeys') === null
    ) {
      this.setState({ expandedRowKeys });
    }
  }

  handleFetchNode = (node = {}, executeOnSuccess = null) => {
    const { fetchNode } = this.props;

    if (
      !(node && node.iid) ||
      typeof fetchNode !== 'function' ||
      get(this.state, 'fetchedNodeIids', []).includes(node && node.iid) ||
      get(this.state, 'fetchedNodeIids', []).includes(
        get(this.props, 'node.iid'),
      )
    ) {
      if (typeof executeOnSuccess === 'function') {
        executeOnSuccess();
      }

      return;
    }

    this.setState(
      ({ loading }) => ({ loading: true }),
      () =>
        fetchNode(node, () => {
          if (typeof executeOnSuccess === 'function') {
            executeOnSuccess();
          }
          this.setState(({ fetchedNodeIids }) => ({
            loading: false,
            fetchedNodeIids: [...fetchedNodeIids, node.iid],
          }));
        }),
    );
  };

  handleExpandableItem = (expanded, row = {}) => {
    this.handleFetchNode(expanded ? row : null, () =>
      this.setState(({ expandedRowKeys = [] }) => ({
        expandedRowKeys: expandedRowKeys
          .filter((id) => id !== row.id)
          .concat(expanded ? [row.id] : []),
      })),
    );
  };

  handleDragSorting = () => {
    this.setState(({ drag }) => {
      if (!drag) {
        this.handleExpandAllRows(true);
      }

      return { drag: !drag };
    });
  };

  handleExpandAllRows = (toExpand = false) => {
    const expandedRowKeys = get(this.state, 'expandedRowKeys', []);
    const expanded = Array.isArray(expandedRowKeys) && expandedRowKeys.length;
    this.handleFetchNode(expanded ? null : get(this.props, 'node'), () =>
      this.setState(() => ({
        expandedRowKeys:
          !toExpand && expanded ? [] : get(this.props, 'expandedRowKeys'),
      })),
    );
  };

  updateMetadata = (parentNode = {}, nodeUpdated = null) => {
    const { nodes, updateDataInStore } = this.props;
    const fieldEdit = 'metadata';
    let dataEdit = get(parentNode, fieldEdit);

    if (
      !nodeUpdated ||
      !get(parentNode, 'iid') ||
      !Array.isArray(dataEdit) ||
      !dataEdit.length
    ) {
      return;
    }

    parentNode[fieldEdit] = dataEdit
      .map((valueInArray) => {
        let newValueInArray =
          typeof valueInArray === 'object'
            ? valueInArray
            : get(nodes, valueInArray);
        const id = get(newValueInArray, 'id');

        if (!id) {
          return false;
        } else if (get(nodeUpdated, 'id') === id) {
          newValueInArray = Object.assign(newValueInArray, nodeUpdated);
        }

        return extractObject(newValueInArray, [
          'id',
          'iid',
          'name',
          'ntype',
          'type',
          'pid',
          'duration',
          'weighted',
          'require',
          'options',
          'group',
          'sequential',
          'sub_type',
          'faculty',
          'ico',
          'score',
          'intro_sticky',
          'intro_sticky_position',
          'survey_applied_item_relation_id',
          'scorm_file',
          'processing_scorm',
          'scorm_directory_url',
          'exam_template_iid',
        ]);
      })
      .filter(Boolean);

    updateDataInStore(parentNode, fieldEdit);
  };

  getColumns = () => {
    const {
      node,
      fieldEdit,
      columns,
      readOnly,
      nodes,
      baseUrl,
      isCompact,
      action,
      dataSource,
      itemAncestors,
    } = this.props;
    let expandedRowKeys = get(this.state, 'expandedRowKeys');
    expandedRowKeys = Array.isArray(expandedRowKeys) ? expandedRowKeys : [];
    const collapsedAllRow = expandedRowKeys.length;

    const editingItemIid = getEditingItem(itemAncestors);

    const dragSorting = this.state.drag;

    let ret = [
      {
        title: (
          <div style={{ width: '100%' }}>
            <div className="pull-left">
              {!isCompact &&
                Array.isArray(dataSource) &&
                dataSource.length > 0 && (
                  <Icon
                    className="m-r-10"
                    type={dragSorting ? 'unordered-list' : 'drag'}
                    title={
                      dragSorting
                        ? t1('click_to_disable_sorting')
                        : t1('click_to_drag_sorting')
                    }
                    size="small"
                    onClick={this.handleDragSorting}
                  />
                )}
              {!dragSorting && node.ntype !== 'exercise' && (
                <Icon
                  className="m-r-10"
                  type={collapsedAllRow ? 'fullscreen-exit' : 'fullscreen'}
                  title={
                    collapsedAllRow
                      ? t1('click_to_collapse_rows')
                      : t1('click_to_expand_rows')
                  }
                  size="small"
                  onClick={() => this.handleExpandAllRows()}
                />
              )}
              {` ${t1('name')}`}
            </div>
            {get(node, 'ntype') === 'exercise' &&
              Array.isArray(get(node, 'metadata')) &&
              get(node, 'metadata').length > 1 && (
                <span className="pull-right">
                  <QuestionsGroupSwitch node={node} readOnly={readOnly} />
                </span>
              )}
          </div>
        ),
        width: `${100 - (25 + 15)}%`,
        render: (text, rowItem, index) => {
          const expandedRowKeys = get(this.state, 'expandedRowKeys');
          return (
            <ItemTitle
              expanded={
                Array.isArray(expandedRowKeys) &&
                expandedRowKeys.includes(rowItem.id)
              }
              readOnly={readOnly}
              rowItem={rowItem}
              index={index}
              isCompact={isCompact}
              fieldEdit={fieldEdit}
              updateMetadata={this.updateMetadata}
              action={action}
              dragSorting={dragSorting}
              isRowActive={editingItemIid == rowItem.iid}
            />
          );
        },
      },
    ];

    if (!dragSorting) {
      ret = ret
        .concat(
          columns.map((column) => {
            return {
              title: (
                <HeaderTitle column={column} node={node} readOnly={readOnly} />
              ),
              width: (() => {
                switch (column) {
                  case 'comment':
                  case 'sequential':
                  case 'duration':
                  case 'status': {
                    return '5%';
                  }
                  case 'weight': {
                    return '8%';
                  }
                  case 'action': {
                    return '10%';
                  }
                }
              })(),
              render: (text, rowItem) => {
                const {
                  // node,
                  parentNode = {},
                  numberOfChildren,
                  path,
                  ...row
                } = rowItem;

                let newText = '';
                switch (column) {
                  case 'duration': {
                    newText =
                      ((row.duration || row.aggregated_duration) &&
                        hasDuration(row.ntype, fieldEdit) &&
                        (!isExam(row) || row.ntype !== 'syllabus') &&
                        row.duration) ||
                      row.aggregated_duration;
                    break;
                  }
                  case 'weight': {
                    newText = (
                      <ItemWeight
                        parentNode={parentNode}
                        path={path}
                        updateMetadata={this.updateMetadata}
                        rowItem={rowItem}
                        readOnly={readOnly}
                      />
                    );
                    break;
                  }
                  case 'comment': {
                    newText = Comment({
                      node: row,
                      syllabusIid: get(node, 'iid'),
                      handleFetchNode: () => this.handleFetchNode(row),
                    });
                    break;
                  }
                  case 'sequential': {
                    newText = hasSequential(
                      row,
                      '',
                      nodes,
                      row.parentIndex,
                      row.itemIndex,
                    ) ? (
                      <Link
                        to={`${baseUrl}#!${path}/sequential`}
                        title={t1('edit_sequential')}
                        className="action"
                      >
                        <Icon type="link" />{' '}
                        {Array.isArray(get(row, 'sequential')) &&
                          get(row, 'sequential').length > 0 &&
                          `(${get(row, 'sequential').length})`}
                      </Link>
                    ) : null;
                    break;
                  }
                  case 'action': {
                    newText = (
                      <ItemActions
                        row={rowItem}
                        readOnly={readOnly}
                        updateMetadata={this.updateMetadata()}
                        updateDataInStore={this.props.updateDataInStore}
                        dispatch={this.props.dispatch}
                        fieldEdit={fieldEdit}
                        nodes={nodes}
                        syllabusIid={get(this.props, 'node.iid')}
                      />
                    );
                  }
                }

                return {
                  children: newText,
                  props: {
                    className: 'text-center',
                  },
                };
              },
            };
          }),
        )
        .filter(Boolean);
    }

    return ret;
  };

  componentWillReceiveProps(nextProps) {
    const expandedRowKeys = nextProps.defaultExpandedRowKeys;
    if (!isEqual(expandedRowKeys, this.props.defaultExpandedRowKeys)) {
      this.setState({ expandedRowKeys });
    }
  }

  tableBodyElement = () => {
    const {
      dataSource,
      isCompact,
      itemAncestors,
      updateDataInStore,
    } = this.props;

    const editingItemIid = getEditingItem(itemAncestors);

    const getTable = (newProps = {}) => (
      <Table
        rowKey="id"
        size="small"
        indentSize={30}
        dataSource={dataSource}
        columns={this.getColumns()}
        className="white-background metadata-container-table"
        onExpand={this.handleExpandableItem}
        loading={get(this.state, 'loading')}
        expandedRowKeys={get(this.state, 'expandedRowKeys') || []}
        pagination={
          dataSource.length <= defaultPageSize || this.state.drag
            ? false
            : {
                pageSizeOptions: [30, 50, 100],
                defaultPageSize,
                showSizeChanger: true,
              }
        }
        rowClassName={(row, index) => {
          let klass = 'item-row';
          if (row.ntype === 'sco' && row.tpl_type != 'scorm')
            klass = klass + ' sco-row';
          if (row.iid == editingItemIid) {
            klass = klass + ' active-row';
          }
          return klass;
        }}
        showHeader={!isCompact}
        bordered={!isCompact}
        {...newProps}
      />
    );

    return this.state.drag ? (
      <DragSorting getTable={getTable} updateDataInStore={updateDataInStore} />
    ) : (
      getTable()
    );
  };

  render() {
    const {
      node, // root Node
      childrenTypes,
      isCompact,
      itemAncestors,
      syllabus,
      readOnly,
    } = this.props;

    return (
      <div>
        {isCompact ? (
          <Scrollbars style={{ height: 'calc(60vh - 50px)' }}>
            {this.tableBodyElement()}
          </Scrollbars>
        ) : (
          this.tableBodyElement()
        )}
        {!this.state.drag && (
          <TableFooter
            node={node}
            childrenTypes={childrenTypes}
            itemAncestors={itemAncestors}
            syllabus={syllabus}
            readOnly={readOnly}
            isCompact={isCompact}
          />
        )}
      </div>
    );
  }
}

// default expanded depth
const depthExpanded = 0;
const getPropertyToRenderTable = ({
  node = {},
  depth = 0,
  parentIndex = 0,
  baseUrl,
  itemAncestors,
  ...props
}) => {
  const {
    nodes,
    domainInfo,
    rootItemNtype,
    fieldEdit = 'children',
    readOnly = false,
    checkIfEnableExamTemplate = false,
    isCompact,
  } = props;
  let dataSource = node[fieldEdit];
  let expandedRowKeys = [];
  let defaultExpandedRowKeys = [];
  dataSource = (Array.isArray(dataSource) ? dataSource : [])
    .map((chil, itemIndex) => {
      let newChil = typeof chil === 'object' ? chil : get(nodes, chil);
      if (!get(newChil, 'iid')) {
        return false;
      }

      // in compact mode, don't show question list
      if (isCompact && newChil.ntype === 'question') return false;

      const path = `${baseUrl}/${newChil.ntype}/${newChil.iid}`;

      const propertyToRender = getPropertyToRenderTable({
        ...props,
        node: newChil,
        depth: depth + 1,
        parentIndex: itemIndex,
        baseUrl: path,
      });

      let children = get(propertyToRender, 'dataSource') || [];
      const childrenExpandedRowKeys = get(propertyToRender, 'expandedRowKeys');
      const childrenDefaultExpandedRowKeys = get(
        propertyToRender,
        'defaultExpandedRowKeys',
      );

      if (Array.isArray(childrenExpandedRowKeys)) {
        expandedRowKeys = expandedRowKeys.concat(childrenExpandedRowKeys);
        defaultExpandedRowKeys = defaultExpandedRowKeys.concat(
          childrenDefaultExpandedRowKeys,
        );
      }

      let metadata = {};
      if (['children', 'metadata'].includes(fieldEdit)) {
        metadata = Array.isArray(get(node, 'metadata'))
          ? get(node, 'metadata').find(
              (row) => get(row, 'id') === get(newChil, 'id'),
            )
          : {};
      }

      const numberOfChildren = Array.isArray(newChil.children)
        ? newChil.children.length
        : 0;

      let childrenTypes = [];
      if (!readOnly) {
        childrenTypes = getChildrenTypes(
          domainInfo,
          newChil,
          fieldEdit,
          rootItemNtype,
          depth,
          [],
          checkIfEnableExamTemplate,
        );
      }

      if (Array.isArray(children) && children.length) {
        expandedRowKeys.push(newChil.id);
        if (depth <= depthExpanded) {
          defaultExpandedRowKeys.push(newChil.id);
        }
      } else {
        children = null;
      }

      return {
        ...newChil,
        ...(metadata || {}),
        ...extractObject(newChil, ['id', 'iid', 'name', 'ntype', 'type']),
        childrenTypes,
        parentIndex,
        numberOfChildren,
        path,
        parentNode: node,
        itemIndex,
        children,
      };
    })
    .filter(Boolean);

  return { dataSource, expandedRowKeys, defaultExpandedRowKeys };
};

const baseUrlFromItemAncestors = (itemAncestors, node) => {
  let ret = '/admin';
  let stop = false;
  itemAncestors.forEach((item) => {
    if (stop) return;

    ret = `${ret}/${item.ntype}/${item.iid}`;

    if (item.iid == node.iid) stop = true;
  });
  return ret;
};

const mapStateToProps = createSelector(
  (state) => get(state, 'tree', []),
  (state) => get(state, 'domainInfo', {}),
  (state) =>
    checkIfEnableExamTemplate(
      get(state, 'domainInfo.conf.enable_exam_template'),
    ),
  (state, props) => props,
  (
    nodes,
    domainInfo,
    checkIfEnableExamTemplate,
    { node, fieldEdit, readOnly, action, columns, itemAncestors, isCompact },
  ) => {
    const baseUrl = window.location.pathname;
    const {
      dataSource,
      expandedRowKeys,
      defaultExpandedRowKeys,
    } = getPropertyToRenderTable({
      node,
      nodes,
      domainInfo,
      rootItemNtype: get(node, 'ntype'),
      parentIndex: 0,
      // TODO: Fix this baseUrl
      baseUrl: baseUrlFromItemAncestors(itemAncestors, node), //`/admin/${node.ntype}/${node.iid}`,
      itemAncestors,
      checkIfEnableExamTemplate,
      isCompact,
    });

    return {
      nodes,
      baseUrl,
      dataSource,
      expandedRowKeys: Array.from(new Set(expandedRowKeys)),
      defaultExpandedRowKeys: Array.from(new Set(defaultExpandedRowKeys)),
      columns:
        columns ||
        getActionFilters(node, action)
          .filter((column) => !['name'].includes(column))
          .concat(['action']),
      childrenTypes: getChildrenTypes(
        domainInfo,
        node,
        fieldEdit,
        node,
        0,
        [],
        checkIfEnableExamTemplate,
      ),
    };
  },
);

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchNode: (node, executeOnSuccess = () => {}) => {
      dispatch(
        actions.fetchNode({
          ...{
            id: get(node, 'id'),
            iid: get(node, 'iid'),
            ntype: get(node, 'ntype'),
          },
          depth: get(node, 'iid') === get(props, 'node.iid') ? -1 : 1,
          is_preview: 1,
          editing_syllabus: 2,
          executeOnSuccess,
        }),
      );
    },
    updateDataInStore: (node, step, requestSuccessful = () => {}) => {
      dispatch(
        sagaActions.updateNodeRequest({
          step,
          iid: get(node, 'iid'),
          data: node,
          requestSuccessful,
        }),
      );
    },
    dispatch,
  };
};

// node is the root node (e.g. syllabus)
//
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(MetadataContainer));
