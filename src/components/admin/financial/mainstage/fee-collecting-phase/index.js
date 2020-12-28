import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import NodeNew from 'components/admin/node/new';
import Search from './search/Layout';
import fcp from 'components/admin/financial/mainstage/fee-collecting-phase/schema/form';

class Layout extends Component {
  onNewSuccess = () => {
    const { history } = this.props;
    history.push('/admin/financial/fee-collecting-phase');
  };

  render() {
    const { action } = this.props;

    if (action === 'new') {
      return (
        <NodeNew
          className="white-box"
          mode="new"
          ntype={'fcp'}
          schema={fcp}
          formid="new_fcp"
          requestSuccessful={this.onNewSuccess}
        />
      );
    }

    return <Search />;
  }
}

Layout.propTypes = {
  action: PropTypes.string,
};

Layout.defaultProps = {
  action: '',
};

export default withRouter(connect()(Layout));
