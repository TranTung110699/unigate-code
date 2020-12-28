import React, { Component } from 'react';
// import routes from 'routes/';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import actions from 'actions/node/creators';
import sagaActions from 'actions/node/saga-creators';
import CircularProgress from 'material-ui/CircularProgress';
import { t1 } from 'translate';
import FlatButton from 'components/common/mui/FlatButton';
import Icon from 'components/common/Icon';
import { isEditingItemFreeze } from 'components/admin/node/selectors/edit-item';
import { aspects } from 'components/admin/skill/configs';
import PropTypes from 'prop-types';
import MetadataRenderer from './MetadataRenderer';
import MetadataFilter from './MetadataFilter';
import './styles/Metadata.scss';
import {
  setListItemRender,
  setMaximumDepth,
  setVisualTreeDepth,
} from './actions';
import Warning from 'components/common/Warning';
import { getNodeSelector } from 'components/admin/node/utils';
import lodashGet from 'lodash.get';

const loadingStatus = (status, iid) => `${status}_${iid}`;

class MetadataContainer extends Component {
  style = { paddingTop: 200, textAlign: 'center' };
  divStyle = { paddingLeft: '5px', clear: 'both' };

  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: true,
    };
    this.updateSequentialInStore = this.updateSequentialInStore.bind(this);
  }

  componentWillMount() {
    this.fetchNodeForEditing(this.props);
    const maximumDepth = this.getMaximumDepth(this.props);
    // TODO: getMaximum
    this.props.dispatch(setMaximumDepth(maximumDepth));
    this.props.dispatch(setVisualTreeDepth(0, true));
    this.props.dispatch(setListItemRender(0, true));
  }

  componentWillReceiveProps(nextProps) {
    const { action } = this.props;
    if (nextProps && nextProps.action !== action) {
      this.props.dispatch(setListItemRender(0, true));
    }
  }

  componentWillUpdate(nextProps, nextState) {
    // console.log('Container: compnentWillReceiveprops');
    const node = this.props.node;
    if (
      nextProps &&
      nextProps.nodes &&
      (nextProps.node && String(nextProps.node.iid) !== String(node.iid))
    ) {
      this.fetchNodeForEditing(nextProps);
    }
    if (
      (this.state.loadingStatus !== nextState.loadingStatus &&
        nextState.loadingStatus !==
          loadingStatus('loading', nextProps.node.iid)) ||
      (nextProps.node &&
        String(nextProps.node.iid) !== String(this.props.node.iid))
    ) {
      this.props.dispatch(setVisualTreeDepth(0, true));
    }
  }

  getMaximumDepth(props) {
    const { action, fieldEdit, node } = props;
    if (node.ntype === 'skill' && aspects.indexOf(fieldEdit) !== -1) {
      return 1;
    }
    return action === 'sequential' ? 5 : 2; // TODO
  }

  fetchNodeForEditing(props) {
    const { node, nodes, dispatch, fieldEdit, action } = props;
    let shouldFetch = false;

    // if it's skill & aspects, don't fetch depth coz it might cause an infinite loop of fetching
    if (node.ntype === 'skill' && aspects.indexOf(fieldEdit) !== -1) {
      shouldFetch = false;
    } else if (node && node[fieldEdit] && node[fieldEdit].length) {
      // if (node.ntype === 'path')
      //   shouldFetch = true;
      // else {
      node[fieldEdit].forEach((child) => {
        if (!nodes[child] || nodes[child].isMetadata) {
          shouldFetch = true;
        }
      });
      // }
    }

    if (shouldFetch) {
      this.setState({
        loadingStatus: loadingStatus('loading', node.iid),
      });
      // }

      let depth;
      if (node.ntype === 'path' || action === 'sequential') depth = -1;
      else depth = 1;

      dispatch(
        actions.fetchNode({
          ...node,
          depth,
          executeOnSuccess: this.fetchNodeSuccess(node.iid),
        }),
      );
    } else {
      this.fetchNodeSuccess(node.iid);
    }
  }

  fetchNodeSuccess(iid) {
    this.setState({
      loadingStatus: loadingStatus('loaded', iid),
    });
  }

  updateSequentialInStore = (itemIid = 0, add = false) => {
    const { node, nodes, dispatch, action, itemIidsRenderer } = this.props;
    if (action !== 'sequential') {
      return;
    }
    const parentNode = nodes[node && node.pid];
    if (!parentNode) {
      return;
    }
    let metadata = (parentNode && parentNode.metadata) || [];
    metadata = metadata.map((child) => {
      if (
        !child ||
        !child.iid ||
        !node ||
        !node.iid ||
        child.iid.toString() !== node.iid.toString()
      ) {
        return child;
      }
      let sequential = child.sequential || [];
      let itemIidsFilter = [];
      if (add) {
        sequential.push(itemIid.toString());
        itemIidsFilter = (nodes[itemIid] && nodes[itemIid].children) || [];
      } else {
        itemIidsFilter.push(itemIid.toString());
      }
      sequential = sequential.filter((iid) => {
        if (itemIidsFilter.includes(iid)) {
          return false;
        }
        if (itemIidsRenderer.includes(iid)) {
          return true;
        }
        return false;
      });
      return { ...child, sequential };
    });

    dispatch(
      sagaActions.updateNodeRequest({
        step: 'metadata',
        iid: parentNode.iid,
        data: { ...parentNode, metadata },
      }),
    );
  };

  getPropsRenderer = (state) => {
    const { node, action, nodes, itemAncestors, itemIidsRenderer } = this.props;

    let depth = node.max_depth || 1;
    if (node.ntype === 'path' || action === 'sequential') depth = -1;
    let result = { depth, node };

    if (action === 'sequential') {
      let nodeRenderer;
      itemAncestors.forEach((item) => {
        if (
          !nodeRenderer &&
          ['path', 'syllabus'].includes(item && item.ntype)
        ) {
          nodeRenderer = nodes[item && item.iid];
        }
      });
      if (!nodeRenderer) {
        nodeRenderer = node;
      }
      const sequential = node.sequential || [];
      const itemSequentialMissing = sequential.filter(
        (iid) => !itemIidsRenderer.includes(iid),
      );
      result = {
        ...result,
        updateSequential: this.updateSequentialInStore,
        sequential,
        itemSequentialMissing,
        node: nodeRenderer,
      };
    }
    return result;
  };

  render() {
    if (
      this.state.loadingStatus !== loadingStatus('loaded', this.props.node.iid)
    ) {
      return (
        <div style={this.style}>
          Loading item...
          <CircularProgress size={80} thickness={7} />
        </div>
      );
    }

    const {
      node,
      readOnly,
      action,
      itemIidsRenderer,
      nodes,
      syllabusIid,
      contentReadOnly,
      ntypesAllowRemove,
      textConfirm,
      inEPRunning,
    } = this.props;
    const fieldEdit = this.props.fieldEdit || 'metadata';
    const propsRenderer = this.getPropsRenderer();
    const itemSequentialMissing = propsRenderer.itemSequentialMissing || [];
    const shouldRenderFilters =
      action !== 'sequential' ||
      (action === 'sequential' &&
        itemIidsRenderer &&
        itemIidsRenderer.length > 0);

    return (
      <div className="metadata-container">
        {action === 'sequential' && (
          <div>
            <h3>
              {t1('edit_sequential_%s', [node && node.name])}
              {itemSequentialMissing && itemSequentialMissing.length > 0 && (
                <FlatButton
                  label={t1('clear_item_missing(%s_items)', [
                    itemSequentialMissing.length,
                  ])}
                  secondary
                  icon={<Icon icon="delete" />}
                  onClick={() => this.updateSequentialInStore()}
                />
              )}
            </h3>
          </div>
        )}
        {/*
          {node.freeze ? (
            <div style={this.divStyle}>
              <Warning>
                {t1('this_item_is_currently_frozen_and_cannot_be_edited')}
              </Warning>
              <hr />
            </div>
          ) : null}
           */}
        <div>
          {shouldRenderFilters && (
            <MetadataFilter
              action={action}
              {...propsRenderer}
              fieldEdit={fieldEdit}
              nodes={this.props.nodes}
              maximumDepth={this.props.maximumDepth}
              metadataFilters={this.props.metadataFilters}
              modules={this.props.modules}
              rootItemFetchedDepth={propsRenderer && propsRenderer.depth}
              visualTreeDepth={this.props.visualTreeDepth}
              availableNtypeFilters={this.props.availableNtypeFilters}
            />
          )}
        </div>
        <MetadataRenderer
          action={action}
          {...propsRenderer}
          contentReadOnly={contentReadOnly}
          textConfirm={textConfirm}
          ntypesAllowRemove={ntypesAllowRemove}
          depth={1}
          syllabusIid={syllabusIid}
          readOnly={readOnly}
          fieldEdit={fieldEdit}
          availableNtypeFilters={this.props.availableNtypeFilters}
          maximumDepth={this.props.maximumDepth}
          rootItemFetchedDepth={propsRenderer && propsRenderer.depth}
          baseUrl={this.props.baseUrl}
          nodes={this.props.nodes}
          itemAncestors={this.props.itemAncestors}
          metadataFilters={this.props.metadataFilters}
          visualTreeDepth={this.props.visualTreeDepth}
          rootItemNtype={node.ntype}
          status={node.status}
          inEPRunning={inEPRunning}
        />
      </div>
    );
  }
}

