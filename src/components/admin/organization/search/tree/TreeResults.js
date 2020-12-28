import React, { Component } from 'react';
import Tree from 'components/common/tree/TreeWithFilter';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import RaisedButton from 'components/common/mui/RaisedButton';
import ButtonAction from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import ResultActions from '../common/ResultActions';
import './stylesheet.scss';

class TreeResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIids: [],
      initiallySelectedIids: [],
      treeData: [],
    };
  }

  cssClass = 'admin-organization-tree-results';

  getItemTitle = (item) => {
    const { formid, ntype, readOnly } = this.props;
    return (
      <div className={`${this.cssClass}__node`}>
        {readOnly ? (
          <h3>
            {item.name}{' '}
            <span className="text-muted">
              {' '}
              ({item.code} {item.org_id && `(id #${item.org_id})`})
            </span>
          </h3>
        ) : (
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
              ({item.code} {item.org_id && `(id #${item.org_id})`})
            </span>
          </Link>
        )}
        {!readOnly && (
          <div className={`${this.cssClass}__node-actions`}>
            <ResultActions item={item} formid={formid} ntype={ntype} />
          </div>
        )}
      </div>
    );
  };

  getItemTextsForFilter = (item) => [(item && item.name) || ''];

  getTreeDataFromItems = (items = [], level = 0) =>
    items
      .filter((item) => item && item.iid)
      .map((item) => ({
        key: item.iid,
        value: item.iid,
        texts: this.getItemTextsForFilter(item),
        title: this.getItemTitle(item),
        children:
          item.children &&
          Array.isArray(item.children) &&
          this.getTreeDataFromItems(item.children, level + 1),
      }));

  handleSelectedNodesChange = (newSelectedNodes) => {
    this.setState({
      selectedIids: newSelectedNodes,
    });
  };

  render() {
    const { items } = this.props;
    return [
      <Tree
        treeData={this.getTreeDataFromItems(items)}
        controlled={false}
        selectable
        multiSelectable
        checkParentEqualCheckAllChildren={false}
        selectedNodes={this.state.selectedIids}
        onSelectedNodesChange={this.handleSelectedNodesChange}
      />,
      <div>
        {/*
        {this.state.selectedIids && this.state.selectedIids.length > 0 && (
          <ButtonAction
            iconButton={
              <RaisedButton
                icon={<Icon icon="plus" />}
                label={t1('create_group(_%s_organization_selected)', [
                  this.state.selectedIids.length,
                ])}
                primary
              />
            }
            message={{
              success: t1('create_successfully'),
            }}
            alternativeApi="/category/api/create-group"
            params={{
              organizationIids: this.state.selectedIids,
            }}
          />
        )}
           */}
      </div>,
    ];
  }
}

export default TreeResults;
