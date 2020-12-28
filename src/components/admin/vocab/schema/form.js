// const fields = ['name'];
import { t, t1, t4 } from 'translate';
import { required } from 'common/validators';
import VocabExamples from 'components/admin/vocab/form/examples/';
import DictionaryViewer from 'components/admin/vocab/form/dictionary';
import InputFile from 'schema-form/elements/input-file';

const vocabTypes = [
  {
    value: 'n',
    label: t4('noun'),
  },
  {
    value: 'v',
    label: t4('verb'),
  },
  {
    value: 'pr',
    label: t4('pronoun'),
  },
  {
    value: 'adj',
    label: t4('adjective'),
  },
  {
    value: 'prep',
    label: t4('preposition'),
  },
  {
    value: 'adv',
    label: t4('adverb'),
  },
];

const schema = (formid) => {
  return {
    name: {
      type: 'text',
      hintText: t1('name_of_vocab'),
      floatingLabelText: t1('enter_name_of_vocab'),
      defaultValue: '',
      errorText: '',
      validate: [required(t1('name_cannot_be_empty'))],
      // onChange: (ev, val) => { onNameChange(formid, val); },
    },
    vname: {
      type: 'text',
      hintText: t1('meaning_of_vocab'),
      floatingLabelText: t1('enter_meaning_of_vocab'),
      defaultValue: '',
      errorText: '',
      validate: [required(t1('meaning_cannot_be_empty'))],
    },
    dictionary: {
      type: DictionaryViewer,
    },
    phonetics: {
      type: 'text',
      hintText: 'həˈləʊ',
      floatingLabelText: t1('phonetics'),
      defaultValue: '',
      errorText: '',
    },
    vid_gb: {
      type: 'text',
      hintText: t('youtube_video_id_(GB)'),
      // floatingLabelText: 'enter meaning of vocab',
      defaultValue: '',
      errorText: '',
      // validate: [required('meaning cannot be empty')],
    },
    vid_us: {
      type: 'text',
      hintText: t('youtube_video_id_(US)'),
      // floatingLabelText: 'enter meaning of vocab',
      defaultValue: '',
      errorText: '',
      // validate: [required('meaning cannot be empty')],
    },
    type: {
      type: 'multiCheckbox',
      hintText: t1('vocab_type'),
      // floatingLabelText: 'enter content',
      options: vocabTypes,
      // defaultValue: '',
      errorText: '',
    },
    examples: {
      type: VocabExamples, // 'vocabExample',
      hintText: t1('examples'),
    },
    u_audio: {
      type: InputFile,
      hintText: t1('audio'),
      floatingLabelText: t1('upload_audio'),
      defaultValue: '',
      fullWidth: true,
    },
    avatar: {
      type: InputFile,
      hintText: t1('avatar'),
      floatingLabelText: t1('upload_avatar'),
      defaultValue: '',
      fullWidth: true,
    },
  };
};

const ui = {
  new: [
    // step == ''
    {
      fields: [
        'name',
        'dictionary',
        'vname',
        'phonetics',
        'type',
        'examples',
        'avatar',
        'u_audio',
      ],
      title: '',
    },
  ],
  edit: [
    {
      fields: [
        'name',
        'dictionary',
        'vname',
        'phonetics',
        'type',
        'examples',
        'avatar',
        'u_audio',
      ],
      title: '',
    },
  ],
};

const vocab = {
  schema,
  ui,
};

export default vocab;
