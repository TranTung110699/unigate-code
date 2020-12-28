import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import apiUrls from 'api-endpoints';
import commentApiUrls from 'components/common/comment/endpoints';
import lGet from 'lodash.get';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Results from './Results';
import schema from './schema/search-form';

/**
 * Handles both Course or Syllabus comments
 */
class Comments extends Component {
  renderResultComponent = (items, props) => (
    <Results items={items} {...props} />
  );

  render() {
    const { syllabus, course } = this.props;

    const syllabusIid =
      lGet(syllabus, 'iid') || lGet(course, 'credit_syllabus');
    const courseIid = lGet(course, 'iid');
    const alternativeApi = commentApiUrls.fetch_comments_for_syllabus_or_course;

    const hiddenFields = {};
    if (syllabus) hiddenFields.syllabus_iids = [syllabusIid];

    if (courseIid) hiddenFields.course_iids = [courseIid];

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

Comments.propTypes = {
  syllabus: PropTypes.instanceOf(Object),
  course: PropTypes.instanceOf(Object),
  comments: PropTypes.arrayOf(PropTypes.object),
};

Comments.defaultProps = {
  syllabus: null,
  course: null,
  comments: null,
};

export default Comments;
