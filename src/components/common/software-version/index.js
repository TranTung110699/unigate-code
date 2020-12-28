import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
// import packageJson from '/package.json';
import { t4 } from 'translate';
import Warning from '../Warning';
import Icon from 'antd/lib/icon';

const styles = {
  fontSize: 10,
  color: '#3c3b3b',
};

class SoftwareVersion extends Component {
  render() {
    const { versionWeb, versionBackend } = this.props;

    return (
      <div style={styles}>
        {t4('software_version')}:{process.env.REACT_APP_VERSION}//{versionWeb}//
        {versionBackend}
        {process.env.REACT_APP_VERSION != versionWeb ? (
          <Warning>
            {t4(
              'you_might_be_running_and_old_version_please_refresh_your_browser',
            )}
            .
            <a
              href="#"
              title={t4('click_here_to_reload_the_website')}
              onClick={() => {
                window.location.reload();
              }}
            >
              <Icon type="reload" />
            </a>
          </Warning>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    versionWeb: get(state, 'domainInfo.conf.version_web'),
    versionBackend: get(state, 'domainInfo.conf.version_backend'),
  };
}

export default connect(mapStateToProps)(SoftwareVersion);
