import React from 'react';
import { connect } from 'react-redux';
import lGet from 'lodash.get';
import { learningItemTypeViewers } from 'configs/constants';
import NavViewer from './drawNav';
import './stylesheet.scss';
import PrevNextButtons from './PrevNextButtons';
import { isSmallScreen } from 'common';

class SyllabusNav extends React.Component {
  render() {
    const { typeViewer, screenSize } = this.props;
    let { className } = this.props;
    const wrapperClassName =
      typeViewer !== learningItemTypeViewers.OVERVIEW
        ? 'ui-learn-nav'
        : 'ggg-ui-learn-nav';
    className = className
      ? `${className} ${wrapperClassName}`
      : wrapperClassName;
    const screenWidth = lGet(screenSize, 'width');

    const navPanelSmallClassname =
      screenWidth && screenWidth <= 991 ? 'nav-panel-mobile' : '';

    return (
      <div className={`${className}`}>
        <div className="learn-screen">
          <div
            className={`nav-item-panel ${
              isSmallScreen ? 'nav-item-panel-mobile' : ''
            }`}
          >
            <div className={`nav-panel ${navPanelSmallClassname} clearfix`}>
              <NavViewer {...this.props} />
            </div>

            {false /* leave out in big screen */ && !isSmallScreen && (
              <PrevNextButtons
                onNext={this.props.onNext}
                onPrev={this.props.onNext}
                positionOfCurrentItem={this.props.positionOfCurrentItem}
                displayConfigurationCourse={
                  this.props.displayConfigurationCourse
                }
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { courseIid } = props;
  let syllabus = props.navRootNodeIid ? state.tree[props.navRootNodeIid] : {};
  if (!syllabus.iid && state.learn.iid) {
    syllabus = state.tree[state.learn.iid];
  }

  let learnItem = props.navRootNodeIid ? state.tree[props.navRootNodeIid] : {};
  if (!learnItem.iid && state.learn.syllabusIid) {
    learnItem = state.tree[state.learn.syllabusIid];
  }

  const course =
    state.learn.syllabusIid !== state.learn.courseIid
      ? state.dataApiResults[state.learn.courseIid]
      : learnItem;
  const screenSize = state.common.screenSize;

  return {
    course,
    syllabus,
    nodes: state.tree,
    learnIid: state.learn.iid,
    navId: state.learn.navId,
    positionOfCurrentItem: state.learn.positionOfCurrentItem,
    learnItemIid: state.learn.itemIid,
    courseIid,
    displayConfigurationCourse: state.learn.displayConfigurationCourse,
    screenSize,
  };
};

export default connect(mapStateToProps)(SyllabusNav);
