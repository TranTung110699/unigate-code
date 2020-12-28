import React from 'react';
import PropTypes from 'prop-types';

import SubTopMenuContext from 'common/context/menu/SubMenuTop';

import topMenuSchema from './menu/teacher-menus';
import Search from './search';
import { t1 } from 'translate';

class TrainingPlanLayout extends React.Component {
  render() {
    return (
      <div>
        <SubTopMenuContext
          schema={topMenuSchema()}
          lastBreadcrumbName={t1('training_plan')}
          description={t1(
            'training_plan_serves_the_planning,_reviewing,_tracking_and_reporting_purposes_by_overviewing_binded_enrolment_plans.',
          )}
        />
        <Search />
      </div>
    );
  }
}

TrainingPlanLayout.propTypes = {
  className: PropTypes.string,
};

TrainingPlanLayout.defaultProps = {
  className: '',
};

export default TrainingPlanLayout;
