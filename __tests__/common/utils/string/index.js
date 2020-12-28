import { slugify } from 'common/utils/string';

test('slugify removes non English alphabet & numeric out of strings and replaces spaces with -', () => {
  const str = "Some-ok-Strange tiếng* Việt&()";
  const expected = "Some-ok-Strange-tieng-Viet-";
  const result = slugify(str);
  expect(result).toEqual(expected);
});


test('slugifierUppercase can capitalize', () => {
  const str = "Foo bar";
  const expected = "FOO-BAR";
  const result = slugify(str, 'upper');
  expect(result).toEqual(expected);
});

test('slugifierLowercase can actually lowercase', () => {
  const str = "ĐÈN BẤC";
  const expected = "den-bac";
  const result = slugify(str, 'lower');
  expect(result).toEqual(expected);
});

test('slugifier keeps undescore _', () => {
  const str = "hello_world foo";
  const expected = "hello_world-foo";
  const result = slugify(str);
  expect(result).toEqual(expected);
});
