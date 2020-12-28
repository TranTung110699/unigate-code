import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import apiUrls from 'api-endpoints';
import commentApiUrls from 'components/common/comment/endpoints';
import lGet from 'lodash.get';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Results from './Results';
import schema from './search-schema';

/**
 * Handles Course comments
 */
class CourseComments extends Component {
  renderResultComponent = (items, props) => (
    <Results items={items} {...props} />
  );

  render() {
    const { course } = this.props;

    const alternativeApi = commentApiUrls.fetch_comments_for_course;

    const hiddenFields = {
      course_iids: [lGet(course, 'iid')],
    };

    return (
      <div>
        <SearchWrapper
          formid={'fetch_comment'}
          {...this.props}
          schema={schema}
          renderResultsComponent={this.renderResultComponent}
          hiddenFields={hiddenFields}
          showQueryField={false}
          showSearchButton
          alternativeApi={alternativeApi}
          autoSearchWhenValuesChange
        />
      </div>
    );
  }
}

CourseComments.propTypes = {
  course: PropTypes.instanceOf(Object),
  comments: PropTypes.arrayOf(PropTypes.object),
};

CourseComments.defaultProps = {
  course: null,
  comments: null,
};

export default CourseComments;
