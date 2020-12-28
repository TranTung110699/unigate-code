import Links from 'routes/links';
import { isScormSco } from 'components/admin/scorm/scorm';

const checkDrawingConditionNav = (item, parent = {}) => {
  if (!item || !item.iid || !item.ntype) {
    return 0;
  }
  switch (item.ntype) {
    case 'syllabus': {
      return 3;
    }
    case 'sco': {
      return 2;
    }
    case 'exercise': {
      return 1;
    }
    case 'survey': {
      return 1;
    }
    case 'video': {
      return 1;
    }
    case 'vocabset': {
      if (parent.ntype === 'exercise') {
        return 0;
      }
      return 1;
    }
    default: {
      return 0;
    }
  }
};

const isScoExam = (learnItem) => {
  if (learnItem && learnItem.tpl_type === 'exam') {
    return true;
  }

  return false;
};

/**
 * Generate the list of nav items to draw in learn navigation bar
 * return [
 *  {
 *  display: false
    isHeader: true
    link: "/learn/384230-384183/384183-382688-1/a-new-course-for-depth2-syllabus.html"
    navId: "384183-382688-1"
    nodeIid: 382688
 *  }
 *
 *  Note the navId which is the path from root node (not including syllabus) to the leaf, plus the index
 *
 * ]
 * @param nodes
 * @param course
 * @param moreOption
 * @param learnItem
 * @param parentItems
 * @param navRootNodeIid
 * @returns {*}
 */
const generateLearnNavItems = (
  course = {},
  nodes = {},
  moreOption = {},
  learnItem = {},
  treeDepth = 1,
  parentItems = {},
  navRootNodeIid,
) => {
  course = course || {};
  let trackingLine = [];
  let navs = [];
  let newNavId = null;
  let currentNavId = null;
  const depth = checkDrawingConditionNav(learnItem, parentItems);
  let index = moreOption.index + 1;
  const pathIid = moreOption.pathIid;
  const isPreview = moreOption.isPreview;
  const sessionPrefix = moreOption.sessionPrefix;
  const learnMode = moreOption.learnMode;
  let newSurveyLink = null;
  if (!nodes || !depth) {
    return { trackingLine, newNavId, navs, index };
  }

  let lastLearnedItem = {};
  if (course && course.lastLearnedItem) {
    lastLearnedItem = course.lastLearnedItem;
  }
  const itemIid = lastLearnedItem.itemIid;
  const itemPid = lastLearnedItem.itemPid;
  trackingLine.push(learnItem.iid);
  if (learnItem.ntype !== 'syllabus') {
    const navId = parentItems.iid
      ? `${parentItems.iid}-${learnItem.iid}-${index}`
      : `${learnItem.iid}-${index}`;
    const isHeader = ['sco', 'survey'].includes(learnItem.ntype);
    // if learningItem is sco_scorm is have header but it like exam.
    // So create newNavId for learnItem is sco have tpl_type is scorm
    if (!newNavId && (!isHeader || learnItem.tpl_type === 'scorm')) {
      newNavId = navId;
    }
    if (parentItems.iid === itemPid && learnItem.iid === itemIid) {
      currentNavId = navId;
    }

    const link = Links.LearnCourseByPath(course, navId, {
      pathIid,
      isPreview,
      sessionPrefix,
      learnMode,
      navRootNodeIid,
    });

    if (learnItem.ntype === 'survey') {
      newSurveyLink = link;
    }

    navs.push({
      navId,
      isHeader,
      nodeIid: learnItem.iid,
      link,
      treeDepth,
      ntype: learnItem.ntype,
      tpl_type: learnItem.tpl_type,
      type: learnItem.type,
      tags: learnItem.tags,
    });
  }

  if (
    learnItem.children &&
    learnItem.children.length &&
    depth > 1 &&
    !isScoExam(learnItem) &&
    !isScormSco(learnItem)
  ) {
    for (let i = 0; i < learnItem.children.length; i += 1) {
      const nodeIid = learnItem.children[i];
      const child = nodes[nodeIid];
      if (!child) {
        return {};
      }
      const navItems = generateLearnNavItems(
        course,
        nodes,
        { ...moreOption, index },
        child,
        treeDepth + 1,
        learnItem, // becomes parent of the child
        navRootNodeIid,
      );
      if (!navItems || !navItems.navs) {
        return {};
      }

      newSurveyLink = (navItems && navItems.surveyLink) || newSurveyLink;

      trackingLine = trackingLine.concat(navItems.trackingLine);
      newNavId = newNavId || navItems.newNavId;
      currentNavId = currentNavId || navItems.currentNavId;
      navs = navs.concat(navItems.navs);
      index = navItems.index;
    }
  }

  return {
    trackingLine,
    newNavId,
    navs,
    index,
    currentNavId,
    surveyLink: newSurveyLink,
  };
};

export default generateLearnNavItems;
