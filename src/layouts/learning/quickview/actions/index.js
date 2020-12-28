export const ON_SHOW_QUICK_VIEW = 'ON_SHOW_QUICK_VIEW';

export function setShowQuickViewStatus(showQuickView) {
  return { type: ON_SHOW_QUICK_VIEW, showQuickView };
}
