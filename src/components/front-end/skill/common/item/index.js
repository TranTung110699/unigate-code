import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { t1, t4 } from 'translate';
import Icon from 'components/common/Icon';
import LinearProgress from 'material-ui/LinearProgress';
import { Link } from 'react-router-dom';
import Links from 'routes/links';
import './stylesheet.scss';

class Index extends Component {
  linearProgressStyle = { backgroundColor: '#eaeaea' };

  constructor(props) {
    super(props);

    this.state = {
      activatedSkillLearningItems: [],
      hideChildrenSkills: [],
      activatedChildrenSkills: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { skill } = this.props;
    if (
      ((!skill || !skill.iid) &&
        nextProps &&
        nextProps.skill &&
        nextProps.skill.iid) ||
      ((!skill || !skill.children) &&
        nextProps &&
        nextProps.skill &&
        nextProps.skill.children)
    ) {
      this.initActivatedChildrenSkills(nextProps.skill);
    }
  }

  initActivatedChildrenSkills = (skill) => {
    const activatedChildrenSkills = this.state.activatedChildrenSkills;

    if (skill.children && skill.children.length > 0) {
      skill.children.forEach((skillChildren) => {
        activatedChildrenSkills.push(skillChildren.iid);
      });
    }

    this.setState({
      activatedChildrenSkills,
    });
  };

  toggleShowSkillLearningItems = (skillIid) => {
    if (
      skillIid &&
      this.state.activatedSkillLearningItems
        .map(String)
        .indexOf(String(skillIid)) !== -1
    ) {
      const index = this.state.activatedSkillLearningItems
        .map(String)
        .indexOf(String(skillIid));
      const activatedSkillLearningItems = this.state
        .activatedSkillLearningItems;
      activatedSkillLearningItems.splice(index, 1);

      this.setState({
        activatedSkillLearningItems,
      });
    } else {
      const activatedSkillLearningItems = this.state
        .activatedSkillLearningItems;
      activatedSkillLearningItems.push(skillIid);

      this.setState({
        activatedSkillLearningItems,
      });
    }
  };

  isShowChildrenSkills = (skillIId, childrenLevel) => {
    const { activatedChildrenSkills, hideChildrenSkills } = this.state;
    return (
      activatedChildrenSkills.map(String).indexOf(String(skillIId)) !== -1 ||
      (hideChildrenSkills.map(String).indexOf(String(skillIId)) === -1 &&
        childrenLevel <= 1)
    );
  };

  toggleShowChildrenSkills = (skillIid, childrenLevel) => {
    if (this.isShowChildrenSkills(skillIid, childrenLevel)) {
      const hideChildrenSkills = this.state.hideChildrenSkills;
      const activatedChildrenSkills = this.state.activatedChildrenSkills;

      const index = this.state.activatedChildrenSkills
        .map(String)
        .indexOf(String(skillIid));
      activatedChildrenSkills.splice(index, 1);
      hideChildrenSkills.push(skillIid);

      this.setState({
        activatedChildrenSkills,
        hideChildrenSkills,
      });
    } else {
      const activatedChildrenSkills = this.state.activatedChildrenSkills;
      const hideChildrenSkills = this.state.hideChildrenSkills;

      const index = this.state.hideChildrenSkills
        .map(String)
        .indexOf(String(skillIid));
      activatedChildrenSkills.push(skillIid);
      hideChildrenSkills.splice(index, 1);

      this.setState({
        activatedChildrenSkills,
        hideChildrenSkills,
      });
    }
  };

  displaySkillChildren = (children, childrenLevel) => {
    const { isPassedVisible } = this.props;
    let isHasResult = false;
    return (
      <div>
        {children &&
          children.map((item) => {
            if (!isHasResult)
              isHasResult =
                item &&
                (isPassedVisible &&
                  isPassedVisible.map(String).indexOf(String(item.pf)) >= 0);
            return (
              item &&
              (isPassedVisible &&
                isPassedVisible.map(String).indexOf(String(item.pf)) >= 0) && (
                <div
                  className={`skill-wrapper skill-wrapper-${childrenLevel} ${
                    item.pf ? 'passed' : 'failed'
                  }`}
                  key={item.id}
                >
                  <div className="row skill-detail">
                    <div className="col-md-7">
                      <div className={`level-${childrenLevel}`}>
                        <div className="row">
                          <div className="col-lg-1 col-md-1 col-sm-1 col-xs-2">
                            {item.children && item.children.length > 0 && (
                              <div
                                className="control-btn"
                                onClick={() => {
                                  this.toggleShowChildrenSkills(
                                    item.iid,
                                    childrenLevel,
                                  );
                                }}
                              >
                                {this.isShowChildrenSkills(
                                  item.iid,
                                  childrenLevel,
                                ) ? (
                                  <Icon icon="keyboard_arrow_down" />
                                ) : (
                                  <Icon icon="keyboard_arrow_right" />
                                )}
                              </div>
                            )}
                          </div>
                          <div className="col-lg-11 col-md-11 col-sm-11 col-xs-10">
                            <div className="content-wrapper">
                              <div
                                onClick={() => {
                                  this.toggleShowChildrenSkills(
                                    item.iid,
                                    childrenLevel,
                                  );
                                }}
                                className="name"
                              >
                                {item.name}
                              </div>
                              {item.metadata && (
                                <div
                                  onClick={() => {
                                    this.toggleShowChildrenSkills(
                                      item.iid,
                                      childrenLevel,
                                    );
                                  }}
                                  className="skills"
                                >{`(${item.metadata.length} ${t4(
                                  'skills',
                                )})`}</div>
                              )}
                              {item.time_learn_last && (
                                <div className="last-learn-time">
                                  <Icon icon="time" /> {item.time_learn_last}
                                </div>
                              )}
                              <LinearProgress
                                className="progress"
                                color="#acacac"
                                mode="determinate"
                                value={item.p}
                                style={this.linearProgressStyle}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="adaptive-property-wrapper">
                        <div className="adaptive-property">
                          <div className="value-wrapper">
                            <div className="value">{item.time_spent}</div>
                          </div>
                          <div className="meaning">
                            {t1('spent_time_to_learn')}
                          </div>
                        </div>
                        <div className="adaptive-property">
                          <div className="value-wrapper">
                            <div className="value">{item.tpc}</div>
                          </div>
                          <div className="meaning">{t1('correct')}</div>
                        </div>
                        <div className="adaptive-property">
                          <div className="value-wrapper">
                            <div className="value">{item.tfc}</div>
                          </div>
                          <div className="meaning">{t1('incorrect')}</div>
                        </div>
                        <div className="adaptive-property">
                          <div
                            className={`show-learning-items-btn ${
                              this.state.activatedSkillLearningItems
                                .map(String)
                                .indexOf(String(item.iid)) !== -1
                                ? 'active'
                                : ''
                            }`}
                            onClick={() => {
                              this.toggleShowSkillLearningItems(item.iid);
                            }}
                          >
                            <Icon icon="video" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {item.learning_items &&
                    this.state.activatedSkillLearningItems
                      .map(String)
                      .indexOf(String(item.iid)) !== -1 && (
                      <div className="row">
                        <div className="learning-items col-md-12">
                          {item.learning_items.map((learningItem) => (
                            <div className="learning-item">
                              <div className="adaptive-property-wrapper">
                                <div className="adaptive-property">
                                  <div className="show-learning-items-btn">
                                    <Link
                                      to={Links.LearnCourseByPath(
                                        learningItem.course,
                                        learningItem.iid,
                                      )}
                                    >
                                      <Icon icon={learningItem.type} />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <div className="name">
                                <Link
                                  to={Links.LearnCourseByPath(
                                    learningItem.course,
                                    learningItem.iid,
                                  )}
                                >
                                  {learningItem.name}
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  {(!item.learning_items || item.learning_items.length === 0) &&
                    this.state.activatedSkillLearningItems
                      .map(String)
                      .indexOf(String(item.iid)) !== -1 && (
                      <div className="row">
                        <div className="learning-items col-md-12">
                          <div className="learning-item">
                            <div className="adaptive-property-wrapper no-items">
                              {t1('there_are_no_learning_items_for_this_skill')}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  {item.children &&
                    item.children.length > 0 &&
                    this.isShowChildrenSkills(item.iid, childrenLevel) && (
                      <div className="skill-children-wrapper">
                        {this.displaySkillChildren(
                          item.children,
                          childrenLevel + 1,
                        )}
                      </div>
                    )}
                </div>
              )
            );
          })}
        {!isHasResult && (
          <div className="text-center">{t1('there_are_no_skill')}</div>
        )}
      </div>
    );
  };

  render() {
    const { skill } = this.props;
    const childrenLevel = 1;

    return (
      <div className="skills-container">
        {skill && (
          <div className="skill-wrapper">
            {skill.children && skill.children.length > 0 && (
              <div className="skill-children-wrapper">
                {this.displaySkillChildren(skill.children, childrenLevel)}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

Index.propTypes = {
  skill: PropTypes.shape(),
  isPassedVisible: PropTypes.arrayOf(PropTypes.any),
};

Index.defaultProps = {
  skill: {},
  isPassedVisible: [],
};

export default Index;
