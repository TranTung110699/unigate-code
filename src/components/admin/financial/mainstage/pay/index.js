import React from 'react';
import PropTypes from 'prop-types';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import { feeStatusFilters } from 'configs/constants';
import Results from './Results';
import schema from '../fee-users/schema';

class AutomaticPay extends React.Component {
  renderResultsComponent = (items, props) => (
    <Results {...props} items={items} />
  );

  render() {
    const hiddenFields = {
      financial_status: feeStatusFilters.HAVE_PENDING_FEES,
      _sand_step: 'automatic_pay',
    };
    return (
      <SearchWrapper
        showResult
        schema={schema({ hiddenFields })}
        hiddenFields={hiddenFields}
        formid="fee_users_can_be_automatically_paid_search"
        alternativeApi="/fee/api/fee-users-can-be-automatically-paid"
        renderResultsComponent={this.renderResultsComponent}
        showSearchButton
      />
    );
  }
}

AutomaticPay.propTypes = {
  className: PropTypes.string,
};

AutomaticPay.defaultProps = {
  className: '',
};

export default AutomaticPay;
