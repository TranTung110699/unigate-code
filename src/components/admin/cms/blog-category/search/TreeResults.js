import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import IconButton from 'material-ui/IconButton';
import actions from 'actions/node/creators';
import Tree from 'components/common/tree/Tree';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import apiUrls from 'api-endpoints';
import './stylesheet.scss';
import UpdateForm from '../new/Form';

class TreeResults extends Component {
  cssClass = 'admin-academic-category-tree-results';
  style = { height: 400 };

  constructor(props) {
    super(props);
    this.updateItem = this.updateItem.bind(this);
  }

  updateItem(item) {
    const { dispatch } = this.props;
    const contentDialog = (
      <UpdateForm
        mode="edit"
        node={item}
        step={'blog'}
        alternativeApi="/category/index/update?type=blog"
        formid="edit_blog"
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  componentWillMount() {
    const { items } = this.props;
    const treeData = this.getTreeDataFromItems(items);
    this.setState({ treeData });
  }

  componentWillReceiveProps(nextProps) {
    const { items } = this.props;
    if (
      typeof nextProps !== 'undefined' &&
      typeof nextProps.items !== 'undefined' &&
      nextProps.items !== items
    ) {
      const treeData = this.getTreeDataFromItems(nextProps.items);
      this.setState({ treeData });
    }
  }

  getItemTitle = (item) => {
    const { formid, ntype } = this.props;
    return (
      <div className={`${this.cssClass}__node`}>
        <div className={`${this.cssClass}__node-name`}>
          {item.texts}{' '}
          <span className="text-muted">
            {' '}
            - {item.code} {item.org_id && `(id #${item.org_id})`}
          </span>
        </div>
        <div className={`${this.cssClass}__node-actions`}>
          <IconButton
            title={t1('edit_blog')}
            iconClassName="mi mi-edit"
            onClick={() => this.updateItem(item)}
          />
          {(!Array.isArray(item.children) || item.children.length === 0) && (
            <DeleteItem
              title={t1('remove')}
              alternativeApi={apiUrls.category_delete}
              textConfirm={t1('are_you_sure_you_want_to_delete_%s?', [
                item.texts,
              ])}
              formid={formid}
              ntype={ntype}
              itemId={item.id}
            />
          )}
        </div>
      </div>
    );
  };

  getTreeDataFromItems = (items = [], level = 0) =>
    items.map((item) => ({
      key: item.id,
      id: item && item.id,
      iid: item && item.iid,
      texts: (item && item.name) || '',
      title: this.getItemTitle(item),
      code: item && item.code,
      children:
        item.children &&
        Array.isArray(item.children) &&
        this.getTreeDataFromItems(item.children, level + 1),
    }));

  render() {
    return (
      <div style={this.style}>
        <Tree
          treeData={this.getTreeDataFromItems(this.state.treeData)}
          controlled={false}
        />
      </div>
    );
  }
}

export default connect()(TreeResults);
