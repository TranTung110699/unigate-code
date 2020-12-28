import React from 'react';
import AntdTable from 'antd/lib/table';
import { userGrades, userGradeToText } from 'configs/constants/user';
import lodashGet from 'lodash.get';
import { filterDuplicate } from 'common/utils/Array';

const NumberOfUsers = ({ number }) => {
  return <span>{number}</span>;
};

const NumberOfUsersByCategoryAndOrganization = ({
  numberOfUsersDataGroupByOrganization,
  numberOfUsersDataGroupByOrganizationAndCategory,

  subOrganizations,
  organization,
  academicCategories,
}) => {
  const displayNumberOfUsers = (orgIid, categoryIid) => {
    let number = 0;

    if (categoryIid === 'total') {
      number =
        lodashGet(
          (numberOfUsersDataGroupByOrganization || []).find((d) => {
            return lodashGet(d, 'user_organization_or_ancestor') == orgIid;
          }),
          'total',
        ) || 0;
    } else {
      number =
        lodashGet(
          (numberOfUsersDataGroupByOrganizationAndCategory || []).find((d) => {
            return (
              lodashGet(d, 'academic_category') == categoryIid &&
              lodashGet(d, 'user_organization_or_ancestor') == orgIid
            );
          }),
          'total',
        ) || 0;
    }

    return <NumberOfUsers number={number} />;
  };

  const columns = [
    {
      title: 'Môn',
      key: 'academic_category',
      render: (row) => {
        const id = lodashGet(row, 'id');
        const category = lodashGet(row, 'category');

        if (id === 'total') {
          return 'Tổng số';
        }

        if (id === 'unknown') {
          return 'Không có thông tin môn học';
        }

        return lodashGet(category, 'name');
      },
    },
    {
      title: 'Toàn bộ đơn vị',
      key: 'all',
      render: (row) => {
        const id = lodashGet(row, 'id');
        const category = lodashGet(row, 'category');
        const organizationIid = lodashGet(organization, 'iid');

        if (id === 'total') {
          return displayNumberOfUsers(organizationIid, 'total');
        }

        if (id === 'unknown') {
          return displayNumberOfUsers(organizationIid, null);
        }

        const categoryIid = lodashGet(category, 'iid');
        return displayNumberOfUsers(organizationIid, categoryIid);
      },
    },
    ...(subOrganizations || []).map((org) => {
      const orgIid = lodashGet(org, 'iid');
      const orgName = lodashGet(org, 'name');
      const orgShortName = lodashGet(org, 'short_name');

      return {
        title: orgShortName || orgName,
        key: `sub_organization_${orgIid}`,
        render: (row) => {
          const id = lodashGet(row, 'id');
          const category = lodashGet(row, 'category');

          if (id === 'total') {
            return displayNumberOfUsers(orgIid, 'total');
          }

          if (id === 'unknown') {
            return displayNumberOfUsers(orgIid, null);
          }

          const categoryIid = lodashGet(category, 'iid');
          return displayNumberOfUsers(orgIid, categoryIid);
        },
      };
    }),
  ];

  // the first element {} present the 'total' row
  const dataSource = [
    {
      id: 'total',
    },
  ]
    .concat(
      (academicCategories || []).map((category) => ({
        id: lodashGet(category, 'id'),
        category,
      })),
    )
    // this element present the users with no academic categories data
    .concat([
      {
        id: 'unknown',
      },
    ]);

  return (
    <AntdTable
      bordered
      rowKey="id"
      size="middle"
      pagination={false}
      className="white-background"
      columns={columns}
      onExpand={null}
      dataSource={dataSource}
      scroll={{
        x: true,
      }}
    />
  );
};

const TableResult = ({ result }) => {
  const {
    number_of_users_data: numberOfUsersData,
    organization: organization,
    sub_organizations: subOrganizations,
    academic_categories_by_grades: academicCategoriesByGrade,
  } = result || {};

  if (!result) {
    return null;
  }

  return Object.values(userGrades)
    .concat([null])
    .map((grade) => {
      const numberOfUsersDataGroupByOrganization = (
        lodashGet(numberOfUsersData, 'group_by_grade_and_organization') || []
      ).filter((d) => lodashGet(d, 'grade') === grade);

      const numberOfUsersDataGroupByOrganizationAndCategory = (
        lodashGet(
          numberOfUsersData,
          'group_by_grade_organization_and_academic_category',
        ) || []
      ).filter((d) => lodashGet(d, 'grade') === grade);

      const academicCategories = grade
        ? lodashGet(academicCategoriesByGrade, grade)
        : filterDuplicate(
            Object.values(academicCategoriesByGrade).flat(),
            (category) => String(lodashGet(category, 'iid')),
          );

      return (
        <div key={grade} style={{ paddingBottom: 30 }}>
          <h2>
            {!grade
              ? 'Không có thông tin cấp giảng dạy'
              : userGradeToText(grade)}
          </h2>
          <NumberOfUsersByCategoryAndOrganization
            numberOfUsersDataGroupByOrganization={
              numberOfUsersDataGroupByOrganization
            }
            numberOfUsersDataGroupByOrganizationAndCategory={
              numberOfUsersDataGroupByOrganizationAndCategory
            }
            organization={organization}
            subOrganizations={subOrganizations}
            academicCategories={academicCategories}
          />
        </div>
      );
    });
};

export default TableResult;
