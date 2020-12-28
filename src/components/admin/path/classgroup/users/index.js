import React from 'react';
import PropTypes from 'prop-types';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import InviteButton from 'components/admin/invite/new/ButtonNew';
import apiUrls from 'api-endpoints';
import schema from './schema';
import Results from './Results';

class ClassgroupUsers extends React.Component {
  renderResultsComponent = (items, props, objects) => (
    <Results items={items} objects={objects} />
  );

  render() {
    const { node } = this.props;
    return [
      <SearchWrapper
        showResult
        schema={schema}
        formid="classgroup_users_search"
        alternativeApi={apiUrls.classgroup_students_search}
        renderResultsComponent={this.renderResultsComponent}
        showSearchButton
        hiddenFields={{
          item_iid: node && node.iid,
        }}
      />,
      <InviteButton node={node} type="raised" primary />,
    ];
  }
}

ClassgroupUsers.propTypes = {
  className: PropTypes.string,
};

ClassgroupUsers.defaultProps = {
  className: '',
};

export default ClassgroupUsers;
