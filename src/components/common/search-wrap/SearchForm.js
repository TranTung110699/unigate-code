import React, { Component } from 'react';
import { t1 } from 'translate';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import RaisedButton from 'components/common/mui/RaisedButton';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormElement from '../../common/forms/Element';
import MultiCheckbox from '../../common/forms/MultiCheckbox';

class SearchForm extends Component {
  render() {
    const {
      formid,
      formFilter,
      handleSubmit,
      showQueryField,
      showSearchButton,
      classWapperSearchButton,
      searchButtonText,
      statuses,
    } = this.props;
    return (
      <div>
        {!!(formFilter || showQueryField || showSearchButton) && (
          <div id="teacher-search-form" className="container-fluid">
            <form id={formid} onSubmit={handleSubmit}>
              <div className="row">
                {showQueryField && (
                  <div className="col-md-6">
                    <TextField
                      fullWidth
                      name="query"
                      floatingLabelText={t1('query')}
                      label={t1('search_by_name_or_iid')}
                      hintText={t1('please_type_search_text')}
                    />
                  </div>
                )}

                {statuses && statuses.options && statuses.options.length > 0 && (
                  <div className="col-md-6">
                    <FormElement name="status">
                      <MultiCheckbox {...statuses} />
                    </FormElement>
                  </div>
                )}

                {formFilter}

                {showSearchButton && (
                  <div className={classWapperSearchButton}>
                    <RaisedButton
                      name="submit"
                      type="submit"
                      id="submit"
                      label={searchButtonText || t1('search')}
                      primary
                    />
                  </div>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

SearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  formid: PropTypes.string.isRequired,
  showQueryField: PropTypes.bool,
  showSearchButton: PropTypes.bool,
  classWapperSearchButton: PropTypes.string,
};

SearchForm.defaultProps = {
  formFilter: {},
  statuses: {},
  showQueryField: false,
  showSearchButton: false,
  classWapperSearchButton: 'col-md-4 submit-btn-col',
};

export default connect()(reduxForm({ destroyOnUnmount: false })(SearchForm));
