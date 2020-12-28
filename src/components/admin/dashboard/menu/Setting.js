import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions/node/creators';
import NodeNew from 'components/admin/node/new';
import { t1 } from 'translate';
import { createSelector } from 'reselect';
import { getThemeConfig } from 'utils/selectors';
import MenuOptions from 'components/common/menu-options';
import widgetActions from 'actions/admin/widget/actions';
import sagaActions from 'actions/node/saga-creators';
import schema from '../widget/setting/schema';
import menu from './config';

class Index extends Component {
  handleEnableWidgets = () => {
    const { dispatch, themeConfig, widget } = this.props;
    const contentDialog = (
      <NodeNew
        mode="edit"
        schema={schema}
        ntype="user"
        step={'enable_widget_elements'}
        formid="edit_widget"
        requestSuccessful={(data) => {
          dispatch(widgetActions.changeUserWidget(data && data.result));
        }}
      />
    );
    const optionsProperties = {
      handleClose: true,

      title: t1('enable_widget'),
      modal: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  handleEnableResizeWidgets = () => {
    const { dispatch } = this.props;
    dispatch(widgetActions.enableResize(true));
  };

  handleResetWidgetToDefault = () => {
    const { dispatch } = this.props;
    dispatch(
      sagaActions.getDataRequest(
        {
          url: 'user/update',
          post: true,
          executeOnSuccess: () => {
            dispatch(widgetActions.changeUserWidget(null));
          },
        },
        { _sand_step: 'reset_widget_to_default' },
      ),
    );
  };

  handleItemClickMenuOptions = (item) => {
    switch (item.id) {
      case 'enable-widget':
        this.handleEnableWidgets();
        break;
      case 'resize-widget':
        this.handleEnableResizeWidgets();
        break;
      case 'reset-widget-to-default':
        this.handleResetWidgetToDefault();
        break;
    }
  };

  render() {
    return (
      <MenuOptions
        title={menu.title || t1('setting')}
        icon={menu.icon || 'option-menu'}
        menus={menu.menus}
        onItemClick={this.handleItemClickMenuOptions}
      />
    );
  }
}

const mapStateToProps = createSelector(
  getThemeConfig,
  (state) => state.user && state.user.info && state.user.info.widget,
  (themeConfig, widgetConfig) => ({
    themeConfig,
    widget:
      widgetConfig && Object.keys(widgetConfig).length > 0
        ? widgetConfig
        : { elements: [] },
  }),
);

export default connect(mapStateToProps)(Index);
