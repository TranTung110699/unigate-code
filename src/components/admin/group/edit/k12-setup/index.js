import React, { Component } from 'react';
import { t1 } from 'translate';
import Paper from 'material-ui/Paper';
import Title from 'schema-form/field-set/Title';
import routes from 'routes';
import sagaActions from 'actions/node/saga-creators';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'components/common/mui/RaisedButton';
import EnrolmentPlanList from '../dashboard/EnrolmentPlanList';
import ActionToggle from 'components/common/toggle/ActionToggle';
import { updateStatusControl } from 'components/admin/group/edit/sub-left-menu-configs';
import { getSubMenuLink } from '../../../../../routes/links';

const stylePaper = {
  marginTop: 20,
  padding: 10,
};

class GroupSetup extends Component {
  handleSync = () => {
    const { dispatch, group } = this.props;

    if (group && group.iid) {
      const url = '/k12/group/sync-user-grade';

      const params = {
        group_iid: group.iid,
        rt_mode: 'current',
        type: 'user_group',
      };

      // use fetchNode so it can reuse the logic of updating the group counters to store

      dispatch(sagaActions.getDataRequest({ url, keyState: 'xxxx' }, params));
    }
  };

  render() {
    const { group } = this.props;

    const switchControl = updateStatusControl(group);

    return (
      <div>
        <Paper style={stylePaper}>
          <Title title={t1('edit_group')} />
          <Link
            to={routes.url('node_edit', {
              ...group,
              step: 'info',
              ntype: 'group',
            })}
          >
            <RaisedButton label={t1('edit_group_information')} primary />
          </Link>
        </Paper>

        <Paper style={stylePaper}>
          <Title title={t1('group_enrolment_plans')} />
          <EnrolmentPlanList group={group} showCreate={true} />
        </Paper>

        <Paper style={stylePaper}>
          <Title title={t1('finalize_students_list')} />
          <div>
            {t1(
              'by_clicking_this_button_the_students_in_group_will_have_grade_and_homeroom_class_of_this_group',
            )}
            <br />
            <RaisedButton primary onClick={this.handleSync}>
              {t1('finalize_student_list')}
            </RaisedButton>
          </div>
        </Paper>

        {/*
        <Paper style={stylePaper}>
          <Title title={t1('setup_survey')} />
          <div>
            <Link
              to={routes.url(
                'node_edit',
                Object.assign({}, group, {
                  ntype: 'group',
                  step: 'surveys/new',
                }),
              )}
            >
              {t1('add_survey')}
            </Link>
          </div>
        </Paper>
*/}
        <Paper style={stylePaper}>
          <Title title={t1('approve_group')} />
          <div>
            <ActionToggle
              key={`toggle-status-menu_${group.iid}`}
              baseURL={switchControl.baseURL}
              value={switchControl.value}
              dataSet={switchControl.dataSet}
              labelSet={switchControl.labelSet}
              name={switchControl.name}
              label={switchControl.label}
              handleChange={switchControl.handleChange}
            />
          </div>
        </Paper>
      </div>
    );
  }
}
export default connect()(GroupSetup);
