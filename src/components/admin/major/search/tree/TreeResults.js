import React, { Component } from 'react';
import Tree from 'components/common/tree/TreeWithFilter';
import { Link } from 'react-router-dom';
import routes from 'routes';
import ResultActions from '../common/ResultActions';
import './stylesheet.scss';

class TreeResults extends Component {
  cssClass = 'admin-major-tree-results';

  getUrlEditNode = (node, parent) => {
    if (parent && node && node.training_level && node.training_mode) {
      return routes.url(
        'node_edit',
        Object.assign({}, parent, {
          ntype: 'category',
          step: 'forms-of-training',
        }),
      );
    }
    return routes.url(
      'node_edit',
      Object.assign({}, node, { ntype: 'category' }),
    );
  };

  getItemTitle = (item, parent) => {
    const { formid, ntype } = this.props;
    return (
      <div className={`${this.cssClass}__node`}>
        <Link
          className={`${this.cssClass}__node-name`}
          to={this.getUrlEditNode(item, parent)}
        >
          {item.name}{' '}
          <span className="text-muted">
            {' '}
            - {item.code} {item.org_id && `(id #${item.org_id})`}
          </span>
        </Link>
        <div className={`${this.cssClass}__node-actions`}>
          <ResultActions item={item} formid={formid} ntype={ntype} />
        </div>
      </div>
    );
  };

  getItemTextsForFilter = (item) => [
    (item && item.name) || '',
    (item && item.code) || '',
  ];

  getTreeDataFromItems = (items = [], level = 0, parent = {}) =>
    items.map((item) => ({
      key: item.iid,
      texts: this.getItemTextsForFilter(item),
      title: this.getItemTitle(item, parent),
      children:
        item.children &&
        Array.isArray(item.children) &&
        this.getTreeDataFromItems(item.children, level + 1, item),
    }));

  render() {
    const { items } = this.props;
    return (
      <Tree treeData={this.getTreeDataFromItems(items)} controlled={false} />
    );
  }
}

export default TreeResults;
