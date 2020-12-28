/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import StationeryResults from './stationery/Results';
import EquipmentResults from './equipment/Results';
import FutureProjectionResults from './future-projection/Results';
import schema from '../schema/search-form';

class ReportStationerySearchForm extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    const { formid } = this.props;
    switch (formid) {
      case 'report_stationery_search':
        return <StationeryResults items={items} {...props} />;
      case 'report_equipment_search':
        return <EquipmentResults items={items} {...props} />;
      default:
        return <div />;
    }
  }

  render() {
    const { formid } = this.props;

    return (
      <SearchWrapper
        {...this.props}
        formid={formid}
        schema={schema}
        renderResultsComponent={this.renderResultComponent}
        paginationProps={{
          onlyShowIfTotalBigEnough: false,
        }}
      />
    );
  }
}

export default ReportStationerySearchForm;
