import React from 'react';
import { connect } from 'react-redux';
import { hasScoreAndPassing } from '../../configs';
import { t1 } from 'translate';

import { isEditingItemFreeze } from 'components/admin/node/selectors/edit-item';
import HorizontalNav from 'layouts/admin_v2/horizontal-nav/index-v2';
import { getEditBaseUrl } from '../utils';
import { hasSettings } from 'components/admin/node/configs';

const informationLabel = (ntype) => {
  switch (ntype) {
    case 'video':
      return t1('video_information');
    case 'exercise':
      return t1('exercise_information');
    case 'sco':
      return t1('sco_information');
    case 'syllabus':
      return t1('syllabus_information');
    default:
      return t1('information');
  }
};

const childrenEditLabel = (node, contestMode) => {
  switch (node.ntype) {
    case 'exercise':
      return `${t1('exercise_questions')} (${
        node && node.children ? node.children.length : 0
      })`;
    case 'vocabset':
      return t1('vocabset_vocabs');
    case 'sco':
      return t1('sco_items');
    default:
      return t1('item_content');
  }
};

class BasicInformationNavMenu extends React.Component {
  render() {
    const {
      node,
      editCourseExamMode,
      readOnly,
      syllabus,
      isHashbang,
      action,
      contestMode,
      content,
    } = this.props;
    const { ntype } = node;

    // TODO: it's probably not working well with hashbang
    let editBaseUrl = getEditBaseUrl(this.props.location.pathname);

    const configs = [
      {
        id: 'edit',
        active: action === 'edit',
        link: `${editBaseUrl}/edit`,
        label: informationLabel(ntype),
        // hidden: node.ntype === 'syllabus',
      },
      {
        id: 'children',
        active: action === 'children' || action === 'add-item',
        link: `${editBaseUrl}/children`,
        label: childrenEditLabel(node, contestMode),
        hidden:
          isHashbang ||
          node.ntype === 'video' ||
          node.ntype === 'sco' ||
          node.ntype === 'question' ||
          node.ntype === 'syllabus',
      },
      // ...(constants.leaves.indexOf(ntype) === -1 && !isScormSco(node)
      //   ? [
      //       {
      //         active: action === 'children',
      //         link: `${editBaseUrl}/children`,
      //         label: `${t1('children_information')} (${
      //           node.children ? node.children.length : 0
      //         })`,
      //       },
      //     ]
      //   : []),
      // ...([allNtypes.SYLLABUS].includes(ntype) && node.type !== 'syllabus_exam'
      //   ? [
      //       {
      //         active: action === 'avatar',
      //         link: `${editBaseUrl}/avatar`,
      //         label: t1('avatar'),
      //       },
      //     ]
      //   : []),
      {
        id: 'skills',
        active: action === 'skills',
        link: `${editBaseUrl}/skills`,
        label: `${t1('skills')} (${
          node.skills && node.skills.length ? node.skills.length : '0'
        })`,
        hidden: contestMode,
      },
      {
        id: 'score-passing',
        active: action === 'score-passing',
        link: `${editBaseUrl}/score-passing`,
        label: `${t1('score')} & ${t1('passing')}`,
        hidden: !hasScoreAndPassing(node) || contestMode,
      },
      {
        id: 'advanced-settings',
        active: action === 'advanced-settings',
        link: `${editBaseUrl}/advanced-settings`,
        label: t1('settings'),
        hidden: !hasSettings(node) || contestMode,
      },
      // ...(this.hasLegacy()
      //   ? [
      //       {
      //         active: action === 'legacy',
      //         link: `${editBaseUrl}/legacy`,
      //         label: `${t1('edit_legacy_information')}`,
      //       },
      //     ]
      //   : []),
    ];

    const items = configs.filter((item) => !item.hidden);

    return items.length > 0 ? (
      <HorizontalNav key={node && node.iid} items={items} content={content} />
    ) : null;
  }
}

const mapStateToProps = (state, props) => ({
  nodes: state.tree,
  syllabus:
    state.tree[props.ancestors && props.ancestors[0] && props.ancestors[0].iid],
  readOnly: isEditingItemFreeze(state),
});

export default connect(mapStateToProps)(BasicInformationNavMenu);
