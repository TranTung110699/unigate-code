import React, { Component } from 'react';
import { t1 } from 'translate';
import { feeStatuses } from 'configs/constants';

import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import Results from './Results';

class ViewFeesOfUser extends Component {
  renderResultComponent = (items, props) => (
    <Results items={items} {...props} />
  );

  render() {
    const hiddenFields = {
      status: [
        feeStatuses.NEW,
        feeStatuses.PAID,
        feeStatuses.POSTPONE_DEADLINE,
      ],
    };

    return (
      <div>
        <h1>{t1('pending_fees')}</h1>
        <SearchWrapper
          formid="get_fees_of_user"
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
          renderNoResultComponent={() => (
            <h3>{t1('there_are_no_pending_fees')}</h3>
          )}
          autoSearchWhenStart
        />
      </div>
    );
  }
}

export default ViewFeesOfUser;
