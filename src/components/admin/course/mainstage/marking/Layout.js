/**
 * Created by hungvo on 19/04/2017.
 */
import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import sagaActions from 'actions/node/saga-creators';
import actions from 'actions/node/creators';
import apiUrls from 'api-endpoints';
import Icon from 'components/common/Icon';
import nodeIcon from 'components/admin/node/icon';
import routes from 'routes';
import { wordBreadcrumb } from 'common/utils/string';
import { types as questionTypes } from 'components/admin/question/schema/question-types';
import Badge from 'material-ui/Badge';
import { t } from 'translate';

import Results from './Results';
import FormFilters from './FormFilters';
import './stylesheet.scss';

const prefixkeyStateData = 'node-making';
const prefixkeyInfoTests = 'infoOnTheTests';
const questionLabel = (item, index) =>
  item.saw_training_package
    ? `${t('package')} #${item.saw_training_package}`
    : `${t('question')} #${index + 1}`;

class Layout extends Component {
  badgeStyle = { paddingTop: '0' };
  style = { paddingTop: 200, textAlign: 'center' };

  constructor(props) {
    super(props);
    this.state = {
      treeData: null,
      action: 'marking',
      hiddenFields: {},
    };
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  componentWillMount() {
    const { node, action, itemAncestors, type } = this.props;
    this.setFieldsSearch(node, action, itemAncestors, type);
    this.onFetchNode(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.treeData && nextProps && nextProps.data) {
      const data = this.formatDataDrawTreeview(nextProps.data, nextProps.node);
      const treeData = data.treeData;
      if (treeData) {
        this.setState({
          treeData: toggleExpandedForAll({
            treeData,
            expanded: true,
          }),
        });
        this.getInfoOnTheTests(data.itemIids);
      }
      return;
    }
    const { action, itemAncestors, type } = this.props;
    const item = itemAncestors[itemAncestors.length - 1] || {};
    const newItemAncestors = nextProps && nextProps.itemAncestors;
    const newItem = newItemAncestors[newItemAncestors.length - 1] || {};
    if (
      nextProps &&
      (nextProps.action !== action ||
        item.iid !== newItem.iid ||
        nextProps.type !== type ||
        itemAncestors.length !== newItemAncestors.length)
    ) {
      this.setFieldsSearch(
        nextProps.node,
        nextProps.action,
        nextProps.itemAncestors,
        nextProps.type,
      );
    }

    if (this.state.treeData && nextProps && nextProps.infoTheTests) {
      const data = this.formatDataDrawTreeview(
        nextProps.data,
        nextProps.node,
        nextProps.infoTheTests,
      );
      const treeData = data.treeData;
      if (treeData) {
        this.setState({
          treeData: toggleExpandedForAll({
            treeData,
            expanded: true,
          }),
        });
      }
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'TOGGLE_ADMIN_SIDE_MENU',
      closeIt: true,
    });
  }

  getInfoOnTheTests = (items) => {
    const { dispatch, node } = this.props;
    const params = {
      courseIid: node.iid,
      items,
    };
    const url = apiUrls.get_info_on_the_tests;
    const keyState = `${prefixkeyInfoTests}-${node.iid}`;
    dispatch(sagaActions.getDataRequest({ url, keyState }, params));
  };

  formatDataDrawTreeview = (
    data,
    node,
    infoTheTests = {},
    isTest = false,
    parent = {},
  ) => {
    if (data.constructor !== Array) {
      data = data.children || [data];
    }
    const treeData = [];
    let itemIids = [];
    data.forEach((value, index) => {
      let children = [];
      if (value.children) {
        const result = this.formatDataDrawTreeview(
          value.children,
          node,
          infoTheTests,
          this.checkNodeAllowViewer(value),
          value,
        );
        children = result.treeData;
        itemIids = itemIids.concat(result.itemIids);
      }
      if (children.length) {
        value = Object.assign(value, { children });
      } else {
        delete value.children;
      }
      const { viewer, titleViewer } = this.getUrlViewer(
        value,
        node,
        isTest,
        parent,
        index,
        infoTheTests,
      );
      value.title = titleViewer;
      if (!isTest && (viewer || children.length)) {
        treeData.push(value);
        itemIids.push(value.iid);
      } else if (isTest && viewer && children) {
        treeData.push(value);
        itemIids.push(value.iid);
      }
      if (value && value.ntype === 'question') {
        actions.treeUpsertNode(value);
      }
    });
    return { treeData, itemIids };
  };

  setFieldsSearch = (node, action, itemAncestors = [], type) => {
    const hiddenFields = {
      course: node.iid,
    };
    const item = itemAncestors[itemAncestors.length - 1] || {};
    if (parseInt(item.iid, 10) !== parseInt(node.iid, 10)) {
      hiddenFields.item = item;
      hiddenFields.action = action;
      if (type && type !== '') {
        hiddenFields.type = type;
      }
    }
    this.setState({
      action,
      hiddenFields,
    });
  };

