export const iconBySubtype = (ntype, subType) =>
  subType ? `${ntype}-${subType}` : ntype;

const nodeIcon = (row) => {
  if (row.ntype === 'sco') {
    return iconBySubtype(row.ntype, row.tpl_type);
  } else if (row.ntype === 'exercise') {
    const subtype = row.speaking_type || row.type;
    return iconBySubtype(row.ntype, subtype);
  }
  return iconBySubtype(row.ntype, row.type);
};

export default nodeIcon;
