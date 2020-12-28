import React from 'react';
import getCourseMenus from 'components/front-end/dashboard/show-by-tab/left-menu/configs-v2';
import get from 'lodash.get';
import Tabs from 'antd/lib/tabs';
import Widget from 'components/common/Widget';
import t1 from 'translate';
import InProgressCourses from 'components/front-end/dashboard/show-by-tab/courses/in-progress';
import AssignedCourses from 'components/front-end/dashboard/show-by-tab/courses/assigned';
import CompulsoryCourses from 'components/front-end/dashboard/show-by-tab/courses/compulsory';
import CompletedCourses from 'components/front-end/dashboard/show-by-tab/courses/completed';
import FailedCourses from 'components/front-end/dashboard/show-by-tab/courses/failed';
import RejectedCourses from 'components/front-end/dashboard/show-by-tab/courses/rejected/index';
import MyEnrolmentPlans from 'components/front-end/dashboard/show-by-tab/enrolment-plans';

const getContentInWidgetCourseOfUser = (user, id) => {
  let contentDisplay = null;
  if (!user || !id) {
    return null;
  }
  let ComponentDisplay = null;
  switch (id) {
    case 'in-progress-courses': {
      ComponentDisplay = InProgressCourses;
      break;
    }
    case 'assigned-courses': {
      ComponentDisplay = AssignedCourses;
      break;
    }
    case 'compulsory-courses': {
      ComponentDisplay = CompulsoryCourses;
      break;
    }
    case 'completed-courses': {
      ComponentDisplay = CompletedCourses;
      break;
    }
    case 'failed-courses': {
      ComponentDisplay = FailedCourses;
      break;
    }
    case 'rejected-courses': {
      ComponentDisplay = RejectedCourses;
      break;
    }
    default: {
      return null;
    }
  }
  return (
    <ComponentDisplay node={user} viewUserIid={user && user.iid} viewOnly />
  );
};

class LearningProgress extends React.Component {
  render() {
    const { node, roleUser, domainInfo } = this.props;

    const availableMenus = get(
      domainInfo,
      'conf.student_available_admin_menus',
    );

    const menuItems = getCourseMenus(availableMenus, node, roleUser);

    return (
      <div>
        <div>
          {menuItems && Array.isArray(menuItems) && menuItems.length ? (
            <div>
              {menuItems.map(({ id, title, subMenu, ...section } = {}) => {
                if (
                  id !== 'course' ||
                  !Array.isArray(subMenu) ||
                  !subMenu.length
                ) {
                  return null;
                }
                return [
                  <Widget>
                    <MyEnrolmentPlans user={node} viewOnly />
                  </Widget>,
                  <Widget>
                    <Tabs defaultActiveKey="online">
                      {subMenu
                        .map((menu) => {
                          const content = getContentInWidgetCourseOfUser(
                            node,
                            menu.id,
                          );
                          if (!content) {
                            return false;
                          }
                          return (
                            <Tabs.TabPane tab={menu.title} key={menu.id}>
                              {content}
                            </Tabs.TabPane>
                          );
                        })
                        .filter(Boolean)}
                    </Tabs>
                  </Widget>,
                ];
              })}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default LearningProgress;
