import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNodeSelector } from 'components/admin/node/utils';
import { createSelector } from 'reselect';
import Metadata from 'components/admin/node/edit/metadata/MetadataContainer';
import lodashGet from 'lodash.get';
import AutoCreateCoursesAndAddUsers from 'components/admin/enrolment-plan/common/auto-create-courses-and-add-users/Button';
import { Link } from 'react-router-dom';
import { epCourseStudentArrangmentStatus } from '../../routes/';
import RaisedButton from 'components/common/mui/RaisedButton';
import { enrolmentPlanStatuses } from 'configs/constants/enrolmentPlan';

class EnrolmentPlanCredits extends React.Component {
  cssClass = 'admin-enrolment-plan-info';

  render() {
    const { node, program, paddingLeft } = this.props;

    const { EXECUTED, STOPPED, DELETED } = enrolmentPlanStatuses;

    return (
      <React.Fragment>
        <Metadata
          node={program}
          inEPRunning={
            !![EXECUTED, STOPPED, DELETED].includes(lodashGet(node, 'status'))
          }
        />
        <div
          style={{
            paddingLeft,
          }}
        >
          <AutoCreateCoursesAndAddUsers node={node} />
        </div>

        {window.isETEP ? (
          <div className="m-t-30">
            <a target="_blank" href={epCourseStudentArrangmentStatus(node)}>
              <RaisedButton
                primary
                label="Tình trạng gán học viên vào lớp theo môn"
              />
            </a>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

EnrolmentPlanCredits.propTypes = {
  className: PropTypes.string,
};

EnrolmentPlanCredits.defaultProps = {
  className: '',
};

const mapStateToProps = createSelector(
  (state, props) => lodashGet(props, 'node.program_iid'),
  getNodeSelector,
  (programIid, getNode) => ({
    program: getNode(programIid),
  }),
);

export default connect(mapStateToProps)(EnrolmentPlanCredits);
