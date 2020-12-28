import React from 'react';
import PropTypes from 'prop-types';

import SubTopMenuContext from 'common/context/menu/SubMenuTop';

import topMenuSchema from './menu/teacher-menus';
import Search from './search';
import { getSearchFormId } from './common';
import { t1 } from 'translate';

const EnrolmentPlanLayout = () => {
  return (
    <div>
      <SubTopMenuContext
        schema={topMenuSchema()}
        lastBreadcrumbName={t1('enrolment_plan')}
        description={t1(
          'training_organizers_make_plans_for_learners_to_get_to_another_level_with_restricted_learning_period.',
        )}
      />
      <Search formid={getSearchFormId()} />
    </div>
  );
};

EnrolmentPlanLayout.propTypes = {
  className: PropTypes.string,
};

EnrolmentPlanLayout.defaultProps = {
  className: '',
};

export default EnrolmentPlanLayout;
