/* eslint-disable no-undef,react/sort-comp,react/prop-types,jsx-a11y/anchor-is-valid */
/**
 * Created by hungvo on 23/11/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import lodashGet from 'lodash.get';

import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import { getThemeConfigSelector } from 'utils/selector';
import { schoolTypes } from 'configs/constants';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'components/common/mui/Table';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';

import CourseEditor from './CourseEditorByCreditPlan';

class EditorByCreditSyllabusPlan extends Component {
  renderResultComponent = (items) => (
    <div>
      {items && items.length > 0 && (
        <Table>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>{t1('name')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('code')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('max_students')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('staff')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('start_date')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('end_date')}</TableHeaderColumn>
              {lodashGet(this.props.themeConfig, 'type') ===
                schoolTypes.SIS && (
                <TableHeaderColumn width="20%">{t1('timer')}</TableHeaderColumn>
              )}
              <TableHeaderColumn>{t1('action')}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items.map((item) => (
              <CourseEditor
                {...this.props}
                courseIid={item && item.iid}
                deleteSuccessful={this.props.onDeleteCourseSuccessful}
              />
            ))}
          </TableBody>
        </Table>
      )}
      <Divider />
    </div>
  );

  render() {
    const { formid, hiddenFields, searchResultKey } = this.props;
    return (
      <SearchWrapper
        formid={formid}
        ntype="course"
        searchResultKey={searchResultKey}
        renderResultsComponent={this.renderResultComponent}
        hiddenFields={hiddenFields}
        showQueryField={false}
        autoSearchWhenStart
        showResult
        alternativeApi={apiUrls.course_search}
      />
    );
  }
}

EditorByCreditSyllabusPlan.propTypes = {
  action: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  itemAncestors: PropTypes.arrayOf(PropTypes.any),
};
EditorByCreditSyllabusPlan.defaultProps = {
  action: '',
  dispatch: () => {},
  itemAncestors: [],
};

const mapStateToProps = (state) => ({
  themeConfig: getThemeConfigSelector(state),
});

export default connect(mapStateToProps)(EditorByCreditSyllabusPlan);
