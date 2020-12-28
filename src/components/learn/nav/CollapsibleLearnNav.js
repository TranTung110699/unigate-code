import React, { Component } from 'react';
import { isSmallScreen } from 'common';
import './CollapsibleLearnNav.scss';
import get from 'lodash.get';
import LearnNav from './index';
import Portal, { portals } from 'components/common/portal';

class CollapsibleLearnNav extends Component {
  countLearnItemsForCourseOutline = (props) => {
    const navs = get(props, 'navItems.navs', []);
    const learnItems = navs.filter((nav) => nav.isHeader === false);
    const amountOfLearnItems = learnItems.length || 0;

    return amountOfLearnItems;
  };

  constructor(props) {
    super(props);
    this.state = {
      collapseNavContent: true,
    };
  }

  render() {
    const theNav = (
      <LearnNav
        navRootNodeIid={this.props.navRootNodeIid}
        sessionPrefix={this.props.sessionPrefix}
        learnMode={this.props.learnMode}
        onPrev={this.props.onPrev}
        onNext={this.props.onNext}
      />
    );

    if (!isSmallScreen) return theNav;
    else {
      return <Portal id={portals.LEARN_NAV}>{theNav}</Portal>;
    }
    /*
    else if (isSmallScreen) {
      const collapseNavLecture = isSmallScreen && this.state.collapseNavContent;

      const counter = this.countLearnItemsForCourseOutline(this.props);

      return (<div>
        <div
          className="collapse-nav-content"
          onClick={() => {
            this.setState({
              collapseNavContent: !this.state
                .collapseNavContent,
            });
          }}
        >
          <i className="material-icons">list</i>
          <span>{`${t1(
            'course_outline',
          )} (${counter})`}</span>
          {this.state.collapseNavContent ? (
            <i className="material-icons">
              keyboard_arrow_up
            </i>
          ) : (
            <i className="material-icons">
              keyboard_arrow_down
            </i>
          )}
        </div>
        <div
          className={`${collapseNavLecture ? 'nav-lecture-show' : 'nav-lecture-collapse'}`}
        >
          {theNav}
        </div>
      </div>);
    }
    */
  }
}

export default CollapsibleLearnNav;
