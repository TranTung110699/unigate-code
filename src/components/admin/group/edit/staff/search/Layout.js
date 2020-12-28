/* eslint-disable no-undef,react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import { relationTypes } from 'configs/constants';
import FormFilters from './FormFilters';
import Results from './Results';

class GroupStaff extends React.Component {
  cssClass = 'admin-group-staff';

  renderResultComponent = (items, props, objects, searchValues) => {
    const { formid, node } = this.props;

    return (
      <Results
        {...props}
        items={items}
        searchFormId={formid}
        node={node}
        searchValues={searchValues}
      />
    );
  };

  render() {
    const { node, formid } = this.props;

    return node ? (
      <SearchWrapper
        formid={formid}
        hiddenFields={{
          category_iid: node.iid,
          rt: relationTypes.STAFF_CATEGORY,
          _sand_step: 'list_members',
        }}
        renderResultsComponent={this.renderResultComponent}
        alternativeApi={apiUrls.user_search}
        noResultText={t1('no_staff')}
        noResultImage="/media/images/empty/person.png"
      >
        <FormFilters />
      </SearchWrapper>
    ) : null;
  }
}

GroupStaff.propTypes = {
  className: PropTypes.string,
};

GroupStaff.defaultProps = {
  className: '',
};

export default GroupStaff;
