import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import { getFormValues } from 'redux-form';
import commonSagaActions from 'actions/saga-creators';
import RaisedButton from 'components/common/mui/RaisedButton';

class FormFilters extends Component {
  constructor(props) {
    super(props);
    this.handleExportButtonOnClick = this.handleExportButtonOnClick.bind(this);
  }

  handleExportButtonOnClick() {
    const { dispatch, formValues, exportUrl } = this.props;
    dispatch(commonSagaActions.exportDataRequest(exportUrl, formValues));
  }

  render() {
    return (
      <div>
        <div className="col-md-12 text-center">
          <RaisedButton
            name="preview"
            type="submit"
            id="submit"
            label={t1('preview')}
            className="admin-btn"
            primary
          />
          <RaisedButton
            name="export"
            type="btn"
            id="export"
            label={t1('export')}
            primary
            className="admin-btn"
            onClick={this.handleExportButtonOnClick}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { formid, hiddenFields } = props;

  return {
    formValues: Object.assign({}, hiddenFields, getFormValues(formid)(state)),
  };
};

FormFilters.propTypes = {
  exportUrl: PropTypes.string,
  formValues: PropTypes.shape(),
};

FormFilters.defaultProps = {
  exportUrl: '',
  formValues: {},
};

export default connect(mapStateToProps)(FormFilters);
