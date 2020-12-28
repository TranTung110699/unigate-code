import React, { Component } from 'react';
import TreeWithFilter from 'components/common/tree/TreeWithFilter';
import { Link } from 'react-router-dom';
import routes from 'routes';
import ResultActions from '../common/ResultActions';
import './stylesheet.scss';

class AcademicTreeResults extends Component {
  cssClass = 'admin-academic-category-tree-results';

  getItemTitle = (item) => {
    const { formid, ntype } = this.props;
    return (
      <div className={`${this.cssClass}__node`}>
        <Link
          className={`${this.cssClass}__node-name`}
          to={routes.url(
            'node_edit',
            Object.assign({}, item, { ntype: 'category' }),
          )}
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

  getItemTextsForFilter = (item) => {
    return [(item && item.name) || ''];
  };

  getTreeDataFromItems = (items = [], level = 0) => {
    return items.map((item) => ({
      key: item.iid,
      texts: this.getItemTextsForFilter(item),
      title: this.getItemTitle(item),
      children:
        item.children &&
        Array.isArray(item.children) &&
        this.getTreeDataFromItems(item.children, level + 1),
    }));
  };

  render() {
    const { items } = this.props;
    return (
      <TreeWithFilter
        treeData={this.getTreeDataFromItems(items)}
        controlled={false}
        noAutoFocus={this.props.noAutoFocus}
      />
    );
  }
}

export default AcademicTreeResults;
