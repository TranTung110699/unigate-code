import React from 'react';
import PropTypes from 'prop-types';
import { getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import reportOptions from '../configs/reportOptions';

class TransactionReport extends React.Component {
  render() {
    const { report } = this.props;
    const selectedOption = reportOptions.filter(
      (option) => option.value === report,
    )[0];
    const form = selectedOption && selectedOption.form;
    return form || <div />;
  }
}

TransactionReport.propTypes = {
  report: PropTypes.string,
};

TransactionReport.defaultProps = {
  report: null,
};

const mapStateToProps = (state, props) => {
  const { searchFormId } = props;
  const values = getFormValues(searchFormId)(state);
  const report = values && values.report;

  return {
    report,
  };
};

export default connect(mapStateToProps)(TransactionReport);
