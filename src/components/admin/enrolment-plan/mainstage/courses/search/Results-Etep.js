import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import lodashGet from 'lodash.get';
import InlineEditable from 'components/common/forms/editable/inline';
import { timestampToDateTimeString } from 'common/utils/Date';
import CourseSearchResultActions from 'components/admin/course/common/CourseSearchResultActions';
import { populateRowSpanInfoToRenderListOfItemAsTable } from 'common/utils/Array';
import { t1 } from 'translate';
import sagaActions from 'actions/node/saga-creators';
import { fetchEnrolmentPlanData } from 'components/admin/enrolment-plan/common';
import AntTable from 'antd/lib/table';
import { showInTable } from 'common/utils/antd';
import styled from 'styled-components';

const TableResult = styled.div`
  .course-item-row {
    td {
      padding: 5px;
    }
  }
`;

class Results extends Component {
  updateDataInStore = (field, value, course) => {
    const { dispatch } = this.props;

    // const course = {[field]:  value};
    dispatch(
      sagaActions.updateNodeRequest({
        step: field,
        iid: course.iid,
        data: { ...course, ntype: 'course', [field]: value },
      }),
    );
  };

  render() {
    const {
      items,
      node,
      searchValues,
      searchFormId,
      columnsNotToShow,
      blackListActions,
    } = this.props;

    const width = {
      credit_syllabus: '10%',
      course: '25%',
      organizations: '15%',
      learning_type: '10%',
      start_date: '8%',
      end_date: '8%',
      students: '6%',
      status: '10%',
      action: '5%',
      approved: '5%',
      delete: '5%',
    };

    const columns = [
      /*{
        title: <strong>{t1('credit_syllabus')}</strong>,
        key: 'credit_syllabus',
        width: width.credit_syllabus,
        render: (item) => {
          if (lodashGet(item, 'rowSpans.credit_syllabus')) {
            return {
              children: lodashGet(item, '__expand.credit_syllabus.name'),
              rowSpan: lodashGet(item, '__expand.credit_syllabus.name'),
            };
          }
          return null;
        },
      },*/
      {
        title: <strong>{t1('course')}</strong>,
        key: 'course',
        width: width.course,
        render: (item) => (
          <InlineEditable
            value={item && item.name}
            propName="name"
            handleOnChange={({ name }) =>
              this.updateDataInStore('name', name, item)
            }
            validate={(newValue) => newValue && newValue.length}
          />
        ),
      },
      {
        title: <strong>{t1('organizations')}</strong>,
        key: 'organizations',
        dataIndex: 'organizations_name',
        width: width.organizations,
        render: (orgName) =>
          orgName.map((name, index) => (
            <li key={index}>
              {name}
              {index < orgName.length - 1 ? ',' : ''}
            </li>
          )),
      },
      /*{
        title: <strong>{t1('learning_type')}</strong>,
        key: 'learning_type',
        dataIndex: 'learning_type',
        width: width.learning_type,
        render: (learningType) => t1(learningType),
      },*/
      {
        title: <strong>{t1('start_date')}</strong>,
        key: 'start_date',
        dataIndex: 'start_date',
        width: width.start_date,
        className: 'text-center',
        render: (startDate) =>
          timestampToDateTimeString(startDate, { type: 'long_date' }),
      },
      {
        title: <strong>{t1('end_date')}</strong>,
        key: 'end_date',
        dataIndex: 'end_date',
        width: width.end_date,
        className: 'text-center',
        render: (endDate) =>
          timestampToDateTimeString(endDate, { type: 'long_date' }),
      },
      {
        title: <strong>{t1('students')}</strong>,
        key: 'students',
        width: width.students,
        className: 'text-center',
        render: (item) => lodashGet(item, '__expand.number_of_students'),
      },
      {
        title: <strong>{t1('status')}</strong>,
        key: 'status',
        dataIndex: 'status',
        width: width.status,
        render: (status) => t1(status),
      },
      {
        title: <strong>{t1('view')}</strong>,
        key: 'view',
        width: width.action,
        className: 'text-center',
        // fixed: 'right',
        render: (item) => (
          <CourseSearchResultActions
            deleteSuccessful={() => fetchEnrolmentPlanData(node)}
            blackListActions={blackListActions}
            course={item}
            searchFormId={searchFormId}
            isViewingEp
            showAction
            className="text-center"
            managerOnly
          />
        ),
      },
      {
        title: <strong>{t1('approve')}</strong>,
        key: 'approve',
        width: width.approved,
        className: 'text-center',
        render: (item) => (
          <CourseSearchResultActions
            deleteSuccessful={() => fetchEnrolmentPlanData(node)}
            blackListActions={blackListActions}
            course={item}
            searchFormId={searchFormId}
            isViewingEp
            showAction
            className="text-center"
            approvedOnly
          />
        ),
      },
      {
        title: <strong>{t1('delete')}</strong>,
        key: 'delete',
        width: width.delete,
        className: 'text-center',
        // fixed: 'right',
        render: (item) => (
          <CourseSearchResultActions
            deleteSuccessful={() => fetchEnrolmentPlanData(node)}
            blackListActions={blackListActions}
            course={item}
            searchFormId={searchFormId}
            isViewingEp
            showDelete
          />
        ),
      },
    ];

    return (
      <TableResult className="table-result">
        <AntTable
          columns={showInTable(columns, columnsNotToShow)}
          dataSource={populateRowSpanInfoToRenderListOfItemAsTable(items, [
            'credit_syllabus',
          ])}
          className="white-background"
          bordered
          rowKey="iid"
          pagination={false}
          childrenColumnName={null}
          rowClassName="course-item-row"
          scroll={{ y: '50vh' }}
        />
      </TableResult>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  searchFormId: PropTypes.string,
};

Results.defaultProps = {
  items: [],
  searchFormId: '',
};

export default connect()(Results);
