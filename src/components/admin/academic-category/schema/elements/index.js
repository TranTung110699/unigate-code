import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import TreeSelectV2 from 'schema-form/elements/tree-select-v2';
import { ACADEMIC_CATEGORY } from 'configs/constants';

const userAcademicSchemaFormKeyState = (formid) =>
  `${formid}_user_academic_iids`;

export const academicCategories = (
  formid,
  {
    label,
    hintText,
    multiple = true,
    fullWidth = true,
    checkParentEqualCheckAllChildren = false,
    validate,
    readOnly,
    defaultValue,
    allowClear,
    dropdownStyle,
  } = {},
) => {
  let defaultLabel = '';
  if (!multiple) {
    defaultLabel = t1('academic_category');
  } else {
    defaultLabel = t1('academic_categories');
  }

  label = label || defaultLabel;
  hintText = hintText || t1('please_select');

  return {
    type: TreeSelectV2,
    label,
    hintText,
    fullWidth,
    multiple,
    checkParentEqualCheckAllChildren,
    validate,
    readOnly,
    defaultValue,
    allowClear,
    params: {
      view: 'tree',
      depth: -1,
    },
    mapResultToTreeData: {
      key: 'iid',
      title: 'name',
      value: 'iid',
    },
    mapTreeDataToText: 'title',
    baseUrl: apiUrls.academic_category_search,
    keyState: userAcademicSchemaFormKeyState(formid),
    elementType: ACADEMIC_CATEGORY,
    dropdownStyle,
  };
};

// ===== OLD LOGIC ============================
// export const academicCategories = (formid, configs) => {
//   const defaultMultiSelectable = true;
//   const defaultMultiSelectableLimit = Infinity;
//
//   const multiSelectable = lodashGet(
//     configs,
//     'treeProps.multiSelectable',
//     defaultMultiSelectable,
//   );
//   const multiSelectableLimit = lodashGet(
//     configs,
//     'treeProps.multiSelectableLimit',
//     defaultMultiSelectableLimit,
//   );
//
//   let defaultLabel = '';
//   if (!multiSelectable) {
//     defaultLabel = t1('academic');
//   } else if (multiSelectableLimit !== Infinity) {
//     defaultLabel = t1(
//       `academics_(select_up_to_${multiSelectableLimit}_choices)`,
//     );
//   } else {
//     defaultLabel = t1('academics');
//   }
//
//   return {
//     type: 'treeSelect',
//     nameElement: 'academic_categories',
//     componentElementEditor: CommonSelection,
//     optionsProperties: {
//       style: {
//         maxHeight: '128px',
//         overflowY: 'auto',
//       },
//     },
//     fullWidth: true,
//     fullWidthInput: true,
//     hintText: defaultLabel,
//     params: {
//       view: 'tree',
//       depth: -1,
//     },
//     mapResultToTreeData: {
//       key: 'iid',
//       title: 'name',
//       value: 'iid',
//     },
//     mapTreeDataToText: 'title',
//     baseUrl: apiUrls.academic_category_search,
//     keyState: userAcademicSchemaFormKeyState(formid),
//     treeProps: {
//       noFetchDataResultText: t1('not_found_academic'),
//     },
//     floatingLabelText: `${t1('academics')} (*)`,
//     noFetchDataResultText: t1('can_not_found_academics'),
//     ...(configs || {}),
//   };
// };
