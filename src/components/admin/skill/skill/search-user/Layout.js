import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import Results from './Results';
import FormFilters from './FormFilters';

class UserInGroupLayout extends Component {
  renderResultComponent = (items, props) => {
    const { node } = this.props;
    return <Results items={items} {...props} node={node} />;
  };

  render() {
    const { node } = this.props;
    const hiddenFields = {
      iid: node && node.iid,
    };
    return (
      <div>
        <h3>
          {t1('skill_dashboard')}: {t1('reports_by_users_and_progresses')}
        </h3>
        <SearchWrapper
          formid="search_users_by_skill"
          hiddenFields={hiddenFields}
          alternativeApi="/skill/api/search-user"
          renderResultsComponent={this.renderResultComponent}
          showQueryField={false}
          showSearchButton={false}
        >
          <FormFilters />
        </SearchWrapper>
      </div>
    );
  }
}

UserInGroupLayout.propTypes = {
  node: PropTypes.shape(),
};

UserInGroupLayout.defaultProps = {
  node: null,
};

export default connect()(UserInGroupLayout);
