import React from 'react';
import TreeCheckbox from 'schema-form/elements/tree-check-box/new';
import Icon from 'components/common/Icon';
import { filterTree, mapTree } from 'common/utils/object';

const flatTreeData = (node = {}) => {
  let result = [];

  const { children, ...data } = node;
  result.push(data);
  if (Array.isArray(children) && children.length) {
    children.forEach((chil) => {
      result = result.concat(flatTreeData(chil));
    });
  }
  return result;
};

const schemaEditLearningItems = (node) => {
  let treeData = filterTree(
    node,
    (item) => item && !['question', 'vocab'].includes(item.ntype),
  );
  treeData = mapTree(treeData, (item) => ({
    ...item,
    title: (
      <div>
        <Icon icon={item.ntype} />
        {item.name}
      </div>
    ),
    value: item.iid,
    key: item.iid,
  }));

  return {
    schema: () => ({
      learning_items: {
        name: 'learning_items',
        type: TreeCheckbox,
        treeData: [treeData],
      },
    }),
    ui: () => [
      {
        id: 'default',
        fields: ['learning_items'],
      },
    ],
    finalProcessBeforeSubmit: ({ learning_items, ...data } = {}) => {
      if (!Array.isArray(learning_items) || !learning_items.length) {
        return data;
      }

      const nodes = flatTreeData(node);

      return {
        ...data,
        learning_items: learning_items.map((iid) =>
          nodes.find((item) => item.iid === iid),
        ),
      };
    },
  };
};

export default schemaEditLearningItems;
