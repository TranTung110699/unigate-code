import { t1 } from 'translate';
import { schoolTypes } from 'configs/constants';

const detectColumns = (type, displayType, shouldDeepCloneItem, themeConfig) => {
  const columns = [{ key: 'code', name: t1('code'), title: t1('code') }];

  switch (type) {
    case 'credit':
      columns.push({ key: 'name', name: t1('name'), title: t1('name') });
      columns.push({
        key: 'total_hours',
        name: t1('total_hours'),
        title: t1('total_hours'),
      });

      if (themeConfig && themeConfig.type === schoolTypes.SIS) {
        columns.push({
          key: 'total_credit',
          name: t1('total_credit'),
          title: t1('total_credit'),
        });
      } else {
        columns.push({
          key: 'online_only',
          name: t1('online_only'),
          title: t1('online_only'),
        });
      }
      break;
    case 'program':
      columns.push({ key: 'name', name: t1('name'), title: t1('name') });
      if (themeConfig && themeConfig.type === schoolTypes.SIS) {
        columns.push({
          key: 'total_credit',
          name: t1('total_credit'),
          title: t1('total_credit'),
        });
      }
      break;
    case 'plan':
      columns.push({ key: 'name', name: t1('name'), title: t1('name') });
      columns.push({ key: 'ico', name: t1('ico'), title: t1('ico') });
      columns.push({
        key: 'program',
        name: t1('program'),
        title: t1('program'),
      });
      break;
    case 'syllabus':
      // columns.push({ key: 'code', name: t1('code'), title: t1('code') });
      columns.push({ key: 'name', name: t1('name'), title: t1('name') });
      break;
    case 'course':
      columns.push({ key: 'slug', name: t1('slug'), title: t1('slug') });
      columns.push({ key: 'name', name: t1('name'), title: t1('name') });
      break;
    case 'exercise':
    case 'video':
      columns.push({ key: 'type', name: t1('type'), title: t1('type') });
      columns.push({ key: 'slug', name: t1('slug'), title: t1('slug') });
      columns.push({ key: 'name', name: t1('name'), title: t1('name') });
      break;
    case 'vocabset':
      columns.push({ key: 'slug', name: t1('slug'), title: t1('slug') });
      columns.push({ key: 'name', name: t1('name'), title: t1('name') });
      columns.push({
        key: 'description',
        name: t1('description'),
        title: t1('description'),
      });
      break;
    case 'question':
      columns.push({ key: 'type', name: t1('type'), title: t1('type') });
      columns.push({
        key: 'content',
        name: t1('content'),
        title: t1('content'),
      });
      columns.push({ key: 'tags', name: t1('tags'), title: t1('tags') });

      columns.push({
        key: 'organizations',
        name: t1('organizations'),
        title: t1('organizations'),
      });
      columns.push({
        key: 'positions',
        name: t1('positions'),
        title: t1('positions'),
      });
      columns.push({
        key: 'difficulty',
        name: t1('difficulty'),
        title: t1('difficulty'),
      });
      columns.push({
        key: 'skills',
        name: t1('skills'),
        title: t1('skills'),
      });

      columns.push({
        key: 'author',
        name: t1('author'),
        title: t1('author'),
      });
      break;
    case 'vocab':
      columns.push({ key: 'name', name: t1('name'), title: t1('name') });
      columns.push({
        key: 'vname',
        name: t1('vname'),
        title: t1('vname'),
      });
      break;
    default:
      columns.push({ key: 'name', name: t1('name'), title: t1('name') });
      break;
  }
  if (displayType !== 'view_bank') {
    columns.push({
      key: 'add',
      name: t1('add'),
      title: t1('add_item_to_the_list'),
      // width: '30px'
    });

    if (shouldDeepCloneItem)
      columns.push({
        key: 'clone',
        name: t1('clone'),
        title: t1('will_clone_this_item_to_a_new_item_and_add_it_to_the_list'),
        // width: '10px',
      });
  } else
    columns.push({
      key: 'delete',
      name: t1('delete'),
      title: t1('delete_this_item'),
      // width: '10px',
    });
  columns.push({
    title: t1('preview'),
    key: 'preview',
    name: t1('preview'),
  });

  return columns;
};

export default detectColumns;
