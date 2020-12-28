import { t1 } from 'translate';
import Perm from 'common/utils/Perm';
import lClone from 'lodash.clone';
import lGet from 'lodash.get';
import { hasShowTopMenu } from 'layouts/common';
import { getCatalogueUrl, getDashboardUrl } from 'routes/links/common';
import { isMobileBrowser } from 'common';
import { getForumUrl } from 'common/conf';
import Avatar from 'components/common/avatar';
import userLinks from 'routes/links/user';

const orderOfMenus = [
  'home',
  'blog',
  'catalogue',
  'dashboard',
  'upcoming-contests',
  'my-enrolment-plans',
  'faq',
  'skills',
  'forum',
  'progress-reports',
];

const getWeightOfMenuToOrdering = (menu) => {
  const index = orderOfMenus.findIndex((m) => m === menu.id || m === menu);
  return index === -1 ? Infinity : index;
};

export default ({
  logoutAction,
  loginAction,
  registerAction,
  topMenusAvailable,
  themeConfig,
  userInfo,
  conf,
}) => {
  let menus = lClone(topMenusAvailable);

  if (Perm.isGuest()) {
    const index = menus.indexOf('dashboard');
    if (index > -1) {
      menus.splice(index, 1);
    }
    menus = menus.concat([
      {
        id: 'login',
        href: '#',
        label: t1('login'),
        action: loginAction,
      },
      {
        id: 'register',
        href: '#',
        label: t1('register'),
        action: registerAction,
      },
    ]);
  } else {
    menus = menus.concat(
      {
        id: 'profile',
        href: userLinks.dashboard,
        label: t1('profile'),
      },
      {
        id: 'logout',
        href: '#',
        label: t1('logout'),
        action: logoutAction,
      },
    );

    // if (isMobileBrowser()) {
    //   menus = menus.concat({
    //     id: 'uname',
    //     href: getProfileUrl('update-info'),
    //     label: (
    //       <>
    //         <Avatar user={userInfo} size={12}/>
    //         <span className="profile-avatar__name-user">
    //           {userInfo.name}
    //         </span>
    //       </>
    //     ),
    //   });
    // }
  }

  menus = menus.filter((i) => {
    if (i === 'progress-reports' && !Perm.hasPerm('staff')) return false;
    return true;
  });

  menus = menus
    .map((menu) => {
      switch (menu) {
        case 'home': {
          return {
            id: 'home',
            href: hasShowTopMenu('home', themeConfig) && '/',
            label: t1('home'),
          };
        }
        case 'faq': {
          return {
            id: 'faq',
            href: hasShowTopMenu('faq', themeConfig) && '/faq',
            label: t1('faq'),
          };
        }
        case 'skills': {
          return {
            id: 'skills',
            href: hasShowTopMenu('skills', themeConfig) && '/skills',
            label: t1('skills'),
          };
        }
        case 'blogs': {
          return {
            id: 'blog',
            href: hasShowTopMenu('blogs', themeConfig) && '/blog',
            label: t1('blogs'),
          };
        }
        case 'dashboard': {
          return {
            id: 'dashboard',
            href:
              hasShowTopMenu('dashboard', themeConfig) &&
              getDashboardUrl('home'),
            label: t1('student_dashboard'),
          };
        }
        case 'catalogue': {
          return {
            id: 'catalogue',
            href:
              hasShowTopMenu('catalogue', themeConfig) &&
              getCatalogueUrl('home'),
            label: t1('discover_courses'),
          };
        }
        case 'forum': {
          return {
            id: 'forum',
            href: getForumUrl(conf) || '#',
            label: t1('forum'),
            ...(getForumUrl(conf).startsWith('http')
              ? { target: '_blank' }
              : {}),
          };
        }
        case 'progress-reports': {
          // if (Perm.hasPerm('staff')) {
          return {
            id: 'progress-reports',
            href: '/progress-reports',
            label: t1('progress_reports'),
          };
          // }
          // else
          //   return menu;
        }
        case 'upcoming-contests': {
          return {
            id: 'upcoming-contests',
            href:
              hasShowTopMenu('upcoming-contests', themeConfig) &&
              getDashboardUrl('upcoming-contests'),
            label: t1('contest'),
          };
        }
        case 'survey': {
          return {
            id: 'survey',
            href: '/surveys',
            label: t1('list_of_surveys'),
          };
        }
        case 'temis': {
          return {
            id: 'temis',
            href: '/temis',
            label: t1('TEMIS'),
          };
        }
        case 'sessions': {
          return {
            id: 'sessions',
            href: '/sessions',
            label: t1('sessions'),
          };
        }
        case 'my-enrolment-plans': {
          return {
            id: 'my-enrolment-plans',
            href: getDashboardUrl('my-enrolment-plans'),
            label: t1('my_enrolment_plans'),
          };
        }
        default:
          return menu;
      }
    })
    .sort(
      (menu, anotherMenu) =>
        getWeightOfMenuToOrdering(menu) -
        getWeightOfMenuToOrdering(anotherMenu),
    );

  return menus;
};

export const getInfos = (schoolInfo) => [
  ...[
    schoolInfo.hotline
      ? {
          id: 'phone',
          href: window.isETEP ? '#' : `tel:${lGet(schoolInfo, 'hotline', '')}`,
          label: lGet(schoolInfo, 'hotline', ''),
          ...(window.isETEP ? {} : { icon: 'phone' }),
          antIcon: true,
        }
      : {},
  ],
  ...[
    schoolInfo.school_email
      ? {
          id: 'email',
          href: `mailto:${lGet(schoolInfo, 'school_email', '')}`,
          label: lGet(schoolInfo, 'school_email', ''),
          icon: 'mail',
          antIcon: true,
        }
      : [],
  ],
];

export const getReferenceLinks = () => [];
