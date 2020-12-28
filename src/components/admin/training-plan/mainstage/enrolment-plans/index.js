import React from 'react';
import PropTypes from 'prop-types';
import EnrolmentPlanSearch from 'components/admin/enrolment-plan/search';
import { getSearchFormId } from './common';

class EnrolmentPlansManagement extends React.PureComponent {
  render() {
    const {
      className,
      node,
      hiddenFields,
      columnsNotToShow,
      noSearchForm,
    } = this.props;
    const componentClassName = `${className || ''}`;
    const formid = getSearchFormId(node);

    return (
      <div className={componentClassName}>
        <EnrolmentPlanSearch
          hiddenFields={hiddenFields}
          noSearchForm={noSearchForm}
          columnsNotToShow={['training_plan'].concat(columnsNotToShow)}
          formid={formid}
          trainingPlan={node}
          searchSubOrganization
        />
      </div>
    );
  }
}

EnrolmentPlansManagement.propTypes = {
  className: PropTypes.string,
};

EnrolmentPlansManagement.defaultProps = {
  className: '',
};

export default EnrolmentPlansManagement;
