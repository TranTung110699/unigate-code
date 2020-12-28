import React, { Component } from 'react';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import { t1 } from 'translate';
import fetchData from 'components/common/fetchData';
import lodashGet from 'lodash.get';
import { enrolmentPlanStatusToText } from 'configs/constants/enrolmentPlan';
import routes from 'routes';
import { Link } from 'react-router-dom';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';

class EnrolmentPlan extends Component {
  render() {
    const { enrolmentPlan, isFeatureEnabled } = this.props;
    const classTextWhite = {
      className: isFeatureEnabled(features.NEW_UI_JULY_2019)
        ? 'text-white'
        : '',
    };
    return (
      <div {...classTextWhite}>
        {t1('this_course_belongs_to_an_enrolment_plan')}:{' '}
        <b>
          <Link
            to={routes.url('node_edit', {
              ntype: 'enrolment_plan',
              iid: lodashGet(enrolmentPlan, 'iid'),
              step: 'dashboard',
            })}
            {...classTextWhite}
          >
            {lodashGet(enrolmentPlan, 'name')} (
            {enrolmentPlanStatusToText(lodashGet(enrolmentPlan, 'status'))})
          </Link>
        </b>
      </div>
    );
  }
}

export default fetchData((props) => ({
  baseUrl: apiUrls.get_enrolment_plan_info,
  fetchCondition: lodashGet(props, 'node.enrolment_plans[0]'),
  params: {
    iid: lodashGet(props, 'node.enrolment_plans[0]'),
  },
  method: 'get',
  propKey: 'enrolmentPlan',
  keyState: `enrolment_plan_of_course_${lodashGet(props, 'node.iid')}`,
}))(withFeatureFlags()(EnrolmentPlan));
