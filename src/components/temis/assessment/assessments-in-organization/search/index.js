import React from 'react';
import get from 'lodash.get';
import { change, submit } from 'redux-form';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import { connect } from 'react-redux';
import endPoints from '../../endpoints';
import { userOrganizationAndPhongbanIidsSelector } from 'common/selectors';
import UserResults from './Results';
import OverviewByCharts from './OverviewByCharts';
import schemaSearch from './schema-form';
import withTemisConfig from 'common/hoc/withTemisConfig';

const renderResultsComponent = (items, props) => {
  if (get(props, 'formValues.view_type') === 'view_detail') {
    return <UserResults items={items} />;
  }

  const { formid, dispatch } = props;

  return (
    <OverviewByCharts
      items={items}
      handleOnClick={({ status }) => {
        dispatch(change(formid, 'view_type', 'view_detail'));
        dispatch(change(formid, 'status_of_assessment', [status]));
        dispatch(submit(formid));
      }}
    />
  );
};

const AssessInOrganization = ({ formid, orgIids, isHieuTruong }) => {
  const [hidePagination, setHidePagination] = React.useState(false);

  const hiddenFields = {};
  if (!isHieuTruong) {
    hiddenFields.type_of_assessment = ['tcnn_gv'];
  }

  return (
    <SearchWrapper
      formid="assess_in_organization"
      hiddenFields={hiddenFields}
      renderResultsComponent={renderResultsComponent}
      schema={schemaSearch}
      onChange={({ view_type }) => setHidePagination(view_type === 'overview')}
      orgIids={orgIids}
      showResult={true}
      alternativeApi={endPoints.searchUser}
      autoSearchWhenStart
      hidePagination={hidePagination}
      paginationProps={{
        theme: 'light',
      }}
    />
  );
};

const mapStateToProps = (state) => {
  const departmentAndPhongbanIids = userOrganizationAndPhongbanIidsSelector(
    state,
  );

  return {
    orgIids: departmentAndPhongbanIids,
  };
};

export default connect(mapStateToProps)(withTemisConfig(AssessInOrganization));
