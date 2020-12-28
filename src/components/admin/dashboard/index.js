import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import get from 'lodash.get';
import { t1, t3 } from 'translate';
import { getThemeConfig } from 'utils/selectors';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import { enableWorkingMode as enableWorkingModeFunc } from 'common/conf';
import fetchData from 'components/common/fetchData';
import apiUrls from 'api-endpoints';
import { getWidgets } from './config';
import WidgetsRender from './WidgetsRender';
import topMenuSchema from './menu/MainstageTopMenu';
import './stylesheet.scss';
import actions from '../../../actions/creators';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import Alert from 'antd/lib/alert';

const styles = {
  dashboard: {
    padding: 0,
    margin: 0,
    marginLeft: 0,
  },
};

class Dashboard extends Component {
  componentDidMount() {
    const { themeConfig } = this.props;
    const siteTitle = `${t1('admin')}${
      themeConfig && themeConfig.website_title
        ? `: ${themeConfig.website_title}`
        : ''
    }`;
    this.props.dispatch(actions.setTopMenuElement({ siteTitle }));
  }

  renderWidget = () => {
    const {
      widgetConfig,
      node,
      widgetByWorkingModeEnables,
      isFeatureEnabled,
    } = this.props;

    if (!widgetByWorkingModeEnables) {
      return (
        <div>
          <h1
            className={
              isFeatureEnabled(features.NEW_UI_JULY_2019) ? 'text-white' : ''
            }
          >
            {t1('welcome_to_admin_dashboard')}
          </h1>
        </div>
      );
    }

    const items = getWidgets(widgetByWorkingModeEnables, node);

    if (items && Array.isArray(items) && items.length) {
      return (
        <WidgetsRender
          items={items}
          layout={get(widgetConfig, 'layout')}
          node={node}
        />
      );
    }
  };

  render() {
    const { workingMode, enableWorkingMode, node, showSubMenuTop } = this.props;
    const menuTopContextOrg =
      node && showSubMenuTop
        ? { lastBreadcrumbName: node.name, isSmallSize: true }
        : { isHidden: true };
    return (
      <div className="dashboard" style={styles.dashboard}>
        <SubTopMenuContext schema={topMenuSchema()} {...menuTopContextOrg} />
        {enableWorkingMode ? (
          <Alert
            message={
              <>
                {t1('you_are_working_as_following_role')}:{' '}
                <strong>
                  {workingMode ? t3(workingMode) : t3('all_the_roles')}
                </strong>
              </>
            }
            type="info"
            showIcon
          />
        ) : null}
        {this.renderWidget()}
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  getThemeConfig,
  (state) => get(state, 'user.info.widget'),
  (state) => get(state, 'user.info.working_mode'),
  (state) => enableWorkingModeFunc(state.domainInfo),
  (themeConfig, widgetConfig, workingMode, enableWorkingMode) => ({
    enableWorkingMode,
    workingMode,
    themeConfig,
    widgetConfig:
      widgetConfig && Object.keys(widgetConfig).length > 0
        ? widgetConfig
        : { elements: [] },
  }),
);

const fetchDataWidget = fetchData((props) => ({
  baseUrl: apiUrls.teacher_widgets,
  params: {
    working_mode: get(props, 'workingMode'),
  },
  propKey: 'widgetByWorkingModeEnables',
}));

export default connect(mapStateToProps)(
  fetchDataWidget(withFeatureFlags()(Dashboard)),
);
