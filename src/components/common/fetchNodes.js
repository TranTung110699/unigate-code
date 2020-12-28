import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNodeSelector, isNodeDataEnough } from 'components/admin/node/utils';
import actions from 'actions/node/creators';

/*
const configExample = [
  {
    nodePropName: 'node',
    depth: -1,
    fullNodePropName: 'skill',
  },
];
*/

const fetchNodes = (config) => (Component) => {
  class WrappedComponent extends React.Component {
    componentWillMount() {
      const { itemsLoadingInfo } = this.props;
      itemsLoadingInfo.forEach((info) => {
        this.fetchNodes(info);
      });
    }

    loading = {};

    fetchNodes = (info) => {
      const { dispatch } = this.props;
      const { isDataEnough, node, loadingId, depth } = info;
      if (!isDataEnough && !this.loading[loadingId]) {
        this.loading[loadingId] = true;
        dispatch(
          actions.fetchNode({
            ntype: node.ntype,
            depth,
            iid: node.iid,
            executeOnSuccess: () => {
              this.loading[loadingId] = false;
            },
          }),
        );
      }
    };

    render() {
      const { itemsLoadingInfo, originalProps } = this.props;
      const newProps = itemsLoadingInfo.reduce((result, info) => {
        if (!result) {
          return null;
        }
        const { fullNode, fullNodePropName } = info;
        return fullNode
          ? {
              ...result,
              [fullNodePropName]: fullNode,
            }
          : null;
      }, {});

      if (!newProps) {
        return null;
      }

      return <Component {...originalProps} {...newProps} />;
    }
  }

  WrappedComponent.propTypes = {
    className: PropTypes.string,
    dispatch: PropTypes.func,
    isDataEnough: PropTypes.bool,
    node: PropTypes.shape(),
    originalProps: PropTypes.shape(),
    fullSkill: PropTypes.shape(),
  };

  WrappedComponent.defaultProps = {
    className: '',
    dispatch: null,
    isDataEnough: false,
    node: null,
    originalProps: null,
    fullSkill: null,
  };

  const mapStateToProps = (state, props) => {
    const itemsLoadingInfo = config.map((nodeConfig, index) => {
      const { nodePropName, depth } = nodeConfig;
      const node = props[nodePropName];
      const nodeIid = node && node.iid;
      const fullNode = getNodeSelector(state)(nodeIid, null, depth);
      const isDataEnough = isNodeDataEnough(null, fullNode, depth);
      return {
        ...nodeConfig,
        node,
        fullNode,
        isDataEnough,
        loadingId: index,
      };
    });

    return {
      itemsLoadingInfo,
      originalProps: props,
    };
  };

  return connect(mapStateToProps)(WrappedComponent);
};

export default fetchNodes;
