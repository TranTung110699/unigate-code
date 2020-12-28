import React from 'react';

export const deleteType = {
  MULTI_NODE: 'MULTI_NODE',
  SINGLE_NODE: 'SINGLE_NODE',
  SINGLE_DAY: 'SINGLE_DAY',
};
const selectDeleteOptions = [
  {
    value: deleteType.SINGLE_DAY,
    label: 'Xóa lịch cho ngày được chọn',
  },
  {
    value: deleteType.MULTI_NODE,
    label: 'Xóa toàn bộ lịch gắn liền đến ngày này',
  },
];
const schema = (formid, values, step) => ({
  deleteOption: {
    type: 'radio',
    options: selectDeleteOptions,
    defaultValue: deleteType.SINGLE_DAY,
    errorText: '',
  },
});

const ui = (step, values) => {
  const config = {
    multi_node: [
      {
        id: 'left',
        title: '',
        fields: ['deleteOption'],
      },
    ],
  };

  return config[step];
};

const layout = {
  new: 'newTimeTable',
};

const newTimetable = {
  schema,
  ui,
  layout,
};

export default newTimetable;
