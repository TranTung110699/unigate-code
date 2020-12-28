import { required } from 'common/validators';
import { slugifier } from 'common/normalizers';
import { t1 } from 'translate';
import contentSchema from 'components/temis/evidence/schema/content';
import attachToAssessmentsSchema from 'components/temis/evidence/schema/attachToAssessment';

const schema = (formid, values) => {
  return {
    non_unique_code: {
      type: 'text',
      floatingLabelText: t1('assessment_evidence_template_code'),
      validate: [required(t1('code_cannot_be_empty'))],
      defaultValue: '',
      fullWidth: true,
      normalize: slugifier,
    },
    name: {
      type: 'text',
      floatingLabelText: t1('assessment_evidence_template_name'),
      validate: [required(t1('name_cannot_be_empty'))],
      defaultValue: '',
      fullWidth: true,
    },
    description: {
      type: 'text',
      floatingLabelText: t1('assessment_evidence_template_description'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    sample_content: {
      type: 'section',
      schema: contentSchema,
    },
    attach_to_assessments: {
      type: 'array',
      schema: attachToAssessmentsSchema(),
      defaultValue: [{}],
    },
  };
};

const ui = (step, values) => {
  switch (step) {
    case 'new':
    case 'edit':
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
          id: 'sample_content',
          title: t1('sample_content'),
          fields: ['sample_content'],
        },
      ];
    default:
      return undefined;
  }
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
