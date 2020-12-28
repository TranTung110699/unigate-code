import React, { Component } from 'react';
import { timestampToDateString, timeStampToTime } from 'common/utils/Date';
import { t1 } from 'translate';
import routes from 'routes';
import VarDump from 'components/common/VarDump';
import RaisedButton from 'components/common/mui/RaisedButton';
import { Link } from 'react-router-dom';
import DetailOnDialog from 'components/common/detail-on-dialog';
import CreateEnrolmentPlan from '../enrolment-plan/new';
import Warning from '../../../../common/Warning';

const getSemesterName = (group, semesterIid) => {
  let ret = '';
  if (group.semesters) {
    group.semesters.forEach((sem) => {
      if (sem.iid == semesterIid) ret = sem.name;
    });
  }
  return ret;
};

class EnrolmentPlanList extends Component {
  showAddEnrolmentPlanForm = (closeDialog, semester) => {
    const { group } = this.props;
    return <CreateEnrolmentPlan group={group} semester={semester} />;
  };

  render() {
    const { group, showCreate } = this.props;

    const addEpLink = routes.url(
      'node_edit',
      Object.assign({}, group, {
        ntype: 'group',
        step: `add-ep`,
      }),
    );

    return (
      <div>
        <div>
          {group.semester_iids && group.semester_iids.length ? (
            group.semester_iids.map((semesterIid) => {
              let ep = null;
              if (group.enrolment_plans && group.enrolment_plans.length) {
                ep = group.enrolment_plans.find(
                  (el) => el.semester == semesterIid,
                );
              }

              let epOptional = null;
              if (
                group.optional_enrolment_plans &&
                group.optional_enrolment_plans.length
              ) {
                epOptional = group.optional_enrolment_plans.find(
                  (el) => el.semester == semesterIid,
                );
              }

              let semester =
                group && group.semesters && group.semesters.length
                  ? group.semesters.find((sem) => sem.iid == semesterIid)
                  : {};

              return (
                <div className={'m-b-20'}>
                  <h3>
                    <b>
                      {t1('semester')}: {semester.name}
                    </b>
                  </h3>

                  <div>
                    {t1('duration')}:{' '}
                    <span className="text-bold">
                      {timestampToDateString(semester.start_date)}
                    </span>{' '}
                    -{' '}
                    <span className="text-bold">
                      {timestampToDateString(semester.end_date)}
                    </span>
                  </div>

                  {ep ? (
                    <Link to={`/admin/enrolment-plan/${ep.iid}/courses`}>
                      <RaisedButton primary label={t1('view_enrolment_plan')} />{' '}
                      (
                      <span>
                        {t1('created')}: {timeStampToTime(ep.ts)} -{' '}
                        {timestampToDateString(ep.ts)}
                      </span>
                      )
                    </Link>
                  ) : (
                    <Warning>{t1('not_yet_setup')}</Warning>
                  )}
                  <div>
                    <br />
                    {showCreate ? (
                      <DetailOnDialog
                        textPreview={t1('create_enrolment_plan')}
                        renderFull={({ closeDialog }) =>
                          this.showAddEnrolmentPlanForm(closeDialog, semester)
                        }
                        dialogKey={`semester-info-${semesterIid}`}
                      />
                    ) : null}
                  </div>

                  {epOptional ? (
                    <Link
                      to={`/admin/enrolment-plan/${epOptional.iid}/courses`}
                    >
                      <RaisedButton
                        primary
                        label={t1('view_optional_enrolment_plan')}
                      />{' '}
                      (
                      <span>
                        {t1('created')}: {timeStampToTime(ep.ts)} -{' '}
                        {timestampToDateString(ep.ts)}
                      </span>
                      )
                    </Link>
                  ) : (
                    <span>
                      {t1('no_optional_enrolment_plan_for_group_or_grade')}
                    </span>
                  )}
                </div>
              );
            })
          ) : (
            <Warning>{t1('group_has_no_semesters_attached')}</Warning>
          )}
          {/*
          <VarDump data={group}/>
             */}
        </div>
        {/*
          <div>
            { this.props.showCreate ?
              <Link to={addEpLink}><RaisedButton primary label={t1('create_new_enrolment_plan')}/></Link> : null
            }
          </div>
           */}
      </div>
    );
  }
}

export default EnrolmentPlanList;
