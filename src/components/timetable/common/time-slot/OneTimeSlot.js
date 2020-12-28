import React from 'react';
import { connect } from 'react-redux';
import { timetableActions } from 'actions/timetable';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';

class OneTimeSlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChosen: false,
    };
  }

  componentWillMount() {
    this.isChosen(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.isChosen(newProps);
  }

  isChosen = (props) => {
    const { daysOfWeek, timeSlot, stateFromStore, itemIid } = props;
    const timeSlots =
      stateFromStore.timeSlot.timeSlots &&
      stateFromStore.timeSlot.timeSlots[itemIid];
    if (
      timeSlots &&
      timeSlots[daysOfWeek] &&
      timeSlots[daysOfWeek].includes(timeSlot)
    ) {
      this.setState({
        isChosen: true,
      });
    } else {
      this.setState({
        isChosen: false,
      });
    }
  };

  handleChooseTime = (event) => {
    event.preventDefault();
    const { daysOfWeek, timeSlot, itemIid } = this.props;

    const chosenTime = {
      daysOfWeek,
      timeSlot,
    };

    this.props.handleChooseTimeSlot(chosenTime, itemIid);
  };

  render() {
    const { isDuplicatedTimeSlot } = this.props;
    return (
      <div
        className={`${'cell '.concat(this.state.isChosen ? 'chosen' : '')} ${
          isDuplicatedTimeSlot ? 'duplicated' : ''
        }`}
        onClick={this.handleChooseTime}
        title={
          isDuplicatedTimeSlot ? t1('this_time_slot_was_be_duplicated') : ''
        }
      >
        {this.state.isChosen && <Icon icon="check" />}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  let { itemIid } = props;
  itemIid = itemIid || 'default';

  return {
    stateFromStore: state,
    itemIid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChooseTimeSlot: (chosenTime, itemIid) => {
      dispatch(timetableActions.onChooseTimeSlot(chosenTime, itemIid));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OneTimeSlot);
