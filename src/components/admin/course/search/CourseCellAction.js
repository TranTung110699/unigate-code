import React from 'react';
import { t1 } from 'translate';
import Links from 'routes/links';
import routes from 'routes';
import { courseLearningTypes } from 'configs/constants';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import { Link } from 'react-router-dom';
import DeepClone from 'components/admin/node/bank/DeepClone';
import Icon from 'components/common/Icon';
import { isOfflineExam } from 'common/learn';
import { getUrl } from 'routes/links/common';

const label = {
  preview: t1('preview'),
  delete: t1('delete'),
  edit: t1('edit'),
};

export default ({
  item,
  ntypesDeepCloneEnable,
  formid,
  onEdit,
  deepCloneSuccessFul,
  hasPermissionUpdate,
  hasPermissionDelete,
}) => (
  <div style={{ fontSize: '120%' }}>
    {ntypesDeepCloneEnable &&
      hasPermissionUpdate &&
      ntypesDeepCloneEnable.includes(item && item.ntype) && (
        <DeepClone
          node={item}
          className="button-clone"
          title={t1('deepclone')}
          iconButton
          deepCloneSuccessFul={deepCloneSuccessFul}
        />
      )}{' '}
    {hasPermissionUpdate && (
      <Link
        to={
          onEdit
            ? '#'
            : routes.url('node_edit', {
                ...item,
                step: 'dashboard',
              })
        }
        onClick={onEdit}
      >
        <Icon icon={'edit'} title={label.edit} />
      </Link>
    )}{' '}
    <Link
      to={
        isOfflineExam(item)
          ? getUrl('overview_timetable_course', item)
          : Links.overViewCourse(item, true)
      }
      target="_blank"
    >
      <Icon title={label.preview} icon={'preview'} />
    </Link>{' '}
    {hasPermissionDelete && (
      <DeleteItem
        title={label.delete}
        textComfirm={label.textConfirm}
        formid={formid}
        ntype={item.ntype}
        itemId={item.id}
        iconButton
      />
    )}
    {item &&
      (item.learning_type === courseLearningTypes.ILT || isOfflineExam(item)) &&
      hasPermissionUpdate && [
        <Link
          to={routes.url('node_edit', {
            ...item,
            step: 'timetable',
          })}
        >
          <Icon icon="timetable" title={t1('timetable')} />
        </Link>,
        ' ',
      ]}
  </div>
);
