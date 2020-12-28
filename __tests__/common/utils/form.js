import { convertAllowedValuesToMultiOptions,
  transformServerResultArrayToFormFields,
  generateSelectOptionsFromListOfAllowedFieldsInAPlainObject,
  extractCurrentIndexFromXpath,
  extractLastFieldNameFromXpath,
} from 'common/utils/form';

test('convertAllowedValuesToMultiOptions', () => {
  const allowedValues = {
    '0': 'Introduction',
    '1': 'Inline',
  };
  const options = convertAllowedValuesToMultiOptions(allowedValues);
  // console.log(options);
  const expected = [
    {
      value: '0',
      label: 'Introduction',
    },
    {
      value: '1',
      label: 'Inline',
    },
  ];

  expect(options).toEqual(expected);

  const emptyArray = convertAllowedValuesToMultiOptions();
  expect(emptyArray).toEqual([]);
});

test('generateSelect can generate schemaform select options correctly', () => {
  const fieldsArray = ['name', 'email']
  const fieldsObject = {
    name: 'Enter name',
    email: 'Enter email',
  };

  const expected = [
    { value: 'name', label: 'Enter name' },
    { value: 'email', label: 'Enter email' },
  ];

  const actual = generateSelectOptionsFromListOfAllowedFieldsInAPlainObject(fieldsArray, fieldsObject);

  expect(actual).toEqual(expected);

  console.log(actual);
});


test('transformServerResultArrayToFormFields can generate schemaform select options correctly', () => {
  const resultArray = [
    {
      id: 'name',
      name: 'Enter name',
    },
    {
      id: 'mail',
      name: 'your email',
    },
  ];

  const expected = [
    {
      value: 'name',
      primaryText: 'Enter name',
      label: 'Enter name',
    },
    {
      value: 'mail',
      primaryText: 'your email',
      label: 'your email',
    },
  ];

  const actual = transformServerResultArrayToFormFields(resultArray, 'id');

  expect(actual).toEqual(expected);

  const ret2 = [
    {
      label: "filter employee name, code, email, or iid",
      name: "filter employee name, code, email, or iid",
      value : "text",
    },
  ];
  const expected2 = [
    {
      label: "filter employee name, code, email, or iid",
      primaryText: "filter employee name, code, email, or iid",
      value : "text",
    },
  ]
  const actual2 = transformServerResultArrayToFormFields(ret2);
  expect(actual2).toEqual(expected2);

});


test('extractCurrentIndexFromXpath', () => {
  expect(extractCurrentIndexFromXpath('form.comments[0].likers[1]')).toEqual(1);
  expect(extractCurrentIndexFromXpath('form_asdf.comments[0].likers[0]')).toEqual(0);
});


test('extractLastFieldNameFromXpath', () => {
  expect(extractLastFieldNameFromXpath('form.comments[0].likers[1]')).toEqual('likers');
  expect(extractLastFieldNameFromXpath('form_asdf.comments')).toEqual('comments');
  expect(extractLastFieldNameFromXpath('form')).toEqual('form');
});

