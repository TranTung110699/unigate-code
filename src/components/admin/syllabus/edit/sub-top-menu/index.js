import React from 'react';
import Links from 'routes/links';
import { t1 } from 'translate';
import PreviewButton from 'components/common/primary-button';

const syllabusSubTopMenuSchema = (action, syllabus) => {
  const previewLabel =
    syllabus && syllabus.type === 'credit'
      ? t1('preview_credit_syllabus')
      : t1('preview_syllabus');

  const previewLink = syllabus ? Links.learnCourse(syllabus, null, true) : '';

  const btn = (
    <a
      target="_blank"
      href={previewLink}
      className="button"
      title={t1('view_in_new_tab')}
    >
      <PreviewButton label={previewLabel} buttonType="primary" icon="eye" />
    </a>
  );

  return [
    {
      component: btn,
      href: previewLink,
      id: 'preview_syllabus',
      label: t1('preview'),
      floatRight: true,
      icon: 'plus',
    },
  ];
};

export default syllabusSubTopMenuSchema;
