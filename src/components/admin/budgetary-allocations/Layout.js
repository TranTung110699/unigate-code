import React from 'react';
import PropTypes from 'prop-types';

import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import { connect } from 'react-redux';
import Search from './search/Layout';
import topMenuSchema from './menu/MainstageTopMenu';
import { createSelector } from 'reselect';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <SubTopMenuContext
          schema={topMenuSchema()}
          lastBreadcrumbName={t1('budgetary_allocations')}
          description={t1('budgetary_allocations_description')}
        />
        <Search />
      </div>
    );
  }
}

Layout.propTypes = {
  className: PropTypes.string,
};

Layout.defaultProps = {
  className: '',
};
const mapStateToProps = createSelector(
  (state, props) => lodashGet(state, 'domainInfo.conf'),
  (conf) => ({
    allocations_budgetary_equivalent: lodashGet(
      conf,
      'support_equivalent_job_positions',
    ),
  }),
);
export default connect(mapStateToProps)(Layout);
