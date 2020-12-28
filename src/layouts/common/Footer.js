import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import Layout from 'antd/lib/layout';

class DefaultFooter extends Component {
  getCopyright = () => {
    const { domainSchool } = this.props;

    const copyright = get(domainSchool, 'copyright');
    if (copyright) {
      return copyright;
    }

    const defaultCopyright = `© ${new Date().getFullYear()} - ${get(
      domainSchool,
      'name',
      '',
    )}`;

    const poweredBy = get(domainSchool, 'powered_by', 'Powered by Vieted');

    return `${defaultCopyright} | ${poweredBy}`;
  };

  render() {
    const copyright = this.getCopyright();
    return (
      <Layout.Footer style={{ textAlign: 'center' }}>{copyright}</Layout.Footer>
    );
  }
}

function mapStateToProps(state) {
  return {
    domainSchool: get(state, 'domainInfo.school', {}),
  };
}

export default connect(mapStateToProps)(DefaultFooter);
