import { extractSomeAttributeFromArrayItemThatHasAttributeMatchingAValue } from 'common/utils/Array';

test('extractSomeAttributeFromArrayItemThatHasAttributeMatchingAValue', () => {
  const arrayOfItems = [
    {id: 1, name: 'One'},
    {id: 2, name: 'Two'},
  ];

  expect(extractSomeAttributeFromArrayItemThatHasAttributeMatchingAValue(arrayOfItems, 2, 'id', 'name')).toEqual('Two');
});