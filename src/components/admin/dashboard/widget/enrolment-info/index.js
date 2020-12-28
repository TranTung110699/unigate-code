import React from 'react';
import EnrolmentPlanSearch from 'components/admin/enrolment-plan/search';
import PropTypes from 'prop-types';
import { enrolmentPlanStatuses } from 'configs/constants/enrolmentPlan';
import { remove } from 'common/utils/Array';

class Index extends React.Component {
  static propTypes = {
    expand: PropTypes.bool,
    formid: PropTypes.string.isRequired,
    orgIids: PropTypes.arrayOf(PropTypes.number),
  };

  static defaultProps = {
    expand: false,
    orgIids: null,
  };

  render() {
    const { expand, formid, orgIids } = this.props;
    const hiddenFields = {
      organizations: orgIids,
      status: remove(
        Object.values(enrolmentPlanStatuses),
        enrolmentPlanStatuses.DELETED,
      ),
      items_per_page: expand ? 10 : 5,
    };
    return (
      <EnrolmentPlanSearch
        formid={formid}
        noSearchForm
        columnsNotToShow={['action']}
        hiddenFields={hiddenFields}
      />
    );
  }
}

export default Index;
