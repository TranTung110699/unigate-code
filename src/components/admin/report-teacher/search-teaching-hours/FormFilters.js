import React, { Component } from 'react';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import { Element } from 'schema-form/elements';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import schemaActions from 'schema-form/actions';
import commonSagaActions from 'actions/saga-creators';
import RaisedButton from 'components/common/mui/RaisedButton';
import apiUrls from 'api-endpoints';
import { monthsSelect, yearsOptions } from 'common/utils/Date';

class FormFilters extends Component {
  constructor(props) {
    super(props);
    this.fetchOptionsData = this.fetchOptionsData.bind(this);
    this.fetchOptionData = this.fetchOptionData.bind(this);
    this.facultyOnChanged = this.facultyOnChanged.bind(this);
  }

  componentDidMount() {
    const { id, dispatch } = this.props;
    const currentYear = new Date().getFullYear();
    dispatch(change(id, 'year', currentYear));

    this.fetchOptionsData();
  }

  fetchOptionsData() {
    const { id, dispatch } = this.props;
    const asyncFields = [
      'faculty',
      'teaching_hours_major',
      'class',
      'credit_syllabus',
      'year',
      'month',
    ];

    asyncFields.forEach((asyncField) => {
      dispatch(schemaActions.formSchemaConfigsRequest(asyncField, id, {}));
    });
  }

  fetchOptionData(fieldName, params) {
    const { id, dispatch } = this.props;

    dispatch(schemaActions.formSchemaConfigsRequest(fieldName, id, params));
  }

  facultyOnChanged(value) {
    const params = {
      id: value,
      type: 'major',
    };

    this.fetchOptionData('teaching_hours_major', params);
  }

  exportTeachingHours() {
    const { id, dispatch, form } = this.props;

    dispatch(
      commonSagaActions.exportDataRequest(
        apiUrls.export_teaching_hours,
        form[id].values,
      ),
    );
  }

  render() {
    const { faculties, majors, creditSyllabuses, classes } = this.props;

    return (
      <div>
        <div className="col-md-4">
          <Element
            schema={{
              type: 'select',
              name: 'faculty',
              floatingLabelText: t1('faculty'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: faculties,
              onChange: (event, value) => {
                this.facultyOnChanged(value);
              },
            }}
          />
        </div>
        <div className="col-md-4">
          <Element
            schema={{
              type: 'select',
              name: 'teaching_hours_major',
              floatingLabelText: t1('major'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: majors,
            }}
          />
        </div>
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
        <div className="col-md-4">
          <Element
            schema={{
              type: 'select',
              name: 'class',
              floatingLabelText: t1('class'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: classes,
            }}
          />
        </div>
        <div className="col-md-4">
          <Element
            schema={{
              type: 'select',
              name: 'year',
              floatingLabelText: t1('year'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: yearsOptions(),
            }}
          />
        </div>
        <div className="col-md-4">
          <Element
            schema={{
              type: 'select',
              name: 'month',
              floatingLabelText: t1('month'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: monthsSelect,
            }}
          />
        </div>
        <div className="col-md-4">
          <TextField
            fullWidth
            name="q"
            floatingLabelText={t1('teacher_name')}
            label={t1('teacher_name')}
            hintText={t1('please_enter_teacher_name_or_iid')}
          />
        </div>
        <div className="col-md-12 text-center">
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
            className="admin-btn"
            onClick={() => {
              this.exportTeachingHours();
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
  let faculties = [];
  let majors = [];
  let classes = defaultSelectOptions;
  let creditSyllabuses = defaultSelectOptions;

  const config = state.formSchemaConfigs[props.id];
  if (config) {
    if (config.faculty) {
      faculties = faculties.concat(config.faculty);
    }

    if (config.teaching_hours_major) {
      majors = majors.concat(config.teaching_hours_major);
    }

    if (config.credit_syllabus) {
      creditSyllabuses = creditSyllabuses.concat(config.credit_syllabus);
    }

    if (config.class) {
      classes = classes.concat(config.class);
    }
  }

  return {
    faculties,
    majors,
    classes,
    creditSyllabuses,
    form: state.form,
  };
}

export default connect(mapStateToProps)(FormFilters);
