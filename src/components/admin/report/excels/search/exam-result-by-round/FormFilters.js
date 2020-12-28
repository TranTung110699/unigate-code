import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1, t3 } from 'translate';
import { Element } from 'schema-form/elements';
import contestApiUrls from 'components/admin/contest/endpoints';
import schemaActions from 'schema-form/actions';
import commonSagaActions from 'actions/saga-creators';
import RaisedButton from 'components/common/mui/RaisedButton';
import DatePicker from 'schema-form/elements/date-picker';

class FormFilters extends Component {
  divStyle = { margin: '24px 0 0 0' };

  elementSchema = {
    type: DatePicker,
    name: 'exam_date',
    container: 'inline',
    autoOk: true,
    format: null,
  };

  constructor(props) {
    super(props);
    this.fetchOptionsData = this.fetchOptionsData.bind(this);
    this.fetchOptionData = this.fetchOptionData.bind(this);
    this.fetchExamRounds = this.fetchExamRounds.bind(this);
    this.provinceOnChanged = this.provinceOnChanged.bind(this);
    this.districtOnChanged = this.districtOnChanged.bind(this);
    this.exportUsers = this.exportUsers.bind(this);
  }

  componentDidMount() {
    this.fetchExamRounds();
    this.fetchOptionsData();
  }

  fetchOptionsData() {
    const { id, dispatch } = this.props;
    const asyncFields = ['school__province', 'school__grade', 'zone'];

    asyncFields.forEach((asyncField) => {
      dispatch(schemaActions.formSchemaConfigsRequest(asyncField, id, {}));
    });
  }

  fetchOptionData(fieldName, params) {
    const { id, dispatch } = this.props;

    dispatch(schemaActions.formSchemaConfigsRequest(fieldName, id, params));
  }

  fetchExamRounds() {
    const { contest } = this.props;

    const params = {
      contest_code: contest,
    };

    this.fetchOptionData('exam_round', params);
  }

  provinceOnChanged(event, value) {
    const params = {
      id: value,
      type: 'district',
    };

    this.fetchOptionData('school__district', params);
  }

  districtOnChanged(event, value) {
    const params = {
      id: value,
      type: 'school',
    };

    this.fetchOptionData('school__id', params);
  }

  exportUsers() {
    const { formid, dispatch, form, sortScore } = this.props;

    switch (sortScore) {
      case '0':
        dispatch(
          commonSagaActions.exportDataRequest(
            contestApiUrls.export_result_by_round,
            form[formid].values,
          ),
        );
        break;
      case '-1':
        dispatch(
          commonSagaActions.exportDataRequest(
            contestApiUrls.export_result_by_round_desc,
            form[formid].values,
          ),
        );
        break;
      case '1':
        dispatch(
          commonSagaActions.exportDataRequest(
            contestApiUrls.export_result_by_round_asc,
            form[formid].values,
          ),
        );
        break;
      default:
        dispatch(
          commonSagaActions.exportDataRequest(
            contestApiUrls.export_result_by_round,
            form[formid].values,
          ),
        );
        break;
    }
  }

  render() {
    const {
      examRounds,
      zones,
      examShifts,
      provinces,
      districts,
      schools,
      grades,
    } = this.props;

    return (
      <div>
        <div className="col-md-9">
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

        <div className="col-md-3">
          <Element
            schema={{
              type: 'select',
              name: 'zone',
              floatingLabelFixed: true,
              fullWidth: true,
              options: zones,
              floatingLabelText: t1('zone'),
            }}
          />
        </div>

        <div className="col-md-3">
          <Element
            schema={{
              type: 'select',
              name: 'shift_exam',
              floatingLabelText: t1('select_exam_shift'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: examShifts,
            }}
          />
        </div>

        <div className="col-md-3">
          <Element
            schema={{
              type: 'select',
              name: 'school__province',
              floatingLabelText: t1('select_city_province'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: provinces,
              onChange: this.provinceOnChanged,
            }}
          />
        </div>

        <div className="col-md-3">
          <Element
            schema={{
              type: 'select',
              name: 'school__district',
              floatingLabelText: t1('select_district'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: districts,
              onChange: this.districtOnChanged,
            }}
          />
        </div>

        <div className="col-md-3">
          <Element
            schema={{
              type: 'select',
              name: 'school__id',
              floatingLabelText: t1('select_school_name'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: schools,
            }}
          />
        </div>

        <div className="col-md-3">
          <Element
            schema={{
              type: 'select',
              name: 'school__grade',
              floatingLabelText: t1('select_grade_name'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: grades,
            }}
          />
        </div>

        <div className="col-md-3" style={this.divStyle}>
          <Element schema={this.elementSchema} />
        </div>

        <div className="col-md-3">
          <Element
            schema={{
              type: 'text',
              name: 'name',
              floatingLabelText: t1('name'),
              fullWidth: true,
              hintText: `${t3('vd')}: Cao Mỹ Duyên`,
            }}
          />
        </div>

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
            onClick={() => {
              this.exportUsers();
            }}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const defaultSelectOptions = [
    {
      value: '',
      primaryText: t1('all'),
    },
  ];

  let examRounds = defaultSelectOptions;
  let zones = defaultSelectOptions;
  let examShifts = defaultSelectOptions;
  let provinces = defaultSelectOptions;
  let districts = defaultSelectOptions;
  let schools = defaultSelectOptions;
  let grades = defaultSelectOptions;

  const config = state.formSchemaConfigs[props.id];

  if (config) {
    if (config.exam_round) {
      examRounds = examRounds.concat(config.exam_round);
    }

    if (config.zone) {
      zones = zones.concat(config.zone);
    }

    if (config.shift_exam) {
      examShifts = examShifts.concat(config.shift_exam);
    }

    if (config.school__province) {
      provinces = provinces.concat(config.school__province);
    }

    if (config.school__district) {
      districts = districts.concat(config.school__district);
    }

    if (config.school__id) {
      schools = schools.concat(config.school__id);
    }

    if (config.school__grade) {
      grades = grades.concat(config.school__grade);
    }
  }

  return {
    examRounds,
    zones,
    examShifts,
    provinces,
    districts,
    schools,
    grades,
    form: state.form,
  };
}

export default connect(mapStateToProps)(FormFilters);
