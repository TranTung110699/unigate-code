import Loadable from 'react-loadable';
import Loading from 'components/common/loading';
import { LayoutRegistered } from './LayoutHelper';

// const Learning = Loadable({
//   loader: () =>
//     import(/* webpackChunkName: "learning-layout" */ 'layouts/learning/WebApp'),
//   loading: Loading,
// });
const Admin = Loadable({
  loader: () =>
    import(/* webpackChunkName: "admin-layout" */ 'layouts/admin_v2'),
  loading: Loading,
});
const VietEdTheme = Loadable({
  loader: () =>
    import(/* webpackChunkName: "vieted-layout" */ 'layouts/vieted-theme'),
  loading: Loading,
});
const LotusTheme = Loadable({
  loader: () =>
    import(/* webpackChunkName: "lotus-layout" */ 'layouts/lotus-theme'),
  loading: Loading,
});
const EtecTheme = Loadable({
  loader: () =>
    import(/* webpackChunkName: "etec-layout" */ 'layouts/etec-theme'),
  loading: Loading,
});
const XpeakTheme = Loadable({
  loader: () =>
    import(/* webpackChunkName: "xpeak-layout" */ 'layouts/xpeak-theme'),
  loading: Loading,
});
const GGGTheme = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ggg-layout" */ 'layouts/ggg-theme'),
  loading: Loading,
});
const PixelzTheme = Loadable({
  loader: () =>
    import(/* webpackChunkName: "pixelz-layout" */ 'layouts/pixelz-theme'),
  loading: Loading,
});
const Embedded = Loadable({
  loader: () =>
    import(/* webpackChunkName: "embedded-layout" */ 'layouts/embedded'),
  loading: Loading,
});
const UMSTheme = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ums-layout" */ 'layouts/ums-theme'),
  loading: Loading,
});
const EVNTheme = Loadable({
  loader: () =>
    import(/* webpackChunkName: "evn-layout" */ 'layouts/evn-theme'),
  loading: Loading,
});

const VTTheme = Loadable({
  loader: () => import(/* webpackChunkName: "vt-layout" */ 'layouts/vt-theme'),
  loading: Loading,
});

const CourseLearn = Loadable({
  loader: () =>
    import(/* webpackChunkName: "evn-layout" */ 'layouts/course-learn/'),
  loading: Loading,
});

const GJTheme = Loadable({
  loader: () => import(/* webpackChunkName: "gj-layout" */ 'layouts/gj-theme'),
  loading: Loading,
});

export default {
  [LayoutRegistered.embedded]: {
    component: Embedded,
  },
  // [LayoutRegistered.learning]: {
  //   component: Learning,
  // },
  [LayoutRegistered.admin]: {
    component: Admin,
  },
  [LayoutRegistered.vieted]: {
    component: VietEdTheme,
  },
  [LayoutRegistered.lotus]: {
    component: LotusTheme,
  },
  [LayoutRegistered.xpeak]: {
    component: XpeakTheme,
  },
  [LayoutRegistered.pixelz]: {
    component: PixelzTheme,
  },
  [LayoutRegistered.ggg]: {
    component: GGGTheme,
  },
  [LayoutRegistered.etec]: {
    component: EtecTheme,
  },
  [LayoutRegistered.ums]: {
    component: UMSTheme,
  },
  [LayoutRegistered.evn]: {
    component: EVNTheme,
  },
  [LayoutRegistered.learn]: {
    component: CourseLearn,
  },
  [LayoutRegistered.vt]: {
    component: VTTheme,
  },
  // [LayoutRegistered.mobile]: {
  //   component: MobileTheme,
  // },
  [LayoutRegistered.gj]: {
    component: GJTheme,
  },
};
