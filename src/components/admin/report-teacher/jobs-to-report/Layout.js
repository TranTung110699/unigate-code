import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import lodashGet from 'lodash.get';

import { t, t1 } from 'translate';
import { getUrl } from 'routes/links/common';
import { jobsActions } from 'actions/job';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';

import { menuItems } from '../menu/sub-left-menu-configs';
import { reportJobs, reportJobUsageTypes } from './configs';

class Results extends Component {
  cronJobsToReport = (url, params, name) => {
    const { dispatch } = this.props;

    dispatch(jobsActions.cronJobsToReport(url, params, name));
  };

  render() {
    const { listOfJobsToReport } = this.props;

    const filteredJobs = [];
    if (listOfJobsToReport) {
      reportJobs().forEach((job) => {
        if (listOfJobsToReport.includes(job.id)) {
          filteredJobs.push(job);
        }
      });
    }

    const enabledReportMenus = menuItems(this.props, true);

    return (
      <div>
        <SubLeftMenuContext schema={menuItems(this.props)} />
        <div className="table-result">
          <Table>
            <TableHeader
              displaySelectAll={false}
              enableSelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn width="10%">{t1('stt')}</TableHeaderColumn>
                <TableHeaderColumn>{t1('name')}</TableHeaderColumn>
                <TableHeaderColumn>{t1('description')}</TableHeaderColumn>
                <TableHeaderColumn>
                  {t1('collection_to_store_data')}
                </TableHeaderColumn>
                <TableHeaderColumn>{t1('used_for_reports')}</TableHeaderColumn>
                <TableHeaderColumn width="10%">
                  {t1('action')}
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            {filteredJobs && filteredJobs.length > 0 && (
              <TableBody displayRowCheckbox={false} showRowHover>
                {filteredJobs.map((job, index) => (
                  <TableRow key={index}>
                    <TableRowColumn width="10%">{index + 1}</TableRowColumn>
                    <TableRowColumn>{job && job.title}</TableRowColumn>
                    <TableRowColumn>{job && job.description}</TableRowColumn>
                    <TableRowColumn>
                      {job && job.collection_to_store_data}
                    </TableRowColumn>
                    <TableRowColumn>
                      <ul>
                        {job &&
                          Array.isArray(job.used_for_reports) &&
                          job.used_for_reports.map((r) => {
                            if (r.type === reportJobUsageTypes.REPORT_MENU) {
                              const menuItem = enabledReportMenus.find(
                                (it) => lodashGet(it, 'id') === r.id,
                              );
                              if (!menuItem) {
                                return null;
                              }
                              return (
                                <li>
                                  {menuItem.url ? (
                                    <Link to={menuItem.url}>
                                      {menuItem.title}
                                    </Link>
                                  ) : (
                                    menuItem.title
                                  )}
                                </li>
                              );
                            }

                            return (
                              <li>
                                {r.href ? (
                                  <Link to={r.href}>{r.title}</Link>
                                ) : (
                                  r.title
                                )}
                              </li>
                            );
                          })}
                      </ul>
                    </TableRowColumn>
                    <TableRowColumn width="10%">
                      <IconButton
                        title={t1('click_to_run_this_job')}
                        iconClassName="mi mi-play-arrow"
                        onClick={() =>
                          this.cronJobsToReport(job.url, job.params, job.title)
                        }
                      />
                    </TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
          {!filteredJobs ||
            (filteredJobs.length === 0 && (
              <div className="col-md-12 m-t-10">
                <div>
                  {t1('there_are_no_jobs_to_report')}. {t1('please_click')}{' '}
                  <Link to={getUrl('conf', { menu: 'report' })}>
                    <b>{t('here')}</b>
                  </Link>{' '}
                  {t('to_add_config_jobs_to_report')}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listOfJobsToReport: lodashGet(
      state,
      'domainInfo.conf.list_of_jobs_to_report',
    ),
    conf: lodashGet(state, 'domainInfo.conf'),
  };
};

export default connect(mapStateToProps)(Results);
