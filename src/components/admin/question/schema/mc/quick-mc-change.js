import { change } from 'redux-form';
import { mcSubTypes, types } from '../question-types';
import { range } from 'common/utils/Array';
import { t1 } from 'translate';
import {
  mcTemplateTypes,
  mmcTemplateTypes,
  questionTemplateTypes,
} from '../question-template-types';

const getAbcOptions = () => [
  {
    text: 'A',
    is_answer: 1,
  },
  {
    text: 'B',
  },
  {
    text: 'C',
  },
];

const getAbcdDotOptions = () => [
  {
    text: 'A.',
    is_answer: 1,
  },
  {
    text: 'B.',
  },
  {
    text: 'C.',
  },
  {
    text: 'D.',
  },
];

const getTrueFalseOptions = () => [
  {
    text: 'True',
    is_answer: 1,
  },
  {
    text: 'False',
  },
];

const getRatingOptions = (from, to, sep) => {
  let options = [];

  for (let index of range(from, to)) {
    const ETEPRatingText = [
      'Hoàn toàn không đồng ý',
      'Không đồng ý',
      'Đồng ý',
      'Hoàn toàn đồng ý',
    ];
    options.push({
      value: index,
      text:
        window.isETEP && sep === '_'
          ? ETEPRatingText[index - 1]
          : sep === '-'
          ? `${index} - ${t1(`rating_text_${index}`)}`
          : `${index}. ${t1(`rating_text_${index}`)}`,
    });
  }
  return options;
};

export const quickMCSubTypeChange = (formid, val, tplType, dispatch) => {
  let newTplType = questionTemplateTypes.MC_ANSWER_TEXT;

  if (val === mcSubTypes.MMC && mmcTemplateTypes.indexOf(tplType) === -1) {
    newTplType = questionTemplateTypes.MMC_ANSWER_TEXT;
  } else if (val === mcSubTypes.MC && mcTemplateTypes.indexOf(tplType) === -1) {
    newTplType = questionTemplateTypes.MC_ANSWER_TEXT;
  }

  dispatch(change(formid, 'tpl_type', newTplType));
};

export const quickMCChange = (formid, val, dispatch) => {
  let options = [];
  // console.log(val);
  if (val === 'ABC') {
    options = getAbcOptions();
  } else if (val === 'ABCD') {
    options = getAbcOptions();
    options.push({ text: 'D' });
  } else if (val === 'ABCD.') {
    options = getAbcdDotOptions();
    // options.push({ text: 'D' });
  } else if (val === '4Options') {
    for (let i = 0; i < 4; i += 1) {
      options.push({
        text: '',
        is_answer: i === 0,
      });
    }
  } else if (val === 'TF') {
    options = getTrueFalseOptions();
  } else if (val === '5-1-ratings') {
    options = getRatingOptions(5, 1, '-');
  } else if (val === '5-1.ratings') {
    options = getRatingOptions(5, 1, '.');
  } else if (val === '1-5-ratings') {
    options = getRatingOptions(1, 5, '-');
  } else if (val === '1-5.ratings') {
    options = getRatingOptions(1, 5, '.');
  } else if (val === '1-4.ratings') {
    options = getRatingOptions(1, 4, '.');
  } else if (val === '4-1.ratings') {
    options = getRatingOptions(4, 1, '_');
  }

  if (options && options.length) dispatch(change(formid, 'answers2', options));
};

export const quickMCChangeFromText = (formid, values, val, dispatch) => {
  let options = [];
  let lines = val.replace(/\r\n\t/g, '\n').split(/[\n\t;]/);

  if (lines.length === 1) {
    lines = val.split(',');
  }

  const l = lines.filter((el) => {
    return el;
  });
  if (l.length > 1) {
    options = l.map((text, index) => ({
      text,
      ...(String(values.type) === String(types.TYPE_NUMBER)
        ? { value: index + 1 }
        : {}),
    }));
  } else {
    options = [];
  }

  if (options && options.length) dispatch(change(formid, 'answers2', options));
};

export const quickMCs = (values) => {
  const all = [
    {
      value: 'TF',
      label: 'True-False',
    },
    // {
    //   value: 'ABCD',
    //   label: 'ABCD',
    // },
    {
      value: 'ABCD.',
      label: 'A.B.C.D.',
    },
    {
      value: 'ABC',
      label: 'ABC',
    },
    {
      value: '4Options',
      label: t1('4_options'),
    },
    {
      value: '5-1-ratings',
      label: '5-1-ratings',
    },
    {
      value: '5-1.ratings',
      label: '5-1.ratings',
    },
    {
      value: '1-5-ratings',
      label: '1-5-ratings',
    },
    {
      value: '1-5.ratings',
      label: '1-5.ratings',
    },
    {
      value: '1-4.ratings',
      label: '1-4.ratings',
    },
    ...(window.isETEP
      ? [
          {
            value: '4-1.ratings',
            label: '4-1.ratings',
          },
        ]
      : []),
  ];

  if (
    values.type === types.TYPE_MC ||
    values.type === types.TYPE_MC_OPEN_ENDED
  ) {
    return all.filter(({ value }) =>
      ['TF', 'TF', 'ABCD', 'ABCD.', 'ABC', '4Options'].includes(value),
    );
  }
  if (values.type === types.TYPE_NUMBER) {
    return all.filter(({ value }) =>
      [
        '5-1-ratings',
        '5-1.ratings',
        '1-5-ratings',
        '1-5.ratings',
        '1-4.ratings',
        '4-1.ratings',
      ].includes(value),
    );
  }
  return [];
};
