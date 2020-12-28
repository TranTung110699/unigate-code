import get from 'lodash.get';

export const getNodeIcon = (node) => {
  let nodeType;
  if (node && get(node, 'ntype')) {
    if (get(node, 'ntype') === 'video') {
      nodeType = `video-${get(node, 'type') ? get(node, 'type') : 'video'}`;
    } else if (get(node, 'type') === 'exam') {
      nodeType = get(node, 'type');
    } else if (get(node, 'ntype') === 'exercise') {
      nodeType = 'edit';
    } else {
      nodeType = get(node, 'ntype');
    }
  }

  return nodeType;
};
