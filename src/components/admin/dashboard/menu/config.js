import { t1 } from 'translate';

export default {
  title: t1('dashboard_widget_settings'),
  icon: 'settings',
  menus: [
    {
      id: 'enable-widget',
      label: t1('choose_widgets'),
    },
    {
      id: 'resize-widget',
      label: t1('resize_and_order'),
    },
    {
      id: 'reset-widget-to-default',
      label: t1('reset_to_default'),
    },
  ],
};
