import filter from 'json-schema-filter';
import { treeNodeSchema } from 'components/admin/node/schema/tree';
import { normalize } from 'normalizr';
import apiNodeSchema from 'components/admin/node/schema/api';

test('Nodes schema in tree store is correct', () => {
  const data = {
    id: '34234dffasdfasdf',
    iid: '12',
    children: [1, 2, 23, 4],
    metadata: [
      {
        id: 'child1',
        iid: 'child2',
        ntype: 'sco',
        children: [
          { id: 'iid' },
          { iid: 'iid' },
        ],
        SomeAlientInput: 'xsfsdf',
      },
    ],
    u: { name: 'adf', id: 'id', shouldNot: 'see this' },
    shouldNotSee: 'see this!',
  };

  const result = {
    id: '34234dffasdfasdf',
    iid: '12',
    children: [1, 2, 23, 4],
    metadata: [
      {
        id: 'child1',
        iid: 'child2',
        ntype: 'sco',
      },
    ],
    u: { name: 'adf', id: 'id' },
  };

  console.log('schema', treeNodeSchema);
  const filtered = filter(treeNodeSchema, data);
  console.log(filtered);

  expect(filtered).toEqual(result);
});

test('normalizes data normally', () => {
  // console.log(configs('sco', 'new'));
  const node = {
    id: 1,
    iid: 1,
    name: 'nodename',
    chidlren: [
      {
        id: 'child1',
        iid: 'child1',
        name: 'child1',
      },
    ],
  };

  console.log(node, apiNodeSchema);
  const x = normalize(node, apiNodeSchema);
  console.log(x);
  expect(x).toBeDefined();
});
