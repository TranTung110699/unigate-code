import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from './schema';
import advanceSchema from './schema-advance';
import schemaK12 from './k12-schema';
import apiUrls from 'api-endpoints';
import tpApiUrls from 'components/admin/training-plan/endpoints';
import Results from './Results';
import K12Results from './K12Results';
import { isK12 } from 'common/k12';

class Layout extends Component {
  renderResultComponent = (items, props) => {
    const { renderResultActions, k12 } = this.props;
    if (k12)
      return (
        <K12Results
          items={items}
          {...props}
          renderResultActions={renderResultActions}
        />
      );

    return (
      <Results
        items={items}
        {...props}
        renderResultActions={renderResultActions}
      />
    );
  };

  render() {
    const formid = this.props.formid || 'training_plan_search';
    const { k12 } = this.props;

    return (
      <SearchWrapper
        formid={formid}
        schema={k12 ? schemaK12 : advanceSchema}
        renderResultsComponent={this.renderResultComponent}
        alternativeApi={tpApiUrls.training_plan_search}
        destroyOnUnmount
        paginationProps={{
          itemPerPage: [20, 30, 40, 50, 100],
        }}
        showSearchButton={false}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    k12: isK12(state),
  };
};

export default connect(mapStateToProps)(Layout);
