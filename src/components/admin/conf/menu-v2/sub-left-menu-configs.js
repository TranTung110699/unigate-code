import systemMenuConfig from './system';
import schoolMenuConfig, { schoolMetadata } from './school';

export const menuItems = ({ domain, menuAvailable, metadata }) => {
  let items = [];

  if (domain === 'system') {
    items = systemMenuConfig;
  } else {
    items = metadata ? schoolMetadata : schoolMenuConfig();
  }

  if (domain === 'system' || !menuAvailable || !menuAvailable.length) {
    return items;
  }

  items = items.filter((menu) => menuAvailable.includes(menu.id));

  return items;
};
