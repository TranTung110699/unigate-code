import React from 'react';
import get from 'lodash.get';
import { ListItem } from 'material-ui/List';

import { t, t1 } from 'translate';
import Perm from 'common/utils/Perm';
import {
  courseLearningTypes,
  languages,
  learningMethods,
  leftMenuStates,
  nodeRoles,
} from 'configs/constants';
import layoutContextAction from 'actions/layout-context';

const defaultLanguage = languages[0];

export const isOnlineCourse = (course) =>
  course && course.learning_type === courseLearningTypes.ONLINE;

export const openLeftMenu = (dispatch) => () =>
  dispatch(layoutContextAction.setStateOfLeftMenu(leftMenuStates.OPENED));

export const closeLeftMenu = (dispatch) => () =>
  dispatch(layoutContextAction.setStateOfLeftMenu(leftMenuStates.CLOSED));

export function displayAvatar(avatar) {
  if (!avatar) return '';
  return avatar.startsWith('http')
    ? avatar
    : `${window.APP_STATIC_CDN}/${avatar}`;
}

export function displayOrganizationTypeLabel(orgTypes, orgType) {
  if (!orgTypes) {
    return t1('you_need_to_config_org_types_on_system_side');
  }

  const orgTypeObject = orgTypes.find(
    (orgTypeItem) => parseInt(orgTypeItem.type) === parseInt(orgType),
  );

  return orgTypeObject && t1(orgTypeObject.name);
}

export function filterLocationTypesBaseOnSupportedLearningMethods(
  supportedLearningMethods,
  getLocationTypes,
) {
  if (supportedLearningMethods && supportedLearningMethods.length > 0) {
    const index = supportedLearningMethods.indexOf(learningMethods.ONLINE);

    if (index !== -1) {
      supportedLearningMethods.splice(index, 1);
    }
  }

  return getLocationTypes.filter(
    (opt) =>
      !supportedLearningMethods ||
      supportedLearningMethods.length === 0 ||
      supportedLearningMethods.includes(opt.value),
  );
}

export function filterRequestTypesBaseOnSupportedRequestTypes(
  supportedRequestTypes,
  requestTypes,
) {
  return requestTypes.filter(
    (opt) =>
      !supportedRequestTypes ||
      supportedRequestTypes.length === 0 ||
      supportedRequestTypes.includes(opt.value),
  );
}

export function filterMenusByEnabledMenusFromSchoolConfiguration(
  node,
  defaultMenus,
  enabledMenus,
) {
  if (!enabledMenus.length) {
    return defaultMenus;
  }

  const roles = Perm.getRolesAssignedToNode(node, true);

  if (Perm.hasPerm('root') || roles.includes(nodeRoles.ROOT)) {
    return defaultMenus.filter(
      (menu) => enabledMenus.includes(menu) || menu.divider,
    );
  } else if (!roles || !roles.length) {
    return [];
  }

  return defaultMenus.filter((menu) => {
    if (!enabledMenus.includes(menu) && !menu.divider) {
      return false;
    }
    return roles.includes(menu);
  });
}

export function getFontByLanguage(font, language = defaultLanguage) {
  if (!Array.isArray(font) || !font.length) {
    return 'default';
  }
  const matchedFont = font.find((f) => get(f, 'language') === language);

  return matchedFont ? matchedFont.font : 'default';
}

export function getTextFromValue(value, options) {
  const matchedOption = options.find((option) => option.value === value);

  return matchedOption
    ? matchedOption.primaryText || matchedOption.label
    : 'N/A';
}

export function getMenuNavOptions(menus, filters = []) {
  if (!menus || !menus.length) {
    return [];
  }

  const options = [];
  menus.forEach((item) => {
    if (!item) return;
    if (!item.subMenu || item.subMenu.length === 0) {
      options.push({
        value: item.id,
        label: (
          <ListItem
            primaryText={
              <>
                {item.domainHintText ? <b>[{item.domainHintText}] </b> : null}
                {item.title} ({item.id})
              </>
            }
          />
        ),
      });
    } else {
      item.subMenu.forEach((child) => {
        if (child) {
          options.push({
            value: child.id,
            label: (
              <ListItem
                primaryText={
                  <>
                    {child.domainHintText ? (
                      <b>[{child.domainHintText}] </b>
                    ) : null}
                    {child.title} ({child.id})
                  </>
                }
              />
            ),
          });
        }
      });
    }
  });
  if (!filters || !filters.length) {
    return options;
  }

  return options.filter((option) => filters.includes(option && option.value));
}

export function getRoleName(role) {
  if (!role) return '';

  const { code } = role;
  if (!code) return '';

  const arr = code.split(':');
  if (!arr || arr.length < 1) return '';

  return arr[arr.length - 1];
}

export function arrayEqual(array1, array2, callback) {
  if (array1 === array2) return true;
  if (array1 == null || array2 == null) return false;
  if (array1.length !== array2.length) return false;

  for (let i = 0; i < array2.length; ++i) {
    if (callback) {
      if (!callback(array1[i], array2[i])) return false;
    } else if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}

export const hoursStringify = (targetUnitNames) => (value) => {
  if (value < 24) {
    return `${value} ${value > 1 ? t('hours') : t('hour')}`;
  }

  let clonedValue = value;
  const units = {
    year: 24 * 365,
    month: 24 * 30,
    week: 24 * 7,
    day: 24,
    hour: 1,
  };

  const convertedStrings = [];
  Object.keys(units).forEach((name) => {
    if (!targetUnitNames.includes(name)) {
      return;
    }

    const unitValue =
      units[name] !== 1
        ? Math.floor(clonedValue / units[name])
        : parseFloat(clonedValue.toFixed(1));

    if (unitValue === 1) {
      convertedStrings.push(`${unitValue} ${t(name)}`);
    }
    if (unitValue >= 2) {
      convertedStrings.push(`${unitValue} ${t(`${name}s`)}`);
    }

    clonedValue %= units[name];
  });

  return convertedStrings.join(' ');
};

export const minuteStringify = (value) => `${value} ${t1('minutes')}`;
