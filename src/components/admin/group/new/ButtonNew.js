/* eslint-disable react/prop-types,jsx-a11y/anchor-is-valid,no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import FlatButton from 'components/common/mui/NewButton';
import groupApiUrls from 'components/admin/group/endpoints';
import { categoryRelationTypes } from 'configs/constants';
import TreeSearch from 'components/admin/organization/search/tree/Layout';

import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import NewForm from './Form';

class ButtonNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleCreateGroup = (typeCreate = 'normal') => {
    this.handlePopoverClose();
    const { dispatch, type, formid, orgId } = this.props;

    const hiddenFields = {};

    if (Object.values(categoryRelationTypes).includes(type)) {
      hiddenFields.type = type;
    }

    if (orgId) {
      hiddenFields.organizations = [orgId];
    }

    const contentDialog =
      typeCreate === 'normal' ? (
        <NewForm
          step={hiddenFields.type}
          hiddenFields={hiddenFields}
          mode="new"
          alternativeApi={groupApiUrls.new_user_group}
          searchFormId={formid || 'category_group_search'}
          redirectToEditPage
        />
      ) : (
        <TreeSearch readOnly />
      );

    const optionsProperties = {
      handleClose: true,

      modal: true,
      title: t1(`new_${type || categoryRelationTypes.USER_GROUP}`),
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  handlePopoverOpen = (event) => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handlePopoverClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <FlatButton
        icon={<Icon icon="plus" />}
        label={t1(`new_${this.props.type || categoryRelationTypes.USER_GROUP}`)}
        onClick={(event) => {
          return this.handleCreateGroup('normal');
          /*
          if (
            this.props.type &&
            this.props.type !== categoryRelationTypes.USER_GROUP
          ) {
            return this.handleCreateGroup('normal');
          }
          return this.handlePopoverOpen(event);
*/
        }}
      />
      /*
<Popover
open={this.state.open}
anchorEl={this.state.anchorEl}
anchorOrigin={{ horizontal: 'middle', vertical: 'top' }}
targetOrigin={{ horizontal: 'left', vertical: 'top' }}
onRequestClose={this.handlePopoverClose}
>
<Menu>
  <MenuItem
    containerElement={
      <FlatButton
        icon={<Icon icon="path" />}
        label={t1('create_new')}
      />
    }
    onClick={() => {
      this.handleCreateGroup('normal');
    }}
  />
  {

  <MenuItem
    containerElement={
      <FlatButton
        icon={<Icon icon="path" />}
        label={t1('create_by_organization')}
      />
    }
    onClick={() => {
      this.handleCreateGroup('by_organization');
    }}
  />
          </Menu>
        </Popover>
     */
    );
  }
}

export default connect()(ButtonNew);