MetadataContainer.propsTypes = {
  nodes: PropTypes.arrayOf(PropTypes.any),
  itemAncestors: PropTypes.arrayOf(PropTypes.any),
  maximumDepth: PropTypes.number,
  metadataFilters: PropTypes.arrayOf(PropTypes.any),
  itemIidsRenderer: PropTypes.arrayOf(PropTypes.any),
  baseUrl: PropTypes.string,
  modules: PropTypes.arrayOf(PropTypes.any),
  fieldEdit: PropTypes.string,
  syllabusIid: PropTypes.string,
  node: PropTypes.objectOf(PropTypes.any),
};

MetadataContainer.defaultProps = {
  nodes: [],
  itemAncestors: [],
  maximumDepth: 1,
  metadataFilters: [],
  itemIidsRenderer: [],
  baseUrl: '',
  modules: [],
  node: {},
  fieldEdit: '',
  syllabusIid: '',
};

const getNodes = (state) => state.tree;
const getItemAncestors = createSelector(
  (state) => lodashGet(state, 'editing.itemAncestors'),
  getNodeSelector,
  (itemAncestors, getNode) =>
    itemAncestors &&
    itemAncestors.map((item) => getNode(item && item.iid) || item),
);

const getMaximumDepth = (state) =>
  state.editing && state.editing.metadataMaximumDepth;
