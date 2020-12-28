import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import PropTypes from 'prop-types';
import getSchema from './schema';
import CreatedResults from './CreatedResults';

class Layout extends Component {
  componentWillMount() {
    this.props.dispatch(reset(this.getFormId()));
  }

  getFormId = () => {
    const { formid, type } = this.props;
    return formid || `applied_fee_template_${type || 'created'}`;
  };
  renderResultComponent = (items, props) => (
    <CreatedResults items={items} {...props} />
  );

  render() {
    const { renderResultComponent, ...props } = this.props;

    return (
      <SearchWrapper
        {...props}
        formid={this.getFormId()}
        renderResultsComponent={
          renderResultComponent || this.renderResultComponent
        }
        schema={getSchema}
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
