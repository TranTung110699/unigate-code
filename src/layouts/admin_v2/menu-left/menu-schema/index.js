import { filterMenusAvailableForMainLeftMenuV2 } from 'common/utils/Array';
import adminMenu from './admin';
import systemMenu from './system';

const adminMenuItems = ({
  domain,
  menuAvailable,
  workingMode,
  schoolType,
  enableWorkingMode,
  isStaff,
}) => {
  let ret = [];

  if (domain === 'system') {
    return systemMenu;
  }

  // else if (domain === 'admin') {
  ret = filterMenusAvailableForMainLeftMenuV2(
    adminMenu(),
    menuAvailable,
    enableWorkingMode,
    workingMode,
    schoolType,
    isStaff,
  );

  /*
  if (process.env.NODE_ENV !== 'production') {
    const devMenu = [
      {
        id: 'dev',
        title: t1('dev_components'),
        icon: {
          position: 'left',
          type: 'ant-design',
        },
        subMenu: [
          {
            id: 'dev',
            url: getUrl('dev'),
            icon: {
              position: 'left',
              type: 'code',
            },
            trigger: 1,
            title: t1('dev_components'),
          },
        ],
      },
    ];

    ret = ret.concat(devMenu);
  }
  */

  return ret;
};

export default adminMenuItems;
