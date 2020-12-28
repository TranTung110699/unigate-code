/**
 * Created by vohung on 29/05/2017.
 */
import React from 'react';
// import Mindmap from 'material-ui/svg-icons/maps/pin-drop';
// import Communication from 'material-ui/svg-icons/communication/email';
import Learn from 'material-ui/svg-icons/av/play-arrow';
import List from 'material-ui/svg-icons/action/list';
// import AspectsPercent from 'material-ui/svg-icons/editor/pie-chart';
import Update from 'material-ui/svg-icons/image/edit';
import { t2 } from 'translate';

const allMenuItems = ({ node }) => {
  const menuItems = [
    {
      id: 'misc',
      label: t2('information'),
      children: [
        // {
        //   icon: <Dashboard />,
        //   action: 'dashboard',
        //   id: 'dashboard',
        //   label: t2('dashboard'),
        // },
        {
          icon: <Update />,
          action: 'information',
          id: 'information',
          label: t2('general_information'),
        },
        // {
        //   icon: <Mindmap />,
        //   action: 'mindmap',
        //   id: 'mindmap',
        //   label: t2('mindmap_view'),
        // },
        {
          icon: <List />,
          action: 'children',
          id: 'children',
          label: t2('sub-skills'),
        },
        // {
        //   icon: <Communication />,
        //   action: 'relation',
        //   id: 'relation',
        //   label: t2('other_skills'),
        // },
        // {
        //   icon: <Def />,
        //   action: 'passing_definition',
        //   id: 'passing_definition',
        //   label: t2('passing_definition'),
        // },
      ],
    },
    {
      id: 'items',
      label: t2('learning_aspects'),
      children: [
        // {
        //   icon: <EntryTest />,
        //   action: 'entry_items',
        //   id: 'entry_items',
        //   label:
        //     node && node.entry_items && node.entry_items.length
        //       ? t2('entry_tests_(%s)', node.entry_items.length)
        //       : t2('entry_tests'),
        // },
        {
          icon: <Learn />,
          action: 'learning_items',
          id: 'learning_items',
          label:
            node && node.learning_items && node.learning_items.length
              ? t2('learning_items_(%s)', node.learning_items.length)
              : t2('learning_items'),
        },
        // {
        //   icon: <Stars />,
        //   action: 'practice_items',
        //   id: 'practice_items',
        //   label:
        //     node && node.practice_items && node.practice_items.length
        //       ? t2('practice_items_(%s)', node.practice_items.length)
        //       : t2('practice_items'),
        // },
        // {
        //   icon: <OutputTest />,
        //   action: 'output_items',
        //   id: 'output_items',
        //   label:
        //     node && node.output_items && node.output_items.length
        //       ? t2('output_tests_(%s)', node.output_items.length)
        //       : t2('output_tests'),
        // },
        // {
        //   icon: <Applied />,
        //   action: 'apply_items',
        //   id: 'apply_items',
        //   label:
        //     node && node.apply_items && node.apply_items.length
        //       ? t2('apply_items_(%s)', node.apply_items.length)
        //       : t2('apply_items'),
        // },
        // {
        //   icon: <Refresh />,
        //   action: 'refresh_items',
        //   id: 'refresh_items',
        //   label:
        //     node && node.refresh_items && node.refresh_items.length
        //       ? t2('expiry_&_refresh_items_(%s)', node.refresh_items.length)
        //       : t2('expiry_&_refresh_items'),
        // },
        // {
        //   icon: <AspectsPercent />,
        //   action: 'aspects_percent',
        //   id: 'aspects_percent',
        //   label: t2('aspects_percent'),
        // },
      ],
    },
    // {
    //   id: 'pass',
    //   label: t2('passing_definition'),
    //   children: [
    //     {
    //       icon: <Def />,
    //       action: 'passing_definition',
    //       id: 'passing_definition',
    //       label: t2('passing_definition'),
    //     },
    //   ],
    // },
  ];

  return menuItems;
};

const getMenuItems = (node, menuItemsToCheck, allowedMenuItems) =>
  menuItemsToCheck
    .map((item) => {
      for (let i = 0; i < allowedMenuItems.length; i += 1) {
        const allowedItem = allowedMenuItems[i];
        if (typeof allowedItem === 'string') {
          if (allowedItem === item.id) {
            return item;
          }
        } else if (allowedItem) {
          if (allowedItem.id === item.id) {
            if (allowedItem.children && item.children) {
              return {
                ...item,
                children: getMenuItems(
                  node,
                  item.children,
                  allowedItem.children,
                ),
              };
            }
            return item;
          }
        }
      }
      return null;
    })
    .filter((item) => item);

const configs = ({ node }) => {
  let allowedMenuItems;
  if (node.type === 'rubric') {
    allowedMenuItems = [
      {
        id: 'misc',
        children: ['information', 'children'],
      },
    ];
  } else {
    allowedMenuItems = ['misc', 'items', 'pass'];
  }

  const menuItems = getMenuItems(
    node,
    allMenuItems({ node }),
    allowedMenuItems,
  );

  return { menuItems };
};

export default configs;
