import React from 'react';
import { connect } from 'react-redux';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import PropTypes from 'prop-types';
import groupApiUrls from 'components/admin/group/endpoints';
import Results from './Results';

class GroupMemberSearchLayout extends React.Component {
  paginationProps = {
    onlyShowIfTotalBigEnough: true,
  };

  renderResultComponent = (items, props) => {
    const { searchFormId } = this.props;
    return <Results items={items} searchFormId={searchFormId} {...props} />;
  };

  render() {
    const { group, searchFormId } = this.props;
    return (
      group && (
        <SearchWrapper
          formid={searchFormId}
          hiddenFields={{
            category_iid: group.iid,
            _sand_step: 'list_members',
          }}
          group={group}
          alternativeApi={groupApiUrls.group_member_search}
          renderResultsComponent={this.renderResultComponent}
          paginationProps={this.paginationProps}
        />
      )
    );
  }
}

GroupMemberSearchLayout.propTypes = {
  className: PropTypes.string,
  dispatch: PropTypes.func,
  group: PropTypes.shape(),
  searchFormId: PropTypes.string,
};

GroupMemberSearchLayout.defaultProps = {
  className: '',
  dispatch: () => {},
  group: null,
  searchFormId: '',
};

export default connect()(GroupMemberSearchLayout);
