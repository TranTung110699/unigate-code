import React, { Component } from 'react';
import { connect } from 'react-redux';
import apiEndpoints from 'api-endpoints';
import { constants } from 'configs/constants';
import sagaActions from 'actions/node/saga-creators';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import TimeTableResults from 'components/timetable/search/Results';
import FormFilters from 'components/timetable/search/FormFilters';
import PropTypes from 'prop-types';

class TimeTableLayout extends Component {
  componentDidMount() {
    this.getVenue();
  }

  getTimeDefault = () => {
    const { clazz, searchForm } = this.props;
    let time;
    if (clazz) {
      time = {
        startDate: clazz && clazz.start_time,
        endDate: clazz && clazz.end_time,
      };
    }
    const values = searchForm && searchForm.values;
    if (!clazz && values) {
      time = {
        startDate: values.start_time,
        endDate: values.end_time,
      };
    }

    return time;
  };

  getVenue = () => {
    const { dispatch } = this.props;
    dispatch(
      sagaActions.getDataRequest(
        { url: apiEndpoints.get_venue_by_parent, keyState: 'venueList' },
        { type: constants.VenueTypeValue.REVENUE },
      ),
    );
  };

  renderResultComponent = (items, props) => {
    const { clazz, classIid, daysOfWeekOfClass } = this.props;
    const timeDefault = this.getTimeDefault();
    if (!timeDefault || !timeDefault.startDate || !timeDefault.endDate)
      return '';

    return (
      <TimeTableResults
        classIid={classIid}
        clazz={clazz}
        id={props.formid}
        daysOfWeekOfClass={daysOfWeekOfClass}
        startDate={timeDefault.startDate}
        endDate={timeDefault.endDate}
        items={items}
        {...props}
      />
    );
  };

  render() {
    const time = this.getTimeDefault();
    const clazz = this.props.clazz || {};
    return (
      <div>
        <SearchWrapper
          hidePagination
          showResult
          ignoreOptimize
          formid="timetable_search"
          hiddenFields={{
            id: clazz.id,
            iid: clazz.iid,
            room_iids: clazz.room_iids,
          }}
          onSuccess={this.props.reloadClass}
          renderResultsComponent={this.renderResultComponent}
        >
          <FormFilters
            startDate={time && time.startDate}
            endDate={time && time.endDate}
          />
        </SearchWrapper>
      </div>
    );
  }
}

TimeTableLayout.propTypes = {
  clazz: PropTypes.shape(),
  classIid: PropTypes.number,
};

TimeTableLayout.defaultProps = {
  clazz: null,
  classIid: null,
};
const mapPropsToState = (state) => ({
  searchForm: state.form.timetable_search,
});

export default connect(mapPropsToState)(TimeTableLayout);
