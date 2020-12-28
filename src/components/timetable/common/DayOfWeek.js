export const daysOfWeek = [
  {
    value: 1,
    key: 'monday',
    label: 'Monday',
    short: 'Mo',
  },
  {
    value: 2,
    key: 'tuesday',
    label: 'Tuesday',
    short: 'Tu',
  },
  {
    value: 3,
    key: 'wednesday',
    label: 'Wednesday',
    short: 'We',
  },
  {
    value: 4,
    key: 'thursday',
    label: 'Thursday',
    short: 'Th',
  },
  {
    value: 5,
    key: 'friday',
    label: 'Friday',
    short: 'Fr',
  },
  {
    value: 6,
    key: 'saturday',
    label: 'Saturday',
    short: 'Sa',
  },
  {
    value: 0,
    key: 'sunday',
    label: 'Sunday',
    short: 'Su',
  },
];

export const getLabelByValue = (value) => {
  for (let i = 0; i < daysOfWeek.length; i++) {
    if (value == daysOfWeek[i].value) {
      return daysOfWeek[i].label;
    }
  }
};

export const getDayOfWeek = (date) => {
  const dateOfWeek = date.getDay();
  for (let i = 0; i < daysOfWeek.length; i++) {
    if (dateOfWeek === daysOfWeek[i].value) {
      return { ...daysOfWeek[i], time: date.getTime() };
    }
  }
};

export const getTimeInfo = (date) => {
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${hour}:${minute}`;
};

export const daysOfWeekToString = (items) => {
  if (!items) return '';
  let result = '';
  items.map((item) => {
    result += `${getLabelByValue(item)}, `;
  });
  return result;
};

export default daysOfWeek;
