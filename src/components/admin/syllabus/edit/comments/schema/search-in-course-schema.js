import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import commentApiUrls from 'components/common/comment/endpoints';
import { convertBooleanValueToInt } from 'common/normalizers';

const schema = () => ({
  q: {
    type: 'text',
    floatingLabelText: t1('search_query'),
    floatingLabelFixed: false,
    fullWidth: true,
    label: t1('search_query'),
    hintText: t1('search_query'),
  },
  role: {
    name: 'role',
    type: 'multiCheckbox',
    inline: true,
    floatingLabelText: t1('collaborator'),
    options: [
      {
        name: 'student',
        value: 'student',
        label: t1('student'),
        primaryText: t1('student'),
      },
      {
        name: 'teacher',
        value: 'teacher',
        label: t1('teacher'),
        primaryText: t1('teacher'),
      },
    ],
    defaultValue: ['student', 'teacher'],
  },
  search_entire_syllabus: {
    type: 'checkbox',
    label: t1('search_entire_syllabus'),
    defaultValue: 0,
    normalize: convertBooleanValueToInt,
  },
  comment_type: {
    type: 'select',
    floatingLabelText: t1('comment_types'),
    errorText: `${t1('loading')}....`,
    floatingLabelFixed: true,
    options: 'async',
    paramsasync: {
      __url__: commentApiUrls.get_all_comment_types,
      transformData: (data) => {
        if (!Array.isArray(data) || !data.length) {
          return [];
        }

        return [
          {
            value: '',
            label: t1('all'),
            primaryText: t1('all'),
          },
        ]
          .concat(data)
          .map((row) => ({
            value: row.value,
            label: t1(row.label),
            primaryText: t1(row.name),
          }));
      },
    },
    defaultValue: '',
    classWrapper: 'col-md-6',
  },
});

const ui = (step, values, themeConfig, xpath, formid, props) => {
  // // search within  a course
  // if (props.course && props.course.iid) {
  //   return [
  //     {
  //       id: 'filter_comment',
  //       fields: [
  //         'q',
  //         'search_entire_syllabus',
  //       ],
  //     },
  //   ]
  // }

  // search a course
  return [
    {
      id: 'filter_comment',
      fields: ['q', 'role', 'comment_type'],
    },
  ];
};

export default {
  schema,
  ui,
  // layout: {
  //   component: FormFreeStyle,
  //   freestyle: 1,
  // },
};
