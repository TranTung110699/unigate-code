import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DetailOnDialog from 'components/common/detail-on-dialog';
import FlatButton from 'components/common/mui/FlatButton';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import SearchAndEditCourses from 'components/admin/enrolment-plan/mainstage/courses/search';
import Divider from 'material-ui/Divider';
import AddNewButton from './AddNewButton';
import { getNodeSelector } from 'components/admin/node/utils';
import { checkIfAllCreditSyllabusesAreOnlineOnlyGivenConf } from 'common/conf';
import { confSelector } from 'common/selectors';
import { createSelector } from 'reselect';
import routes from 'routes';
import { Link } from 'react-router-dom';
import { isEnrolmentPlanStopped } from 'components/admin/enrolment-plan/common';
import AntButton from 'antd/lib/button';

const formid = 'search_course_in_credit_syllabus';

class Button extends React.PureComponent {
  getCourseIidsInEnrolmentPlan = () =>
    lodashGet(
      this.props.enrolmentPlanProgram,
      `courses_in_enrolment_plan_credits.${lodashGet(
        this.props.credit,
        'iid',
      )}`,
    );

  getNumberOfCoursesInEnrolmentPlan = () =>
    lodashGet(this.getCourseIidsInEnrolmentPlan(), 'length') || 0;

  renderPreview = ({ showFull }) => {
    const { enrolmentPlan } = this.props;
    let numberOfCoursesInEnrolmentPlan = this.getNumberOfCoursesInEnrolmentPlan();

    if (numberOfCoursesInEnrolmentPlan) {
      return (
        <AntButton onClick={showFull} title={t1('view_classes')}>
          {t1('%s_classes', [numberOfCoursesInEnrolmentPlan])}
        </AntButton>
      );
    }

    return !isEnrolmentPlanStopped(enrolmentPlan) ? (
      <AddNewButton
        enrolmentPlan={this.props.enrolmentPlan}
        credit={this.props.credit}
        requestSuccessful={() => {
          this.handleNumberOfCourseChange();
          showFull();
        }}
        currentCoursesCount={numberOfCoursesInEnrolmentPlan}
      />
    ) : null;
  };

  handleNumberOfCourseChange = () => {
    const { onNumberOfCourseChange } = this.props;
    if (typeof onNumberOfCourseChange === 'function') {
      onNumberOfCourseChange();
    }
  };

  renderFull = ({ closeDialog }) => {
    const {
      credit,
      enrolmentPlan,
      allCreditSyllabusesAreOnlineOnly,
    } = this.props;
    return (
      <div>
        <h1>{credit.name}</h1>

        <div>
          <h2>{t1('current_courses')}</h2>
          <SearchAndEditCourses
            formid={formid}
            node={enrolmentPlan}
            noSearchForm
            hiddenFields={{
              credit_syllabus: lodashGet(credit, 'iid'),
            }}
            columnsNotToShow={['credit_syllabus']}
            onDeleteCourseSuccessful={this.handleNumberOfCourseChange}
            blackListActions={
              allCreditSyllabusesAreOnlineOnly ? ['delete'] : undefined
            }
          />
        </div>
        <Divider />
        {!allCreditSyllabusesAreOnlineOnly &&
          !isEnrolmentPlanStopped(enrolmentPlan) && (
            <div className="m-t-20">
              <AddNewButton
                searchFormId={formid}
                enrolmentPlan={enrolmentPlan}
                requestSuccessful={this.handleNumberOfCourseChange}
                credit={credit}
                currentCoursesCount={this.getNumberOfCoursesInEnrolmentPlan()}
              />
            </div>
          )}
      </div>
    );
  };

  dialogOptionsProperties = {
    handleClose: true,
    width: '90%',
  };

  render() {
    const { allCreditSyllabusesAreOnlineOnly } = this.props;

    if (allCreditSyllabusesAreOnlineOnly) {
      const courseIid = lodashGet(this.getCourseIidsInEnrolmentPlan(), 0);
      return (
        <Link
          target="_blank"
          to={routes.url('node_edit', {
            iid: courseIid,
            ntype: 'course',
            step: 'users',
          })}
        >
          <FlatButton label={t1('view_class')} />
        </Link>
      );
    }

    if (this.props.readOnly) {
      return (
        <span>
          {t1('%s_classes', this.getNumberOfCoursesInEnrolmentPlan())}
        </span>
      );
    }

    return (
      <DetailOnDialog
        {...this.props}
        renderFull={this.renderFull}
        renderPreview={this.renderPreview}
        dialogOptionsProperties={this.dialogOptionsProperties}
        dialogKey={'EP-credit-course'}
      />
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
};

Button.defaultProps = {
  className: '',
};

const mapStateToProps = createSelector(
  getNodeSelector,
  (state, props) => props.enrolmentPlanProgram,
  confSelector,
  (getNode, enrolmentPlanProgram, conf) => ({
    enrolmentPlan: getNode(
      lodashGet(enrolmentPlanProgram, 'enrolment_plan_iid'),
    ),
    allCreditSyllabusesAreOnlineOnly: checkIfAllCreditSyllabusesAreOnlineOnlyGivenConf(
      conf,
    ),
  }),
);

export default connect(mapStateToProps)(Button);
