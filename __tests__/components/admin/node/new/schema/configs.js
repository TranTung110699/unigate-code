import getNodeFormSchema from 'components/admin/node/schema-form/configs';


test('correct form ui schema', () => {
  // console.log(configs('sco', 'new'));
  const output = {
    schema: {

    },
    ui: {

    },
  };

  expect(getNodeFormSchema('sco')).toBeDefined();
});
