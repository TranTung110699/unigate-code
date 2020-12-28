import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import actions from 'actions/node/creators';
import PropTypes from 'prop-types';
import { RIEInput } from 'riek';
import sagaActions from 'actions/admin/card/saga-creators';
import apiUrls from 'api-endpoints';
import { submit } from 'redux-form';
import IconButton from 'material-ui/IconButton';
import Table from 'antd/lib/table';
import UpdateTranslateForm from '../new/Form';

class Results extends Component {
  rIEInputEditProps = {
    style: {
      borderBottom: '2px solid #00BCD4',
      width: '100%',
    },
  };

  updateItem(item) {
    const { dispatch } = this.props;

    const contentDialog = (
      <UpdateTranslateForm
        mode="edit"
        title={t1('edit_translate')}
        node={item}
        step=""
        formid="edit_translate"
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('edit_translate'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  handleUpdate = (item, p) => {
    const { dispatch, formid } = this.props;
    const params = {
      id: item.id,
      name: item.name,
      content: p.content,
      site: item.site,
    };
    dispatch(
      sagaActions.changeStatusRequest(apiUrls.update_translate, params, () => {
        dispatch(submit(formid));
      }),
    );
  };

  render() {
    const { items, formid, ntype } = this.props;

    const keyLabel = t1('key');
    const valueLabel = t1('value');
    const languageLabel = t1('language');
    const actionLabel = t1('action');
    const editPageLabel = t1('edit');
    const deletePageLabel = t1('delete');
    const confirmDeletePageLabel = 'are_you_sure_you_want_to_do_this';
    const width = {
      name: '25%',
      value: '40%',
      language: '10%',
      site: '10%',
      action: '15%',
    };

    const columns = [
      {
        title: keyLabel,
        key: 'key',
        dataIndex: 'name',
        width: width.name,
      },
      {
        title: valueLabel,
        key: 'value',
        dataIndex: 'content',
        width: width.value,
        render: (content, item) => (
          <RIEInput
            change={(p = {}) => this.handleUpdate(item, p)}
            classEditing="editing"
            value={content ? content : '-'}
            propName="content"
            editProps={this.rIEInputEditProps}
            defaultProps={this.rIEInputEditProps}
          />
        ),
      },
      {
        title: languageLabel,
        key: 'language',
        dataIndex: 'language',
        width: width.language,
      },
      {
        title: 'site',
        key: 'site',
        dataIndex: 'site',
        width: width.site,
      },
      {
        title: actionLabel,
        key: 'action',
        width: width.action,
        render: (item) => (
          <React.Fragment>
            <IconButton
              title={editPageLabel}
              iconClassName="mi mi-edit"
              onClick={() => this.updateItem(item)}
            />
            <DeleteItem
              title={deletePageLabel}
              textConfirm={confirmDeletePageLabel}
              formid={formid}
              ntype={ntype}
              itemId={item.id}
            />
          </React.Fragment>
        ),
      },
    ];

    return (
      <div className="table-result">
        <Table
          columns={columns}
          dataSource={items}
          pagination={false}
          rowKey="id"
          childrenColumnName={null}
          className="white-background"
        />
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default connect()(Results);
