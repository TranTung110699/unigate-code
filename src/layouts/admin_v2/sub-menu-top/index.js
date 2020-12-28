import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'antd/lib/icon';
import Layout from 'antd/lib/layout/index';
import get from 'lodash.get';
import layoutContextAction from 'actions/layout-context';
import TopMenuItem from '../common/TopMenuItem';
import { t1 } from 'translate';
import actions from '../../../actions/creators';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import './stylesheet.scss';
import { withRouter } from 'react-router-dom';
import { getUrl } from '../../../routes/links/common';

const { Header } = Layout;

const secondMenuLinkHacks = (m) => {
  // some "stupid" urls don't really follow the standards
  const mapping = {
    asset: 'asset/items',
    teacher: 'school/teachers',
    student: 'school/users',
    report: 'report/dashboard',
  };
  if (mapping[m]) return mapping[m];
  return m;
};

const getSecondMenu = (breadcrumbSchema) => {
  if (Array.isArray(breadcrumbSchema) && breadcrumbSchema.length === 2) {
    const url = breadcrumbSchema[1].url;
    const tmp = url.split('/');
    let filtered = tmp.filter(function(el) {
      return el;
    });
    if (filtered.length > 2) {
      // must be something like /admin/credit/abc
      const mainModule = filtered[1];
      return {
        url: `/admin/${secondMenuLinkHacks(mainModule)}`,
        title: t1(mainModule.replace('-', '_')),
      };
    }
    if (breadcrumbSchema.length === 2) {
      let siteTitle = breadcrumbSchema[1].title
        ? breadcrumbSchema[1].title
        : '';
      if (siteTitle.endsWith('Layout') || siteTitle.endsWith('layout')) {
        siteTitle = siteTitle.substr(0, siteTitle.length - 6);
      }
      return {
        url: breadcrumbSchema[1].url,
        title: t1(siteTitle.replace('-', '_').toLowerCase()),
        dispatchNewSiteTitle: true,
      };
    }
  }
};

class AdminSubMenuTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlToBack: '',
    };
  }

  componentDidMount() {
    this.setUrlToBack(this.props);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { dispatch, subMenuTop } = nextProps;
    const { secondMenu } = this.state;
    const newSecondMenu = getSecondMenu(subMenuTop.breadcrumbSchema);
    this.setUrlToBack(nextProps);
    if (!newSecondMenu) {
      this.setState({ secondMenu: {} });
      return;
    }
    if (
      !secondMenu ||
      secondMenu.url !== newSecondMenu.url ||
      secondMenu.title !== newSecondMenu.title
    ) {
      this.setState({ secondMenu: newSecondMenu });
      if (newSecondMenu.dispatchNewSiteTitle) {
        dispatch(
          actions.setTopMenuElement({ siteTitle: t1(newSecondMenu.title) }),
        );
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // this.setUrlToBack(prevProps);
  }

  setUrlToBack = (props) => {
    const {
      location: { pathname },
      layoutContext,
    } = props;

    const routeNotShow = [
      'conf',
      'school',
      'teacher',
      'student',
      'user',
      'sales',
      'card',
    ];

    const pathArray = pathname.split('/');
    let parentPath = get(pathArray, 2);

    if (
      !!parentPath &&
      pathArray.length > 3 &&
      !routeNotShow.includes(parentPath) &&
      get(pathArray, 1) !== 'system'
    ) {
      this.setState({
        urlToBack: parentPath,
      });
    } else {
      this.setState({
        urlToBack: '',
      });
    }
  };

  switchStateOfLeftMenu = () => {
    const { dispatch, layoutContext } = this.props;

    dispatch(
      layoutContextAction.setStateOfLeftMenu(!layoutContext.isOpenLeftMenu),
    );
  };

  render() {
    const {
      dispatch,
      layoutContext,
      subMenuTop,
      isHashbang,
      isFeatureEnabled,
    } = this.props;

    return (
      <div>
        {!subMenuTop.isHidden &&
        (subMenuTop.lastBreadcrumbName ||
          subMenuTop.schema ||
          subMenuTop.buttons) ? (
          isFeatureEnabled(features.NEW_UI_JULY_2019) ? (
            <div
              className={`sub-menu-top-header NEW_UI_JULY_2019-sub-menu-top-header p-l-45 p-r-45
                ${
                  subMenuTop.isSmallSize
                    ? 'NEW_UI_JULY_2019-sub-header-menu'
                    : ''
                }
                ${subMenuTop.className ? subMenuTop.className : ''}
              `}
            >
              <div className="align-items-center d-flex justify-content-between sub-header-menu-content">
                <div className="flex-grow-1 submenu-top-title">
                  <span className="NEW_UI_JULY_2019-sub-menu-top-title">
                    {this.state.urlToBack ? (
                      <Icon
                        onClick={() =>
                          get(this.props, 'history', []).push(
                            getUrl(this.state.urlToBack),
                          )
                        }
                        type="arrow-left"
                        className="m-r-10"
                      />
                    ) : null}
                    {subMenuTop.lastBreadcrumbName}
                  </span>
                </div>
                <div className="d-flex NEW_UI_JULY_2019-sub-menu-top-schema">
                  {!!Array.isArray(subMenuTop.schema) && (
                    <div className="submenu-top-item">
                      {subMenuTop.schema.map((item, index) => (
                        <TopMenuItem
                          key={`smtt${index}`}
                          item={item}
                          isDark={isFeatureEnabled(features.NEW_UI_JULY_2019)}
                        />
                      ))}
                    </div>
                  )}

                  {!!Array.isArray(subMenuTop.buttons) &&
                    subMenuTop.buttons.map((button, index) => (
                      <div key={`smtr-${index}`} className="submenu-top-button">
                        {button}{' '}
                      </div>
                    ))}

                  {subMenuTop.button}
                </div>
              </div>{' '}
              {/*{subMenuTop.description && (
                <Row>
                  {' '}
                  <Col span={18}>
                    <div className="sub-menu-top-description m-t-10">
                      {subMenuTop.description}
                    </div>
                  </Col>{' '}
                </Row>
              )}*/}
            </div>
          ) : (
            <Header className="content-header">
              <div className="flex-center m-r-10">
                {!isHashbang ? (
                  <div
                    className="flex-center header-collapsed-icon"
                    onClick={this.switchStateOfLeftMenu}
                    title={
                      layoutContext.isOpenLeftMenu
                        ? t1('collapse_main_left_menu')
                        : t1('open_main_left_menu')
                    }
                  >
                    <Icon
                      className="trigger"
                      type={
                        layoutContext.isOpenLeftMenu
                          ? 'menu-fold'
                          : 'menu-unfold'
                      }
                      onClick={this.toggle}
                    />
                  </div>
                ) : null}
                {subMenuTop && subMenuTop.lastBreadcrumbName && (
                  <span className="text-bold" style={{ fontSize: '130%' }}>
                    {subMenuTop.lastBreadcrumbName}
                  </span>
                )}
                {/*

          <Breadcrumb>
            {subMenuTop &&
              subMenuTop.breadcrumbSchema &&
              subMenuTop.breadcrumbSchema.map((data, index) => (
                <Breadcrumb.Item key={`bc-${index}`}>
                  <Link to={data.url} onClick={openLeftMenu(dispatch)}>
                    {data.title}
                  </Link>
                </Breadcrumb.Item>
              ))}

            {subMenuTop &&
              subMenuTop.lastBreadcrumbName && (
                <Breadcrumb.Item>
                  {subMenuTop.lastBreadcrumbName}
                </Breadcrumb.Item>
              )}
          </Breadcrumb>
          <Breadcrumb>
            {
            <Breadcrumb.Item>
              <Link to={'/admin'} onClick={openLeftMenu(dispatch)}>
                Admin
              </Link>
            </Breadcrumb.Item>
            }
          */}
                {/* TODO: steve hacked for at least a second item nav. Remove this when the menu is properly done */}{' '}
                {/*

            {secondMenu && secondMenu.url && secondMenu.title && (
              <Breadcrumb.Item>
                <Link to={secondMenu.url}>{secondMenu.title}</Link>
              </Breadcrumb.Item>
            )}
            {subMenuTop &&
              subMenuTop.lastBreadcrumbName && (
                <Breadcrumb.Item>
                  {subMenuTop.lastBreadcrumbName}
                </Breadcrumb.Item>
              )}
          </Breadcrumb>

             */}
              </div>
              <div className="flex-grow-1" />
              <div className="flex-center m-r-10 sub-menu-fixed-right">
                {!!Array.isArray(subMenuTop.schema) && (
                  <div className="m-r-10 m-l-10">
                    {subMenuTop.schema.map((item, index) => (
                      <TopMenuItem key={`smtt${index}`} item={item} />
                    ))}
                  </div>
                )}

                {!!Array.isArray(subMenuTop.buttons) &&
                  subMenuTop.buttons.map((button, index) => (
                    <div key={`smtr-${index}`} className="m-r-10">
                      {button}{' '}
                    </div>
                  ))}

                {subMenuTop.button && (
                  <div className="m-r-10">{subMenuTop.button} </div>
                )}
              </div>
            </Header>
          )
        ) : null}
      </div>
    );
  }
}

AdminSubMenuTop.propTypes = {
  dispatch: PropTypes.func,
  layoutContext: PropTypes.shape(),
};

AdminSubMenuTop.defaultProps = {
  dispatch: (f) => f,
  layoutContext: {},
};

const mapStateToProps = (state, props) => {
  const key = props.isHashbang
    ? 'layoutContext.subMenuTop.dialog'
    : 'layoutContext.subMenuTop.main';

  const subMenuTop = get(state, key);

  return {
    subMenuTop,
    layoutContext: get(state, 'layoutContext'),
  };
};

export default connect(mapStateToProps)(
  withFeatureFlags()(withRouter(AdminSubMenuTop)),
);
