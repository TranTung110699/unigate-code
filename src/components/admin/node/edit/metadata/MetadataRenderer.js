/* eslint-disable operator-assignment,prefer-template,no-unused-vars,react/prop-types,no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import routes from 'routes/';
import isEqual from 'lodash.isequal';
import Icon from 'components/common/Icon';
import get from 'lodash.get';
import {
  ntype as allNtype,
  schoolTypes,
  skillType,
  constants,
} from 'configs/constants';
import { getThemeConfig } from 'utils/selectors';
import AddItem from './add-item/AddItem';
import MetadataSortableList from './MetadataSortableList';
import { setAvailableNtypeFilters, setVisualTreeDepth } from './actions';
import { itemPathForAdmin, shouldRenderItem } from './utils-configs';

const hackUrl = (url, item, action, subAction) => {
  let ret = url;
  // let ret = url.replace('/children', '/');

  // console.log({url, action});
  if (constants.leaves.indexOf(item.ntype) !== -1) {
    ret = ret + '/edit';
  } else if (constants.nonLeaves.indexOf(item.ntype !== -1))
    if (item.ntype === 'sco' && item.tpl_type === 'scorm') ret = ret + '/edit';
    else ret = ret + '/children';

  // console.log({ url, item, action, subAction, ret });
  return ret;
};

class MetadataRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      availableNtypeFilters: [],
    };
  }

  componentDidMount() {
    this.parseItems(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      !isEqual(this.props.node, nextProps.node) ||
      !isEqual(this.props.metadataFilters, nextProps.metadataFilters)
    ) {
      this.parseItems(nextProps);
    }
  }

  parseItems(props) {
    // console.log('MetadataRenderer will rereceive props');
    const {
      node,
      fieldEdit,
      depth,
      baseUrl,
      action,
      subAction,
      itemAncestors,
      dispatch,
    } = props;
    const availableNtypeFilters = props.availableNtypeFilters || [];
    const sequential = this.props.sequential || [];
    const children = node[fieldEdit] || [];

    const map = (item) => ({
      ...item,
      path: hackUrl(
        itemPathForAdmin(item, baseUrl, fieldEdit, node, itemAncestors),
        item,
        action,
        subAction,
      ),
      basePath: itemPathForAdmin(item, baseUrl, fieldEdit, node, itemAncestors),
      pathInfo: routes.url('edit_item', {
        base: baseUrl,
        type: 'edit',
        item,
      }),
    });

    let itemAncestorIids = [];
    let ntyFilter = [];
    if (action === 'sequential' && itemAncestors.length) {
      itemAncestorIids = itemAncestors.map((item) =>
        parseInt((item && item.iid) || 0, 10),
      );
      ntyFilter = ['vocab', 'question'];
    }

    let items = [];
    let filter = !!(
      action === 'sequential' && sequential.includes(node.iid.toString())
    );

    if (children && children.length) {
      children.forEach((row) => {
        const child = row;
        if (
          (child.ntype === allNtype.PATH &&
            [allNtype.PROGRAM_MODULE, allNtype.SPECIALIZATION_PROGRAM].includes(
              child.type,
            )) ||
          (child.ntype === allNtype.SYLLABUS && child.type === 'credit')
        ) {
          child.weighted =
            typeof child.weighted !== 'undefined' ? child.weighted : 0;
        }
        if (!ntyFilter.includes(child.ntype)) {
          if (
            itemAncestorIids.length &&
            parseInt(child && child.iid, 10) ===
              itemAncestorIids[itemAncestorIids.length - 1]
          ) {
            filter = true;
          }
          if (!filter) {
            items.push(map(child));
            if (!availableNtypeFilters.includes(child.ntype)) {
              availableNtypeFilters.push(child.ntype);
            }
            if (
              itemAncestorIids.length &&
              itemAncestorIids.includes(parseInt(child && child.iid, 1))
            ) {
              filter = true;
            }
          }
        }
      });
    }

    if (items.length) {
      items = items.filter((item) =>
        shouldRenderItem(item, props.metadataFilters),
      );
    }

    let setState = false;
    if (!isEqual(items, this.state.items)) {
      setState = true;
      if (items.length) dispatch(setVisualTreeDepth(depth, false));
    }
    if (!isEqual(availableNtypeFilters && this.state.availableNtypeFilters)) {
      setState = true;
      if (
        availableNtypeFilters.length &&
        (availableNtypeFilters !== props.availableNtypeFilters ||
          availableNtypeFilters.length !== props.availableNtypeFilters.length)
      ) {
        dispatch(setAvailableNtypeFilters(availableNtypeFilters));
      }
    }
    if (setState) {
      this.setState({
        items,
        availableNtypeFilters,
      });
    }
  }

  getTotalCredit = (node, nodes) => {
    if (
      !node ||
      node.ntype !== 'path' ||
      node.type !== 'program' ||
      !node.credit
    ) {
      return undefined;
    }

    let total = 0;
    if (!Array.isArray(node.children)) {
      return total;
    }
    node.children.forEach((iid) => {
      const credit =
        nodes && nodes[iid] && typeof nodes[iid].credit !== 'undefined'
          ? nodes[iid].credit || 0
          : this.getTotalCredit(nodes[iid], nodes) || 0;
      total += credit || 0;
    });
    return total;
  };
  /**
   * Điều kiện để ẩn button Add Rubric là:
   * 1: Node phải là rubric
   * 2: node có children là pmd_rubric
   * @param node
   * @returns {boolean}
   */
  checkEnableAddItemByRubric = (node, depth) => {
    const { maxNumberOfExamResits } = this.props;
    if (get(node, 'type') !== skillType.RUBRIC) return true;

    const subType = get(node, 'sub_type');
    if (subType === 'attendance') {
      const children = get(node, 'children');
      if (!Array.isArray(children) || !children.length || children.length < 2) {
        return true;
      }
      return false;
    } else if (['attendance_online', 'attendance_offline'].includes(subType)) {
      return false;
    }

    if (get(node, 'rubric_type') === 'pmd_rubric') return false;

    if (
      get(node, 'sub_type') === 'academic_score' &&
      get(node, 'children.length') >= maxNumberOfExamResits + 1
    )
      return false;

    return true;
  };

  render() {
    const {
      node,
      fieldEdit,
      depth,
      readOnly,
      rootItemNtype,
      action,
      nodes,
      status,
      contentReadOnly,
      itemAncestors,
      themeConfig,
    } = this.props;
    const totalCredit = this.getTotalCredit(node, nodes);
    const isSIS = themeConfig.type === schoolTypes.SIS;

    return (
      <div>
        {Array.isArray(this.state.items) && this.state.items.length > 0 ? (
          <MetadataSortableList
            {...this.props}
            readOnly={readOnly || contentReadOnly}
            sortable={!readOnly && action !== 'sequential'}
            parentIndex={this.props.itemIndex}
            node={{ ...node, [fieldEdit]: this.state.items }}
          />
        ) : null}
        {totalCredit >= 0 && isSIS && (
          <div className="pull-right">
            <Icon icon="credit" />
            <span style={totalCredit !== node.credit ? { color: 'red' } : {}}>
              {totalCredit}
            </span>
            /{node.credit}
          </div>
        )}
        {!readOnly &&
          action !== 'sequential' &&
          (!totalCredit || totalCredit < node.credit) &&
          status !== 'deleted' &&
          this.checkEnableAddItemByRubric(node, depth) && (
            // TODO: add validate
            <AddItem
              itemAncestors={itemAncestors}
              node={node}
              fieldEdit={fieldEdit}
              horizontal
              depth={depth}
              rootItemNtype={rootItemNtype}
            />
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  themeConfig: getThemeConfig(state),
  maxNumberOfExamResits: get(
    state,
    'domainInfo.conf.max_number_of_exam_resits',
  ),
});

export default connect(mapStateToProps)(MetadataRenderer);
