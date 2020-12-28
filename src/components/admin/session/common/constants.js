import { t1 } from 'translate';

export const ROOM_TYPE_PRACTICE = 'practice';
export const ROOM_TYPE_THEORY = 'theory';
export const ROOM_TYPE_VIRTUAL_ROOM = 'virtual_room';
export const ILT_BBB = 'ilt_bbb';
export const ILT_PHYSICAL = 'ilt_physical';

export const roomTypes = () => {
  return [
    {
      value: ROOM_TYPE_PRACTICE,
      label: t1('practice_room'),
      primaryText: t1('practice_room'),
    },
    {
      value: ROOM_TYPE_THEORY,
      label: t1('theory_room'),
      primaryText: t1('theory_room'),
    },
    {
      value: ROOM_TYPE_VIRTUAL_ROOM,
      label: t1('virtual_room'),
      primaryText: t1('virtual_room'),
    },
  ];
};

export const getLocationTypes = () => {
  return [
    {
      value: ILT_PHYSICAL,
      label: t1('ilt_physical'),
      primaryText: t1('ilt_physical'),
    },
    {
      value: ILT_BBB,
      label: t1('ilt_bbb'),
      primaryText: t1('ilt_bbb'),
    },
  ];
};

export const locationTypes = () => {
  return {
    ILT_PHYSICAL: ILT_PHYSICAL,
    ILT_BBB: ILT_BBB,
  };
};
