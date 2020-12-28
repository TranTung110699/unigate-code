import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import routes from 'routes';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';

const searchFormSchema = {};

const renderResults = (courses) => (
  <Table className="table-border" selectable={false}>
    <TableHeader
      displaySelectAll={false}
      enableSelectAll={false}
      adjustForCheckbox={false}
    >
      <TableRow>
        <TableHeaderColumn>{t1('course')}</TableHeaderColumn>
        <TableHeaderColumn>{t1('roles')}</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody
      className="table-body-align-top"
      displayRowCheckbox={false}
      showRowHover={false}
    >
      {(courses || []).map((c) => {
        return (
          <TableRow key={lodashGet(c, 'id')}>
            <TableRowColumn>
              <Link
                to={routes.url('node_edit', {
                  iid: lodashGet(c, 'iid'),
                  ntype: 'course',
                })}
              >
                {lodashGet(c, 'name')}
              </Link>
            </TableRowColumn>
            <TableRowColumn>
              {(lodashGet(c, 'user_roles') || [])
                .map((role) => lodashGet(role, 'name'))
                .join(', ')}
            </TableRowColumn>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);

const CoursesThatUserHasRole = () => (
  <SearchWrapper
    formid={`courses_that_user_has_role`}
    schema={searchFormSchema}
    renderResultsComponent={renderResults}
    alternativeApi={apiUrls.search_courses_that_user_has_role}
    autoSearchWhenStart
    showSearchButton={false}
  />
);

export default CoursesThatUserHasRole;
