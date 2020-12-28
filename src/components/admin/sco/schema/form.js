import React from 'react';
import { required } from 'common/validators';
import { slugifier } from 'common/normalizers';
import {
  isScormProcessing,
  isScormProcessingSuccess,
  isScormSco,
  scormUploadUrl,
} from 'components/admin/scorm/scorm';
import { t1 } from 'translate';
import {
  getPassingSchemeRelatedFields,
  getPassingSchemeRelatedSchema,
} from 'common/learn/exercise/form';
import { templateOptions, templateTypes } from './tpl-types';
import { itemDuration } from 'components/common/elements/duration';
import Attachments from 'schema-form/elements/attachments';
import InputToken from 'schema-form/elements/input-token';
import ScormProcessingStatus from 'components/admin/scorm/scorm-processing-status';
import RTE from 'schema-form/elements/richtext';

const isExamSco = (values) => values && values.tpl_type === 'exam';

const schema = (formid, values, step, xpath, props, domainInfo) => {
  const isExam = isExamSco(values);
  return {
    name: {
      type: 'text',
      fullWidth: true,
      hintText: isExam ? t1('exam_sco_name') : t1('name_of_chapter'),
      floatingLabelText: isExam
        ? t1('enter_exam_sco_name')
        : t1('enter_name_of_chapter'),
      defaultValue: '',
      errorText: '',
      validate: [required(t1('name_cannot_be_empty'))],
    },
    code: {
      type: 'text',
      hintText: isExam ? t1('exam_sco_code') : t1('code_of_chapter'),
      floatingLabelText: t1('enter_code_of_chapter'),
      defaultValue: '',
      errorText: '',
      validate: [required(t1('code_cannot_be_empty'))],
      normalize: slugifier,
    },
    content: {
      type: RTE,
      multiLine: true,
      hintText: t1('content'),
      floatingLabelText: t1('enter_content'),
      defaultValue: '',
      errorText: '',
    },
    description: {
      type: 'text',
      fullWidth: true,
      hintText: t1('short_chapter_description'),
      floatingLabelText: t1('short_chapter_description'),
      defaultValue: '',
      errorText: '',
    },
    tpl_type: {
      type: 'radio',
      hintText: t1('sco_template_type'),
      defaultValue: templateTypes.TYPE_STANDARD,
      options: templateOptions(),
      errorText: '',
      validate: required(),
    },
    scorm_file: {
      type: Attachments,
      uploadUrl: scormUploadUrl(domainInfo),
      label: t1('scorm_file'),
      allowDownload: true,
      limit: 1,
      multiple: false,
      validate: [required(t1('you_must_upload_one_scorm_file'))],
      normalize: (values) => (values && values[0]) || null,
      format: (value) => (value ? [value] : []),
      accept: ['.zip'],
    },
    scorm_processing_warning: {
      type: 'cascade',
      component: (
        <ScormProcessingStatus item={values} readOnly={props.readOnly} />
      ),
    },
    tags: {
      type: InputToken,
      floatingLabelText: t1('tags'),
      fullWidth: true,
    },
    // paper_number: {
    //   type: 'number',
    //   min: 0,
    //   hintText: t1('the_number_of_paper_we_will_generate_when_item_approved'),
    //   floatingLabelText: t1('paper_number'),
    //   defaultValue: '',
    //   errorText: '',
    // },
    duration: itemDuration({ defaultValue: '30:00' }),
    ...(values && values.tpl_type === 'exam'
      ? getPassingSchemeRelatedSchema(formid, values)
      : {}),
  };
};

/**
 * *
 * @param values
 * @param forExamStore  When we're adding exam sco for exam syllabus, we don't need some certain fields like 'passing_scheme' and such...
 * because this kind of info is actually (and should be) attached to the exam round/shift/contest/template....
 * @returns {*[]}
 */
const getBasicFields = (values, forExamStore = false, editMode = false) => {
  const isExam = isExamSco(values);
  const isScorm = isScormSco(values, false);
  const fields = [
    'name',
    ...(isExam ? ['code'] : []),
    ...(isScorm ? ['scorm_file'] : ['content']),
    ...(isScorm &&
    editMode &&
    (isScormProcessing(values) || !isScormProcessingSuccess(values))
      ? ['scorm_processing_warning']
      : []),
    ...(!forExamStore ? ['description'] : []),
    // ...(isExam ? ['paper_number'] : []),
    'tags',
    ...(isExam && !forExamStore ? getPassingSchemeRelatedFields(values) : []),
    ...(!forExamStore ? ['duration'] : []),
  ];

  return fields;
};

const ui = (
  step,
  values,
  themeConfig,
  xpath,
  formid,
  props,
  mode,
  domainInfo,
  hiddenFields,
) => {
  const forExamStore = isEditingExamScoForExamSyllabus(
    props.editingItemAncestors,
  );
  const config = {
    new: [
      {
        fields: getBasicFields(values, forExamStore),
        title: '',
      },
    ],
    edit: [
      {
        fields: getBasicFields(values, forExamStore, true),
        title: '',
      },
    ],
  };

  return config[step];
};

/**
 * We can add exam sco to normal syllabus or an exam syllabus
 *
 * @param editingItemAncestors
 * @returns {boolean}
 */
const isEditingExamScoForExamSyllabus = (editingItemAncestors) => {
  if (
    editingItemAncestors &&
    editingItemAncestors.length &&
    editingItemAncestors[0].is_exam
  )
    return true;
  return false;
};

const sco = {
  schema,
  ui,
};

export default sco;
