import React from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import { t1 } from 'translate';
import FormFilters from './FormFilters';
import Results from './Results';

class SupporterPerformanceReport extends React.Component {
  prepareDataBeforeSearch = (values) => {
    if (!values.date_to) {
      return values;
    }
    const tmpDateTo = new Date(values.date_to);
    return Object.assign({}, values, {
      date_to: new Date(tmpDateTo.setDate(tmpDateTo.getDate() + 1)),
    });
  };

  validateFormData = (values) => {
    const error = {};
    if (!values.date_from) {
      error.date_from = t1('this_field_cannot_be_empty');
    }
    if (!values.date_to) {
      error.date_to = t1('this_field_cannot_be_empty');
    }
    if (values.date_to < values.date_from) {
      error.date_from = t1('this_field_cannot_be_greater_than_"to"_field');
      error.date_to = t1('this_field_cannot_be_smaller_than_"from"_field');
    }
    if (values.date_to - values.date_from > 119 * 24 * 60 * 60 * 1000) {
      const message = t1('time_range_cannot_be_greater_than_120_days');
      error.date_from = message;
      error.date_to = message;
    }
    return error;
  };

  renderResultComponent = (items) => <Results items={items} />;

  render() {
    const id = 'report_supporter_performance';
    const timezoneOffset = new Date().getTimezoneOffset() * 60;

    return (
      <SearchWrapper
        prepareDataBeforeSearch={this.prepareDataBeforeSearch}
        hiddenFields={{
          timezone_offset: timezoneOffset,
        }}
        validate={this.validateFormData}
        formid={id}
        renderResultsComponent={this.renderResultComponent}
        autoSearchWhenStart={false}
        alternativeApi={'/support/report-supporter-performance'}
      >
        <FormFilters />
      </SearchWrapper>
    );
  }
}

SupporterPerformanceReport.propTypes = {};

SupporterPerformanceReport.defaultProps = {};

export default SupporterPerformanceReport;
