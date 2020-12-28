/**
 * Created by hungvo on 27/07/17.
 */
import React from 'react';
import { t, t1 } from 'translate';
import get from 'lodash.get';
import store from 'store';
import { change } from 'redux-form';
import { required } from 'common/validators';
import Attachments from 'schema-form/elements/attachments';
import Toggle from 'schema-form/elements/toggle';
import MarkingByRubric from './MarkingByRubric';

const onUseGroupScoreChange = (event, value, formid, values) => {
  if (event) {
    if (value) {
      store.dispatch(change(formid, 'score', values.group_score));
    } else {
      store.dispatch(change(formid, 'score', null));
    }
  }
};

const setScore = (score, formid) => {
  store.dispatch(change(formid, 'susuggest_score', score));
};

const scoreElement = (values, step, props) => {
  let label =
    typeof values.group_score !== 'undefined'
      ? t1('or_enter_different_score')
      : t1('enter_score');

  const weighted = values.weighted
    ? props.isCourse
      ? values.weighted * 100
      : values.weighted
    : null;
  // console.log({ values, weighted });
  if (weighted) label = `${label} (${t1('maximum_score')}: ${weighted})`;

  if (values && typeof values.susuggest_score !== 'undefined') {
    label = (
      <span>
        {label}
        <span className="text-muted m-l-10">
          ({t1('suggest_score_from_marked_rubric')} :{' '}
          <span style={{ fontWeight: 500 }}>{values.susuggest_score}</span>)
        </span>
      </span>
    );
  }

  const ret = {
    type: 'number',
    min: 0,
    defaultValue: 0,
    floatingLabelText: label,
    fullWidth: true,
    floatingLabelFixed: false,
    readOnly: values && values.use_group_score,
    validate: ['edit_set_question_score'].includes(step)
      ? [required(t1('score_is_invalid'))]
      : null,
  };

  if (get(props, 'rubricMarking.iid')) {
    ret.validate = null;
  }

  // if (weighted) ret.max = weighted;

  return ret;
};

const schema = (formid, values, step, xpath, props) => ({
  use_group_score: {
    type: Toggle,
    label: t1('use_group_score'),
    labelPosition: 'right',
    onChange: (event, value) => {
      onUseGroupScoreChange(event, value, formid, values);
    },
  },
  score_by_rubric: {
    type: 'section',
    schema: {
      schema: () => ({
        rubric_iid: {
          type: 'number',
          classWrapper: 'display-none',
        },
        detail: {
          type: MarkingByRubric,
          rubricIid: get(props, 'rubricMarking.iid'),
          rubricIidsToShowMarking: get(props, 'rubricIidsToShowMarking'),
          setScore: (score) => setScore(score, formid),
        },
      }),
      ui: () => [
        {
          fields: ['rubric_iid', 'detail'],
        },
      ],
    },
  },
  score: scoreElement(values, step, props),
  content: {
    name: 'content',
    type: 'text',
    multiLine: true,
    floatingLabelText: ['edit_set_question_score', 'new_comment'].includes(step)
      ? t1('marker_comment')
      : t1('enter_the_answer_here_or_upload_your_answer_file'),
    hintText: ['edit_set_question_score', 'new_comment'].includes(step)
      ? t1('enter_the_comment')
      : null,
    rows: 2,
    floatingLabelFixed: false,
    fullWidth: true,
    disabled: !(
      ['edit_set_question_score', 'new_comment'].includes(step) ||
      typeof values.score === 'undefined'
    ),
  },
  attachments: {
    type: Attachments,
    name: 'file_answer',
    allowDownload: true,
    rootFolder: 'public',
    folder: 'file-answer',
    disabled: !(
      ['edit_set_question_score', 'new_comment'].includes(step) ||
      typeof values.score === 'undefined'
    ),
    label: t1('upload_marking_feedback_attachments'),
    noFileManager: true,
    height: '50px',
    primary: true,
  },
});

const ui = (step, values, themeConfig, xpath, formid, props) => {
  switch (step) {
    case 'new_question': {
      return [
        {
          id: 'default',
          fields: ['content', 'attachments'],
        },
      ];
    }
    case 'new_comment': {
      return [
        {
          id: 'default',
          fields: ['content', 'attachments'],
        },
      ];
    }
    case 'edit_set_question_score': {
      let fields = [];

      if (typeof values.group_score !== 'undefined') {
        fields.push('use_group_score');
      }

      if (get(props, 'rubricMarking.iid')) {
        fields.push('score_by_rubric');
      }

      fields.push('score');

      if (!get(props, 'rubricMarking.iid') || !window.isDHSP1) {
        fields = fields.concat(['content', 'attachments']);
      }

      return [
        {
          id: 'edit_score',
          title: `${t1('score')} ${
            values.suggestedScore
              ? `(${t('suggestion:_%s', [values.suggestedScore])})`
              : ''
          }`,
          fields,
        },
      ];
    }
    default: {
      return [];
    }
  }
};

const layout = {
  new_answer: '',
};

export default { schema, ui, layout };
