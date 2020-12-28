/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import PropTypes from 'prop-types';
import schema from './schema-form';
import Section from '../../element/Section';

class ConfSearchForm extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return (
      <div>
        <div>
          {items &&
            items.map((item, index) => (
              <Section
                key={item.id || index}
                section={item.id}
                blocksByContent={item.content}
              />
            ))}
        </div>
      </div>
    );
  }

  render() {
    return (
      <SearchWrapper
        {...this.props}
        formid="conf_search"
        schema={schema}
        alternativeApi={'/conf/api/search'}
        renderResultsComponent={this.renderResultComponent}
      />
    );
  }
}

ConfSearchForm.propTypes = {
  type: PropTypes.string,
};

ConfSearchForm.defaultProps = {
  type: '',
};

export default connect()(ConfSearchForm);
