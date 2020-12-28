import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
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
      course: '30%',
      organizations: '10%',
      learning_type: '10%',
      start_date: '10%',
      end_date: '10%',
      students: '5%',
      status: '10%',
      action: '10%',
      delete: '5%',
    };

    const columns = [
      {
        title: t1('credit_syllabus'),
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
      },
      {
        title: t1('course'),
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
        title: t1('organizations'),
        key: 'organizations',
        dataIndex: 'organizations_name',
        width: width.organizations,
        render: (orgName) => orgName.join(', '),
      },
      {
        title: t1('learning_type'),
        key: 'learning_type',
        dataIndex: 'learning_type',
        width: width.learning_type,
        render: (learningType) => t1(learningType),
      },
      {
        title: t1('start_date'),
        key: 'start_date',
        dataIndex: 'start_date',
        width: width.start_date,
        render: (startDate) =>
          timestampToDateTimeString(startDate, {
            type: 'long_date',
            showTime: true,
          }),
      },
      {
        title: t1('end_date'),
        key: 'end_date',
        dataIndex: 'end_date',
        width: width.end_date,
        render: (endDate) =>
          timestampToDateTimeString(endDate, {
            type: 'long_date',
            showTime: true,
          }),
      },
      {
        title: t1('students'),
        key: 'students',
        width: width.students,
        render: (item) => (
          <>
            {lodashGet(item, '__expand.number_of_students')}
            {lodashGet(item, 'max_student')
              ? `/${lodashGet(item, 'max_student')}`
              : ''}
          </>
        ),
      },
      {
        title: t1('status'),
        key: 'status',
        dataIndex: 'status',
        width: width.status,
        render: (status) => t1(status),
      },
      {
        title: t1('action'),
        key: 'action',
        width: width.action,
        render: (item) => (
          <CourseSearchResultActions
            deleteSuccessful={() => fetchEnrolmentPlanData(node)}
            blackListActions={blackListActions}
            course={item}
            searchFormId={searchFormId}
            isViewingEp
            showAction
          />
        ),
      },
      {
        title: t1('delete'),
        key: 'delete',
        width: width.delete,
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
      <div className="table-result">
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
        />
      </div>
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
