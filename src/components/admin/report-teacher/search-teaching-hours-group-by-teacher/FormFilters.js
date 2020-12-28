import React, { Component } from 'react';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import { Element } from 'schema-form/elements';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import schemaActions from 'schema-form/actions';
import commonSagaActions from 'actions/saga-creators';
import RaisedButton from 'components/common/mui/RaisedButton';
import external from 'components/admin/group/schema/elements/filterset/filter/schema/external';
import apiUrls from 'api-endpoints';
import DateTimePicker from 'schema-form/elements/date-time-picker';

class FormFilters extends Component {
  constructor(props) {
    super(props);
    this.fetchOptionsData = this.fetchOptionsData.bind(this);
    this.fetchOptionData = this.fetchOptionData.bind(this);
  }

  componentDidMount() {
    this.fetchOptionsData();
  }

  fetchOptionsData() {
    const { id, dispatch } = this.props;
    const asyncFields = ['organization', 'credit_syllabus'];

    asyncFields.forEach((asyncField) => {
      dispatch(schemaActions.formSchemaConfigsRequest(asyncField, id, {}));
    });
  }

  fetchOptionData(fieldName, params) {
    const { id, dispatch } = this.props;

    dispatch(schemaActions.formSchemaConfigsRequest(fieldName, id, params));
  }

  exportTeachingHoursGroupByTeacher() {
    const { id, dispatch, form, mode } = this.props;

    let exportUrl = apiUrls.export_teachers_by_faculty;
    if (mode === 'credit') {
      exportUrl = apiUrls.export_teachers_by_credit;
    }

    dispatch(commonSagaActions.exportDataRequest(exportUrl, form[id].values));
  }

  render() {
    const { organizations, creditSyllabuses, mode } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <Element
              schema={{
                type: DateTimePicker,
                name: 'from_date',
                floatingLabelText: t1('from_date'),
                fullWidth: true,
              }}
            />
          </div>
          <div className="col-md-4">
            <Element
              schema={{
                type: DateTimePicker,
                name: 'to_date',
                floatingLabelText: t1('to_date'),
                fullWidth: true,
              }}
            />
          </div>
          {mode && mode === 'faculty' && (
            <div className="col-md-4">
              <Element
                schema={{
                  type: 'select',
                  name: 'organization',
                  floatingLabelText: t1('organization'),
                  floatingLabelFixed: true,
                  fullWidth: true,
                  options: organizations,
                }}
              />
            </div>
          )}
          {mode && mode === 'credit' && (
            <div className="col-md-4">
              <Element
                schema={{
                  type: 'select',
                  name: 'credit_syllabus',
                  floatingLabelText: t1('subject'),
                  floatingLabelFixed: true,
                  fullWidth: true,
                  options: creditSyllabuses,
                }}
              />
            </div>
          )}
        </div>
        <div className="row">
          {mode && mode === 'faculty' && (
            <div className="col-md-4">
              <TextField
                fullWidth
                name="teacher_name"
                floatingLabelText={t1('teacher_name')}
                label={t1('teacher_name')}
                hintText={t1('please_enter_teacher_name_or_iid')}
              />
            </div>
          )}
          <div className="col-md-4">
            <Element
              schema={Object.assign(external(), {
                name: 'external',
              })}
            />
          </div>
          <div className="col-md-4 text-center">
            <RaisedButton
              name="submit"
              type="submit"
              id="submit"
              label={t1('search')}
              className="admin-btn"
              primary
            />
            <RaisedButton
              name="export"
              type="btn"
              id="export"
              label={t1('export')}
              primary
              className="admin-btn m-t-25 m-l-10"
              onClick={() => {
                this.exportTeachingHoursGroupByTeacher();
              }}
            />
          </div>
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
  let organizations = defaultSelectOptions;
  let creditSyllabuses = defaultSelectOptions;

  const config = state.formSchemaConfigs[props.id];

  if (config) {
    if (config.organization) {
      organizations = organizations.concat(config.organization);
    }

    if (config.credit_syllabus) {
      creditSyllabuses = creditSyllabuses.concat(config.credit_syllabus);
    }
  }

  return {
    organizations,
    creditSyllabuses,
    form: state.form,
  };
}

export default connect(mapStateToProps)(FormFilters);
