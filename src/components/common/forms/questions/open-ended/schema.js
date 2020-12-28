/**
 * Created by hungvo on 27/07/17.
 */
import { t1 } from 'translate';
import get from 'lodash.get';
import Layout from './Layout';
import Attachments from 'schema-form/elements/attachments';
import makeReduxFormCompatible from 'components/common/makeReduxFormCompatible';
import AnswerByStructure from './AnswerByStructure';
import RTE from 'schema-form/elements/richtext';

const MakeReduxFormAnswerByStructure = makeReduxFormCompatible({})(
  AnswerByStructure,
);

const schema = (formid, values, step, xpath, props) => {
  const disabled = false && !(typeof values.score === 'undefined');
  const structureAnswer = get(props, 'structureAnswer');

  // const wordmin = values.wordmin;
  // const wordmax = values.wordmax;
  let label;
  if (props.isTesting) {
    label = t1('type_your_answer_here');
  } else label = t1('enter_the_answer_here_or_upload_your_answer_file');

  return {
    content: {
      name: 'content',
      structureAnswer: structureAnswer,
      type:
        Array.isArray(structureAnswer) && structureAnswer.length
          ? MakeReduxFormAnswerByStructure
          : props.isTesting
          ? 'text'
          : RTE,
      multiLine: true,
      floatingLabelText: label,
      hintText: null,
      rows: 2,
      floatingLabelFixed: false,
      takeId: props.takeId,
      question: props.question,
      questionIid: props.questionIid,
      courseIid: props.courseIid,
      resultMarked: props.resultMarked,
      setHideSubmitButton: props.setHideSubmitButton,
      fullWidth: true,
      disabled,
      readOnly: disabled,
      formid,

      // validate: [
      //   inRange(
      //     wordmin,
      //     wordmax,
      //     (() => {
      //       if (wordmin && wordmax)
      //         return t1(`the_answer_length_must_between_%s_and_%s_characters`, [
      //           wordmin,
      //           wordmax,
      //         ]);
      //
      //       if (wordmin)
      //         return t1(`the_answer_length_must_be_longer_than_%s_characters`, [
      //           wordmin,
      //         ]);
      //
      //       if (wordmax)
      //         return t1(
      //           `the_answer_length_must_be_shorter_than_%s_characters`,
      //           [wordmax],
      //         );
      //     })(),
      //   ),
      // ],
    },
    attachments: {
      type: Attachments,
      name: 'file_answer',
      allowDownload: true,
      rootFolder: 'public',
      folder: 'file-answer',
      disabled,
      label: t1('upload_attachments'),
      noFileManager: true,
      height: '50px',
      primary: true,
    },
  };
};

const ui = (step, values, themeConfig, xpath, formid, props) => {
  const structureAnswer = get(props, 'structureAnswer');
  // const ui = (step, values) => {
  const fields = ['content'];
  // Only allow uploading attachment if user's doing assignments or open ended questions in a course.
  // For a contest, where user's not allowed to escape fullscreen, don't show 'attachments'
  if (
    !props.isTesting &&
    !(Array.isArray(structureAnswer) && structureAnswer.length)
  )
    fields.push('attachments');

  const config = {
    new_question: [
      {
        id: 'default',
        fields,
      },
    ],
  };
  return config[step];
};

const layout = {
  new_answer: '',
};

export default {
  schema,
  ui,
  layout: {
    freestyle: 1,
    component: Layout,
  },
};
