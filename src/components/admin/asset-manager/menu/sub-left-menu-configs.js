import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';

export const menuItems = () => [
  {
    url: getUrl('asset/items'),
    title: t1('asset'),
    icon: {
      position: 'left',
      type: 'usergroup-add',
    },
  },
  {
    url: getUrl('asset/category'),
    title: t1('asset_category'),
    icon: {
      position: 'left',
      type: 'usergroup-add',
    },
  },
  {
    id: 'edit_curriculum',
    divider: true,
  },
  {
    url: getUrl('asset/check-inventory'),
    title: t1('check_inventory'),
    icon: {
      position: 'left',
      type: 'usergroup-add',
    },
  },
  {
    url: getUrl('asset/report-stationery'),
    title: t1('report_stationery'),
    icon: {
      position: 'left',
      type: 'usergroup-add',
    },
  },
  {
    url: getUrl('asset/import-stationery'),
    title: t1('import_stationery'),
    icon: {
      position: 'left',
      type: 'usergroup-add',
    },
  },
  {
    url: getUrl('asset/report-future-projection'),
    title: t1('stationery_future_projection'),
    icon: {
      position: 'left',
      type: 'usergroup-add',
    },
  },
  {
    id: 'edit_curriculum',
    divider: true,
  },
  {
    url: getUrl('asset/report-equipment'),
    title: t1('report_equipment'),
    icon: {
      position: 'left',
      type: 'usergroup-add',
    },
  },
];