  checkNodeAllowViewer = (item) => {
    if (
      (item.ntype === 'sco' && item.tpl_type === 'exam') ||
      (item.ntype === 'exercise' && item.type === 'exam') ||
      (item.ntype === 'question' &&
        item.type === questionTypes.TYPE_OPEN_ENDED) ||
      (item.ntype === 'question' && item.type === questionTypes.TYPE_API)
    ) {
      return true;
    }
    return false;
  };

  getUrlViewer = (
    item = {},
    node,
    isTest = false,
    parent = {},
    index,
    infoTheTests = {},
  ) => {
    let viewer = this.checkNodeAllowViewer(item);
    const name = (
      <div title={item.content}>
        <Icon icon={nodeIcon(item)} />
        {(item.ntype === 'question' && questionLabel(item, index)) ||
          item.name ||
          wordBreadcrumb(item.content, 4, true)}
      </div>
    );

    let url = routes.url('node_edit', { iid: node.iid, ntype: node.ntype });
    if (item.ntype === 'question') {
      url = `${routes.url('node_edit', {
        iid: node.iid,
        ntype: node.ntype,
      })}/marking/${item.ntype}/${item.iid}`;
    } else if (
      (!viewer || isTest) &&
      item.ntype === 'exercise' &&
      item.children
    ) {
      viewer = true;
      url = `${routes.url('node_edit', {
        iid: node.iid,
        ntype: node.ntype,
      })}/marking/${item.ntype}/${item.iid}`;
    } else if (isTest) {
      url = `${routes.url('node_edit', {
        iid: node.iid,
        ntype: node.ntype,
      })}/test/${parent.ntype}/${parent.iid}`;
    } else {
      url = `${routes.url('node_edit', {
        iid: node.iid,
        ntype: node.ntype,
      })}/test/${item.ntype}/${item.iid}`;
    }

    let titleViewer = viewer ? <NavLink to={url}>{name}</NavLink> : name;
    const info = infoTheTests[item.iid];
    if (info && (info.marked || info.pending)) {
      titleViewer = (
        <div>
          {titleViewer}
          {info.marked && (
            <NavLink to={`${url}/marked`}>
              <Badge
                badgeContent={info.marked}
                primary
                style={this.badgeStyle}
              />
            </NavLink>
          )}
          {info.pending && (
            <NavLink to={`${url}/pending`}>
              <Badge
                badgeContent={info.pending}
                secondary
                style={this.badgeStyle}
                title="Pending"
              />
            </NavLink>
          )}
        </div>
      );
    }
    return { viewer, titleViewer };
  };

  onFetchNode(props) {
    const { dispatch, node } = props;

    const params = {
      iid: node.ntype === 'course' ? node.syllabus : node.iid,
      ntype: node.ntype === 'course' ? 'syllabus' : node.ntype,
      depth: -1,
    };
    const url = apiUrls.fetch_node;
    const keyState = `${prefixkeyStateData}-${node.iid}`;
    dispatch(sagaActions.getDataRequest({ url, keyState }, params));
  }

  renderResultComponent(items, props) {
    return <Results items={items} {...props} />;
  }

  renderTreeViewDataReport = (data) => (
    <SortableTree
      treeData={data}
      canDrop={() => false}
      onChange={(treeData) => this.setState({ treeData })}
      maxDepth={1}
      canDrag={() => false}
    />
  );

  render() {
    const { node } = this.props;

    if (!this.state.treeData) {
      return (
        <div style={this.style}>
          <CircularProgress />
          <CircularProgress size={60} thickness={5} />
          <CircularProgress size={80} thickness={7} />
        </div>
      );
    }

    return (
      <div className="row">
        <div
          className="col-md-3"
          style={{ height: window.innerHeight - 100, fontSize: '80%' }}
        >
          {this.renderTreeViewDataReport(this.state.treeData)}
        </div>
        <div className="col-md-9">
          <SearchWrapper
            formid="course_marking"
            hiddenFields={this.state.hiddenFields}
            node={node}
            action={this.state.action}
            renderResultsComponent={this.renderResultComponent}
            showQueryField={false}
          >
            <FormFilters />
          </SearchWrapper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const node = props.node;
  let keyState = `${prefixkeyStateData}-${node.iid}`;
  const data = state.dataApiResults[keyState];
  keyState = `${prefixkeyInfoTests}-${node.iid}`;
  const infoTheTests = state.dataApiResults[keyState];
  const itemAncestors = state.editing.itemAncestors || [];
  const type = state.editing.subAction;
  return {
    data,
    itemAncestors,
    infoTheTests,
    type,
  };
};

export default connect(mapStateToProps)(Layout);
