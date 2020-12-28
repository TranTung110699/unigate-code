import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import { getNodeSelector } from 'components/admin/node/utils';
import Display from './display';

const status = ['approved'];

class ExamShift extends React.Component {
  paginationProps = {
    showExtraControl: false,
    position: 'center',
    theme: 'light',
  };

  cssClass = 'etec-exam-shift';

  renderResultComponent = (items) => {
    const { className, examShift } = this.props;
    return (
      <Display className={className} items={items} examShift={examShift} />
    );
  };

  render() {
    const { examShift } = this.props;
    if (!examShift || !examShift.syllabus) {
      return null;
    }
    return (
      <SearchWrapper
        formid="paper_search"
        renderNoResultComponent={() => null}
        renderResultsComponent={this.renderResultComponent}
        hiddenFields={{
          status,
          syllabus_iid: examShift.syllabus,
        }}
        paginationProps={this.paginationProps}
      />
    );
  }
}

ExamShift.propTypes = {
  className: PropTypes.string,
  examShift: PropTypes.shape(),
  iid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ExamShift.defaultProps = {
  className: '',
  examShift: null,
  iid: null,
};

const mapStateToProps = (state, props) => {
  const { iid } = props;
  const examShift = getNodeSelector(state)(iid);
  return {
    examShift,
  };
};

export default connect(mapStateToProps)(ExamShift);
