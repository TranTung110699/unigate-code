/**
 * Created by anhvtt on 19/04/17.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import NumberOfUsersBarChart from '../report-result/NumberOfUsersBarChart';
import NumberOfUsersPieChart from '../report-result/NumberOfUsersPieChart';
import FormFilters from './FormFilters';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items) {
    const { chartType } = this.props;
    const typeToComponent = {
      pie: NumberOfUsersPieChart,
      bar: NumberOfUsersBarChart,
    };
    const ChartComponent = typeToComponent[chartType];
    return <ChartComponent items={items} />;
  }

  render() {
    const { contest, formid, fieldsToShow } = this.props;

    const hiddenFields = {
      contest_code: contest,
    };

    return (
      <SearchWrapper
        formid={formid}
        hiddenFields={hiddenFields}
        renderResultsComponent={this.renderResultComponent}
        hidePagination
        autoSearchWhenStart={false}
      >
        <FormFilters formid={formid} fieldsToShow={fieldsToShow} />
      </SearchWrapper>
    );
  }
}

Layout.propTypes = {
  chartType: PropTypes.string,
  contest: PropTypes.string,
  fieldsToShow: PropTypes.arrayOf(PropTypes.string),
  formid: PropTypes.string,
};

Layout.defaultProps = {
  chartType: '',
  contest: '',
  fieldsToShow: [],
  formid: '',
};

export default connect()(Layout);
