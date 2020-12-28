/* eslint-disable react/prop-types,react/no-danger,jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';

import './stylesheet.scss';

class CourseSummary extends Component {
  render() {
    const { course, syllabus } = this.props;

    const content =
      lodashGet(course, 'content') || lodashGet(syllabus, 'content') || '';

    if (!content) return null;

    return (
      <div>
        <h2>{t1('course_summary')}</h2>

        <div className="summary-course">
          <p
            className="lead"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const course = props.course;
  const syllabusIid = lodashGet(course, 'syllabus');
  return {
    syllabus: syllabusIid ? lodashGet(state, `tree.${syllabusIid}`) : null,
  };
};

export default connect(mapStateToProps)(CourseSummary);
