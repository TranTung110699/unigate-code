import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import actions from 'actions/node/creators';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Table from 'antd/lib/table';
import UpdateUpdate from '../new/Form';
import './stylesheet.scss';
import Preview from '../preview/Layout';

const width = {
  texts: '40%',
};

class Results extends Component {
  imgStyle = { minHeight: '500px', width: '100%' };

  updateItem(item) {
    const { dispatch } = this.props;

    const contentDialog = (
      <UpdateUpdate
        mode="edit"
        title={t1('edit_degree')}
        node={item}
        searchFormId="degree_search"
        formid="edit_degree"
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  addText = (item) => {
    const { dispatch } = this.props;
    const hiddenFields = { iid: item.iid, id: item.id };
    const contentDialog = (
      <UpdateUpdate
        mode="new"
        title={t1('new_text_degree')}
        step="add_text"
        alternativeApi="/degree/update"
        searchFormId="degree_search"
        formid="new_text_degree"
        hiddenFields={hiddenFields}
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('new_text_degree'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };
  showDetailTemplate = (item) => {
    const { dispatch } = this.props;

    const contentDialog = (
      <div>
        <img src={this.getUrlTemplate(item)} style={this.imgStyle} />
      </div>
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('template'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  handleUpdateTextItem = (item, text) => {
    const { dispatch } = this.props;
    const node = Object.assign({ iid: item.iid, id: item.id }, text);
    const contentDialog = (
      <UpdateUpdate
        mode="edit"
        title={t1('edit_text_degree')}
        step="edit_text"
        node={node}
        alternativeApi="/degree/update"
        searchFormId="degree_search"
        hiddenFields={{ key: text.key }}
        formid="edit_text_degree"
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('edit_text_degree'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  handlePreview = (item) => {
    const { dispatch } = this.props;
    const contentDialog = <Preview item={item} />;
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('preview'),
      style: {
        width: '80vw',
        maxWidth: '80vw',
        transform: 'unset !important',
        height: 'unset !important',
      },
      bodyStyle: {
        fontSize: '15px',
        background: 'white',
        width: '100%',
        maxWidth: '80vw',
        transform: 'unset !important',
        height: 'unset !important',
      },
      width: '80vw',
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  getUrlTemplate = (item) =>
    item.template && item.template[0] && item.template[0].link;

  render() {
    const { items, formid, ntype } = this.props;

    const columns = [
      {
        title: t1('iid'),
        key: 'iid',
        dataIndex: 'iid',
      },
      {
        title: t1('name'),
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: t1('template_image'),
        key: 'template_image',
        render: (item) => (
          <img
            onClick={() => this.showDetailTemplate(item)}
            className="img-path"
            src={this.getUrlTemplate(item)}
            alt=""
          />
        ),
      },
      {
        title: t1('programs'),
        key: 'programs',
        dataIndex: 'programs',
        render: (programs) =>
          programs && programs.map((program) => <li>{program.name}</li>),
      },
      {
        title: t1('texts'),
        key: 'texts',
        dataIndex: 'texts',
        width: width.texts,
        render: (texts, item) => (
          <React.Fragment>
            <div>
              {item &&
                texts &&
                texts.map((text) => [
                  <div className="text">
                    <li>
                      <div>{text.key && `${t1('key')}: ${text.key} `}</div>
                      <div>
                        {text.color && `${t1('color')}: ${text.color} `}
                      </div>
                      <div>
                        {text.font_family &&
                          `${t1('font_family')}: ${text.font_family} `}
                      </div>
                    </li>
                    <li>
                      <div>
                        {' '}
                        {text.font_size &&
                          `${t1('font_size')}: ${text.font_size} `}{' '}
                      </div>
                      <div>
                        {text.x &&
                          text.y &&
                          `${t1('point')}: (${text.x}, ${text.y})`}
                      </div>
                      <div>
                        {text.char_breadcrumb_length &&
                          `${t1('char_breadcrumb_length')}: ${
                            text.char_breadcrumb_length
                          } `}
                      </div>
                    </li>
                    {text.line_space && (
                      <li>
                        <div>{`${t1('line_space')}: ${text.line_space}`}</div>
                      </li>
                    )}
                    <IconButton
                      title={t1('edit')}
                      iconClassName="mi mi-edit"
                      onClick={() => this.handleUpdateTextItem(item, text)}
                    />
                    <DeleteItem
                      title={t1('delete')}
                      textConfirm={t1('are_you_sure_you_want_to_do_this')}
                      formid={formid}
                      ntype={ntype}
                      itemId={item.id}
                      alternativeApi={'/degree/remove-text'}
                      params={{ key: text.key }}
                    />
                  </div>,
                ])}
            </div>
            <div className="button-add-text" onClick={() => this.addText(item)}>
              <IconButton iconClassName="mi mi-add" />
              {t1('click_to_add_more_texts')}
            </div>
          </React.Fragment>
        ),
      },
      {
        title: t1('action'),
        key: 'action',
        width: '180',
        render: (item) => (
          <React.Fragment>
            <IconButton
              title={t1('preview')}
              iconClassName="mi mi-remove-red-eye"
              onClick={() => this.handlePreview(item)}
            />
            <IconButton
              title={t1('edit')}
              iconClassName="mi mi-edit"
              onClick={() => this.updateItem(item)}
            />
            <DeleteItem
              title={t1('delete')}
              textConfirm={t1('are_you_sure_you_want_to_do_this')}
              formid={formid}
              ntype={ntype}
              itemId={item.id}
            />
          </React.Fragment>
        ),
      },
    ];

    return (
      <div className="table-result degree">
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

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default connect()(Results);
