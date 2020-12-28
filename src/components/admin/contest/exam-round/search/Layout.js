import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { change } from 'redux-form';
import { connect } from 'react-redux';
import contestApiUrls from 'components/admin/contest/endpoints';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';

import Results from './Results';
import schema from './schema-form';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch(change('exam_round_search', 'contest_code', null));
  }

  renderResultComponent(items, props) {
    return (
      <Results
        items={items}
        {...props}
        contestIid={this.props.contestIid}
        node={this.props.node}
      />
    );
  }

  render() {
    const { contestIid } = this.props;

    let hiddenFields = {
      ntype: 'exam_round',
      contest_iid: contestIid,
      status: ['queued', 'approved'],
    };

    return (
      <SearchWrapper
        formid="exam_round_search"
        hiddenFields={hiddenFields}
        renderResultsComponent={this.renderResultComponent}
        showSearchButton
        autoSearchWhenStart
        schema={schema}
        classFormFilter={'display-none'}
        alternativeApi={contestApiUrls.exam_round_search}
      />
    );
  }
}

Layout.propTypes = {
  dispatch: PropTypes.func,
  // contestIid: PropTypes.string()
};

Layout.defaultProps = {
  dispatch: null,
};

export default connect()(Layout);
