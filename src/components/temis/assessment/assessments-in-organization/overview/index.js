import React, { Component } from 'react';
import Result from './Result';
import get from 'lodash.get';
import withTemisConfig from 'common/hoc/withTemisConfig';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schemaSearch from '../search/schema-form';
import endPoints from '../../endpoints';
import { userOrganizationAndPhongbanIidsSelector } from 'common/selectors';
import { connect } from 'react-redux';

class AssessMyPeers extends Component {
  renderResultsComponent = (items, props) => {
    const tcnn = get(props, 'formValues.type_of_assessment[0]');
    const rubricIid = get(this.props, `temisConfig.${tcnn}`);
    return <Result items={items} rubricIid={rubricIid} />;
  };

  render() {
    const { isHieuTruong } = this.props;
    const hiddenFields = {};
    if (!isHieuTruong) {
      hiddenFields.type_of_assessment = ['tcnn_gv'];
    }

    return (
      <SearchWrapper
        formid="overview_in_organization"
        step="overview"
        hiddenFields={hiddenFields}
        renderResultsComponent={this.renderResultsComponent}
        schema={schemaSearch}
        orgIids={this.props.orgIids}
        showResult={true}
        alternativeApi={endPoints.searchUser}
        autoSearchWhenStart
        paginationProps={{
          theme: 'light',
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const departmentAndPhongbanIids = userOrganizationAndPhongbanIidsSelector(
    state,
  );

  return {
    orgIids: departmentAndPhongbanIids,
  };
};

export default connect(mapStateToProps)(withTemisConfig(AssessMyPeers));
