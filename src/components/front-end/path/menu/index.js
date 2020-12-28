import React from 'react';
import configs from 'configs/configuration';
import { Link } from 'react-router-dom';
import Links from 'routes/links';
import { t1 } from 'translate';
import Overview from 'components/front-end/homepage/etec/overview/index';
import { layouts } from 'configs/constants';
import { connect } from 'react-redux';
import { getThemeConfig } from 'utils/selectors';

import newIcon from './images/new.png';
import './stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 20/05/2017
 * */
class index extends React.Component {
  overviewStyle = { marginTop: '40px', marginBottom: '25px' };
  linkStyle = { pointerEvents: 'none' };

  constructor(props) {
    super(props);
    this.state = {};
  }

  getActiveClassByPathIid(pathIid) {
    const { rootPathIid } = this.props;
    if (rootPathIid === pathIid) {
      return 'active';
    }

    return '';
  }

  render() {
    let { className, learningItem, themeConfig } = this.props;
    className = className ? `${className} ui-paths-menu` : 'ui-paths-menu';
    if (themeConfig.layout === layouts.ETEC) {
      if (learningItem)
        return (
          <div className="container">
            <Overview
              style={this.overviewStyle}
              title={learningItem.name}
              content={learningItem.description}
            />
          </div>
        );
      return <div />;
    }
    return (
      <div className={className}>
        {configs.learningPaths && (
          <ul className="paths-menu">
            {configs.learningPaths.map((path, index) => (
              <li key={`path-${path.iid}`}>
                {!path.children && (
                  <Link
                    to={Links.courseListByPath(path.iid)}
                    className={this.getActiveClassByPathIid(path.iid)}
                  >
                    {path.name}
                  </Link>
                )}

                {path.children && (
                  <div>
                    {path && path.iid && path.iid !== null && (
                      <Link to={Links.courseListByPath(path.iid)}>
                        {path.name}
                      </Link>
                    )}
                    {path.iid === null && (
                      <Link to={'javascript:void(0)'} style={this.linkStyle}>
                        {path.name}
                      </Link>
                    )}
                    {path.children.length > 0 && (
                      <ul className="ui-sub-path">
                        {path.children.map((subPath, subIndex) => (
                          <li key={`sub-path-${subPath.iid}`}>
                            <Link to={Links.courseListByPath(subPath.iid)}>
                              {subPath.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}
            {themeConfig.layout !== layouts.LOTUS && (
              <li key="teachers">
                <Link
                  to="/teachers"
                  className={this.getActiveClassByPathIid('xpeakLive')}
                >
                  {t1('xpeak_live')} <img src={newIcon} alt="" />{' '}
                </Link>
              </li>
            )}
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    themeConfig: getThemeConfig(state),
  };
};

export default connect(mapStateToProps)(index);