const getMetadataFilters = (state) =>
  (state.editing && state.editing.metadataFilters) ||
  (state.domainInfo &&
    state.domainInfo.school &&
    state.domainInfo.school.modules);
const getItemIidsRenderer = (state) =>
  state.editing && state.editing.itemIidsRenderer;
const getSchoolModules = (state) =>
  state.domainInfo &&
  state.domainInfo.school &&
  state.domainInfo.school.modules;
const getAvailableNtypeFilters = (state) =>
  state.editing && state.editing.availableNtypeFilters;
const getVisualTreeDepth = (state) => state.editing.visualTreeDepth;
const getBaseUrl = (state, props) => {
  let fieldEdit = props.fieldEdit || 'metadata';
  fieldEdit = ['children', 'metadata'].includes(fieldEdit)
    ? 'children'
    : fieldEdit;
  const baseUrl = window.location && window.location.pathname;
  return baseUrl.replace(`/${fieldEdit}`, '');
};

const selector = createSelector(
  getNodes,
  getItemAncestors,
  getMaximumDepth,
  getMetadataFilters,
  getAvailableNtypeFilters,
  getItemIidsRenderer,
  isEditingItemFreeze,
  getSchoolModules,
  getVisualTreeDepth,
  getBaseUrl,
  (
    nodes,
    itemAncestors,
    maximumDepth,
    metadataFilters,
    availableNtypeFilters,
    itemIidsRenderer,
    readOnly,
    modules,
    visualTreeDepth,
    baseUrl,
  ) => ({
    nodes,
    itemAncestors,
    maximumDepth,
    metadataFilters,
    modules,
    itemIidsRenderer,
    visualTreeDepth,
    readOnly,
    availableNtypeFilters,
    baseUrl,
  }),
);

const mapStateToProps = (state, props) => {
  const newProps = selector(state, props);
  return newProps;
};
export default connect(mapStateToProps)(MetadataContainer);
