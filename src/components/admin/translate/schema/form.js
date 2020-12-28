import { required } from 'common/validators';
import { t, t1 } from 'translate';
import { translateKeyConverter } from 'common/normalizers';

const status = [
  {
    value: 0,
    primaryText: t1('translated'),
  },
  {
    value: 1,
    primaryText: t1('not_translated'),
  },
];

const languages = [
  {
    value: 'en',
    primaryText: t('en_-_English'),
  },
  {
    value: 'vn',
    primaryText: t('vn_-_Vietnamese'),
  },
  {
    value: 'jp',
    primaryText: t('jp_-_Japanese'),
  },
];

const sites = [
  {
    value: 'core',
    primaryText: 'core - both sites',
  },
  {
    value: 'enterprise',
    primaryText: 'enterprise',
  },
  {
    value: 'sis',
    primaryText: 'sis - ums',
  },
];

const schema = () => ({
  name: {
    type: 'text',
    floatingLabelText: t1('key'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
    normalize: translateKeyConverter,
  },
  content: {
    type: 'text',
    floatingLabelText: t1('translate'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  language: {
    type: 'select',
    floatingLabelText: t1('language'),
    floatingLabelFixed: true,
    options: languages,
    fullWidth: true,
    defaultValue: 'vn',
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  status: {
    type: 'select',
    floatingLabelText: t1('status'),
    floatingLabelFixed: true,
    options: status,
    fullWidth: true,
    defaultValue: 0,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  site: {
    type: 'select',
    floatingLabelText: t1('site'),
    floatingLabelFixed: true,
    options: sites,
    fullWidth: true,
    defaultValue: 'core',
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
});

const ui = {
  new: [
    {
      id: 'default',
      title: t1('add_new_translate'),
      fields: ['name', 'content', 'language', 'site'],
    },
  ],
  edit: [
    {
      id: 'default',
      title: t1('edit_translate'),
      fields: ['name', 'content', 'language', 'site'],
    },
  ],
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
