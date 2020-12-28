import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import NewForm from '../new/Form';
import IconButton from 'material-ui/IconButton';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import './stylesheet.scss';
import actions from '../../../../../../../actions/node/creators';

class Results extends Component {
  handleOnEditClick = (node) => {
    const { dispatch } = this.props;

    const contentDialog = (
      <NewForm
        mode="edit"
        node={node}
        formid="wallet_type_edit"
        searchFormId="wallet_type_search"
      />
    );
    const optionsProperties = {
      handleClose: true,

      title: t1('new_type'),
      modal: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { items, formid } = this.props;

    const width = {
      code: '10%',
      name: 'auto',
      categories: '25%',
      status: '15%',
      control: '10%',
    };

    return (
      <div className="wallet-type-result">
        <ul className="account-type-panel">
          <li>
            <div className="info">{t1('account_type')}</div>
            <div className="categories">{t1('use_for_category')}</div>
          </li>
          {items &&
            items.map((item) => (
              <li className="item-account-type">
                <div className="info">
                  <b>
                    {item.code} - {item.name}
                  </b>
                </div>
                <div className="categories">
                  {item.use_for_all === 1 && (
                    <div>{t1('use_for_all_categories')}</div>
                  )}
                  {item.categoryObjects && (
                    <b>
                      <i>
                        {item.use_for_all === 0
                          ? t1('categories_included')
                          : t1('categories_excluded')}
                        :
                      </i>
                    </b>
                  )}
                  {item.categoryObjects &&
                    item.categoryObjects.map((category) => {
                      return <div> - {category && category.name}</div>;
                    })}
                </div>
                <div className="action">
                  <IconButton
                    title={t1('edit_wallet_type')}
                    iconClassName="mi mi-edit"
                    onClick={(event) => {
                      this.handleOnEditClick(item);
                    }}
                  />
                  /
                  <DeleteItem
                    title={t1('delete')}
                    textComfirm={t1('are_you_sure_you_want_to_do_this')}
                    formid={formid}
                    ntype="wallet-type"
                    itemId={item && item.id && item.id.$oid}
                  />
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default connect()(Results);
