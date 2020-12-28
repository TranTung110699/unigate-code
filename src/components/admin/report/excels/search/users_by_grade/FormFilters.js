import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Element } from 'schema-form/elements';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import { getFormValues } from 'redux-form';
import commonSagaActions from 'actions/saga-creators';
import schemaActions from 'schema-form/actions';
import RaisedButton from 'components/common/mui/RaisedButton';

class FormFilters extends Component {
  constructor(props) {
    super(props);
    this.fetchOptionsData = this.fetchOptionsData.bind(this);
    this.provinceOnChanged = this.provinceOnChanged.bind(this);
    this.handleExportButtonOnClick = this.handleExportButtonOnClick.bind(this);
  }

  componentDidMount() {
    this.fetchOptionsData();
  }

  fetchOptionsData() {
    const { formid, dispatch, fieldsToShow, hiddenFields } = this.props;

    fieldsToShow.forEach((asyncField) => {
      let params = {};
      switch (asyncField) {
        case 'exam_round': {
          params = {
            contest_code: hiddenFields.contest_code,
          };
          break;
        }
        default: {
          params = {};
        }
      }
      dispatch(
        schemaActions.formSchemaConfigsRequest(asyncField, formid, params),
      );
    });
  }

  provinceOnChanged(event, value) {
    const { formid, dispatch } = this.props;

    const params = {
      id: value,
      type: 'district',
    };

    dispatch(
      schemaActions.formSchemaConfigsRequest(
        'school__district',
        formid,
        params,
      ),
    );
  }

  handleExportButtonOnClick() {
    const { dispatch, formValues, exportUrl } = this.props;
    dispatch(commonSagaActions.exportDataRequest(exportUrl, formValues));
  }

  render() {
    const { fieldsToShow, provinces, districts, examRounds } = this.props;

    return (
      <div>
        {fieldsToShow.indexOf('school__province') !== -1 && (
          <div className="col-md-12">
            <Element
              schema={{
                type: 'select',
                name: 'school__province',
                floatingLabelText: t1('city_province'),
                floatingLabelFixed: true,
                onChange: this.provinceOnChanged,
                fullWidth: true,
                options: provinces,
              }}
            />
          </div>
        )}
        {fieldsToShow.indexOf('school__district') !== -1 && (
          <div className="col-md-12">
            <Element
              schema={{
                type: 'select',
                name: 'school__district',
                floatingLabelText: t1('district'),
                floatingLabelFixed: true,
                fullWidth: true,
                options: districts,
              }}
            />
          </div>
        )}
        {fieldsToShow.indexOf('exam_round') !== -1 && (
          <div className="col-md-12">
            <Element
              schema={{
                type: 'select',
                name: 'exam_round',
                floatingLabelText: t1('exam_round'),
                floatingLabelFixed: true,
                fullWidth: true,
                options: examRounds,
              }}
            />
          </div>
        )}
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

  let examRounds = [];
  let provinces = [];
  let districts = [];

  const config = state.formSchemaConfigs[formid];

  if (config) {
    if (config.exam_round) {
      examRounds = examRounds.concat(config.exam_round);
    }

    if (config.school__province) {
      provinces = provinces.concat(config.school__province);
    }

    if (config.school__district) {
      districts = districts.concat(config.school__district);
    }
  }

  return {
    examRounds,
    provinces,
    districts,
    formValues: Object.assign({}, hiddenFields, getFormValues(formid)(state)),
  };
};

FormFilters.propTypes = {
  formValues: PropTypes.shape(),
};

FormFilters.defaultProps = {
  formValues: {},
};

export default connect(mapStateToProps)(FormFilters);
