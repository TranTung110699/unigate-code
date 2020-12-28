/**
 * Created by hungvo on 25/08/17.
 */
import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import { t1 } from 'translate';
import get from 'lodash.get';
import Results from './Results';

class Layout extends Component {
  paginationProps = {
    onlyShowIfTotalBigEnough: true,
  };

  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent = (items, props) => (
    <Results items={items} {...props} displayField={this.props.displayField} />
  );

  render() {
    const { group } = this.props;

    const hiddenFields = {
      assignment_group: get(group, 'iid'),
    };

    return (
      <SearchWrapper
        formid="get_open_ended_answers_for_assignment_group"
        {...this.props}
        hiddenFields={{ ...hiddenFields }}
        renderResultsComponent={this.renderResultComponent}
        noResultText={t1('there_are_no_submissions')}
        destroyOnUnmount
        autoSearchWhenStart
        paginationProps={this.paginationProps}
      />
    );
  }
}

export default Layout;
