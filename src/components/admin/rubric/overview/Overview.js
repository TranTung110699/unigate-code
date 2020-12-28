import React from 'react';
import get from 'lodash.get';
import { t1 } from 'translate/index';
import fetchData from 'components/common/fetchData';
import apiUrls from 'api-endpoints/index';
import Card from 'antd/lib/card';
import RaisedButton from 'components/common/mui/RaisedButton';
import RubricDetail from './Detail';
import Skeleton from 'antd/lib/skeleton';
import SuccessAlert from 'components/common/SuccessAlert';

class RubricOverviewInCourse extends React.Component {
  render() {
    const { rubric } = this.props;

    if (!rubric) return <Skeleton active />;

    return (
      <Card title={`${get(rubric, 'name')} (#${get(rubric, 'iid')})`}>
        <RubricDetail rubric={rubric} />

        <div className="m-t-30">
          <SuccessAlert>
            {rubric.applicable_scope == 'course' &&
              t1(
                'go_to_course_manage_rubric_menu_item_to_update_rubric_for_course',
              )}

            {rubric.applicable_scope == 'enrolment_plan' &&
              t1('click_enrolment_plan_menu_item_to_update_rubric')}
            {rubric.applicable_scope == 'training_plan' &&
              t1('click_training_plan_menu_item_to_update_rubric')}
          </SuccessAlert>
        </div>
      </Card>
    );
  }
}

export default fetchData((props) => ({
  baseUrl: apiUrls.get_skill_info,
  keyState: `skillInfo_${get(props, 'iid')}`,
  params: {
    iid: get(props, 'iid'),
    depth: -1,
  },
  propKey: 'rubric',
  fetchCondition: get(props, 'iid'),
  shouldRenderLoading: true,
}))(RubricOverviewInCourse);
