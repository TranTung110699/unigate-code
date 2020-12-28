import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import CircularProgress from 'material-ui/CircularProgress';
import Results from './Results';
import { CourseActions } from 'configs/constants/permission';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import apiUrls from '../endpoints';

const formid = 'session_search';

class SessionsLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      openDialog: false,
      count: 20,
    };
  }

  divStyle = { paddingTop: 200, textAlign: 'center' };

  renderResultComponent = (items) => {
    if (this.state.loading) {
      this.setState({ loading: false });
    }
    const { node, hasPermission, permissions, isSIS, isStudent } = this.props;

    const hasPermUpdate =
      isSIS && node.ntype === 'course'
        ? hasPermission &&
          hasPermission(
            [
              CourseActions.COURSE_ACTION_UPDATE_SESSION,
              CourseActions.COURSE_ACTION_UPDATE,
            ],
            node && node.iid,
            permissions,
          )
        : true;

    return (
      <Results
        items={items}
        formid={formid}
        node={node}
        hasPermUpdate={!isStudent && hasPermUpdate}
      />
    );
  };

  render() {
    const { node, alternativeApi } = this.props;
    const hiddenFields = {
      course_iid: node && node.iid,
      items_per_page: -1,
      _sand_expand: ['scheduled'], // get scheduled info
    };

    return (
      <div className={`${this.props.isStudent ? '' : 'whitebox'} border-round`}>
        {this.state.loading && (
          <div style={this.divStyle}>
            <CircularProgress size={60} thickness={5} />
          </div>
        )}
        <SearchWrapper
          autoSearchWhenStart
          formid={formid}
          searchResultKey={`session_search_${node && node.iid}`}
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
          showQueryField={false}
          showResult
          hidePagination
          alternativeApi={alternativeApi || apiUrls.search_sessions_in_course}
        />
      </div>
    );
  }
}

SessionsLayout.propTypes = {
  hiddenFields: PropTypes.instanceOf(Object),
  node: PropTypes.instanceOf(Object),
  // isStudent: PropTypes.bool(), // whether this is being called from student's view
};

SessionsLayout.defaultProps = {
  hiddenFields: null,
  node: null,
  // isStudent: false,
};

export default withSchoolConfigs(SessionsLayout);
