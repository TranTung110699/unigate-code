import React, { Component } from 'react';
import { t1, t3 } from 'translate';
import { Element } from 'schema-form/elements';
import RaisedButton from 'components/common/mui/RaisedButton';

import { connect } from 'react-redux';
import apiUrls from 'api-endpoints';
import contestApiUrls from 'components/admin/contest/endpoints';
import schemaActions from 'schema-form/actions';
import commonSagaActions from 'actions/saga-creators';

class FormFilters extends Component {
  constructor(props) {
    super(props);
    this.fetchOptionsData = this.fetchOptionsData.bind(this);
    this.fetchOptionData = this.fetchOptionData.bind(this);
    this.fetchExamRounds = this.fetchExamRounds.bind(this);
    this.exportUsers = this.exportUsers.bind(this);
  }

  componentDidMount() {
    this.fetchExamRounds();
    this.fetchOptionsData();
  }

  fetchOptionsData() {
    const { id, dispatch } = this.props;
    const asyncFields = ['school__grade', 'zone'];

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

  exportUsers() {
    const { formid, dispatch, form } = this.props;

    dispatch(
      commonSagaActions.exportDataRequest(
        contestApiUrls.export_result_by_period,
        form[formid].values,
      ),
    );
  }

  render() {
    const { examRounds, zones, grades } = this.props;

    return (
      <div>
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
              name: 'school__grade',
              floatingLabelText: t1('select_grade_name'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: grades,
            }}
          />
        </div>

        <div className="col-md-3">
          <Element
            schema={{
              type: 'number',
              name: 'start_score',
              floatingLabelText: t1('score_start_from'),
              fullWidth: true,
              hintText: `${t3('vd')}: 66`,
            }}
          />
        </div>

        <div className="col-md-3">
          <Element
            schema={{
              type: 'number',
              name: 'end_score',
              floatingLabelText: t1('score_to'),
              fullWidth: true,
              hintText: `${t3('vd')}: 88`,
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
  let grades = defaultSelectOptions;

  const config = state.formSchemaConfigs[props.id];

  if (config) {
    if (config.exam_round) {
      examRounds = examRounds.concat(config.exam_round);
    }

    if (config.zone) {
      zones = zones.concat(config.zone);
    }

    if (config.school__grade) {
      grades = grades.concat(config.school__grade);
    }
  }

  return {
    examRounds,
    zones,
    grades,
    form: state.form,
  };
}

export default connect(mapStateToProps)(FormFilters);
