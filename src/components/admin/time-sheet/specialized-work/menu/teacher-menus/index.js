import React from 'react';
import NewTimeSheetButtonForSpecializedWork from '../../new/ButtonNew';

const menu = ({ searchFormId }) => [
  {
    button: (
      <NewTimeSheetButtonForSpecializedWork searchFormId={searchFormId} />
    ),
    id: 'new_time_sheet',
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
];

export default menu;
