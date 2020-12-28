export const shouldShowAdd = (action, subAction) =>
  (action === 'members' && subAction === 'new') || action === 'pending_members';
export const shouldShowRemove = (action, subAction) =>
  (action === 'members' && subAction !== 'new') ||
  action === 'redundant_members';
