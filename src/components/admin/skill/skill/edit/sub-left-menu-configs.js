import { t1 } from 'translate';
import { getSubMenuLink } from 'routes/links';

export const menuItems = (node) => {
  const ntype = node.type === 'rubric' ? 'rubric' : 'skill';
  const dashboard = {
    id: 'skill_dashboard',
    url: getSubMenuLink(ntype, node, 'dashboard'),
    title: t1('dashboard'),
    icon: {
      position: 'left',
      type: 'dashboard',
    },
  };

  const info = {
    id: 'skill_general_information',
    url: getSubMenuLink(ntype, node, 'information'),
    title: t1('general_information'),
    icon: {
      position: 'left',
      type: 'info-circle',
    },
  };

  const children = {
    id: 'skill_children',
    url: getSubMenuLink(ntype, node, 'children'),
    title: t1(
      `${node.type == 'skill' ? 'sub_skills_(%s)' : 'child_rubrics_(%s)'}`,
      !!(node && node.children && node.children.length)
        ? node.children.length
        : '0',
    ),
    icon: {
      position: 'left',
      type: 'bars',
    },
  };

  const divider = {
    id: 'divider',
    divider: true,
  };

  const learningItems = {
    id: 'skill_learning_items',
    url: getSubMenuLink(ntype, node, 'learning_items'),
    title: t1(
      'learning_items_(%s)',
      !!(node && node.learning_items && node.learning_items.length)
        ? node.learning_items.length
        : '0',
    ),
    icon: {
      position: 'left',
      type: 'ordered-list',
    },
  };

  const isRubric = node.type === 'rubric';

  if (isRubric) return [info, children];
  else return [dashboard, info, divider, children, learningItems];
};
