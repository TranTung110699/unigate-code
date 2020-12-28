const initialState = {
  timeSlots: {},
};

function timeSlot(state = initialState, action) {
  const newState = { ...state };

  switch (action.type) {
    case 'CHOOSE_TIME_SLOT': {
      const { daysOfWeek, timeSlot } = action.chosenTime;
      const itemIid = action.itemIid || 'default';
      if (
        newState.timeSlots &&
        newState.timeSlots[itemIid] &&
        newState.timeSlots[itemIid][daysOfWeek]
      ) {
        if (newState.timeSlots[itemIid][daysOfWeek].includes(timeSlot)) {
          newState.timeSlots[itemIid][daysOfWeek] = newState.timeSlots[itemIid][
            daysOfWeek
          ].filter((item) => {
            return item !== timeSlot;
          });
        } else {
          newState.timeSlots[itemIid][daysOfWeek].push(timeSlot);
        }
      } else {
        if (!newState.timeSlots[itemIid]) {
          newState.timeSlots[itemIid] = {};
        }
        newState.timeSlots[itemIid][daysOfWeek] = [timeSlot];
      }

      break;
    }
    default:
      return state;
  }
  return newState;
}

export default timeSlot;
