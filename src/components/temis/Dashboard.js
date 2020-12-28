import React, { Component } from 'react';
import Widget from 'components/common/Widget';
import withUserInfo from 'common/hoc/withUserInfo';
import configs from 'components/temis/left-menu/configs';
import { Link } from 'react-router-dom';

const iconStyle = {
  fontSize: '500%',
  marginBottom: '20px',
};

class TemisDashboardFrontend extends Component {
  render() {
    const { userInfo } = this.props;
    const menu = configs(userInfo, iconStyle);

    if (!Array.isArray(menu) || !menu.length) {
      return null;
    }

    return (
      <div className="container-fluid">
        <div className="flex-container-wrap">
          {menu.map(({ href, icon, label }) => (
            <div className="col-md-4 flex-item ">
              <Widget className="text-center m-10">
                <Link to={href} className="m-50">
                  <div>{icon}</div>

                  <div style={{ 'text-transform': 'uppercase' }}>{label}</div>
                </Link>
              </Widget>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withUserInfo(TemisDashboardFrontend);
