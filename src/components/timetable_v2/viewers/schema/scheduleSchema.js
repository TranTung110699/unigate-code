import React from 'react';
import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import DatePicker from 'schema-form/elements/date-picker';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const schema = (formid, values, step, xpath, props) => ({
  major: {
    type: 'cascade',
    schema: getMajorBoxSchema({
      displayFields: [
        'school_year',
        'semester',
        'faculty',
        'major',
        'training_mode',
        'training_level',
        'ico',
      ],
      classWrapper: 'col-xs-3',
      notValidate: true,
      forSearch: true,
    }),
  },
  credit_syllabus: {
    type: 'text',
    hintText: t1('search_subject_name_or_iid_or_code'),
    floatingLabelText: t1('search_subject_name_or_iid_or_code'),
    classWrapper: 'col-md-6 m-t-10',
    fullWidth: true,
  },
  start_date: {
    type: DatePicker,
    classWrapper: 'col-md-4',
    floatingLabelText: t1('from_date'),
    container: 'inline',
  },
  end_date: {
    type: DatePicker,
    classWrapper: 'col-md-4',
    floatingLabelText: t1('to_date'),
    container: 'inline',
  },
  teacher: {
    type: InputAutoComplete,
    nameElement: 'teacher',
    baseUrl: apiUrls.user_search,
    params: {
      _sand_step: 'staff',
    },
    dataSourceConfig: {
      text: 'name',
      value: 'iid',
    },
    floatingLabelText: t1('find_teacher'),
    classWrapper: 'col-md-6',
    fullWidth: true,
  },
  semester: {
    type: 'select',
    floatingLabelText: t1('semester'),
    options: 'async',
    populateValue: true,
    hiddenWhenOptionEmpty: true,
    paramsasync: {
      __url__: '/timetable-v2/get-semesters',
      transformData: (semesters) => {
        if (!Array.isArray(semesters) || !semesters.length) {
          return [];
        }
        return semesters.map((row) => {
          const label = `${row.name} - ${row.code}`;
          return {
            value: row.iid,
            label,
            primaryText: label,
          };
        });
      },
    },
    fullWidth: true,
  },
});

const getUi = ({ userIid }) => {
  if (userIid) {
    return [
      {
        id: 'default',
        fields: ['semester'],
      },
    ];
  }

  const defaultGroup = {
    id: 'default',
    fields: ['major', 'credit_syllabus', 'teacher'],
  };

  return [defaultGroup];
};

export default (userIid) => ({
  schema,
  ui: (step, values, themeConfig, xpath, formid) =>
    getUi({ step, values, themeConfig, xpath, formid, userIid }),
});
