import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import PropTypes from 'prop-types';
import Results from './Results';
import schema from './schema-form';

class LogSearchForm extends Component {
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
      type,
    };

    return (
      <SearchWrapper
        {...this.props}
        formid="log_search"
        schema={schema}
        hiddenFields={hiddenFields}
        renderResultsComponent={this.renderResultComponent}
        alternativeApi={'/log/search'}
      />
    );
  }
}

LogSearchForm.propTypes = {
  type: PropTypes.string,
};

LogSearchForm.defaultProps = {
  type: '',
};

export default LogSearchForm;
