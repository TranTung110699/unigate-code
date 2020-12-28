/* eslint-disable react/prop-types,jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Results from './Results';
import defaultSearchschema from './schema-form';
import withSchoolConfig from 'common/hoc/withSchoolConfigs';

class NormalSyllabusSearchForm extends Component {
  renderResultComponent = (items, props) => {
    return <Results items={items} {...props} />;
  };

  render() {
    let { hiddenFields } = this.props;

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

    return (
      <SearchWrapper
        {...this.props}
        formid="syllabus_search"
        schema={defaultSearchschema}
        hiddenFields={hiddenFields}
        defaultValues={['queued', 'approved']}
        renderResultsComponent={this.renderResultComponent}
      />
    );
  }
}

export default withSchoolConfig(NormalSyllabusSearchForm);
