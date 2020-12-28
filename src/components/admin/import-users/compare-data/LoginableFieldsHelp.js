import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';

class ImportAccountsHelp extends Component {
  render() {
    const { loginableFields } = this.props;

    if (!Array.isArray(loginableFields) || !loginableFields.length) {
      return null;
    }

    return (
      <span>
        {t1('loginable_fields')}: <b>{loginableFields.join(',')}</b>
      </span>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    loginableFields: lodashGet(state, 'domainInfo.conf.loginable_fields'),
  };
}

export default connect(mapStateToProps)(ImportAccountsHelp);
