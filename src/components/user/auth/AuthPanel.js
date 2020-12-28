import React from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import { getThemeConfig } from 'utils/selectors';

import './stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 30/03/2017
 **/
class AuthPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { themeConfig } = this.props;
    return (
      <div className="container-fluid ui-auth-panel clearfix">
        <div className="row">
          <div className="col-sm-6 ui-left-lpanel">
            <div className="content-panel center-block">
              <div className="company-short-name">
                {t1('welcome_to')} {themeConfig.site_name}
              </div>
            </div>
          </div>
          <div className="col-sm-6 ui-right-panel">
            <div className="content-panel">{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapPropsToState = (state) => ({
  themeConfig: getThemeConfig(state),
});
export default connect(mapPropsToState)(AuthPanel);
