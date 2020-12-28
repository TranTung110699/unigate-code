import React from 'react';
import {
  categoryRelationTypes,
  levelSocialFunctionGroups,
} from 'configs/constants';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import WarningAddStudentToScholarship from '../warningAddStudentToScholarship';

const schema = (props) => {
  const {
    group,
    userIids,
    users,
    semesterIids,
    // mode,
  } = props;

  return {
    school_year_and_semester: {
      type: 'cascade',
      schema: getMajorBoxSchema({
        displayFields: ['school_year', 'semester'],
        multiple: true,
      }),
    },
    warning: {
      type: 'cascade',
      component: (
        <WarningAddStudentToScholarship
          group={group}
          userIids={userIids}
          users={users}
          semesterIids={semesterIids}
        />
      ),
    },
  };
};

const ui = (props) => {
  const { group } = props;

  const fields = [];
  if (
    !group.semester &&
    (group.level === levelSocialFunctionGroups.SEMESTER ||
      group.type === categoryRelationTypes.SCHOLARSHIP_CATEGORY)
  )
    fields.push('school_year_and_semester');
  if (group && group.type === categoryRelationTypes.SCHOLARSHIP_CATEGORY)
    fields.push('warning');

  return [
    {
      fields,
      id: 'abc',
    },
  ];
};

const buildSchema = (props) => ({
  schema: schema(props),
  ui: () => ui(props),
  layout: {},
});

export default buildSchema;
