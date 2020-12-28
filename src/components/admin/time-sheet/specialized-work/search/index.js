import React from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import apiUrls from 'api-endpoints';
import { timeSheetTypes, timeSheetStatuses } from 'configs/constants/timesheet';
import searchFormSchema from './schema';
import Results from './Results';

const renderSearchResults = (data, { formid }) => (
  <Results data={data} searchFormId={formid} />
);

const defaultSearchHiddenFields = {
  type: timeSheetTypes.SPECIALIZED_WORK,
  status: [timeSheetStatuses.QUEUED, timeSheetStatuses.APPROVED],
  _sand_expand: ['current_contract_info'],
};

const SearchSpecializedWorkTimeSheet = ({ formid }) => (
  <SearchWrapper
    formid={formid}
    alternativeApi={apiUrls.time_sheet_search}
    hiddenFields={defaultSearchHiddenFields}
    renderResultsComponent={renderSearchResults}
    schema={searchFormSchema}
  />
);

export default SearchSpecializedWorkTimeSheet;
