import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntdTable from 'antd/lib/table';
import { t1 } from 'translate/index';
import { Link } from 'react-router-dom';
import lodashGet from 'lodash.get';
import Icon from 'components/common/Icon/index';
import OpenEndedTake from 'components/common/open-ended-take/index';
import LinearProgress from 'material-ui/LinearProgress';
import Links from 'routes/links/index';
import Progress from 'antd/lib/progress';

import './style.scss';

const strokeColor = (cp) => {
  if (cp < 50) {
    return 'orange';
  } else return '#229E9A';
};

class Results extends Component {
  showContestResultBaseOnTopEquivalentPositionsData = () => {
    let contestResultBaseOnTopEquivalentPositionsData = [];
    const topEquivalentPositions = this.props.topEquivalentPositions || [];

    for (
      let keyIndex = 0;
      keyIndex < topEquivalentPositions.length;
      ++keyIndex
    ) {
      contestResultBaseOnTopEquivalentPositionsData.push({
        title: `${topEquivalentPositions[keyIndex].CDANHTDUONG_EVN}`,
        render: (text, row) => {
          return (
            <div>
              {row &&
              row[
                `numbers_of_joined_users_` +
                  topEquivalentPositions[keyIndex].iid
              ] ? (
                <span>
                  {Number(
                    (
                      row[
                        `score_per_100_` + topEquivalentPositions[keyIndex].iid
                      ] /
                      row[
                        `numbers_of_joined_users_` +
                          topEquivalentPositions[keyIndex].iid
                      ]
                    ).toFixed(1),
                  )}
                </span>
              ) : (
                <span>0</span>
              )}
            </div>
          );
        },
      });
    }

    return contestResultBaseOnTopEquivalentPositionsData;
  };

  render() {
    const { items } = this.props;
    const columns = [
      {
        title: t1('name'),
        key: 'name',
        render: (text, row, index) => {
          return {
            children: row.user.name,
          };
        },
      },
      {
        title: t1('organization'),
        key: 'organization',
        render: (text, row) => {
          let org = lodashGet(row, 'user.__expand.user_organizations');
          if (org && org.length) {
            return <span>{lodashGet(org[0], 'name', '')}</span>;
          }
          return null;
        },
      },
      {
        title: t1('syllabus_name'),
        key: 'syllabus',
        render: (text, row) => {
          return (
            <div>
              {lodashGet(row, 'credit_syllabus.name')}
              {/*
              <div>
                ({lodashGet(row, 'enrolment_plan.name')})
              </div>

                 */}
            </div>
          );
        },
      },
      {
        title: t1('learning_progress'),
        width: '150px',
        key: 'learning_progress',
        render: (text, row) => {
          const cp = lodashGet(row, 'progress.cp') || 0;
          return (
            <div className="report-course-status-wrapper">
              {/*
              <Line
                percent={cp}
                strokeWidth="2"
                strokeColor={strokeColor(cp)}
              />
                 */}

              <div className="progress-wrapper">
                <Progress strokeColor={strokeColor(cp)} percent={cp} />
              </div>
            </div>
          );
        },
      },
      {
        title: t1('open_ended_questions'),
        width: '30%',
        key: 'open_ended_questions',
        render: (text, row) => {
          return (
            <div>
              {lodashGet(row, 'open_ended_takes')
                ? lodashGet(row, 'open_ended_takes').map((take, index) => (
                    <OpenEndedTake take={take} simple index={index} />
                  ))
                : null}
            </div>
          );
        },
      },
      {
        title: t1('actions'),
        key: 'actions',
        render: (text, row) => {
          const course = lodashGet(row, 'progress_course');
          if (course && course.course_iid) {
            course.iid = course.course_iid;
            course.credit_syllabus = lodashGet(row, 'credit_syllabus.iid');
            course.slug = lodashGet(row, 'credit_syllabus.slug');
          }

          const uiid = lodashGet(row, 'user.iid');

          return (
            <div>
              {course ? (
                <Link to={`#!${Links.adminOverviewCourseOfUser(uiid, course)}`}>
                  <Icon icon="eye" /> {t1('view_details')}
                </Link>
              ) : null}
            </div>
          );
        },
      },
    ];

    const mobileColumns = [
      {
        title: t1('student'),
        key: 'student',
        render: (text, row, index) => {
          let org = lodashGet(row, 'user.__expand.user_organizations');
          return (
            <div>
              <b>{row.user.name}</b>
              <br />
              <span>{org && org.length && org[0].name}</span>
            </div>
          );
        },
      },
      {
        title: t1('student_progress'),
        key: 'student_progress',
        render: (text, row) => {
          const cp = lodashGet(row, 'progress.cp') || 0;

          return (
            <div>
              {lodashGet(row, 'credit_syllabus.name')} <br />
              <div className="report-course-status-wrapper">
                <div className="progress-wrapper">
                  <LinearProgress
                    className="progress"
                    color={strokeColor(cp)}
                    mode="determinate"
                    value={cp}
                  />
                  <div className="progress-title" style={{ width: `${cp}%` }}>
                    {`${cp}%`}
                  </div>
                </div>
              </div>
              <br />
              <div>
                {lodashGet(row, 'open_ended_takes')
                  ? lodashGet(row, 'open_ended_takes').map((take, index) => (
                      <OpenEndedTake take={take} simple index={index} />
                    ))
                  : null}
              </div>
            </div>
          );
        },
      },
      {
        title: t1('actions'),
        key: 'actions',
        render: (text, row) => {
          const course = lodashGet(row, 'progress_course');
          if (course && course.course_iid) {
            course.iid = course.course_iid;
            course.credit_syllabus = lodashGet(row, 'credit_syllabus.iid');
            course.slug = lodashGet(row, 'credit_syllabus.slug');
          }

          const uiid = lodashGet(row, 'user.iid');

          return (
            <div>
              {course ? (
                <Link to={`#!${Links.adminOverviewCourseOfUser(uiid, course)}`}>
                  <Icon icon="eye" /> {t1('view_details')}
                </Link>
              ) : null}
            </div>
          );
        },
      },
    ];

    return (
      <div className={'student-detail-progress-wrapper'}>
        <div className={'web-content'}>
          <AntdTable
            columns={columns}
            dataSource={items}
            pagination={false}
            bordered
            size="middle"
            className="report-contest-result"
            rowKey="id"
          />
        </div>
        <div className={'mobile-content'}>
          <AntdTable
            columns={mobileColumns}
            dataSource={items}
            pagination={false}
            bordered
            size="middle"
            className="report-contest-result"
            rowKey="id"
          />
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default Results;
