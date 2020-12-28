/**
 * Created by hungvo on 17/06/17.
 */
import React from 'react';
import NavTree from './drawTree';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import lGet from 'lodash.get';
import generateLearnNavItems from 'components/learn/nav/nav-generator';
import {
  setCurrentLearningElement,
  setPositionOfNowPlayingItemOnNav,
} from 'actions/learn';
import { getThemeConfig } from 'utils/selectors';
import { portals } from 'components/common/portal';

import './stylesheet.scss';
import { isSmallScreen } from 'common';

class NavViewer extends React.Component {
  divStyle = { marginLeft: 0 };

  constructor(props) {
    super(props);
    this.state = {
      navs: null,
      currentParentIid: null,
      display:
        (props.course && props.course.learn_nav_menu_template) || 'default',
    };
  }

  componentDidMount() {
    if (!this.state.navs) {
      this.setNavItems(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { navId, course, learnItem } = nextProps;

    const { typeViewer } = this.props;
    if (
      learnItem !== this.props.learnItem ||
      navId !== this.props.navId ||
      course !== this.props.course
    ) {
      this.setNavItems(nextProps);
    }

    if (
      (!this.state.navs &&
        nextProps &&
        nextProps.nodes &&
        Object.keys(nextProps.nodes).length) ||
      (nextProps && nextProps.typeViewer && nextProps.typeViewer !== typeViewer)
    ) {
      this.setNavItems(nextProps);
    }
  }

  setNavItems = (props) => {
    const {
      learnItem,
      navRootNodeIid,
      nodes,
      course,
      isPreview,
      rootPathIid,
      sessionPrefix,
      learnMode,
      dispatch,
    } = props;
    let { navId } = props;
    const navItems = generateLearnNavItems(
      course,
      nodes,
      { isPreview, index: -1, pathIid: rootPathIid, sessionPrefix, learnMode },
      learnItem,
      0 /*starting point*/,
      {},
      navRootNodeIid,
    );

    if (navItems && navItems.navs && navItems.navs.length) {
      navId = navId || navItems.currentNavId || navItems.newNavId;
      const newNavsList = navItems;
      const newNavs = this.setNowPlayingItemForNavs(newNavsList, navId);

      this.setState({
        navs: newNavs,
      });

      dispatch(
        setCurrentLearningElement({
          trackingLine: navItems.trackingLine,
          navId,
          navItems,
          surveyLink: navItems.surveyLink,
        }),
      );
    }

    if (this[navId] && !this.isItemVisible(this[navId])) {
      return this.scrollToItem(this[navId]);
    }
  };

  getScoId = (nav) => {
    if (!nav) return 0;
    const array = nav.navId.split('-');
    return nav.isHeader ? array[1] : array[0];
  };

  isScoScormBySyllabusIid = (navIid, syllabusIid) => {
    const array = navIid.split('-');
    if (parseInt(array[0]) === parseInt(syllabusIid)) {
      return true;
    }
    return false;
  };

  setNowPlayingItemForNavs = (navItems, navId) => {
    const trackingLine = navItems.trackingLine;
    const syllabusIid = trackingLine[0];
    const { dispatch } = this.props;
    if (!navId) {
      return navItems.navs;
    }

    let prevNavId = null;
    let navItem = {};
    navItems.navs.forEach((nav, index) => {
      if (nav.navId === navId && index > 0) {
        prevNavId = navItems.navs[index - 1].navId;
        navItem = nav;

        return [];
      }
    });

    const newNavs = [];
    let nowPlayingFlag = false;
    let index = 0;
    let positionOfCurrentItem = 'normal';
    // Vi sco-scorm have isHeader=true nen ta phai check xem navId ay co phai la navId cua sco-scorm ko
    const isNavIidScorm = this.isScoScormBySyllabusIid(navId, syllabusIid);
    const currentScoId = this.getScoId({ navId, isHeader: isNavIidScorm });
    navItems.navs.forEach((nav) => {
      index += 1;
      if (
        !nowPlayingFlag &&
        ((nav.navId === prevNavId && nav.isHeader && !navItem.isHeader) ||
          nav.navId === navId)
      ) {
        nav = { ...nav, nowPlaying: true };
        nowPlayingFlag = true;
        if (index === 1) {
          positionOfCurrentItem = 'first';
        } else if (index >= navItems.navs.length - 1) {
          positionOfCurrentItem = 'last';
        }
      }
      if (
        !nav.isHeader ||
        this.isScoScormBySyllabusIid(nav.navId, syllabusIid)
      ) {
        const navScoId = this.getScoId(nav);
        nav = { ...nav, display: currentScoId === navScoId };
      }
      newNavs.push(nav);
    });

    dispatch(
      setPositionOfNowPlayingItemOnNav({
        positionOfCurrentItem,
      }),
    );

    return newNavs;
  };

  isItemVisible = (ref) => {
    const tmp = findDOMNode(this.scrollBar);
    if (!tmp) return false;

    const scrollBar = tmp && tmp.getElementsByTagName('div')[0];
    const scrollBarTop = scrollBar.getBoundingClientRect().top;
    const scrollBarBottom = scrollBar.getBoundingClientRect().bottom;

    const element = findDOMNode(ref);
    if (!element) return false;

    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    return elementTop >= scrollBarTop && elementBottom <= scrollBarBottom;
  };

  scrollToItem = (ref) => {
    const element = findDOMNode(ref);
    if (!element) return;

    const tmp = findDOMNode(this.scrollBar);
    if (!tmp) return;

    const scrollBar = tmp.getElementsByTagName('div')[0];
    const scrollBarContent = findDOMNode(this.scrollBarContent);
    const scrollBarContentTop = scrollBarContent.getBoundingClientRect().top;
    const elementTop = element.getBoundingClientRect().top;

    scrollBar.scrollTop = elementTop - scrollBarContentTop;
  };

  renderScrollBarTrackVertical = (props) => {
    const newProps = Object.assign({}, props);
    delete newProps.style.width;
    return <div {...newProps} className="nav-scroll__track-vertical" />;
  };

  renderScrollBarThumbVertical = (props) => {
    const newProps = Object.assign({}, props);
    // delete newProps.style.width;
    // delete newProps.style.left;
    return <div {...newProps} className="nav-scroll__thumb-vertical" />;
  };

  getDataSourceToRender = (navs, { children }, nodes) => {
    if (
      !Array.isArray(children) ||
      !children.length ||
      !Array.isArray(navs) ||
      !navs.length
    ) {
      return [];
    }

    return children
      .map((iid) => {
        const node = nodes[iid];

        const nav = navs.find(({ nodeIid }) => String(nodeIid) === String(iid));
        if (!nav || !node) {
          return false;
        }
        const newChildren = this.getDataSourceToRender(navs, node, nodes);

        return {
          ...nav,
          children:
            Array.isArray(newChildren) && newChildren.length
              ? newChildren
              : null,
        };
      })
      .filter(Boolean);
  };

  renderNavContent = (navs, navId, mode) => {
    const {
      isPreview,
      isReview,
      learnItem,
      nodes,
      syllabus,
      surveyUrl,
    } = this.props;

    return (
      <div
        className={`items ${mode || ''}`}
        ref={(el) => {
          this.scrollBarContent = el;
        }}
      >
        <NavTree
          navs={navs}
          mode={mode}
          currentNavId={navId}
          isPreview={isPreview}
          isReview={isReview}
          learnItem={learnItem}
          nodes={nodes}
          syllabus={syllabus}
          surveyUrl={surveyUrl}
        />
      </div>
    );
  };

  renderThumb({ style, ...props }) {
    const thumbStyle = {
      backgroundColor: '#d3d3d3',
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }

  render() {
    const { navId, mode, screenSize, height } = this.props;
    const navs = this.state.navs || [];

    if (mode === 'overview') {
      return this.renderNavContent(navs, navId, mode);
    }

    const contentStyle = {
      height:
        height && height > 0
          ? height
          : isSmallScreen
          ? 'calc(100% - 32px)'
          : 'calc(100% - 60px)',
    };
    const screenWidth = lGet(screenSize, 'width');
    const content =
      screenWidth && screenWidth <= 991 ? (
        <div>{this.renderNavContent(navs, navId, mode)}</div>
      ) : (
        <Scrollbars
          // className="nav-scroll"
          // renderTrackVertical={this.renderScrollBarTrackVertical}
          // renderThumbVertical={this.renderScrollBarThumbVertical}
          ref={(el) => {
            this.scrollBar = el;
          }}
          style={contentStyle}
        >
          {this.renderNavContent(navs, navId, mode)}
          <div id={portals.SP1_QUESTION_NAV_INSIDE_COURSE_LEARN_NAV} />
        </Scrollbars>
      );

    return content;
  }
}

const mapStateToProps = (state, props) => {
  const navRootNodeIid = props.navRootNodeIid;
  let learnItem = navRootNodeIid ? state.tree[navRootNodeIid] : {};
  const syllabusIid = lGet(state, 'learn.syllabusIid');

  const syllabus = lGet(state, `tree.${syllabusIid}`);

  if (!learnItem.iid && syllabusIid) {
    learnItem = state.tree[syllabusIid];
  }

  const course =
    state.learn.syllabusIid !== state.learn.courseIid
      ? state.dataApiResults[state.learn.courseIid]
      : learnItem;
  const isPreview = state.learn.isPreview;
  const isReview = state.learn.isReview;
  const rootPathIid = state.learn.rootPathIid;
  const typeViewer = state.learn.typeViewer;
  const surveyUrl = state.learn.surveyLink;

  return {
    course,
    syllabus,
    nodes: state.tree,
    learnItem,
    navRootNodeIid,
    isPreview,
    isReview,
    typeViewer,
    rootPathIid,
    themeConfig: getThemeConfig(state),
    surveyUrl,
    syllabusIid: state.learn.syllabusIid,
  };
};

export default connect(mapStateToProps)(NavViewer);
