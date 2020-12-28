import React, { Component } from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import SearchReport from './score-online/search';
import TakeSearch from 'components/common/forms/questions/open-ended/peer-takes/Search';
import { courseLearningTypes } from 'configs/constants';
import ScoreByRubric from './score-by-rubric';
import ScoreOverview from './overview';
import HorizontalNav from 'layouts/admin_v2/horizontal-nav/index-v2';
import courseRoutes, { subActions } from '../../routes';
import CourseScoreSyncWidget from './syncer';

const navItems = (subAction, course) => {
  const rubricIid = get(course, 'rubric_iid');
  return [
    {
      id: 'score_overview',
      active: !subAction,
      link: courseRoutes.score_dashboard(course),
      label: t1('score_overview'),
    },
    ...(!!rubricIid
      ? [
          {
            id: 'score_by_rubric',
            active: subAction === 'by-rubric',
            link: courseRoutes.score_by_rubric(course),
            label: t1('score_by_rubric'),
          },
        ]
      : []),
    // {
    //   id: 'score_online',
    //   active: subAction === 'online',
    //   link: courseRoutes.score_online(course),
    //   label: t1('score_online'),
    // },
    ...(course.learning_type == courseLearningTypes.ILT
      ? [
          {
            id: 'score_marking_open_ended_questions',
            active: subAction === 'marking-open-ended-questions',
            link: courseRoutes.score_marking_open_ended_questions(course),
            label: t1('open_ended_markings'),
          },
        ]
      : []),
  ];
};

class ScoreAndMarking extends Component {
  render() {
    const {
      course,
      dispatch,
      themeConfig,
      permissions,
      hasPermission,
      action,
      subAction,
    } = this.props;
    const rubricIid = get(course, 'rubric_iid');

    let content;

    const subActionString =
      Array.isArray(subAction) && subAction.length ? subAction[0] : null;

    switch (subActionString) {
      case subActions.BY_RUBRIC:
        content = (
          <>
            <ScoreByRubric course={course} rubricIid={rubricIid} />
          </>
        );
        break;
      case subActions.ONLINE:
        content = (
          <>
            <div className="m-l-30">
              <CourseScoreSyncWidget course={course} />
            </div>
            <SearchReport
              node={course}
              target="user"
              themeConfig={themeConfig}
              dispatch={dispatch}
              permissions={permissions}
              hasPermission={hasPermission}
            />
          </>
        );
        break;
      case subActions.MARKING_OPEN_ENDED_QUESTIONS:
        content = (
          <div className="whitebox">
            <h3>{t1('list_of_submissions')}</h3>
            <TakeSearch courseIid={course.iid} />
          </div>
        );
        break;
      default:
        // overview
        content = (
          <>
            <CourseScoreSyncWidget course={course} />
            <ScoreOverview course={course} />
          </>
        );
        break;
    }

    return (
      <>
        <HorizontalNav
          items={navItems(subActionString, course)}
          content={content}
          key={course && course.iid}
        />
      </>
    );
  }
}

export default connect()(withSchoolConfigs(ScoreAndMarking));
