import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import { convertBooleanValueToInt } from 'common/normalizers';
import lodashGet from 'lodash.get';

const schema = () => ({
  q: {
    type: 'text',
    floatingLabelText: t1('search_query'),
    floatingLabelFixed: false,
    fullWidth: true,
    label: t1('search_query'),
    hintText: t1('search_query'),
  },
  get_my_comments: {
    type: 'checkbox',
    // floatingLabelText: t1('my_comments_only'),
    label: t1('my_comments_only'),
    floatingLabelFixed: false,
    fullWidth: true,
  },
});

const ui = (step, values, themeConfig, xpath, formid, props) => {
  // search a course
  return [
    {
      id: 'filter_comment',
      fields: ['q', 'get_my_comments'],
    },
  ];
};

export default {
  schema,
  ui,
};
