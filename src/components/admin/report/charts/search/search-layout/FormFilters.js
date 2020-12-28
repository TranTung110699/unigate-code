import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import { Element } from 'schema-form/elements';
import schemaActions from 'schema-form/actions';
import RaisedButton from 'components/common/mui/RaisedButton';

class FormFilters extends Component {
  constructor(props) {
    super(props);
    this.fetchOptionsData = this.fetchOptionsData.bind(this);
    this.provinceOnChanged = this.provinceOnChanged.bind(this);
  }

  componentDidMount() {
    this.fetchOptionsData();
  }

  fetchOptionsData() {
    const { formid, dispatch, fieldsToShow } = this.props;

    fieldsToShow.forEach((asyncField) => {
      dispatch(schemaActions.formSchemaConfigsRequest(asyncField, formid, {}));
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

  render() {
    const { fieldsToShow, provinces, districts } = this.props;

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
        <div className="col-md-12">
          <RaisedButton
            name="preview"
            type="submit"
            id="submit"
            label={t1('generate')}
            className="admin-btn"
            primary
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { formid } = props;

  let provinces = [];
  let districts = [];

  const config = state.formSchemaConfigs[formid];

  if (config) {
    if (config.school__province) {
      provinces = provinces.concat(config.school__province);
    }

    if (config.school__district) {
      districts = districts.concat(config.school__district);
    }
  }

  return {
    provinces,
    districts,
  };
};

export default connect(mapStateToProps)(FormFilters);
