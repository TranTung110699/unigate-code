// export const decorateUiForCompactSearch = (ui, advanceSearchTicked) => {
//   ui.forEach((grp, idx) => {
//     if (ui[idx].hiddenWhenCompact) {
//       ui[idx].wrapperClass = advanceSearchTicked ? '' : 'display-none';
//     }
//   });
//
//   return ui;
// };

/**
 * Schema is an array of group, where each element containing not just the original groups metadata
 * but also the React Element which is what each group will become when rendered
 *
 * We still need groupsMetadata and pass it to ViewRenderer or FormLayout so they sometimes can be more intelligent
 * rendering the view
 *
 * @param schema
 * @returns {*}
 */
export const extractGroupsMetadata = (schema) => {
  return schema.map((group) => ({
    id: group.id,
    title: group.title,
    subTitle: group.subTitle,
    wrapperClass: group.wrapperClass,
    hiddenWhenCompact: group.hiddenWhenCompact,
  }));
};
