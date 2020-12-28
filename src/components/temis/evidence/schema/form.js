import contentSchema from 'components/temis/evidence/schema/content';
import { t1 } from 'translate';
import { required } from 'common/validators';
import { slugifier } from 'common/normalizers';
import attachToAssessmentsSchema from 'components/temis/evidence/schema/attachToAssessment';

const schema = (formid, values, step) => {
  return {
    non_unique_code: {
      type: 'text',
      floatingLabelText: t1('assessment_evidence_code'),
      validate: [required(t1('code_cannot_be_empty'))],
      fullWidth: true,
      normalize: slugifier,
      readOnly: true,
    },
    name: {
      type: 'text',
      floatingLabelText: t1('assessment_evidence_name'),
      validate: [required(t1('name_cannot_be_empty'))],
      defaultValue: '',
      fullWidth: true,
    },
    description: {
      type: 'text',
      floatingLabelText: t1('assessment_evidence_description'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    content: {
      type: 'section',
      schema: contentSchema,
    },
    attach_to_assessments: {
      type: 'array',
      schema: attachToAssessmentsSchema({
        getOnlyAssessmentThatUserCanDo: true,
      }),
      defaultValue:
        step === 'new_do_assessment'
          ? [
              {
                rubric_iid: values.assessmentRubricIid,
                tieu_chuan_iid: values.tieuChuanIid,
                tieu_chi_iid: values.tieuChiIid,
              },
            ]
          : [{}],
      readOnly: step === 'new_do_assessment',
    },
  };
};

const ui = (step) => {
  switch (step) {
    case 'new':
    case 'edit': {
      return [
        {
          id: 'attach_to_assessments',
          title: t1('apply_to'),
          fields: ['attach_to_assessments'],
        },
        {
          id: 'default',
          title: t1('basic_information'),
          fields: ['non_unique_code', 'name', 'description'],
        },
        {
          id: 'content',
          title: t1('content'),
          fields: ['content'],
        },
      ];
    }
    case 'new_with_template':
    case 'edit_with_template': {
      return [{ id: 'default', fields: ['content'] }];
    }
    case 'new_do_assessment': {
      return [
        {
          id: 'attach_to_assessments',
          title: t1('apply_to'),
          fields: ['attach_to_assessments'],
        },
        {
          id: 'default',
          title: t1('basic_information'),
          fields: ['non_unique_code', 'name', 'description'],
        },
        {
          id: 'content',
          title: t1('content'),
          fields: ['content'],
        },
      ];
    }
  }
};

export default {
  schema,
  ui,
};
