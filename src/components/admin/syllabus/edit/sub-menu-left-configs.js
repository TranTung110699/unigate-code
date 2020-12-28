import React from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';
import { getSubMenuLink } from 'routes/links';
import { schoolTypes } from 'configs/constants';
import {
  isScormProcessing,
  isScormProcessingSuccess,
  isScormSyllabus,
} from 'components/admin/scorm/scorm';
import { filterMenusAvailableForSubLeftMenuV2 } from 'common/utils/Array';
import { filterMenusByEnabledMenusFromSchoolConfiguration } from 'utils/Util';
import { SyllabusActions } from 'configs/constants/permission';
import scoMenuItems from './sco-menu-items';
import syllabusMenuItems from './syllabus-menu-items';

export const allMenuItems = (node) => {
  const { iid, ntype } = node;

  if (!ntype) {
    return [];
  }

  // TODO: deprecate all other types of video, question edit menus.
  // At least, they shouldn't be here, If any, they should stay under their own modules
  switch (ntype) {
    case 'syllabus': {
      return syllabusMenuItems(node);
    }
    case 'sco': {
      const configs = scoMenuItems(node);

      let allowedMenuItems;
      if (node.type === 'credit') {
        allowedMenuItems = [
          'edit_sco',
          'collaborators',
          'preview',
          'manage_rubrics',
        ];
      } else {
        allowedMenuItems = ['edit_sco', 'collaborators', 'preview'];
      }

      return configs.filter((item) => allowedMenuItems.includes(item.id));
    }
    case 'question':
    case 'exercise':
    case 'video': {
      return [
        {
          title: t1('edit'),
          url: getSubMenuLink(ntype, node, 'edit'),
          icon: {
            position: 'left',
            type: 'edit',
          },
        },
      ];
    }
    default:
      return [];
  }
};

const filterMenusByConfiguration = (node, conf, defaultMenus) => {
  const enabledMenus = get(conf, 'available_credit_menus') || [];

  return filterMenusByEnabledMenusFromSchoolConfiguration(
    node,
    defaultMenus,
    enabledMenus,
  );
};

const getMenuIdsAvailable = (node, conf) => {
  let allowedMenuItems;
  if (node && node.type === 'credit') {
    allowedMenuItems = [
      'dashboard',
      'syllabus_information',
      'basic_information',
      'edit_curriculum',
      //      'roles',
      'staff',
      'comments',
      'avatar',
      //      'preview',
      'attached_programs',
      'attached_courses',
      'survey',
      'filter',
      'manage_rubrics',
      ...(!node.online_only ? ['sessions'] : []), // if course is online_only, we don'tneed sessions
      'approved_history',
      'approval_flow',
      'abstract_roles',
    ];
  } else if (node && node.type === 'syllabus_exam') {
    allowedMenuItems = ['edit_curriculum', 'basic_information'];
  } else {
    allowedMenuItems = [
      'dashboard',
      'edit_curriculum',
      'basic_information',
      //      'roles',
      'staff',
      'comments',
      'avatar',
      'preview',
      'attached_courses',
      'filter',
      'manage_rubrics',
    ];
  }

  return filterMenusByConfiguration(node, conf, allowedMenuItems);
};

const getActionsByModule = (id) => {
  switch (id) {
    default: {
      return SyllabusActions.SYLLABUS_ACTION_VIEW;
    }
  }
};

const checkPermissionDisplayMenuItem = (
  item,
  node,
  hasPermission,
  permissions,
  themeConfig,
) => {
  if (themeConfig && themeConfig.type === schoolTypes.ENTERPRISE) {
    return true;
  }
  if (!item) {
    return false;
  }
  return (
    hasPermission &&
    hasPermission(
      getActionsByModule(item && item.id),
      node && node.iid,
      permissions,
    )
  );
};

export const menuItems = (
  node,
  conf,
  hasPermission,
  permissions,
  themeConfig,
) => {
  if (node.ntype === 'syllabus') {
    const menuIdsAvailable = getMenuIdsAvailable(node, conf);

    return filterMenusAvailableForSubLeftMenuV2(
      allMenuItems(node),
      menuIdsAvailable,
      (item) =>
        checkPermissionDisplayMenuItem(
          item,
          node,
          hasPermission,
          permissions,
          themeConfig,
        ),
    );
  }

  return allMenuItems(node);
};

export const messages = (node) => {
  const { ntype } = node;

  if (!ntype) {
    return [];
  }

  switch (ntype) {
    case 'syllabus': {
      let scormWarning = '';
      if (isScormProcessing(node)) {
        scormWarning = t1('scorm_is_being_processed');
      } else if (!isScormProcessingSuccess(node)) {
        scormWarning = t1('failed_to_process_scorm_file');
      }

      return [
        {
          content: scormWarning,
          type: 'warning',
          hidden: !isScormSyllabus(node),
        },
      ];
    }
    default:
      return [];
  }
};
// Sometimes, because of reasons (job queue died, SCORM .zip file too big...
// we need to allow users to click "re-process" after a certain period;
// minutes (after processing scorm for >= ... minutes, the retry button will appear)
const PROCESS_SCORM_RETRY_TIME = 5;
