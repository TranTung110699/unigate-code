import React, { Component } from 'react';
import Tree from 'components/common/tree/TreeWithFilter';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { DEPOSIT_TO_ACCOUNT } from 'configs/constants';
import ResultActions from '../common/ResultActions';
import { t1 } from 'translate';
import './stylesheet.scss';

class TreeResults extends Component {
  cssClass = 'admin-fee-category-tree-results';

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
          <span className="text-muted"> {item.code} </span> - {item.name}{' '}
          {item.sub_type == 1 ? (
            <span className="text-muted">{`(${t1(
              'deposit_account_only',
            )})`}</span>
          ) : (
            ''
          )}
        </Link>
        {item.code !== DEPOSIT_TO_ACCOUNT.value && (
          <div className={`${this.cssClass}__node-actions`}>
            <ResultActions item={item} formid={formid} ntype={ntype} />
          </div>
        )}
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
      <Tree treeData={this.getTreeDataFromItems(items)} controlled={false} />
    );
  }
}

export default TreeResults;
