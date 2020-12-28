import { blogTypes, constants, schoolTypes } from 'configs/constants';
import { required } from 'common/validators';
import { t1, t3 } from 'translate';
import { convertBooleanValueToInt, slugifier } from 'common/normalizers';
import apiUrls from 'api-endpoints';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import get from 'lodash.get';
import Attachments from 'schema-form/elements/attachments';
import InputToken from 'schema-form/elements/input-token';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';
import RTE from 'schema-form/elements/richtext';

const schema = () => ({
  featured: {
    type: 'checkbox',
    label: t1('is_featured'),
    normalize: convertBooleanValueToInt,
  },
  name: {
    type: 'text',
    floatingLabelText: t1('page_title'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  blog_type: {
    type: 'select',
    floatingLabelText: t1('blog_type'),
    floatingLabelFixed: true,
    options: constants.BlogTypeOptions(),
    fullWidth: true,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  category: {
    type: 'multiCheckbox',
    floatingLabelText: t1('blog_category'),
    defaultValue: '0',
    errorText: t1('loading_blog_category_list_from_server'),
    options: 'async',
    vertical: true,
    fullWidth: true,
  },
  events: {
    nameElement: 'events',
    type: InputAutoComplete,
    baseUrl: apiUrls.event_search,
    floatingLabelText: t1('choose_events'),
    fullWidth: true,
    dataSourceConfig: {
      text: 'key',
      value: 'data',
      transformData: 'name',
    },
  },
  medias: {
    type: Attachments,
    allowDownload: true,
    multiple: true,
    fullWidth: true,
  },
  slug: {
    type: 'text',
    floatingLabelText: t1('slug'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    normalize: slugifier,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  summary: {
    type: 'text',
    hintText: t1('summary'),
    floatingLabelText: t1('enter_summary'),
    defaultValue: '',
    errorText: '',
    multiLine: true,
    rows: 4,
    fullWidth: true,
  },
  content: {
    type: RTE,
    hintText: t1('content'),
    floatingLabelText: t1('enter_content'),
    defaultValue: '',
    errorText: '',
    multiLine: true,
    rows: 4,
    fullWidth: true,
  },
  tags: {
    type: InputToken,
    floatingLabelText: t1('tags'),
    fullWidth: true,
  },
  youtube_video_name: {
    type: 'text',
    floatingLabelText: t1('youtube_video_name'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  youtube_video_id: {
    type: 'youtubeUrl',
    floatingLabelText: t1('youtube_url'),
    fullWidth: true,
  },
  seo: {
    type: 'seo',
  },
  url: {
    type: 'text',
    floatingLabelText: t3('url'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  form_of_training: {
    type: 'cascade',
    schema: getMajorBoxSchema({
      displayFields: [
        'faculty',
        'major',
        'training_mode',
        'training_level',
        'ico',
      ],
    }),
  },
});

const ui = (step, values, themeConfig) => {
  const eventFields =
    values && values.blog_type && values.blog_type === blogTypes.EVENT
      ? ['events']
      : [];

  const sisFields =
    get(themeConfig, 'type') === schoolTypes.SIS ? ['form_of_training'] : [];

  const configs = {
    new: [
      {
        id: 'default',
        title: t1('add_new_page'),
        fields: [
          ...sisFields,
          'name',
          'blog_type',
          'featured',
          'summary',
          'content',
          'category',
          'tags',
          'slug',
          'url',
          ...eventFields,
          'medias',
          'youtube_video_name',
          'youtube_video_id',
          'seo',
        ],
      },
    ],
    edit: [
      {
        id: 'default',
        title: t1('edit_page'),
        fields: [
          ...sisFields,
          'featured',
          'name',
          'blog_type',
          'category',
          ...eventFields,
          'slug',
          'summary',
          'content',
          'medias',
          'tags',
          'youtube_video_name',
          'youtube_video_id',
          'seo',
          'url',
        ],
      },
    ],
  };
  return configs[step];
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
