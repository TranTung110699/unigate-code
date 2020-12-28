import React, { Component } from 'react';
import { connect } from 'react-redux';
import { enableAsset } from 'common/conf';
import 'components/admin/dashboard/stylesheet.scss';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import { isNotEmptyArray } from 'common/utils/Array';
import EnrolmentPlanWidget from './widget/enrolment-plan';
import SurveyWidget from './widget/survey-report';
import StationeryWidget from './widget/stationery-report';
import Status from './widget/status';
import { CourseActions } from 'configs/constants/permission';
import Widget from 'components/common/Widget';
import CourseBasicInfo from './BasicInfo';
import { courseLearningTypes } from 'configs/constants';

const styles = {
  minHeight: '150px',
};

class CourseDashboard extends Component {
  render() {
    const { node, enableAssetConfig, hasPermission, permissions } = this.props;

    // passed down from Course Edit Container
    const hasPermUpdate =
      hasPermission && typeof hasPermission === 'function'
        ? hasPermission(
            CourseActions.COURSE_ACTION_UPDATE,
            node && node.iid,
            permissions,
          )
        : true;

    return (
      <div className="container-fluid">
        {isNotEmptyArray(lodashGet(node, 'enrolment_plans')) ? (
          <div className="row">
            <div className="col-md-12 m-b-20">
              <EnrolmentPlanWidget {...this.props} node={node} />
            </div>
          </div>
        ) : null}

        <div className="row">
          <div className="col-md-6">
            <Widget title={t1('course_basic_info')}>
              <CourseBasicInfo {...this.props} />
            </Widget>
          </div>
          {!!hasPermUpdate && (
            <div className="col-md-6">
              <Widget title={t1('status')} s>
                <Status node={this.props.node} />
              </Widget>
            </div>
          )}
        </div>
        {node.status == 'approved' ? (
          <div className="row">
            <div className="col-md-6">
              <Widget title={t1('survey_report')}>
                <SurveyWidget {...this.props} />
              </Widget>
            </div>

            {/*

            <div className="col-md-6">
              <Widget title={t1('open_ended_takes')}>
                <OpenEndedTakes courseIid={this.props.node.iid} />
              </Widget>
            </div>
               */}

            {enableAssetConfig &&
            node.learning_type !== courseLearningTypes.ONLINE ? (
              <div className="col-md-6">
                <Widget title={t1('stationery_report')}>
                  <StationeryWidget {...this.props} />
                </Widget>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    enableAssetConfig: enableAsset(state.domainInfo),
  };
};
export default connect(mapStateToProps)(CourseDashboard);
