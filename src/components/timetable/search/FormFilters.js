import React, { Component } from 'react';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import { connect } from 'react-redux';
import DatePicker from 'schema-form/elements/redux-form-fields/MuiDatePicker';

class FormFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { startDate, endDate } = this.props;

    return (
      <div className="container-fluid">
        <div className="col-md-2">
          <DatePicker
            defaultValue={startDate}
            fullWidth
            unixTimeStamp
            container="inline"
            name="start_time"
            floatingLabelText={t1('start_date')}
            label={t1('start_date')}
            hintText={t1('start_date')}
          />
        </div>
        <div className="col-md-2">
          <DatePicker
            defaultValue={endDate}
            fullWidth
            unixTimeStamp
            container="inline"
            name="end_time"
            floatingLabelText={t1('end_date')}
            label={t1('end_date')}
            hintText={t1('end_date')}
          />
        </div>
        <div className="col-md-2 m-t-25">
          <RaisedButton
            name="submit"
            type="submit"
            id="submit"
            label={t1('update')}
            primary
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.timetable.sessionPanelStatus,
});
export default connect(mapStateToProps)(FormFilters);
