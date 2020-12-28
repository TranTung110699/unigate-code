export const searchFormIdPrefix = 'search_ep_or_tp_members_';

export const getSearchFormId = (ep, tp) => {
  const iid = (ep && ep.iid) || (tp && tp.iid);
  return `${searchFormIdPrefix}${iid}`;
};
