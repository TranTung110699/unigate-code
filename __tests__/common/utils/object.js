import { objectHasAnyKeyInArray } from 'common/utils/object';

test('objectHasAnyKeyInArray', () => {
  const keys = ['a', 'b', 'c', 'd'];
  const values = {
    a: [],
    b: false,
    c: '',
    d: {},
  };

  expect(objectHasAnyKeyInArray(values, keys)).toEqual(false);
});

