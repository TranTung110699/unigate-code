import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Results from './Results';

class SurveyResult extends React.Component {
  renderResultComponent = (data, props) => {
    const { formid } = this.props;

    return <Results {...props} data={data} searchFormId={formid} />;
  };

  render() {
    return (
      <div>
        <SearchWrapper
          {...this.props}
          renderResultsComponent={this.renderResultComponent}
          paginationProps={{
            onlyShowIfTotalBigEnough: false,
          }}
          noResultText={t1('no_data')}
          showSearchButton={false}
        />
      </div>
    );
  }
}

SurveyResult.propTypes = {
  formid: PropTypes.string,
  noSearchForm: PropTypes.bool,
};

SurveyResult.defaultProps = {
  formid: '',
  noSearchForm: true,
};

export default connect()(SurveyResult);
