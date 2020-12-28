import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import FeeByIcoSemester from './new/FeeByIcoSemester';
import NewForm from './new/Form';
import Search from './search/Layout';

class Layout extends React.PureComponent {
  onNewSuccess = () => {
    const { history } = this.props;
    history.push('/admin/financial/applied-fee-templates/search');
  };

  render() {
    const { action, type } = this.props;

    if (action === 'new') {
      if (type === 'fee_by_ico_semester') {
        return <FeeByIcoSemester />;
      }

      return (
        <NewForm
          requestSuccessful={this.onNewSuccess}
          hiddenFields={{ type }}
        />
      );
    }

    return <Search />;
  }
}

Layout.propTypes = {
  action: PropTypes.string,
  type: PropTypes.string,
};

Layout.defaultProps = {
  action: '',
  type: '',
};

export default withRouter(connect()(Layout));
