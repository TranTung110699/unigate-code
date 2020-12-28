import { diffObjects } from '../object';

describe('diffObjects', () => {
  it('should show that all keys is added if the first param is not an object', () => {
    const o1Candidates = ['not an object', null, 1];
    const o2 = {
      a: 'a2',
      b: 'b2',
      c: 'c2',
    };
    o1Candidates.forEach((o1) => {
      expect(diffObjects(o1, o2)).toEqual({
        updated: {},
        added: {
          a: 'a2',
          b: 'b2',
          c: 'c2',
        },
        deleted: {},
      });
    });
  });

  it('should show that all key is deleted if the second param is not an object', () => {
    const o1 = {
      a: 'a1',
      b: 'b1',
      c: 'c1',
    };
    const o2Candidates = ['not an object', null, 1];
    o2Candidates.forEach((o2) => {
      expect(diffObjects(o1, o2)).toEqual({
        updated: {},
        added: {},
        deleted: {
          a: 'a1',
          b: 'b1',
          c: 'c1',
        },
      });
    });
  });

  it('should diff two now normal objects', () => {
    const o1 = {
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
    };
    const o2 = {
      a: 'a2',
      b: 'b2',
      c: 'c',
      e: 'e',
    };
    expect(diffObjects(o1, o2)).toEqual({
      updated: {
        a: 'a2',
        b: 'b2',
      },
      added: {
        e: 'e',
      },
      deleted: {
        d: 'd',
      },
    });
  });
});
