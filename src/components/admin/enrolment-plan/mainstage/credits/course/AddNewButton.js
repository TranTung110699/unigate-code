import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DetailOnDialog from 'components/common/detail-on-dialog';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import NodeNew from 'components/admin/node/new';
import newFormSchema from 'components/admin/course/schema/form';
import { createSelector } from 'reselect';
import lodashGet from 'lodash.get';

const dialogKey = 'add_new_course_to_credit';
const formid = 'add_new_course_to_credit';

class EpAddNewCourseButton extends React.PureComponent {
  getDialogKey = () => {
    return this.props.dialogKey || dialogKey;
  };

  renderPreview = ({ showFull }) => (
    <RaisedButton
      primary
      onClick={showFull}
      labelPosition="right"
      label={t1('add_classes')}
      icon={<Icon icon="plus" />}
    />
  );

  renderFull = ({ closeDialog }) => {
    const {
      credit,
      enrolmentPlan,
      searchFormId,
      requestSuccessful,
      currentCoursesCount,
    } = this.props;

    return (
      <NodeNew
        ntype={'course'}
        schema={newFormSchema}
        mode={'new'}
        step={'batch'}
        closeModal
        hiddenFields={{
          credit_syllabus: lodashGet(credit, 'iid'),
          enrolment_plans: [lodashGet(enrolmentPlan, 'iid')],
          organizationRootIids: lodashGet(enrolmentPlan, 'organizations'),
          current_courses_count: currentCoursesCount,
        }}
        formid={formid}
        dialogKey={this.getDialogKey()}
        searchFormId={searchFormId}
        requestSuccessful={requestSuccessful}
        enrolmentPlanStartDate={enrolmentPlan.start_date}
        enrolmentPlanEndDate={enrolmentPlan.end_date}
      />
    );
  };

  render() {
    return (
      <DetailOnDialog
        dialogKey={this.getDialogKey()}
        renderFull={this.renderFull}
        renderPreview={this.renderPreview}
      />
    );
  }
}

EpAddNewCourseButton.propTypes = {
  className: PropTypes.string,
};

EpAddNewCourseButton.defaultProps = {
  className: '',
};

export default EpAddNewCourseButton;
