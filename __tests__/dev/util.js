
import { normalizeVimeoUrl } from 'common/normalizers/index';

test('{item, ...rest } = data', () => {
  const hello = {
    a: 'a',
    b: 'sdfsdf',
  };
  const foo = 'foo';
  const itemOriginal = 'item';
  
  const data = {
    item: itemOriginal,
    foo,
    hello,
  }
  const restOriginal = {
    foo,
    hello,
  };

  const { item, ...rest } = data;
  expect(item).toEqual(itemOriginal);
  expect(rest).toEqual(restOriginal);
  // console.log(rest);

  /*
  var o1 = { a: 1, b: 1, c: 1 };
  var o2 = { b: 2, c: 2 };
  var o3 = { c: 3 };

  var obj = Object.assign({}, o1, o2, o3);
  console.log({ obj, o1, o2, o3 }); // { a: 1, b: 2, c: 3 }
  */
  var o1 = { a: 1 };
  var o2 = { b: 2 };
  var o3 = { c: 3 };

  var obj = Object.assign(o1, o2, o3);
  console.log(obj); // { a: 1, b: 2, c: 3 }
  console.log(o1);  // { a: 1, b: 2, c: 3 }, target object itself is changed.
  
});

