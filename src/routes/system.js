import { getUrl } from './links/common';

import SkillLayout from 'components/admin/skill/skill/search/Layout';
import School from 'components/admin/system/school/Layout';
import UserSystem from 'components/admin/user/system/search/Layout';
import SystemSync from 'components/admin/system/sync';
import SystemUtil from 'components/admin/system/util';
import TranslateSearch from 'components/admin/translate/search/Layout';
import RedisSearch from 'components/admin/system/redis/search/Layout';
import ConfLayout from 'components/admin/conf/Layout';
import GetResultFromSqlCommandLayout from 'components/admin/hrms-data/evn/get-result-from-sql-search/Layout';

export default (rootUrl) => [
  {
    componentId: 'systemSkillLayout',
    path: getUrl('skills', { rootUrl }),
    component: SkillLayout,
    exact: true,
  },
  {
    componentId: 'ConfAdminMenu',
    path: '/:domain/conf/:menu',
    component: ConfLayout,
    exact: true,
  },
  {
    componentId: 'ConfSchool',
    path: '/:domain/conf/:menu/:type',
    component: ConfLayout,
    exact: true,
  },
  {
    componentId: 'TranslateSystem',
    path: getUrl('translate', { rootUrl: '/system' }),
    component: TranslateSearch,
    exact: true,
  },
  {
    componentId: 'RedisSearch',
    path: getUrl('redis', { rootUrl: '/system' }),
    component: RedisSearch,
    exact: true,
  },
  {
    componentId: 'SystemSync',
    path: getUrl('sync', { rootUrl: '/system' }),
    component: SystemSync,
    exact: true,
  },
  {
    componentId: 'SystemUtil',
    path: getUrl('util', { rootUrl: '/system' }),
    component: SystemUtil,
    exact: true,
  },

  {
    componentId: 'School',
    path: getUrl('school/search-school', { rootUrl: '/system' }),
    component: School,
    exact: true,
  },
  {
    componentId: 'UserSystem',
    path: getUrl('user', { rootUrl: '/system' }),
    component: UserSystem,
    exact: true,
  },
  {
    componentId: 'GetResultFromSqlCommandLayout',
    path: getUrl('hrms-data', { rootUrl: '/system' }),
    component: GetResultFromSqlCommandLayout,
    exact: true,
  },
];
