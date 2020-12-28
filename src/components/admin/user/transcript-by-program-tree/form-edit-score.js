import { t1 } from 'translate';
import Store from 'store';
import { change } from 'redux-form';
import Elements from 'components/common/elements';
import LayoutFreestyle from './layout-edit-score-free-style';
import { required } from 'common/validators';
import Attachments from 'schema-form/elements/attachments';
import Toggle from 'schema-form/elements/toggle';
import RTE from 'schema-form/elements/richtext';

const { schoolYear, semester } = Elements;

const schema = (formid, values) => ({
  credit_transfert: {
    type: Toggle,
    label: t1('credit_transfert'),
    dataSet: {
      on: 1,
      off: 0,
    },
    labelPosition: 'left',
  },
  po: {
    type: 'text',
  },
  progress: {
    type: 'text',
    validate:
      values && values.credit_transfert
        ? []
        : [required(t1('progress_can_not_be_empty'))],
  },
  school_year: schoolYear({
    formid,
  }),
  semester: semester({
    formid,
    values,
    type: 'select',
    multiple: false,
  }),
  note: {
    type: RTE,
    floatingLabelText: t1('note'),
    multiple: true,
    fullWidth: true,
  },
  attachments: {
    type: Attachments,
    floatingLabelText: t1('upload_file'),
    allowDownload: true,
    multiple: true,
    fullWidth: true,
  },
});

const ui = (step, values) => {
  const fields = ['credit_transfert', 'note', 'attachments'];
  if (!values || !values.credit_transfert) {
    fields.push('school_year', 'semester', 'progress');
  } else {
    fields.push('school_year', 'semester', 'po');
  }

  return [
    {
      id: 'default',
      fields,
    },
  ];
};

const handleChangeFormValueByField = (formid, field, value) =>
  Store.dispatch(change(formid, field, value));

const getLayout = (subject, scoreScale, refetchGetTranscript) => ({
  component: LayoutFreestyle,
  freestyle: 1,
  optionsProperties: {
    subject,
    scoreScale,
    handleChangeFormValueByField,
    refetchGetTranscript,
  },
});

const finalProcessBeforeSubmit = (fullData) => {
  const {
    credit_transfert,
    semester,
    subject_iid,
    po,
    note,
    attachments,
    progress,
    formOfTraining,
    ...values
  } = fullData;
  const newProgress = [];

  if (typeof credit_transfert !== 'undefined' || note || attachments) {
    newProgress.push({
      tco_iid: subject_iid,
      po,
      semester,
      credit_transfert,
      note,
      attachments,
      fot: formOfTraining,
    });
  }

  return {
    ...values,
    credit_syllabus_iid: subject_iid,
    progress: newProgress.concat(progress || []),
  };
};

export default (subject, scoreScale, refetchGetTranscript) => ({
  schema,
  ui,
  layout: () => getLayout(subject, scoreScale, refetchGetTranscript),
  finalProcessBeforeSubmit,
});
