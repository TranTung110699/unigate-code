import { isPhoneNumber} from 'common/validators';

test('isPhoneNumber validates', () => {
  const valids = [
    '0923443888',
    '0923.443.888',
    '+84 0923 443 888',
    '+84 0923 443 888',
    '+84-0923-443-888',
  ];

  for (let i in valids) {
    let x = isPhoneNumber('a')(valids[i]);
    console.log(x);
    // expect(x).toEqual(expected);
  }
});
