export default [
  {
    start_time: new Date().getTime(),
    end_time: new Date().getTime() + 150 * 24 * 60 * 60 * 100,
    time_slots: [
      {
        id: 1,
        name: 'tiết 1',
        time_from: '7:00',
        time_to: '8:00',
        next_time_id: 2,
      },
      {
        id: 2,
        name: 'tiết 2',
        time_from: '8:00',
        time_to: '9:00',
        next_time_id: 3,
      },
      {
        id: 4,
        name: 'tiết 4',
        time_from: '10:00',
        time_to: '11:00',
        next_time_id: 5,
      },
    ],
    days_of_week: [0, 2, 1, 4],
    room: {
      venue_id: 123,
      id: 1,
      name: 'room 1',
    },
    teachers: [
      {
        name: 'HoangNH',
      },
    ],
    classes: [
      {
        name: 'Class01',
        course: {
          name: 'course 01',
        },
      },
    ],
  },
  {
    start_time: new Date().getTime(),
    end_time: new Date().getTime() + 50 * 24 * 60 * 60 * 100,
    time_slots: [
      {
        id: 5,
        name: 'tiết 5',
        time_from: '11:00',
        time_to: '12:00',
        next_time_id: 6,
      },
      {
        id: 6,
        name: 'tiết 6',
        time_from: '13:00',
        time_to: '14:00',
        next_time_id: 7,
      },
      {
        id: 7,
        name: 'tiết 7',
        time_from: '14:00',
        time_to: '15:00',
        next_time_id: 8,
      },
    ],
    days_of_week: [0, 2, 1, 4],
    room: {
      venue_id: 123,
      id: 1,
      name: 'room 1',
    },
    teachers: [
      {
        name: 'HoangNH',
      },
    ],
    classes: [
      {
        name: 'Class01',
        course: {
          name: 'course 01',
        },
      },
    ],
  },
];
