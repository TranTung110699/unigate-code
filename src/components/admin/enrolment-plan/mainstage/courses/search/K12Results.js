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
import IconButton from 'material-ui/IconButton';
import routes from 'routes';
import { Link } from 'react-router-dom';
import StaffWithRoles from './StaffWithRoles';
import { v4 } from 'uuid';
// import VarDump from 'components/common/VarDump';

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

    return (
      <div className="table-result">
        <Table selectable={false}>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>{t1('course')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('students')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('staff')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('timetable')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('action')}</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover>
            {populateRowSpanInfoToRenderListOfItemAsTable(items, [
              'credit_syllabus',
            ]).map((item) => {
              return (
                <TableRow>
                  <TableRowColumn>{item.name}</TableRowColumn>
                  <TableRowColumn>
                    {lodashGet(item, '__expand.number_of_students')}
                    {lodashGet(item, 'max_student')
                      ? `/${lodashGet(item, 'max_student')}`
                      : ''}
                  </TableRowColumn>

                  <TableRowColumn>
                    {item.__expand.staff_with_roles &&
                    item.__expand.staff_with_roles.length
                      ? item.__expand.staff_with_roles.map((s) => {
                          return <StaffWithRoles staff={s} />;
                        })
                      : ''}
                  </TableRowColumn>

                  <TableRowColumn>
                    <Link
                      to={routes.url('node_edit', {
                        ...item,
                        step: 'timetable',
                      })}
                    >
                      <IconButton
                        title={t1('timetable')}
                        iconClassName="mi mi-gradient"
                      />
                    </Link>
                  </TableRowColumn>
                  <TableRowColumn>
                    <Link target="_blank" to={`/admin/course/${item.iid}`}>
                      <IconButton
                        title={t1('manage_class')}
                        iconClassName="mi mi-remove-red-eye"
                      />
                    </Link>
                  </TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
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
