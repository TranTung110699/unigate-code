import React, { Component } from 'react';
import { Element } from 'schema-form/elements';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import schemaActions from 'schema-form/actions';
import RaisedButton from 'components/common/mui/RaisedButton';
import commonSagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';
import { createSelector } from 'reselect';

class FormFilters extends Component {
  constructor(props) {
    super(props);
    this.fetchOptionsData = this.fetchOptionsData.bind(this);
  }

  componentDidMount() {
    this.fetchOptionsData();
  }

  fetchOptionsData() {
    const { id, dispatch } = this.props;
    const asyncFields = ['course'];
    asyncFields.forEach((asyncField) => {
      dispatch(schemaActions.formSchemaConfigsRequest(asyncField, id, {}));
    });
  }

  exportStudentsByCourse() {
    const { id, dispatch, form } = this.props;

    dispatch(
      commonSagaActions.exportDataRequest(
        apiUrls.export_students_by_course,
        form[id].values,
      ),
    );
  }

  render() {
    const { statuses, courses } = this.props;
    return (
      <div>
        <div className="col-md-4">
          <Element
            schema={{
              type: 'select',
              name: 'course_iid',
              floatingLabelText: t1('course'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: courses,
            }}
          />
        </div>
        <div className="col-md-4">
          <Element
            schema={{
              type: 'select',
              name: 'user_course_status',
              fullWidth: true,
              floatingLabelText: t1('user_course_status'),
              floatingLabelFixed: true,
              options: statuses.options,
            }}
          />
        </div>
        <div className="col-md-4 submit-btn-col">
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
              this.exportStudentsByCourse();
            }}
          />
        </div>
      </div>
    );
  }
}

const selectFieldPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    value: PropTypes.any,
    primaryText: PropTypes.string,
  }),
);

FormFilters.propTypes = {
  courses: selectFieldPropTypes,
};

FormFilters.defaultProps = {
  courses: [],
};

const defaultSelectOptions = [
  {
    value: '',
    primaryText: t1('all'),
  },
];

const mapStateToProps = createSelector(
  (state, props) => state.formSchemaConfigs[props.id],
  (state) => state.form,
  (config, form) => ({
    form,
    courses:
      config && config.course
        ? defaultSelectOptions.concat(config.course)
        : defaultSelectOptions,
  }),
);

export default connect(mapStateToProps)(FormFilters);
