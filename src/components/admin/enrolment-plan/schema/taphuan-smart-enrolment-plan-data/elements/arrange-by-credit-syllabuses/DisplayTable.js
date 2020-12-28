import React from 'react';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import AntdTable from 'antd/lib/table';
import DetailOnDialog from 'components/common/detail-on-dialog';
import ArrangeForOneCreditSyllabus from './arrange-for-one-credit-syllabus';
import { getNumberOfSelectedOrganizations } from 'components/admin/enrolment-plan/schema/taphuan-smart-enrolment-plan-data/elements/select-organizations/utils';
import AntdToggle from 'schema-form/elements/toggle';

const editDialogKey = 'taphuan_smart_enrolment_plan_arrange_by_credit_syllabus';

const Edit = ({
  creditSyllabus,
  numberOfUsers,
  numberOfTeachers,
  organizationSelection,
  enrolmentPlanTemplateIid,
  suggestedNumberOfUsersPerCourse,
}) => {
  const creditSyllabusName = lodashGet(creditSyllabus, 'name');
  const creditSyllabusIid = lodashGet(creditSyllabus, 'iid');
  const numberOfSelectedOrganizations = getNumberOfSelectedOrganizations(
    organizationSelection,
  )();

  return (
    <DetailOnDialog
      renderPreview={({ showFull }) => {
        return (
          <button onClick={showFull} type="button">
            {t1('edit')}
          </button>
        );
      }}
      renderFull={() => {
        return (
          <>
            <div>
              <div>
                <span>{t1('number_of_not_assigned_users')}: </span>
                <span>{numberOfUsers}</span>
              </div>
              <div>
                <span>Số lượng giáo viên cốt cán: </span>
                <span>{numberOfTeachers}</span>
              </div>
              <div>
                <span>{t1('suggested_number_of_users_per_course')}: </span>
                <span>{suggestedNumberOfUsersPerCourse}</span>
              </div>
              <div>
                <span>{t1('number_of_organizations')}: </span>
                <span>{numberOfSelectedOrganizations}</span>
              </div>
            </div>
            <ArrangeForOneCreditSyllabus
              creditSyllabusIid={creditSyllabusIid}
              organizationSelection={organizationSelection}
              enrolmentPlanTemplateIid={enrolmentPlanTemplateIid}
              suggestedNumberOfUsersPerCourse={suggestedNumberOfUsersPerCourse}
            />
          </>
        );
      }}
      dialogKey={editDialogKey}
      dialogOptionsProperties={{
        title: t1('arrange_courses_for_credit_syllabus_%s_with_%s_students', [
          creditSyllabusName,
          numberOfUsers,
        ]),
        width: '90%',
        handleClose: true,
      }}
    />
  );
};

const rowTypes = {
  TOTAL: 'total',
  CREDIT_SYLLABUS: 'credit_syllabus',
};

const DisplayTable = ({
  creditSyllabuses,
  totalNotAssignedUsers,
  numberOfNotAssignedUsersByCreditSyllabus,
  totalTeachers,
  numberOfTeachersByCreditSyllabus,
  organizationSelection,
  enrolmentPlanTemplateIid,
  suggestedNumberOfUsersPerCourse,
  isCreditSyllabusSelected,
  setIsCreditSyllabusSelected,
}) => {
  const getNumberOfNotAssignedUsersInCreditSyllabus = (creditSyllabusIid) => {
    return (
      lodashGet(numberOfNotAssignedUsersByCreditSyllabus, creditSyllabusIid) ||
      0
    );
  };

  const getNumberOfTeachersInCreditSyllabus = (creditSyllabusIid) => {
    return lodashGet(numberOfTeachersByCreditSyllabus, creditSyllabusIid) || 0;
  };

  const dataSource = (creditSyllabuses || [])
    .map((cs) => ({
      id: lodashGet(cs, 'id'),
      type: rowTypes.CREDIT_SYLLABUS,
      creditSyllabus: cs,
    }))
    .concat([
      {
        id: 'total',
        type: rowTypes.TOTAL,
      },
    ]);

  const getCreditSyllabusFromRow = (row) => lodashGet(row, 'creditSyllabus');

  const columns = [
    {
      title: t1('credit_syllabus_name'),
      key: 'credit_syllabus_name',
      render: (row) => {
        const rowType = lodashGet(row, 'type');
        if (rowType === rowTypes.TOTAL) {
          return t1('total');
        }

        return lodashGet(getCreditSyllabusFromRow(row), 'name');
      },
    },
    {
      title: t1('number_of_not_assigned_users'),
      key: 'number_of_not_assigned_users',
      render: (row) => {
        const rowType = lodashGet(row, 'type');
        if (rowType === rowTypes.TOTAL) {
          return totalNotAssignedUsers;
        }

        const creditSyllabusIid = lodashGet(
          getCreditSyllabusFromRow(row),
          'iid',
        );
        return getNumberOfNotAssignedUsersInCreditSyllabus(creditSyllabusIid);
      },
    },
    {
      title: 'Số lượng giáo viên cốt cán',
      key: 'number_of_teachers',
      render: (row) => {
        const rowType = lodashGet(row, 'type');
        if (rowType === rowTypes.TOTAL) {
          return totalTeachers;
        }

        const creditSyllabusIid = lodashGet(
          getCreditSyllabusFromRow(row),
          'iid',
        );
        return getNumberOfTeachersInCreditSyllabus(creditSyllabusIid);
      },
    },
    {
      title: 'Trạng thái xếp lớp',
      key: 'arrange_status',
      render: (row) => {
        const rowType = lodashGet(row, 'type');
        if (rowType === rowTypes.TOTAL) {
          return null;
        }

        const creditSyllabus = getCreditSyllabusFromRow(row);
        const creditSyllabusIid = lodashGet(creditSyllabus, 'iid');

        return (
          <Edit
            organizationSelection={organizationSelection}
            creditSyllabus={creditSyllabus}
            numberOfUsers={getNumberOfNotAssignedUsersInCreditSyllabus(
              creditSyllabusIid,
            )}
            numberOfTeachers={getNumberOfTeachersInCreditSyllabus(
              creditSyllabusIid,
            )}
            enrolmentPlanTemplateIid={enrolmentPlanTemplateIid}
            suggestedNumberOfUsersPerCourse={suggestedNumberOfUsersPerCourse}
          />
        );
      },
    },
    {
      title: t1('selected'),
      key: 'selected',
      render: (row) => {
        const rowType = lodashGet(row, 'type');
        if (rowType !== rowTypes.CREDIT_SYLLABUS) {
          return null;
        }

        const creditSyllabusIid = lodashGet(
          getCreditSyllabusFromRow(row),
          'iid',
        );

        return (
          <AntdToggle
            toggled={isCreditSyllabusSelected(creditSyllabusIid)}
            onChange={(v) => setIsCreditSyllabusSelected(creditSyllabusIid, v)}
            label={null}
          />
        );
      },
    },
  ];

  return (
    <AntdTable
      size="middle"
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      bordered
      rowKey="id"
    />
  );
};

export default DisplayTable;
