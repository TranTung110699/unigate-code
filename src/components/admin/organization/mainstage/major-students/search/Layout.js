import React from 'react';
import PropTypes from 'prop-types';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import Results from 'components/admin/user/user-in-school/Results';
import getSchema from './schema';

class Layout extends React.Component {
  paginationProps = {
    onlyShowIfTotalBigEnough: true,
  };

  dataNotToShow = ['is_staff'];
  cssClass = 'admin-organization-major-students-search-layout';

  renderResultComponent = (items, props) => {
    const { formid, node } = this.props;
    return (
      <Results
        {...props}
        dataNotToShow={this.dataNotToShow}
        readOnly
        items={items}
        searchFormId={formid}
        node={node}
      />
    );
  };

  render() {
    const { node, formid } = this.props;

    return (
      node && (
        <SearchWrapper
          formid={formid || 'major_organization'}
          schema={getSchema(node)}
          hiddenFields={{
            major_organization: node.iid,
            _sand_step: 'major_organization',
          }}
          renderResultsComponent={this.renderResultComponent}
          alternativeApi={apiUrls.user_search}
          paginationProps={this.paginationProps}
          noResultText={t1('no_student')}
        />
      )
    );
  }
}

Layout.propTypes = {
  className: PropTypes.string,
};

Layout.defaultProps = {
  className: '',
};

export default Layout;
