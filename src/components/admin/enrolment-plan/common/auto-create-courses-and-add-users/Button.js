import React from 'react';
import { t1 } from 'translate';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import lodashGet from 'lodash.get';
import fetchData from 'components/common/fetchData';
import { checkIfAllCreditSyllabusesAreOnlineOnlyGivenDomainInfo } from 'common/conf';
import { connect } from 'react-redux';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import DetailOnDialog from 'components/common/detail-on-dialog';
import SubmitButton from 'components/common/primary-button';
import SimpleSubmitForm from 'components/common/forms/SimpleSubmitForm';
import { required } from 'common/validators';
import { arrangeModeOptions } from 'components/admin/enrolment-plan/common/auto-create-courses-and-add-users/constants';

const schema = {
  schema: () => {
    return {
      arrange_mode: {
        type: 'radio',
        options: arrangeModeOptions,
        validate: [required()],
      },
    };
  },
  ui: () => [
    {
      id: 'id',
      fields: ['arrange_mode'],
    },
  ],
};

const Form = ({ node, executeOnSuccess }) => {
  return (
    <SimpleSubmitForm
      schema={schema}
      alternativeApi={
        apiUrls.auto_create_enrolment_plan_courses_and_add_members
      }
      params={{
        enrolment_plan_iid: lodashGet(node, 'iid'),
      }}
      executeOnSuccess={executeOnSuccess}
    />
  );
};

const Button = ({
  node,
  canAutoCreateCoursesAndAddUsersToEnrolmentPlan,
  onlineOnly,
  isFeatureEnabled,
}) => {
  if (onlineOnly || !canAutoCreateCoursesAndAddUsersToEnrolmentPlan) {
    return null;
  }

  return (
    <div>
      <DetailOnDialog
        renderPreview={({ showFull }) => (
          <SubmitButton
            label={t1('auto_arrange_enrolment_plan_members')}
            textConfirm={t1(
              'do_you_want_to_automatically_assign_enrolment_plan_members_to_all_its_credit_syllabuses?_We_will_create_courses_if_needed',
            )}
            onClick={showFull}
          />
        )}
        dialogKey={`auto_arrange_enrolment_plan_members_${lodashGet(
          node,
          'iid',
        )}`}
        dialogOptionsProperties={{
          title: t1(
            'select_how_you_want_to_arrange_enrolment_plan_members_to_courses',
          ),
          handleClose: true,
        }}
        renderFull={({ closeDialog }) => {
          return <Form node={node} executeOnSuccess={closeDialog} />;
        }}
      />
      <div
        className={
          isFeatureEnabled(features.NEW_UI_JULY_2019) ? 'text-white' : ''
        }
      >
        {t1(
          'by_clicking_this_button_all_members_will_be_added_to_the_courses_of_the_syllabus_which_has_only_one_course_attached',
        )}
        .
        {t1(
          '_if_a_syllabus_has_no_course_it_will_create_a_course_automatically',
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    onlineOnly: checkIfAllCreditSyllabusesAreOnlineOnlyGivenDomainInfo(
      state.domainInfo,
    ),
  };
};

export default connect(mapStateToProps)(
  fetchData((props) => ({
    baseUrl: apiUrls.can_auto_create_courses_and_add_users_to_enrolment_plan,
    params: {
      enrolment_plan_iid: lodashGet(props, 'node.iid'),
    },
    keyState: `can_auto_create_courses_and_add_users_to_enrolment_plan${lodashGet(
      props,
      'node.iid',
    )}`,
    propKey: 'canAutoCreateCoursesAndAddUsersToEnrolmentPlan',
  }))(withFeatureFlags()(Button)),
);
