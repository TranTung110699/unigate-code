/**
 * Không được thay đổi các event trong phần này
 * @type {{ViewContent: string, Search: string, AddToCart: string, AddToWishlist: string, InitiateCheckout: string, AddPaymentInfo: string, Purchase: string, Lead: string, CompleteRegistration: string}}
 */
export const facebookEvent = {
  ViewContent: 'ViewContent',
  Search: 'Search',
  AddToCart: 'AddToCart',
  AddToWishlist: 'AddToWishlist',
  InitiateCheckout: 'InitiateCheckout',
  AddPaymentInfo: 'AddPaymentInfo',
  Purchase: 'Purchase',
  Lead: 'Lead',
  CompleteRegistration: 'CompleteRegistration',
};
/**
 * Phần này anh em defined các event cho phù hợp
 * @type {{ViewCourseList: string, ViewCourseOutline: string, LearnCourse: string, ViewDanTriSCO: string}}
 */
export const facebookCustomEvent = {
  ViewCourseList: 'ViewCourseList',
  ViewCourseOutline: 'ViewCourseOutline',
  LearnCourse: 'LearnCourse',
  ViewDanTriSCO: 'ViewDanTriSCO',
};

export const trackEventForFacebook = (event, params) => {
  if (window && window.fbq) {
    window.fbq('track', event, params);
  }
};

export const trackCustomEventForFacebook = (event, params) => {
  if (window && window.fbq) {
    window.fbq('trackCustom', event, params);
  }
};

export const trackUserViewCourseList = (params) => {
  trackCustomEventForFacebook(facebookCustomEvent.ViewCourseList, params);
};

export const trackUserViewCourseOutline = (params) => {
  trackCustomEventForFacebook(facebookCustomEvent.ViewCourseOutline, params);
};

export const trackUserLearnCourse = (params) => {
  trackCustomEventForFacebook(facebookCustomEvent.LearnCourse, params);
};

export const trackUserViewDanTriSCO = (params) => {
  trackCustomEventForFacebook(facebookCustomEvent.ViewDanTriSCO, params);
};
