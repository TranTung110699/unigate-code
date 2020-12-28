import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';

import { t1 } from 'translate';
import routes from 'routes';
import Table from 'antd/lib/table';
import ActionToggle from 'components/common/toggle/ActionToggle';
import DeleteBtn from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import { getTextFromValue } from 'utils/Util';
import { constants, languages } from 'configs/constants';
import actions from 'actions/node/creators';
import NodeForm from 'components/admin/message-templates/new/Form';

class Results extends Component {
  openDialog = (contentDialog, optionsProperties) => {
    const { dispatch } = this.props;

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  handleOnClickEdit = (item) => {
    const contentDialog = (
      <NodeForm formid="edit_message_template" mode="edit" node={item} />
    );
    const optionsProperties = {
      handleClose: true,

      modal: true,
      title: t1('edit_message_template'),
      width: '90%',
    };

    this.openDialog(contentDialog, optionsProperties);
  };

  handleOnClickPreview = (item) => {
    const contentDialog = (
      <NodeForm
        formid="preview_message_template"
        mode="preview"
        node={item}
        readOnly
      />
    );
    const optionsProperties = {
      handleClose: true,

      modal: true,
      title: t1('preview_message_template'),
      width: '70%',
    };

    this.openDialog(contentDialog, optionsProperties);
  };

  render() {
    const actionToggleDataSet = {
      on: 'approved',
      off: 'queued',
    };
    const { items, formid } = this.props;
    const ntype = 'message-template';

    const columns = [
      {
        title: t1('code'),
        key: 'code',
        dataIndex: 'code',
      },
      {
        title: t1('title'),
        key: 'title',
        dataIndex: 'title',
      },
      {
        title: t1('action'),
        key: 'action',
        dataIndex: 'tpl_action',
        render: (tplAction) => (
          <span>
            {t1(tplAction)} <br /> ({tplAction})
          </span>
        ),
      },
      {
        title: t1('language'),
        key: 'language',
        dataIndex: 'language',
        render: (language) => getTextFromValue(language, languages),
      },
      {
        title: t1('method'),
        key: 'method',
        dataIndex: 'method',
        render: (method) =>
          getTextFromValue(method, constants.communicationMethodsOptions()),
      },
      {
        title: t1('approved'),
        key: 'approved',
        dataIndex: 'status',
        render: (status, item) => (
          <ActionToggle
            hideLabel
            baseURL={routes.url('node_update', {
              ...item,
              ntype,
              step: 'status',
            })}
            dataSet={actionToggleDataSet}
            value={status}
            name="status"
          />
        ),
      },
      {
        title: t1('template_action'),
        key: 'action',
        render: (item) => (
          <React.Fragment>
            <IconButton
              iconClassName="mi mi-remove-red-eye"
              onClick={() => this.handleOnClickPreview(item)}
            />
            <IconButton
              iconClassName="mi mi-edit"
              onClick={() => this.handleOnClickEdit(item)}
            />
            <DeleteBtn formid={formid} ntype={ntype} itemId={item.id} />
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
          childrenColumnName={null}
          rowKey="id"
          className="white-background"
        />
      </div>
    );
  }
}

export default Results;
