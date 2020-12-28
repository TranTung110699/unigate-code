import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MenuOptions from 'components/common/menu-options';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';
import actions from 'actions/node/creators';
import { connect } from 'react-redux';
import widgetActions from 'actions/admin/widget/actions';
import { createSelector } from 'reselect';
import get from 'lodash.get';

import './stylesheet.scss';

class DashboardWidget extends Component {
  handleCloseModal = () => {
    const { dispatch } = this.props;
    dispatch(actions.handleOpenDialog({ openDialog: false }));
  };

  handleExpand = () => {
    const { id, component, dispatch, user } = this.props;
    const optionsProperties = {
      width: '90%',
      handleClose: true,

      modal: true,
    };

    const contentDialog =
      typeof component === 'function'
        ? component({
            expand: true,
            formid: `${id}_full_data`,
            handleCloseModal: this.handleCloseModal,
            user,
            orgIids: this.getDepartmentIid(),
          })
        : component;
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  handleItemClickMenuOptions = (value) => {
    const { dispatch, id } = this.props;
    dispatch(widgetActions.changeActionFilter(id, value));
  };

  getDepartmentIid = () => {
    const { orgIids, node } = this.props;
    return get(node, 'iid') ? [get(node, 'iid')] : orgIids;
  };

  render() {
    const {
      label,
      href,
      labelStyle,
      component,
      style,
      menuOptions,
      expand,
      id,
      componentStyle,
      user,
      node,
      dispatch,
    } = this.props;
    const labelElement = <span className="title">{label}</span>;
    return (
      <div className={'widget'} style={style}>
        <div className="action-bar" style={labelStyle}>
          {href ? <Link to={href}>{labelElement}</Link> : labelElement}
          {menuOptions && (
            <MenuOptions
              title={menuOptions.title || t1('options')}
              icon={menuOptions.icon || 'option-menu'}
              menus={menuOptions.menus}
              onItemClick={this.handleItemClickMenuOptions}
            />
          )}
          {expand && (
            <Icon
              className="expand"
              icon="fullscreen"
              onClick={this.handleExpand}
            />
          )}
        </div>
        <div style={componentStyle} className="content">
          {typeof component === 'function'
            ? component({
                formid: id,
                user,
                orgIids: this.getDepartmentIid(),
                node,
                dispatch,
              })
            : component}
        </div>
      </div>
    );
  }
}

DashboardWidget.propTypes = {
  label: PropTypes.string,
  labelStyle: PropTypes.shape(),
  fullWidth: PropTypes.bool,
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func, // pure component
  ]),
  style: PropTypes.shape(),
  type: PropTypes.string,
  dispatch: PropTypes.func,
  className: PropTypes.string,
  menuOptions: PropTypes.shape(),
  componentStyle: PropTypes.shape(),
  expand: PropTypes.bool,
  id: PropTypes.string,
  user: PropTypes.shape(),
  orgIids: PropTypes.arrayOf(PropTypes.number),
  node: PropTypes.shape(),
};

DashboardWidget.defaultProps = {
  label: null,
  labelStyle: null,
  fullWidth: false,
  style: null,
  type: null,
  dispatch: null,
  component: <div />,
  className: null,
  menuOptions: null,
  componentStyle: null,
  expand: false,
  id: 'default',
  user: null,
  orgIids: null,
};

const mapStateToProps = createSelector(
  (state) => get(state, 'user.info'),
  (user) => ({
    user,
    orgIids: (get(user, 'departments') || []).map((item) => item && item.iid),
  }),
);

export default connect(mapStateToProps)(DashboardWidget);
