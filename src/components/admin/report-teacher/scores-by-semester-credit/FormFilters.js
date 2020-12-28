import React, { Component } from 'react';
import { t1 } from 'translate';
import { change } from 'redux-form';
import { createSelectorWithExtraParams } from 'utils/selector';
import { connect } from 'react-redux';
import { filterObjectKeys } from 'common/utils/object';
import { Element } from 'schema-form/elements';
import schemaActions from 'schema-form/actions';
import RaisedButton from 'components/common/mui/RaisedButton';
import commonSagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';
import { modeOptions, modes } from './common/constants';

class FormFilters extends Component {
  componentWillMount() {
    const { dispatch, id } = this.props;
    dispatch(change(id, 'mode', modes.OVERVIEW));
  }

  componentDidMount() {
    this.fetchOptionsData();
  }

  fetchOptionsData = () => {
    const asyncFields = [
      'organization',
      'major',
      'ico',
      'semester',
      'training_level',
      'training_mode',
    ];

    asyncFields.forEach((asyncField) => {
      this.fetchOptionData(asyncField, {});
    });
  };

  fetchOptionData = (fieldName, params) => {
    const { id, dispatch } = this.props;

    const mappingAsync = {
      valueKey: 'iid',
    };

    dispatch(
      schemaActions.formSchemaConfigsRequest(
        fieldName,
        id,
        params,
        mappingAsync,
      ),
    );
  };

  export = () => {
    const { id, dispatch } = this.props;
    dispatch(
      commonSagaActions.exportDataRequest(
        apiUrls.export_scores_by_course,
        null,
        id,
      ),
    );
  };

  render() {
    const {
      faculties,
      majors,
      icos,
      semesters,
      trainingLevels,
      trainingModes,
      blackList,
    } = this.props;

    return (
      <div>
        {(!blackList || !blackList.includes('organization')) && (
          <div className="col-md-4">
            <Element
              schema={{
                type: 'select',
                name: 'organization',
                floatingLabelText: t1('organization'),
                floatingLabelFixed: true,
                fullWidth: true,
                options: faculties,
              }}
            />
          </div>
        )}
        {(!blackList || !blackList.includes('major')) && (
          <div className="col-md-4">
            <Element
              schema={{
                type: 'select',
                name: 'major',
                floatingLabelText: t1('major'),
                floatingLabelFixed: true,
                fullWidth: true,
                options: majors,
              }}
            />
          </div>
        )}
        {(!blackList || !blackList.includes('ico')) && (
          <div className="col-md-4">
            <Element
              schema={{
                type: 'select',
                name: 'ico',
                floatingLabelText: t1('ico'),
                floatingLabelFixed: true,
                fullWidth: true,
                options: icos,
              }}
            />
          </div>
        )}
        {(!blackList || !blackList.includes('training_mode')) && (
          <div className="col-md-4">
            <Element
              schema={{
                type: 'select',
                name: 'training_mode',
                floatingLabelText: t1('training_mode'),
                floatingLabelFixed: true,
                fullWidth: true,
                options: trainingModes,
              }}
            />
          </div>
        )}
        {(!blackList || !blackList.includes('training_level')) && (
          <div className="col-md-4">
            <Element
              schema={{
                type: 'select',
                name: 'training_level',
                floatingLabelText: t1('training_level'),
                floatingLabelFixed: true,
                fullWidth: true,
                options: trainingLevels,
              }}
            />
          </div>
        )}
        {(!blackList || !blackList.includes('semester')) && (
          <div className="col-md-12">
            <Element
              schema={{
                type: 'multiCheckbox',
                name: 'semester',
                floatingLabelText: t1('semesters'),
                fullWidth: true,
                options: semesters,
              }}
            />
          </div>
        )}
        {(!blackList || !blackList.includes('mode')) && (
          <div className="col-md-12">
            <Element
              schema={{
                type: 'radio',
                name: 'mode',
                hintText: t1('view'),
                floatingLabelFixed: true,
                fullWidth: true,
                options: modeOptions,
              }}
            />
          </div>
        )}
        {(!blackList || !blackList.includes('actions')) && (
          <div className="col-md-12 text-center">
            <RaisedButton
              name="submit"
              type="submit"
              id="submit"
              label={t1('search')}
              className="admin-btn"
              primary
            />
            {/* <RaisedButton */}
            {/* name="export" */}
            {/* type="btn" */}
            {/* id="export" */}
            {/* label={t1('export')} */}
            {/* primary */}
            {/* className="admin-btn" */}
            {/* onClick={() => { */}
            {/*   this.export(); */}
            {/* }} */}
            {/* /> */}
          </div>
        )}
      </div>
    );
  }
}

const getOptionsConfigSelector = createSelectorWithExtraParams(
  (state) => state.formSchemaConfigs,
  1,
  (formSchemaConfigs) => (formid) => {
    const defaultSelectOptions = [
      {
        value: '',
        primaryText: t1('all'),
      },
    ];
    let faculties = defaultSelectOptions;
    let majors = defaultSelectOptions;
    let icos = defaultSelectOptions;
    let trainingLevels = defaultSelectOptions;
    let trainingModes = defaultSelectOptions;
    let semesters = [];

    const config = formSchemaConfigs[formid];
    if (config) {
      if (config.organization) {
        faculties = faculties
          .concat(config.organization)
          .filter(Boolean)
          .map((option) => filterObjectKeys(option, ['value', 'primaryText']));
      }

      if (config.major) {
        majors = majors
          .concat(config.major)
          .filter(Boolean)
          .map((option) => filterObjectKeys(option, ['value', 'primaryText']));
      }

      if (config.ico) {
        icos = icos
          .concat(config.ico)
          .filter(Boolean)
          .map((option) => filterObjectKeys(option, ['value', 'primaryText']));
      }

      if (config.semester) {
        semesters = semesters
          .concat(config.semester)
          .filter(Boolean)
          .map((option) =>
            filterObjectKeys(option, ['value', 'primaryText', 'label']),
          );
      }

      if (config.training_level) {
        trainingLevels = trainingLevels
          .concat(config.training_level)
          .filter(Boolean)
          .map((option) =>
            filterObjectKeys(option, ['value', 'primaryText', 'label']),
          );
      }

      if (config.training_mode) {
        trainingModes = trainingModes
          .concat(config.training_mode)
          .filter(Boolean)
          .map((option) =>
            filterObjectKeys(option, ['value', 'primaryText', 'label']),
          );
      }
    }

    return {
      faculties,
      majors,
      icos,
      semesters,
      trainingLevels,
      trainingModes,
    };
  },
);

const mapStateToProps = (state, props) => {
  const options = getOptionsConfigSelector(state)(props.id);
  return {
    ...options,
  };
};

export default connect(mapStateToProps)(FormFilters);
