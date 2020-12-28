import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUrl } from 'routes/links/common';
import lodashGet from 'lodash.get';
import IconButton from 'material-ui/IconButton';

import { t, t1 } from 'translate';
import { jobsActions } from 'actions/job';
import apiUrls from 'api-endpoints';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';

import topMenuSchema from '../menu/MainstageTopMenu';

class Layout extends Component {
  cronJobsToReport = (url, params) => {
    const { dispatch } = this.props;

    dispatch(jobsActions.cronJobsToReport(url, params));
  };

  render() {
    const { listSystemJObs } = this.props;
    const items = [
      {
        id: 1,
        stt: 1,
        value: 'remind_finish_course',
        name: t1('run_job_remind_finish_course'),
        type: t1('daily'),
        description: t1('run_job_remind_finish_course'),
        url: apiUrls.cron_jobs_to_remind_finish_course,
        params: {},
      },
      // {
      //   id: 2,
      //   stt: 2,
      //   value: 'import_organization',
      //   name: t1('run_job_import_organization'),
      //   type: t1('daily'),
      //   description: t1('run_job_import_organization'),
      //   url: apiUrls.cron_jobs_to_import_organizations,
      //   params: {},
      // },
      {
        id: 3,
        stt: 3,
        value: 'sync_users_between_smart_groups_and_enrolment_plans',
        name: t1('run_job_sync_users_between_smart_groups_and_enrolment_plans'),
        type: t1('daily'),
        description: t1('sync_users_between_smart_groups_and_enrolment_plans'),
        url: epApiUrls.sync_users_between_smart_groups_and_enrolment_plans,
        params: {},
      },
      {
        id: 5,
        stt: 5,
        value: 'execute_enrolment_plans_if_possible',
        name: t1('run_job_execute_enrolment_plans_if_possible'),
        type: t1('daily'),
        description: t1('execute_enrolment_plans_if_possible'),
        url: epApiUrls.execute_enrolment_plans_if_possible,
        params: {},
      },
    ];

    const filteredItems = [];
    if (listSystemJObs) {
      items.forEach((item) => {
        if (listSystemJObs.includes(item.value)) {
          filteredItems.push(item);
        }
      });
    }

    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
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
                <TableHeaderColumn width="10%">{t1('type')}</TableHeaderColumn>
                <TableHeaderColumn>{t1('description')}</TableHeaderColumn>
                <TableHeaderColumn width="10%">
                  {t1('action')}
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            {filteredItems && filteredItems.length && (
              <TableBody displayRowCheckbox={false} showRowHover>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableRowColumn width="10%">
                      {item && item.stt}
                    </TableRowColumn>
                    <TableRowColumn>{item && item.name}</TableRowColumn>
                    <TableRowColumn width="10%">
                      {item && item.type}
                    </TableRowColumn>
                    <TableRowColumn>{item && item.description}</TableRowColumn>
                    <TableRowColumn width="10%">
                      <IconButton
                        title={t1('click_to_run_this_job')}
                        iconClassName="mi mi-play-arrow"
                        onClick={() =>
                          this.cronJobsToReport(item.url, item.params)
                        }
                      />
                    </TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
          {!filteredItems ||
            (filteredItems.length === 0 && (
              <div className="col-md-12 m-t-10">
                <div>
                  {t1('there_are_no_system_jobs')}. {t1('please_click')}{' '}
                  <Link to={getUrl('conf', { menu: 'job' })}>
                    <b>{t('here')}</b>
                  </Link>{' '}
                  {t('to_add_config_system_jobs')}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listSystemJObs: lodashGet(state, 'domainInfo.conf.list_of_system_jobs'),
});

export default connect(mapStateToProps)(Layout);
