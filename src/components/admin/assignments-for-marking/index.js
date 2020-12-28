import React from 'react';
import PropTypes from 'prop-types';

import { t1 } from 'translate';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';

import Results from './Results';
import topMenuSchema from './menu/MainstageTopMenu';

class AssignmentsForMarking extends React.Component {
  renderResultsComponent = (items) => <Results items={items} />;

  renderSearchWrapper = () => (
    <SearchWrapper
      formid="get_all_assignments_that_user_can_mark_now"
      renderResultsComponent={this.renderResultsComponent}
      autoSearchWhenStart
      hidePagination
      noResultText={t1('there_are_no_assignments_for_you_to_mark')}
    />
  );

  render() {
    const { hasAdminMainstate } = this.props;

    if (!hasAdminMainstate) return this.renderSearchWrapper();

    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        {this.renderSearchWrapper()}
      </div>
    );
  }
}

AssignmentsForMarking.propTypes = {
  className: PropTypes.string,
  hasAdminMainstate: PropTypes.bool,
};

AssignmentsForMarking.defaultProps = {
  className: '',
  hasAdminMainstate: true,
};

export default AssignmentsForMarking;
