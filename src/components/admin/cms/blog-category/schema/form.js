import { slugifier } from 'common/normalizers';
import { t1 } from 'translate';
import Attachments from 'schema-form/elements/attachments';

const schema = (formid) => ({
  name: {
    type: 'text',
    hintText: t1('typing_name_of_blog_category'),
    floatingLabelText: t1('blog_category_name'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  code: {
    type: 'text',
    hintText: t1('typing_code_of_blog_category'),
    floatingLabelText: t1('blog_category_code'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    normalize: slugifier,
  },
  pid: {
    type: 'select',
    floatingLabelText: t1('parent_category'),
    floatingLabelFixed: true,
    options: 'async',
    fullWidth: true,
  },
  avatar: {
    type: Attachments,
    allowDownload: true,
    multiple: true,
    fullWidth: true,
  },
  slug: {
    type: 'text',
    hintText: t1('typing_slug_of_blog_category'),
    floatingLabelText: t1('blog_category_slug'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    normalize: slugifier,
  },
});

const ui = {
  new: [
    {
      id: 'default',
      title: t1('add_new_blog_category'),
      fields: ['name', 'code', 'pid', 'avatar'],
    },
  ],
  edit_blog: [
    {
      id: 'default',
      title: t1('edit_blog_category'),
      fields: ['name', 'slug', 'pid', 'avatar'],
    },
  ],
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
