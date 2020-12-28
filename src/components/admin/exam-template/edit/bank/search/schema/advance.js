import { t1 } from 'translate';
import { difficulties } from 'configs/constants';
import skillsAutoComplete from 'components/admin/skill/schema/elements/skills-auto-complete';
// import endpoints from 'api-endpoints';
import examTemplateApiUrls from 'components/admin/exam-template/endpoints';
import { addPropsToEverySchemaElements } from 'common/utils/schema-form';
import { commonFormLayouts, elementDisplayModes } from 'schema-form/constants';
import MinimalSearchRecapFreeStyleLayout from 'schema-form/layouts/common-freestyle-layouts/MinimalSearchRecap';

const schema = (isRecap) => (formid, values, step, xpath, props) => {
  let element = {
    tags: {
      type: 'select',
      multiple: true,
      fullWidth: true,
      floatingLabelText: t1('choose_categories'),
      floatingLabelFixed: true,
      options: 'async',
      paramsasync: {
        __url__:
          examTemplateApiUrls.get_categories_of_questions_in_exam_template,
        value: {
          exam_template: values.iid,
        },
        transformData: (categories) => {
          if (!Array.isArray(categories) || !categories.length) {
            return [];
          }
          return categories.map((category) => {
            return {
              value: category,
              label: category,
              primaryText: category,
            };
          });
        },
      },
    },
    level: {
      type: 'select',
      multiple: true,
      fullWidth: true,
      floatingLabelText: t1('choose_levels'),
      floatingLabelFixed: true,
      options: 'async',
      paramsasync: {
        __url__: examTemplateApiUrls.get_levels_of_questions_in_exam_template,
        value: {
          exam_template: values.iid,
        },
        transformData: (levels) => {
          if (!Array.isArray(levels) || !levels.length) {
            return [];
          }
          return levels.map((level) => {
            return {
              value: level,
              label: level,
              primaryText: level,
            };
          });
        },
      },
    },
    skills: skillsAutoComplete('skill', {
      text: 'name',
      value: 'data',
      transformData: (res) =>
        res.map((data) => ({
          name: data.name,
          data: parseInt(data.iid),
        })),
    }),
    difficulty: {
      type: 'multiCheckbox',
      fullWidth: true,
      floatingLabelText: t1('difficulty'),
      floatingLabelFixed: true,
      options: [
        ...Object.values(difficulties).map((val) => ({
          primaryText: t1(val),
          label: t1(val),
          value: val,
        })),
      ],
      inline: true,
      // validate: [required(t1('difficulties_type_must_be_not_empty'))],
    },
  };

  if (isRecap) {
    return addPropsToEverySchemaElements(element, {
      elementDisplayMode: elementDisplayModes.RECAP,
    });
  }

  return element;
};

const ui = (step, values, themeConfig, xpath, formid, props) => {
  return [
    {
      id: 'id1',
      fields: [
        !props.categoryMappingWithTheSkills && 'tags',
        !props.categoryMappingWithTheSkills && 'level',
        props.categoryMappingWithTheSkills && 'skills',
        'difficulty',
      ].filter(Boolean),
    },
  ].filter(Boolean);
};

const getSchema = (forRecap = false) => ({
  schema: schema(forRecap),
  ui,
  layout: forRecap
    ? {
        freestyle: 1,
        component: MinimalSearchRecapFreeStyleLayout,
      }
    : commonFormLayouts.DEFAULT,
});

export const searchFormSchema = getSchema();
export const searchRecapFormSchema = getSchema(true);
