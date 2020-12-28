import React, { Component } from 'react';
import lGet from 'lodash.get';
import { t1 } from 'translate';
import 'components/admin/dashboard/stylesheet.scss';
import { Link } from 'react-router-dom';
import Widget from 'components/common/Widget';
import SurveyWidget from './widget/survey-report';
import Status from './widget/Status';
import { SyllabusActions } from 'configs/constants/permission';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import { timestampToDateString } from 'common/utils/Date';
import WhatsNext from '../help/WhatsNext';
import Alert from 'antd/lib/alert';
import styled from 'styled-components';

const WidgetWordBreak = styled(Widget)`
  word-break: break-word;
`;

const styles = {
  minHeight: '150px',
};

class Dashboard extends Component {
  render() {
    const {
      node,
      syllabus,
      hasPermission,
      permissions,
      isFeatureEnabled,
    } = this.props;

    // permission passed down from Syllabus EditContainer
    const hasPermissionUpdate =
      hasPermission &&
      hasPermission(
        SyllabusActions.SYLLABUS_ACTION_UPDATE,
        syllabus && syllabus.iid,
        permissions,
      );

    return (
      <div
        className={`${
          isFeatureEnabled(features.NEW_UI_JULY_2019) ? '' : 'container-fluid'
        } edit-syllabus-container`}
      >
        {node.clone_from ? (
          <div className="row">
            <div className="col-md-4 m-t-10">
              <Alert
                message={
                  <React.Fragment>
                    {t1('this_is_cloned_from_the_following_syllabus')}:&nbsp;
                    <Link to={`/admin/credit/${syllabus.clone_from}`}>
                      #{syllabus.clone_from}
                    </Link>
                  </React.Fragment>
                }
                type="info"
                showIcon
              />
            </div>
          </div>
        ) : null}
        {lGet(syllabus, 'type') === 'syllabus_exam' ? (
          <span>{t1('this_is_a_syllabus_exam')}</span>
        ) : null}

        <div className="row">
          {hasPermissionUpdate ? (
            <div className="col-md-6 m-t-10">
              <WidgetWordBreak title={t1('syllabus_basic_information')}>
                <div>
                  {t1('name')}: {syllabus.name}
                </div>
                <div>
                  {t1('created_date')}:{' '}
                  <b>{timestampToDateString(syllabus.ts)}</b>
                </div>
                <div>
                  {t1('created_by')}: <b>{lGet(syllabus, 'u.name', '')}</b>
                </div>

                <hr />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Status node={node} />
                </div>
              </WidgetWordBreak>
              {node.status === 'approved' && (
                <Widget title={t1("what's_next")}>
                  <WhatsNext node={node} />
                </Widget>
              )}
            </div>
          ) : null}

          {lGet(syllabus, 'type') !== 'syllabus_exam' &&
          lGet(syllabus, 'status') == 'approved' ? (
            <div className="col-md-6 m-t-10">
              <Widget title={t1('survey_report')}>
                <SurveyWidget {...this.props} />
              </Widget>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default withFeatureFlags()(Dashboard);
