export const initTawk = (appId) => {
  if (!window.Tawk_API) {
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    const s1 = document.createElement('script');
    const s0 = document.getElementsByTagName('script')[0];
    s1.async = true;
    s1.src = `https://embed.tawk.to/${appId}/default`;
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
  }
};

export const toggleTawk = () => {
  if (
    window.Tawk_API &&
    !window.Tawk_API.isChatHidden &&
    typeof window.Tawk_API.toggleVisibility === 'function'
  ) {
    window.Tawk_API.toggleVisibility();
  }
};

/**
 * show_tawkto: array ['admin', 'learn', 'contest']
 */
export const shouldShowTawk = (pathname, showTawkto) => {
  if (!Array.isArray(showTawkto)) {
    return false;
  }
  if (showTawkto.includes('admin') && pathname.indexOf('/admin') === 0)
    return true;

  if (showTawkto.includes('learn') && pathname.indexOf('/admin') === -1)
    return true;

  return false;
};
