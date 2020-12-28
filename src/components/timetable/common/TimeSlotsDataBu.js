export const timeSlotsData = [
  {
    id: '1',
    name: 'tiết 1',
    time_from: '7:00',
    time_to: '8:00',
    next_time_id: 2,
    time: 45,
  },
  {
    id: '2',
    name: 'tiết 2',
    time_from: '8:00',
    time_to: '9:00',
    next_time_id: 3,
    time: 45,
  },
  {
    id: '3',
    name: 'tiết 3',
    time_from: '9:00',
    time_to: '10:00',
    next_time_id: 4,
    time: 45,
  },
  {
    id: '4',
    name: 'tiết 4',
    time_from: '10:00',
    time_to: '11:00',
    next_time_id: 5,
    time: 45,
  },
  {
    id: '5',
    name: 'tiết 5',
    time_from: '11:00',
    time_to: '12:00',
    next_time_id: 6,
    time: 45,
  },
  {
    id: '6',
    name: 'tiết 6',
    time_from: '13:00',
    time_to: '14:00',
    next_time_id: 7,
    time: 45,
  },
  {
    id: '7',
    name: 'tiết 7',
    time_from: '14:00',
    time_to: '15:00',
    next_time_id: 8,
    time: 45,
  },
  {
    id: '8',
    name: 'tiết 8',
    time_from: '15:00',
    time_to: '16:00',
    next_time_id: 9,
    time: 45,
  },
  {
    id: '9',
    name: 'tiết 9',
    time_from: '16:00',
    time_to: '17:00',
    time: 45,
  },
];

export const getTimeSlotsName = (value) => {
  for (let i = 0; i < timeSlotsData.length; i += 1) {
    if (value === timeSlotsData[i].id) {
      return timeSlotsData[i].name;
    }
  }
};

export default timeSlotsData;
