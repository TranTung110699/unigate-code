/* eslint-disable react/prop-types,no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import apiUrls from 'api-endpoints';
import aApiUrls from 'components/admin/abac-role/endpoints';
import FlatButton from 'components/common/mui/FlatButton';
import Icon from 'components/common/Icon';
import actions from 'actions/node/creators';
import sagaActions from 'actions/node/saga-creators';
import { t1 } from 'translate';
import Dialog from './dialog';
import { getSearchFormId } from '../../common/utils';

class ResourceStaffRemove extends React.Component {
  iconStyle = { fontSize: 20 };
  flatButtonStyle = { minWidth: '43px !important', top: '-7px' };
  cssClass = 'admin-organization-staff-remove';

  handleRemoveButtonClick = () => {
    const { item, node, dispatch } = this.props;
    const searchFormId = getSearchFormId(node);

    let url = '';
    let params = [];
    if (node.ntype === 'category') {
      url = apiUrls.remove_relation;
      params = {
        oid: item.iid,
        sid: node.iid,
        object: 'user',
        subject: 'category',
      };
    } else {
      url = aApiUrls.user_abac_roles_delete;
      params = {
        userIid: item.iid,
        applied_target_iid: node.iid,
        _sand_step: 'resource_staff',
        ntype: node.ntype,
      };
    }

    dispatch(
      sagaActions.submitFormRequest('', {
        extraParams: params,
        url,
        formidToSubmitOnSuccess: searchFormId,
        closeModal: true,
      }),
    );
  };

  handleButtonClick = () => {
    const { item, node, dispatch } = this.props;
    const contentDialog = (
      <Dialog
        onRemoveButtonClick={this.handleRemoveButtonClick}
        onCancelButtonClick={() => {
          dispatch(actions.handleOpenDialog({ openDialog: false }));
        }}
        item={item}
        node={node}
      />
    );
    const optionsProperties = {
      handleClose: true,
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { className, node, item } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    if (!item || !node) {
      return null;
    }

    const title = t1('remove');

    return (
      <span className={componentClassName}>
        <FlatButton
          icon="delete"
          // style={this.flatButtonStyle}
          buttonType="danger"
          onClick={this.handleButtonClick}
        />
      </span>
    );
  }
}

ResourceStaffRemove.propTypes = {
  className: PropTypes.string,
};

ResourceStaffRemove.defaultProps = {
  className: '',
};

export default connect()(ResourceStaffRemove);
