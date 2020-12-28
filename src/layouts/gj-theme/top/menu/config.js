import { t1 } from 'translate';
import Perm from 'common/utils/Perm';
import lClone from 'lodash.clone';
import lGet from 'lodash.get';
import { hasShowTopMenu } from 'layouts/common';
import {
  getCatalogueUrl,
  getDashboardUrl,
  getProfileUrl,
} from 'routes/links/common';
import { getForumUrl } from 'common/conf';
import imageIcon from './images';
import { buyPackageUrl } from '../../../../routes/root-url';
import { websiteUrl } from '../../../../configs/constants';

const orderOfMenus = [
  'home',
  'courses',
  'dashboard',
  'faq',
  'buy-course',
  'blog',
  'catalogue',
  'upcoming-contests',
  'my-enrolment-plans',
  'skills',
  'forum',
  'progress-reports',
  'public-courses',
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
    /*const index = menus.indexOf('dashboard');
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
    ]);*/
  } else {
    menus = menus.concat(
      {
        id: 'profile',
        href: getProfileUrl('update-info'),
        label: t1('profile'),
      },
      // {
      //   id: 'logout',
      //   href: '#',
      //   label: t1('logout'),
      //   action: logoutAction,
      // },
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

  menus = menus.map((menu) => {
    switch (menu) {
      case 'home': {
        return {
          id: 'home',
          href: websiteUrl,
          icon: {
            antIcon: true,
            image: imageIcon.home,
          },
          target: '_blank',
        };
      }
      case 'faq': {
        return {
          id: 'faq',
          href: hasShowTopMenu('faq', themeConfig) && '/faq',
          label: t1('faq'),
          icon: {
            antIcon: true,
            image: imageIcon.faq,
          },
        };
      }
      case 'skills': {
        return {
          id: 'skills',
          href: hasShowTopMenu('skills', themeConfig) && '/skills',
          label: t1('skills'),
          icon: {
            type: 'bars',
            antIcon: true,
          },
        };
      }
      case 'blogs': {
        return {
          id: 'blog',
          href: hasShowTopMenu('blogs', themeConfig) && '/blog',
          label: t1('blogs'),
          icon: {
            type: 'file',
            antIcon: true,
          },
        };
      }
      case 'dashboard': {
        if (!Perm.isGuest()) {
          return {
            id: 'dashboard',
            href:
              hasShowTopMenu('dashboard', themeConfig) &&
              getDashboardUrl('home'),
            label: t1('student_dashboard'),
            icon: {
              antIcon: true,
              image: imageIcon.dashboard,
            },
          };
        }
        return {};
      }
      case 'catalogue': {
        return {
          id: 'catalogue',
          href:
            hasShowTopMenu('catalogue', themeConfig) && getCatalogueUrl('home'),
          label: t1('discover_courses'),
          icon: {
            type: 'tags',
            antIcon: true,
          },
        };
      }
      case 'forum': {
        return {
          id: 'forum',
          href: getForumUrl(conf) || '#',
          label: t1('forum'),
          ...(getForumUrl(conf).startsWith('http') ? { target: '_blank' } : {}),
          icon: {
            type: 'usergroup-add',
            antIcon: true,
          },
        };
      }
      case 'progress-reports': {
        // if (Perm.hasPerm('staff')) {
        return {
          id: 'progress-reports',
          href: '/progress-reports',
          label: t1('progress_reports'),
          icon: {
            type: 'bar-chart',
            antIcon: true,
          },
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
          icon: {
            image: imageIcon.testing,
            antIcon: true,
          },
        };
      }
      case 'survey': {
        return {
          id: 'survey',
          href: '/global-survey',
          label: t1('take_global_survey'),
          icon: {
            type: 'pie-chart',
            antIcon: true,
          },
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
          icon: {
            type: 'schedule',
            antIcon: true,
          },
        };
      }
      case 'courses': {
        return {
          id: 'courses',
          href: getDashboardUrl('courses'),
          label: t1('home'),
          icon: {
            antIcon: true,
            image: imageIcon.course,
          },
        };
      }
      case 'buy-course': {
        return {
          id: 'buy-course',
          href: buyPackageUrl,
          label: t1('buy_course'),
          icon: {
            antIcon: true,
            image: imageIcon.buyCourse,
          },
        };
      }
      default:
        return menu;
    }
  });

  return menus.sort(
    (menu, anotherMenu) =>
      getWeightOfMenuToOrdering(menu) - getWeightOfMenuToOrdering(anotherMenu),
  );
};

export const getInfos = (schoolInfo) => [
  ...[
    schoolInfo.hotline
      ? {
          id: 'phone',
          href: `tel:${lGet(schoolInfo, 'hotline', '')}`,
          label: lGet(schoolInfo, 'hotline', ''),
          icon: 'phone',
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
