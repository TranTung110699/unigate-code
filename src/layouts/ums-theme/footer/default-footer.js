import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import SoftwareVersion from 'components/common/software-version';
import './stylesheet.scss';

class DefaultFooter extends Component {
  getCopyright = () => {
    const { domainSchool } = this.props;

    const copyright = get(domainSchool, 'copyright');
    if (copyright) {
      return copyright;
    }

    const defaultCopyright = `© Copyright ${new Date().getFullYear()} - ${get(
      domainSchool,
      'name',
      '',
    )}`;

    const poweredBy = get(domainSchool, 'powered_by', 'Powered by LotusLMS');

    return `${defaultCopyright} | ${poweredBy}`;
  };

  render() {
    const copyright = this.getCopyright();
    return (
      <div className="ums-footer-wrapper p-t-20 p-b-20">
        <hr />
        <div className="default-footer">
          <div className="container">
            <div className="row">
              <div>{copyright}</div>
              <SoftwareVersion />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    domainSchool: get(state, 'domainInfo.school', {}),
  };
}

export default connect(mapStateToProps)(DefaultFooter);
