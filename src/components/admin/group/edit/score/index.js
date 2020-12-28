import React from 'react';
import api from '../../endpoints';
import schema from './schema';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Results from './Results';

/**
 * Group report
 * @param {object} group
 * @param scores
 * @returns {JSX.Element}
 * @constructor
 */
function GroupScore({ group, scores }) {
  const formid = `group_score_report_${group.iid}`;

  const renderResultComponent = (items, props, objects, searchValues) => {
    return (
      <Results
        group={group}
        items={items}
        formid={formid}
        searchFormId={formid}
        form={formid}
        searchValues={searchValues}
        {...props}
      />
    );
  };

  return (
    <SearchWrapper
      resetForm
      schema={schema}
      formid={formid}
      hiddenFields={{ group_iid: group.iid }}
      renderResultsComponent={renderResultComponent}
      alternativeApi={api.search_member_scores}
      showSearchButton={false}
      autoSearchWhenValuesChange
      prepareDataBeforeSearch={(fulldata) => {
        let data = fulldata;
        const { pass_status } = data;

        if (pass_status === 'all') {
          delete data.pass_status;
        } else if (pass_status === 'pass_only') {
          data.pass_only = 1;
        } else if (pass_status === 'fail_only') {
          data.fail_only = 1;
        }

        return data;
      }}
    />
  );
}

export default GroupScore;
