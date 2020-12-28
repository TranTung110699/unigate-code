import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import PropTypes from 'prop-types';
import apiUrls from 'api-endpoints';
import results from './Results';
import schema from './schema/search-form';
import { confSelector } from '../../../../../../../common/selectors';

const formid = 'search_fee_collecting_phase_detail';
class Layout extends Component {
  renderResultComponent = (items) => {
    const { fcp, maxNumberOfExamResit } = this.props;
    return results({ items, fcp, searchFormId: formid, maxNumberOfExamResit });
  };

  render() {
    const fcp = this.props.fcp || {};
    const hiddenFields = {
      fee_collecting_phase: fcp.iid,
      _sand_step: 'search_fee_collecting_phase_detail',
    };

    return (
      <SearchWrapper
        alternativeApi={apiUrls.fee_collecting_phase_search}
        hiddenFields={hiddenFields}
        formid={formid}
        schema={schema}
        showResult
        renderResultsComponent={this.renderResultComponent}
      />
    );
  }
}

Layout.propTypes = {
  type: PropTypes.string,
};

Layout.defaultProps = {
  type: '',
};

function mapStateToProps(state) {
  const conf = confSelector(state);
  const maxNumberOfExamResit = conf.max_number_of_exam_resits;

  return {
    maxNumberOfExamResit,
  };
}

export default connect(mapStateToProps)(Layout);
