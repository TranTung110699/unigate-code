/* eslint-disable react/prop-types,jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import SyllabusExamResults from './SyllabusExamResults';
import syllabusExamSearchSchema from './schema-form-syllabus-exam';
import withSchoolConfig from 'common/hoc/withSchoolConfigs';

class SyllabusExamSearchForm extends Component {
  renderSyllabusExamResultComponent = (items, props) => {
    return <SyllabusExamResults items={items} {...props} />;
  };

  render() {
    let { hiddenFields, examRound } = this.props;

    const { isSIS } = this.props;
    const requireOrganization = false;

    const type = this.props.type;
    hiddenFields = {
      ...hiddenFields,
      type,
      ntype: 'syllabus',
      isSIS,
    };

    if (!isSIS) {
      hiddenFields = {
        ...hiddenFields,
        requireOrganization,
      };
    }

    hiddenFields._sand_step = 'exam';

    return (
      <SearchWrapper
        {...this.props}
        formid="syllabus_search"
        schema={syllabusExamSearchSchema(examRound)}
        hiddenFields={hiddenFields}
        defaultValues={{}}
        renderResultsComponent={this.renderSyllabusExamResultComponent}
      />
    );
  }
}

export default withSchoolConfig(SyllabusExamSearchForm);
