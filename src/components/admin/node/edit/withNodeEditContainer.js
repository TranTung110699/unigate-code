import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions/node/creators';
import actionsCommon from 'actions/creators';
import { parseItemAncestorsFromUrlCommon } from 'routes/links/common';
import isEqual from 'lodash.isequal';
import CircularProgress from 'material-ui/CircularProgress';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import { hashType } from 'configs/constants';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { setBankEdit } from './utils';
import get from 'lodash.get';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import Icon from 'antd/lib/icon';
import Spin from 'antd/lib/spin';
import { withRouter } from 'react-router';
import { parse } from 'query-string';
import { createSelector } from 'reselect';

const withNodeEditContainer = (WrappedComponent) => {
  const getEditingItemFromUrl = (url) => {
    if (!url) {
      return null;
    }

    const {
      itemAncestors,
      action,
      subAction,
    } = parseItemAncestorsFromUrlCommon(url);

    if (itemAncestors.length) {
      const editingItem = itemAncestors[itemAncestors.length - 1];
      return {
        item: editingItem,
        itemAncestors,
        action,
        subAction,
      };
    }

    return {
      item: null,
      itemAncestors: null,
      action: '',
      subAction: '',
    };
  };

  class NodeEditContainerHoc extends Component {
    componentWillMount() {
      const { editingItem, search, itemAncestors } = this.props;

      this.fetchNodesByItemAncestors(itemAncestors);

      this.setEditingItem(editingItem);

      setBankEdit(search, this.props.dispatch);
      this.setMenuTop('');
    }

    componentWillReceiveProps(nextProps) {
      const currentEditingItem = this.props.editingItem;
      const newEditingItem = nextProps.editingItem;

      if (!isEqual(nextProps.search, this.props.search)) {
        setBankEdit(nextProps.search, this.props.dispatch);
      }

      if (newEditingItem && !isEqual(currentEditingItem, newEditingItem)) {
        this.setEditingItem(newEditingItem);
        const itemAncestors =
          Array.isArray(newEditingItem.itemAncestors) &&
          newEditingItem.itemAncestors.filter((ancestor) => {
            if (!ancestor) {
              return false;
            }
            return !(
              Array.isArray(currentEditingItem.itemAncestors) &&
              currentEditingItem.itemAncestors.find(
                (item) => item && item.iid === ancestor.iid,
              )
            );
          });

        this.fetchNodesByItemAncestors(itemAncestors);
      }
    }

    setMenuTop(elementRight) {
      const { dispatch } = this.props;
      dispatch(actionsCommon.setTopMenuElement({ elementRight }));
    }

    setEditingItem = (editingItem) => {
      if (!editingItem || !Object.keys(editingItem)) {
        return;
      }
      this.props.dispatch(actions.setEditingItem(editingItem));
    };

    // TODO: improve this
    fetchNodesByItemAncestors(itemAncestors) {
      if (
        !itemAncestors ||
        !Array.isArray(itemAncestors) ||
        !itemAncestors.length
      ) {
        return;
      }

      let depth = 0;
      itemAncestors.forEach((ancestor) => {
        // if we're editing a syllabus, we're already fetching the whole syllabus with depth=-1
        // therefore we can skip fetching the offspring items
        if (depth !== -1) {
          const node = this.props.nodes[ancestor.iid];
          if (
            (!node || !node.iid || node.isMetadata || !node.children) &&
            !['major-program', 'user', 'students'].includes(ancestor.ntype)
          ) {
            depth = ['path', 'syllabus'].includes(ancestor.ntype) ? -1 : 2;

            const isPreview = !!['syllabus'].includes(ancestor.ntype);

            if (this.props.onFetchNode) {
              this.props.onFetchNode();
            } else {
              this.props.dispatch(
                actions.fetchNode({
                  ...ancestor,
                  depth,
                  is_preview: isPreview,
                  editing_syllabus: 2,
                }),
              );
            }
          } else if (ancestor.ntype === 'user') {
            this.props.dispatch(
              actions.fetchNode({
                ...ancestor,
                apiUrl: apiUrls.get_detail(ancestor),
              }),
            );
          }
        }
      });
    }

    render() {
      const { processing, isFeatureEnabled, ...props } = this.props;

      // TODO: needs more indicator (from server that it is fetched)
      // maybe node.ts ????
      if (get(props, 'node.iid')) {
        // passing along: itemAncestors, nodes, node, action, subAction, dispatch
        return <WrappedComponent {...props} />;
      }
      if (isFeatureEnabled(features.NEW_UI_JULY_2019)) {
        return (
          <div className="text-center m-t-20">
            <h1 className="text-white">Loading...</h1>
            <Spin
              indicator={<Icon type="loading" style={{ fontSize: 80 }} spin />}
            />
            <div className="text-white m-t-10">
              {t1('if_it_takes_too_long,_probably_the_item_is_not_found')}
            </div>
          </div>
        );
      }
      return (
        <div className="text-center m-t-20">
          <h1>Loading...</h1>
          <CircularProgress size={80} thickness={7} />
          <div>
            {t1('if_it_takes_too_long,_probably_the_item_is_not_found')}
          </div>
        </div>
      );
    }
  }

  /*
  const parsePathnameAndHash = (pathname, hash) => {
    if (hash.indexOf(hashType) === 0) {
      // remove the first 2 chars '#!'
      const tmp = hash.substring(2).split('#');

      if (tmp.length === 2) {
        return { pathname: tmp[0], hash: tmp[1], isHashbang: 1 };
      } else if (tmp.length === 1)
        return { pathname: tmp[0], hash: null, isHashbang: 1 };
    }
  */

  const mapStateToProps = createSelector(
    (state) => state.tree,
    (state, props) => props.location,
    (nodes, location) => {
      const { pathname, hash, search } = location;

      const isHashbang =
        window.location.href.indexOf(`${hashType}${pathname}`) === -1
          ? false
          : 1;

      // when we wanna hide the sub menu in the dialog, pass hide_menu=1 to the search query
      const noSubMenu =
        isHashbang && parse(search) && parse(search).hide_menu ? true : false;

      const editingItem = getEditingItemFromUrl(pathname);

      const itemAncestors = get(editingItem, 'itemAncestors');
      const node = get(nodes, `${get(editingItem, 'item.iid')}`);
      // console.log({node,editingItem});
      const rootNode = get(nodes, `${get(itemAncestors, '[0].iid')}`);
      const action = get(editingItem, 'action', '');
      const subAction = get(editingItem, 'subAction', '');

      return {
        hash,
        node,
        nodes,
        action,
        subAction,
        isHashbang,
        rootNode,
        editingItem,
        itemAncestors,
        search,
        noSubMenu,
      };
    },
  );

  hoistNonReactStatic(NodeEditContainerHoc, WrappedComponent);

  return connect(mapStateToProps)(
    withFeatureFlags()(withRouter(NodeEditContainerHoc)),
  );
};

export default withNodeEditContainer;
