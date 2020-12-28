/**
 * Created by anhvtt on 04/05/17.
 */
import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import UsersByGradeResults from 'components/admin/report/excels/search/report-result/UsersByGradeResults';
import PropTypes from 'prop-types';
import FormFilters from './FormFilters';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent = (items, props) => (
    <UsersByGradeResults items={items} {...props} />
  );

  render = () => {
    const { contest, id, exportUrl, fieldsToShow } = this.props;

    const hiddenFields = {
      contest_code: contest,
    };

    return (
      <SearchWrapper
        formid={id}
        hiddenFields={hiddenFields}
        renderResultsComponent={this.renderResultComponent}
        showQueryField={false}
        showSearchButton={false}
        autoSearchWhenStart={false}
        hidePagination
      >
        <FormFilters
          fieldsToShow={fieldsToShow}
          formid={id}
          exportUrl={exportUrl}
          hiddenFields={hiddenFields}
        />
      </SearchWrapper>
    );
  };
}

Layout.propTypes = {
  contest: PropTypes.string,
  exportUrl: PropTypes.string,
  fieldsToShow: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string,
};

Layout.defaultProps = {
  contest: '',
  exportUrl: '',
  fieldsToShow: [],
  id: '',
};

export default Layout;
