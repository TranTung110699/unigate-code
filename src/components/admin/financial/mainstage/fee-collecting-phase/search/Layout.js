import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import PropTypes from 'prop-types';
import Results from './Results';
import schema from '../schema/search-form';

class Layout extends Component {
  renderResultComponent = (items, props) => (
    <Results items={items} {...props} />
  );

  render() {
    return (
      <SearchWrapper
        {...this.props}
        formid="fee_collecting_phase_search"
        schema={schema}
        renderResultsComponent={this.renderResultComponent}
      />
    );
  }
}

Layout.propTypes = {
  type: PropTypes.string,
};

Layout.defaultProps = {
  type: '',
};

export default connect()(Layout);
