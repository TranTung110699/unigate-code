import React from 'react';
import { Link } from 'react-router-dom';
import { getDashboardUrl } from 'routes/links/common';
import MyEnrolmentPlans from 'components/front-end/dashboard/show-by-tab/enrolment-plans';
import { t1 } from 'translate';
import InProgressCourses from '../in-progress';
import CompletedCourses from '../completed';
import FailedCourses from '../failed';
import './style.scss';
import AssignmentQuestionOE from '../../../widget/question-OE';
import LatestCommentsOfUserCourses from '../../../widgets/latest-comments-of-user-courses';
import PageWrapper from '../../PageWrapper';
import Card from 'antd/lib/card';
import Perm from 'common/utils/Perm';
import AntdButton from 'antd/lib/button';
import UserInfoOnTop from '../../enrolment-plans/user-info-on-top';
import styled from 'styled-components';
import ViewMore from 'components/front-end/common/button-flat';

const Content = styled.div`
  padding: 15px;
  @media (max-width: 767px) {
    padding: 15px 0;
  }
`;

const OverviewCourses = () => {
  if (window.isGoJapan) {
    return (
      <div className="row overview-courses-container">
        {Perm.isGuest() ? (
          <div className="text-center">
            <Link to={'/user/login'}>
              <AntdButton type="primary" icon="user">
                {t1('login')}
              </AntdButton>
            </Link>
          </div>
        ) : (
          <Content>
            <UserInfoOnTop />
          </Content>
        )}
        <Content>
          <InProgressCourses
            formid="in_progress_courses_overview"
            itemsPerPage={3}
            renderAfterResult={() => (
              <ViewMore to={getDashboardUrl('in-progress-courses')}>
                {t1('view_more')}
              </ViewMore>
            )}
            notShowPublicCoursesIfNoResult
            hidePagination
            noSchema
          />
        </Content>
      </div>
    );
  }
  return (
    <div className="row overview-courses-container">
      <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
        <InProgressCourses
          formid="in_progress_courses_overview"
          itemsPerPage={3}
          renderAfterResult={() => (
            <ViewMore to={getDashboardUrl('in-progress-courses')}>
              {t1('view_more')}
            </ViewMore>
          )}
          notShowPublicCoursesIfNoResult
          hidePagination
          noSchema
        />
        <MyEnrolmentPlans
          itemsPerPage={3}
          hidePagination
          renderAfterResult={() => (
            <ViewMore to={getDashboardUrl('my-enrolment-plans')}>
              {t1('view_more')}
            </ViewMore>
          )}
        />
        <CompletedCourses
          formid="completed_courses_overview"
          itemsPerPage={3}
          hidePagination
          renderAfterResult={() => (
            <ViewMore to={getDashboardUrl('completed-courses')}>
              {t1('view_more')}
            </ViewMore>
          )}
        />
        <FailedCourses
          formid="failed_courses_overview"
          itemsPerPage={3}
          hidePagination
          renderAfterResult={() => (
            <ViewMore to={getDashboardUrl('failed-courses')}>
              {t1('view_more')}
            </ViewMore>
          )}
        />
      </div>

      <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 widget">
        {window.isETEP ? (
          <PageWrapper title={t1('list_of_open_ended_questions')}>
            <div className="whitebox">
              <AssignmentQuestionOE />
            </div>
          </PageWrapper>
        ) : null}
        <PageWrapper title={t1('latest_comments_in_your_courses')}>
          <Card
            style={{ maxHeight: 700, overflowY: 'auto' }}
            size="small"
            className="scroll"
          >
            <LatestCommentsOfUserCourses />
          </Card>
        </PageWrapper>
      </div>
    </div>
  );
};

export default OverviewCourses;
