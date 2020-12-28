import React from 'react';
import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import lodashGet from 'lodash.get';
import { required } from 'common/validators';
import prerequisitesSchema from 'components/admin/syllabus/schema/prerequisites/form';
import AddTheItemInPrerequisites from './prerequisites/searchSubject';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const prerequisitesElement = (values) => ({
  type: 'array',
  depth: 2,
  schema: prerequisitesSchema,
  labelConfigs: [
    {
      addButtonLabel: t1("add_'or'_condition"),
    },
    {
      renderButtonAdd: (fields, xpath) => {
        const andCoditions = lodashGet(values, xpath, []);
        const subjectSelected = andCoditions
          .map((map) => map && map.item)
          .filter(Boolean);
        return (
          <AddTheItemInPrerequisites
            addItemsSelected={(item) => fields && fields.push({ item })}
            itemsSelected={subjectSelected}
          />
        );
      },
      addButtonLabel: t1("add_'and'_condition"),
      contextLabel: t1('prerequisites'),
    },
  ],
  classWrapper: 'col-md-12',
});

const finalProcessBeforeSubmit = (fullData) => {
  let { syllabus, prerequisites } = fullData;
  syllabus = Array.isArray(syllabus) ? syllabus[0] : syllabus;

  prerequisites =
    Array.isArray(prerequisites) &&
    prerequisites.map(
      (orCondition) =>
        Array.isArray(orCondition) &&
        orCondition.map((andCondition) => {
          const { item, type, min, max } = andCondition || {};
          return {
            subject: item && item.iid,
            type,
            min,
            max,
          };
        }),
    );
  return { ...fullData, syllabus, prerequisites };
};

export const schemaEditPrerequisitesOfCreditSyllabus = {
  schema: (formid, values) => ({
    prerequisites: prerequisitesElement(values),
  }),
  ui: () => [
    {
      id: 'default',
      fields: ['prerequisites'],
    },
  ],
  finalProcessBeforeSubmit,
};

const schemaApplyCreditSyllabusPrerequisitesInProgram = (hiddenFields) => ({
  schema: (formid, values) => ({
    prerequisites: prerequisitesElement(values),
    syllabus: {
      type: InputAutoComplete,
      limit: 1,
      baseUrl: apiUrls.get_credit_syllabuses_to_prerequisites_create_in_program,
      floatingLabelText: t1('subject'),
      fullWidth: true,
      fieldSearch: 'name',
      dataSourceConfig: {
        text: 'name',
        value: 'iid',
        transformData: (res) =>
          res.map((creditSyllabus) => ({
            name: `${creditSyllabus.name}-${creditSyllabus.code}`,
            iid: creditSyllabus.iid,
          })),
      },
      params: hiddenFields,
      validate: [required(t1('subject_cannot_be_empty'))],
    },
  }),
  ui: () => [
    {
      id: 'default',
      fields: ['syllabus'],
    },
    {
      id: 'prerequisites',
      fields: ['prerequisites'],
    },
  ],
  finalProcessBeforeSubmit,
});
export default schemaApplyCreditSyllabusPrerequisitesInProgram;
