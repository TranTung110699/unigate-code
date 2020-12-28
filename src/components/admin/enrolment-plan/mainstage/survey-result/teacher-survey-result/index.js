import React from 'react';
import PropTypes from 'prop-types';
import schema from './schema';
import { getSearchFormId } from './common';

import { t1 } from 'translate';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import wrapperToControlFlowSearchWithBatchInsertId from './wrapperToControlFlowSearchWithBatchInsertId';

import Results from './Results';

class Search extends React.Component {
  renderResultComponent = (items, props, objects, searchValues, resultId) => {
    const { columnsNotToShow, node } = this.props;

    return (
      <Results
        {...props}
        key={resultId}
        node={node}
        objects={objects}
        items={items}
        searchFormId={getSearchFormId(node)}
        columnsNotToShow={columnsNotToShow}
      />
    );
  };

  render() {
    const { node, newestBatchInsertIdFromServer } = this.props;
    return (
      <SearchWrapper
        formid={getSearchFormId(node)}
        schema={schema}
        alternativeApi={
          apiUrls.search_survey_takes_targeting_enrolment_plan_teachers
        }
        hiddenFields={{
          enrolment_plan_iid: node && node.iid,
          newestBatchInsertIdFromServer,
        }}
        node={node}
        renderResultsComponent={this.renderResultComponent}
        noResultText={t1('no_data')}
      />
    );
  }
}

Search.propTypes = {
  formid: PropTypes.string,
  node: PropTypes.shape(),
  noSearchForm: PropTypes.bool,
};

Search.defaultProps = {
  formid: '',
  node: {},
  noSearchForm: true,
};

export default wrapperToControlFlowSearchWithBatchInsertId(Search);
