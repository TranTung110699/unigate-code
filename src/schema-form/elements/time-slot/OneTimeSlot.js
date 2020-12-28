import React from 'react';
import Icon from 'components/common/Icon';

class OneTimeSlot extends React.Component {
  render() {
    const { handleChooseSlot, daysOfWeek, timeSlotId, selected } = this.props;
    return (
      <div
        className={`${'cell '.concat(selected ? 'chosen' : '')}`}
        onClick={() => {
          handleChooseSlot(daysOfWeek, timeSlotId);
        }}
      >
        {selected && <Icon icon="check" />}
      </div>
    );
  }
}

export default OneTimeSlot;
