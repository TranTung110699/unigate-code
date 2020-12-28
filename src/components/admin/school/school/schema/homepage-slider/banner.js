import { t1 } from 'translate';
import InputFile from 'schema-form/elements/input-file';
import get from 'lodash.get';
// import { required } from 'common/validators';

const schema = () => ({
  title: {
    type: 'text',
    hintText: t1('title'),
    floatingLabelText: t1('title'),
    defaultValue: '',
    fullWidth: true,
  },
  subtitle: {
    type: 'text',
    hintText: t1('subtitle'),
    floatingLabelText: t1('subtitle'),
    defaultValue: '',
    fullWidth: true,
  },
  avatar: {
    type: InputFile,
    hintText: t1('avatar'),
    floatingLabelText: t1('avatar'),
    defaultValue: '',
    fullWidth: true,
    // validate: [required(t1('avatar_cannot_be_empty'))],
  },
  mobile_avatar: {
    type: InputFile,
    hintText: t1('mobile_avatar'),
    floatingLabelText: t1('mobile_avatar'),
    defaultValue: '',
    fullWidth: true,
  },
  url_type: {
    type: 'radio',
    fullWidth: true,
    inline: true,
    floatingLabelText: t1('url_type'),
    options: [
      { value: 'none', label: t1('none') },
      { value: 'url', label: t1('url') },
      { value: 'package', label: t1('package') },
    ],
    defaultValue: 'none',
  },
  url: {
    type: 'text',
    hintText: t1('link_url'),
    floatingLabelText: t1('link_url'),
    defaultValue: '',
    fullWidth: true,
  },
});

const ui = (step, values, themeConfig, xpath, formid, props) => [
  {
    id: 'homepage_slider_banner',
    fields: [
      'title',
      'subtitle',
      'avatar',
      'mobile_avatar',
      'url_type',
      ...(get(values, `${xpath}.url_type`) === 'url' ? ['url'] : []),
    ],
  },
];

export default { schema, ui };
