import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import sagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';
import routes from 'routes';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import { epLink } from 'components/admin/group/routes';
import EnrolmentPlanList from './EnrolmentPlanList';
import Paper from 'material-ui/Paper';
import Title from 'schema-form/field-set/Title';
import Warning from 'components/common/Warning';
import RaisedButton from 'components/common/mui/RaisedButton';
import { isSetup, isSetupForCurrentSemester } from '../k12-setup/utils';
import { getCurrentSemester } from 'common/k12/index';

const stylePaper = {
  marginTop: 20,
  padding: 10,
};

class K12GroupDashboard extends Component {
  render() {
    const { group, currentSemester } = this.props;

    return (
      <div>
        <h1>{group.name}</h1>
        <div className="container-fluid">
          <div className={'elementGroup'}>
            {!isSetupForCurrentSemester(group, currentSemester.iid) ||
            !isSetup(group) ? (
              <Warning>
                <div>
                  {t1('you_need_to_setup_enrolment_plans_and_sync_users')}
                </div>
                {!isSetupForCurrentSemester(group, currentSemester.iid) ? (
                  <div>
                    {t1(
                      'you_have_not_set_up_enrolment_plans_for_current_semester',
                    )}
                  </div>
                ) : null}
              </Warning>
            ) : null}

            <Link to={`/admin/group/${group.iid}/setup`}>
              <RaisedButton primary label={t1('setup')} />
            </Link>
          </div>

          <div className="row">
            <div className="col-md-3 text-center">
              <div className="elementGroup">
                <IconButton
                  title={t1('current_members')}
                  iconClassName="mi mi-person"
                />
                <br />
                <Link
                  to={routes.url(
                    'node_edit',
                    Object.assign({}, group, {
                      ntype: 'group',
                      step: 'members',
                    }),
                  )}
                >
                  {group && group.current_members ? group.current_members : 0}
                </Link>
              </div>
            </div>

            <div className="col-md-3 text-center">
              <div className="elementGroup">
                <IconButton
                  title={t1('add_survey')}
                  iconClassName="mi mi-star"
                />
                <br />
                <Link
                  to={routes.url(
                    'node_edit',
                    Object.assign({}, group, {
                      ntype: 'group',
                      step: 'surveys/new',
                    }),
                  )}
                >
                  {t1('add_daily_feedback')}
                </Link>
              </div>
            </div>

            <div className="col-md-3 text-center">
              <div className="elementGroup">
                <IconButton
                  title={t1('add_attendance')}
                  iconClassName="mi mi-list"
                />
                <br />
                <Link
                  to={routes.url(
                    'node_edit',
                    Object.assign({}, group, {
                      ntype: 'group',
                      step: 'attendance',
                    }),
                  )}
                >
                  {t1('mark_daily_attendance')}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={'container-fluid'}>
          <div className={'row'}>
            <div className={'col-md-12'}>
              <Paper style={stylePaper}>
                <Title title={t1('group_enrolment_plans')} />
                <EnrolmentPlanList group={group} showCreate={false} />
              </Paper>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const map = (state) => {
  return {
    currentSemester: getCurrentSemester(state),
  };
};

export default connect(map)(K12GroupDashboard);
