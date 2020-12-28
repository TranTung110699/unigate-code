import React from 'react';
import { Element } from 'schema-form/elements';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import DatePicker from 'schema-form/elements/date-picker';

class SupporterPerformanceReportSearchFormFilters extends React.Component {
  render() {
    return (
      <div id="teacher-search-form">
        <div className="row">
          <div className="col-md-6">
            <Element
              schema={{
                type: DatePicker,
                name: 'date_from',
                floatingLabelText: t1('from'),
              }}
            />
          </div>
          <div className="col-md-6">
            <Element
              schema={{
                type: DatePicker,
                name: 'date_to',
                floatingLabelText: t1('to'),
              }}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-6">
            <RaisedButton primary type="submit" label={t1('generate_report')} />
          </div>
        </div>
      </div>
    );
  }
}

SupporterPerformanceReportSearchFormFilters.propTypes = {};

SupporterPerformanceReportSearchFormFilters.defaultProps = {};

export default SupporterPerformanceReportSearchFormFilters;
