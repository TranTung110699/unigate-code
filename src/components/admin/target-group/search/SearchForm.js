import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import PropTypes from 'prop-types';
import Results from './Results';
import schema from './schema-form';

class SyllabusSearchForm extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <Results items={items} {...props} />;
  }

  render() {
    let { hiddenFields } = this.props;

    const type = this.props.type;
    hiddenFields = {
      ...hiddenFields,
      ntype: 'syllabus',
      type,
    };

    return (
      <SearchWrapper
        {...this.props}
        formid="tg_search"
        schema={schema}
        hiddenFields={hiddenFields}
        renderResultsComponent={this.renderResultComponent}
      />
    );
  }
}

SyllabusSearchForm.propTypes = {
  type: PropTypes.string,
};

SyllabusSearchForm.defaultProps = {
  type: '',
};

export default SyllabusSearchForm;
