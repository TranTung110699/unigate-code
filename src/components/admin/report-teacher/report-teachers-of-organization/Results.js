import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import { sexAsText } from 'common/sex';
import Positions from 'components/admin/group/edit/member/search-results/Positions';
import { sum } from 'common/utils/Array';
import { orgTypesSelector, confSelector } from 'common/selectors';
import { displayOrganizationTypeLabel } from 'utils/Util';
import { getOrganizationTypesToDisplayInTeachersOfOrganizationReportFromConf } from 'common/conf';

class Results extends Component {
  render() {
    const { items, orgTypes, organizationTypesToDisplay } = this.props;
    return (
      <Table className="table-border" selectable={false}>
        <TableHeader
          displaySelectAll={false}
          enableSelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn>{t1('stt')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('name')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('sex')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('positions')}</TableHeaderColumn>
            {(organizationTypesToDisplay || []).map((type) => (
              <TableHeaderColumn>
                {displayOrganizationTypeLabel(orgTypes, type)}
              </TableHeaderColumn>
            ))}
            <TableHeaderColumn>
              {t1('number_of_taught_credit_syllabuses')}
            </TableHeaderColumn>
            <TableHeaderColumn>
              {t1('number_of_taught_sessions')}
            </TableHeaderColumn>
            <TableHeaderColumn>{t1('details')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('average_survey_rating')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('have_certificate')}</TableHeaderColumn>
            <TableHeaderColumn>
              {t1('credit_syllabuses_that_user_could_teach')}
            </TableHeaderColumn>
            <TableHeaderColumn>
              {t1('credit_syllabuses_that_teacher_did_not_teach')}
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          className="table-body-align-top"
          displayRowCheckbox={false}
          showRowHover={false}
        >
          {(items || []).map((user) => {
            const creditSyllabusesThatUserTaught = Object.values(
              lodashGet(user, 'credit_syllabuses_that_user_taught') || [],
            );
            const creditSyllabusesThatUserCouldTeach = Object.values(
              lodashGet(user, 'credit_syllabuses_that_user_could_teach') || [],
            );
            const creditSyllabusesThatUserDidNotTeach = Object.values(
              lodashGet(user, 'credit_syllabuses_that_teacher_did_not_teach') ||
                [],
            );

            return (
              <TableRow key={lodashGet(user, 'id')}>
                <TableRowColumn>{lodashGet(user, 'index')}</TableRowColumn>
                <TableRowColumn>{lodashGet(user, 'name')}</TableRowColumn>
                <TableRowColumn>
                  {sexAsText(lodashGet(user, 'sex'))}
                </TableRowColumn>
                <TableRowColumn>
                  <Positions item={user} noLink />
                </TableRowColumn>
                {(organizationTypesToDisplay || []).map((orgType) => (
                  <TableRowColumn>
                    {(() => {
                      let allOrganizationsOfUser = [];
                      (
                        lodashGet(user, '__expand.user_organizations') || []
                      ).forEach((org) => {
                        allOrganizationsOfUser = allOrganizationsOfUser
                          .concat(org)
                          .concat(lodashGet(org, 'parents'));
                      });

                      return allOrganizationsOfUser
                        .filter(
                          (org) =>
                            String(lodashGet(org, 'sub_type')) ===
                            String(orgType),
                        )
                        .map((org) => <div>{lodashGet(org, 'name')}</div>);
                    })()}
                  </TableRowColumn>
                ))}
                <TableRowColumn>
                  {creditSyllabusesThatUserTaught.length}
                </TableRowColumn>
                <TableRowColumn>
                  {sum(creditSyllabusesThatUserTaught, (cs) =>
                    lodashGet(cs, 'number_of_taught_sessions'),
                  ) || 0}
                </TableRowColumn>
                <TableRowColumn>
                  <ul className="table-cell-list">
                    {creditSyllabusesThatUserTaught.map((cs) => (
                      <li key={lodashGet(cs, 'iid')}>
                        {lodashGet(cs, 'name')}:{' '}
                        <b>
                          {t1(
                            '%s_session',
                            lodashGet(cs, 'number_of_taught_sessions'),
                          )}
                        </b>
                      </li>
                    ))}
                  </ul>
                </TableRowColumn>
                <TableRowColumn>
                  {/**
                   * this logic is for seabank
                   * they want to mark survey in scale of 5 but display result in scale of 10
                   *
                   * TODO: fix this, this is just a temporary hack
                   **/}
                  {lodashGet(user, 'avg_survey_rating') * 2 || t1('n/a')}
                </TableRowColumn>
                <TableRowColumn>
                  {lodashGet(user, 'have_certificate') ? t1('yes') : t1('no')}
                </TableRowColumn>
                <TableRowColumn>
                  <ul className="table-cell-list">
                    {creditSyllabusesThatUserCouldTeach.map((cs) => (
                      <li key={lodashGet(cs, 'iid')}>
                        {lodashGet(cs, 'name')}
                      </li>
                    ))}
                  </ul>
                </TableRowColumn>
                <TableRowColumn>
                  <ul className="table-cell-list">
                    {creditSyllabusesThatUserDidNotTeach.map((cs) => (
                      <li key={lodashGet(cs, 'iid')}>
                        {lodashGet(cs, 'name')}
                      </li>
                    ))}
                  </ul>
                </TableRowColumn>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

const mapStateToProps = createSelector(
  orgTypesSelector,
  confSelector,
  (orgTypes, conf) => ({
    orgTypes,
    organizationTypesToDisplay: getOrganizationTypesToDisplayInTeachersOfOrganizationReportFromConf(
      conf,
    ),
  }),
);

export default connect(mapStateToProps)(Results);
