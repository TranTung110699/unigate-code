/**
 * Created by vohung on 21/08/2017.
 */

import React from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Checkbox from 'schema-form/elements/redux-form-fields/MuiCheckbox';
import IconDelete from 'material-ui/svg-icons/navigation/close';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import sagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';
import { ntype as ntypeDefine } from 'configs/constants';
import './stylesheet.scss';

const getNameDisplay = (node, count) => {
  const ntype = node.ntype || node.type;
  if (ntype === ntypeDefine.PATH) {
    return t1('path:_%s_(%s_children)', [node.name, count]);
  }
  return t1('course:_%s', [node.name]);
};

const style = {
  height: 'auto',
  width: 'auto',
  margin: 5,
  padding: 10,
  display: 'inline-block',
};

class ItemEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      treeData: null,
    };
  }

  componentWillMount() {
    this.fetchNodeDetail(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;
    if (
      nextProps &&
      nextProps.value &&
      nextProps.value.iid &&
      (!value ||
        !value.iid ||
        (value && value.iid && value.iid !== nextProps.value.iid))
    ) {
      this.fetchNodeDetail(nextProps);
    }
  }

  fetchNodeDetail = (props) => {
    const { value, dispatch } = props;
    if (!value || value.type !== ntypeDefine.PATH) {
      return;
    }
    const params = {
      ntype: value.type,
      iid: value.iid,
      depth: -1,
    };
    const url = apiUrls.get_snippet;
    dispatch(
      sagaActions.getDataRequest(
        { url, executeOnSuccess: this.executeOnSuccess },
        params,
      ),
    );
  };

  executeOnSuccess = (node) => {
    const { value } = this.props;
    const result = this.getDataRender(node, value.children);
    const treeData = result && result.treeData ? [result.treeData] : null;
    if (treeData) {
      this.setState({
        treeData: toggleExpandedForAll({
          treeData,
          expanded: true,
        }),
        count: result.count,
      });
    }
  };

  getDataRender = (node, values = [], index = 0) => {
    let count = 0;
    let currentIndex = index;
    const treeData = {
      iid: node.iid,
      name: node.name,
      ntype: node.ntype,
      index,
    };
    const children = [];
    if (node && node.children && node.children.length) {
      count += node.children.length;
      node.children.forEach((item) => {
        const result = this.getDataRender(item, values, currentIndex + 1);
        count += result.count;
        currentIndex = result.index;
        children.push(result.treeData);
      });
    }
    if (children.length) {
      treeData.children = children;
    }
    const value = (values && values.children) || [];
    treeData.checked = [node.iid].includes(value);
    treeData.count = count;
    treeData.title = this.getTitleByNode(treeData);
    return { count, treeData, index: currentIndex };
  };

  getTitleByNode = (node) => {
    const name = getNameDisplay(node, node.count);
    return (
      <Checkbox
        name={`children[${node.index}]`}
        label={name}
        checked={node.checked}
        valueSet={{
          iid: node.iid,
          type: node.ntype,
          name: node.name,
        }}
        title={t1('tick_if_invited_children_automatically')}
        onCheck={(isChecked) => this.setDataByParent(isChecked, node.iid)}
      />
    );
  };

  setDataByParent = (isChecked, nodeIid) => {
    let { treeData } = this.state;
    treeData = this.upSetValue(treeData, isChecked, nodeIid);
    this.setState({ treeData });
  };

  upSetValue = (tree, isChecked, nodeIid, upSet = false) => {
    tree.map((node) => {
      const newNode = node;
      const setChildrent = upSet || node.iid === nodeIid;
      if (setChildrent) {
        newNode.checked = isChecked;
        newNode.title = this.getTitleByNode({ ...node, isChecked });
      }
      if (node && node.children && node.children.length) {
        newNode.children = this.upSetValue(
          node.children,
          isChecked,
          nodeIid,
          setChildrent,
        );
      }
      return newNode;
    });
    return tree;
  };

  render() {
    const { value, index, onDelete } = this.props;
    const { count, treeData } = this.state;
    const nameDisplay = getNameDisplay(value, count);
    return (
      <Paper style={style} zDepth={2}>
        <div className="action-wrapper">
          <IconDelete
            onClick={() => {
              if (onDelete) {
                onDelete(value, index);
              }
            }}
            style={{
              position: 'absolute',
              right: -5,
              top: -5,
              width: 25,
              height: 25,
            }}
          />
        </div>
        <h3>{nameDisplay}</h3>
        {value && value.type === ntypeDefine.PATH && treeData && count && (
          <div className="tree-view" style={{ height: count * 62 + 100 }}>
            <SortableTree
              treeData={treeData}
              canDrop={() => false}
              onChange={(tree) => this.setState({ treeData: tree })}
              maxDepth={1}
              canDrag={() => false}
            />
          </div>
        )}
      </Paper>
    );
  }
}

ItemEditor.propTypes = {
  index: PropTypes.number,
  value: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
};

ItemEditor.defaultProps = {
  index: 0,
  value: {},
  onDelete: () => {},
};

export default connect()(ItemEditor);
