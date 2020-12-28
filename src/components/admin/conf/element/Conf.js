import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import PropTypes from 'prop-types';
import FlatButton from 'components/common/mui/FlatButton';
import Icon from 'components/common/Icon';
import sagaActions from 'actions/node/saga-creators';
import sagaConfActions from 'components/admin/conf/actions/saga-creators';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import { t1 } from 'translate';

import EditElement from './EditElement';
import './stylesheet.scss';
import DisplayHtml from 'components/common/html';
import AntButton from 'antd/lib/button';

const ConfValue = (item) => {
  let text;
  if (!item) return null;

  switch (item.type) {
    // case 'array':
    //   text = item.content ? item.content.join(',') : '';
    //   break;
    case 'object':
    case 'array_of_object':
      text = JSON.stringify(item.content);
      break;
    case 'boolean':
    case 'strict_int':
    case 'strict_string':
      text = '';
      break;
    case 'string':
      text = item.content;
      break;
    default:
      text = '';
  }
  if (typeof text !== 'string') {
    console.log('error passing conf value');
    console.log(item);
    // console.log({[item.name]: text});
    text = '';
  }
  return <div>{text}</div>;
};

class Conf extends Component {
  constructor(props) {
    super(props);
    this.handleEditElementChange = this.handleEditElementChange.bind(this);
    this.handleEditElementSubmit = this.handleEditElementSubmit.bind(this);
  }

  handleEditElementSubmit = (values) => {
    const { item, dispatch } = this.props;
    if (!item || !values || typeof values.content === 'undefined') {
      return;
    }
    const data = {
      ...values,
      ntype: 'conf',
      id: item.id,
      type: item.type,
    };

    dispatch(
      sagaActions.updateNodeRequest({
        iid: '',
        data,
        searchFormId: 'conf_search',
      }),
    );
  };

  handleEditElementChange = (values) => {
    const { item } = this.props;
    if (!item || !values) {
      return;
    }

    switch (item.component) {
      case 'select': {
        this.handleEditElementSubmit({
          content: values.content,
        });
        break;
      }
      case 'youtubeUrl': {
        this.handleEditElementSubmit({
          content: values.content,
        });
        break;
      }
      default: {
        break;
      }
    }
  };

  handleLoadDefault = () => {
    const { item, dispatch } = this.props;
    if (!item) {
      return;
    }

    dispatch(sagaConfActions.reloadDefaultConfValueRequest(item.name));
  };

  render() {
    const { item, isLastInBlock } = this.props;
    if (!item) {
      return null;
    }
    return (
      <div
        className={`admin-config-block__conf \
          ${isLastInBlock ? 'admin-config-block__conf--last' : ''} \
          admin-config-conf \
          ${
            item && (item.component === 'object' || !item.id)
              ? 'admin-config-conf--small-padding-right'
              : ''
          }`}
      >
        <div className="admin-config-conf__heading admin-config-content">
          <div className="admin-config-content__name">{item.name}</div>
          <div className="admin-config-content__meaning">
            {t1('type')}: {item.type ? t1(item.type) : ''}
          </div>
          <div className="admin-config-content__meaning">
            <DisplayHtml content={item.meaning} />
          </div>
        </div>

        <div className="admin-config-conf__content admin-config-content">
          {item && item.id ? (
            <div>
              <ConfValue {...item} />
              <EditElement
                item={item}
                form={item.name}
                onChange={this.handleEditElementChange}
                onSubmit={this.handleEditElementSubmit}
                initialValues={{
                  content: item.content,
                }}
              />
            </div>
          ) : (
            <div>
              <b>{t1('conf_not_yet_loaded._click_load_default_first')}</b>
            </div>
          )}
        </div>
        <AntButton.Group>
          <FlatButton
            primary
            title={(item.id && t1('load_default')) || t1('reset_to_default')}
            label="reset/load default"
            fullWidth
            onClick={this.handleLoadDefault}
            icon="reload"
          />
          {item && item.id && (
            <DeleteItem
              title={t1('delete')}
              alternativeApi="/conf/delete"
              itemId={item.id}
              onRequestSuccessful={() => {
                this.props.dispatch(submit('conf_search'));
              }}
            />
          )}
        </AntButton.Group>
      </div>
    );
  }
}

Conf.propTypes = {
  item: PropTypes.shape({
    category: PropTypes.string,
    component: PropTypes.string,
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array,
      PropTypes.object,
    ]),
    display_name: PropTypes.string,
    display_text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dmn: PropTypes.string,
    id: PropTypes.string,
    meaning: PropTypes.string,
    name: PropTypes.string,
    ts: PropTypes.number,
    type: PropTypes.string,
  }),
};

Conf.defaultProps = {
  item: null,
};

export default connect()(Conf);
