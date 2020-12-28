import React from 'react';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';

/**
 * Button that user click when they want to delete user time sheet
 */
const DeleteTimeSheetButtonForSpecializedWork = ({
  className,
  node,
  searchFormId,
}) => (
  <DeleteItem
    className={className}
    textConfirm={t1('do_you_want_to_remove_this_time_sheet?')}
    title={t1('remove')}
    ntype={'time_sheet'}
    itemId={lodashGet(node, 'id')}
    formid={searchFormId}
  />
);

export default DeleteTimeSheetButtonForSpecializedWork;
