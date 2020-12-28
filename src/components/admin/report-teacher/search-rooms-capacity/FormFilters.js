import React, { Component } from 'react';
import { t1 } from 'translate';
import { change } from 'redux-form';
import { connect } from 'react-redux';
import { Element } from 'schema-form/elements';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import schemaActions from 'schema-form/actions';
import commonSagaActions from 'actions/saga-creators';
import RaisedButton from 'components/common/mui/RaisedButton';
import apiUrls from 'api-endpoints';
import { monthsSelect, yearsOptions } from 'common/utils/Date';
import { capacityTypesOptions } from 'configs/constants';

class FormFilters extends Component {
  constructor(props) {
    super(props);
    this.fetchOptionsData = this.fetchOptionsData.bind(this);
    this.fetchOptionData = this.fetchOptionData.bind(this);
  }

  componentDidMount() {
    const { id, dispatch } = this.props;
    const currentYear = new Date().getFullYear();
    dispatch(change(id, 'year', currentYear));

    this.fetchOptionsData();
  }

  fetchOptionsData() {
    const { id, dispatch } = this.props;
    const asyncFields = ['semester', 'year', 'month'];

    asyncFields.forEach((asyncField) => {
      dispatch(schemaActions.formSchemaConfigsRequest(asyncField, id, {}));
    });
  }

  fetchOptionData(fieldName, params) {
    const { id, dispatch } = this.props;

    dispatch(schemaActions.formSchemaConfigsRequest(fieldName, id, params));
  }

  exportRoomsCapacity() {
    const { id, dispatch, form } = this.props;

    dispatch(
      commonSagaActions.exportDataRequest(
        apiUrls.export_rooms_capacity,
        form[id].values,
      ),
    );
  }

  render() {
    const { semesters } = this.props;

    return (
      <div>
        <div className="col-md-4">
          <TextField
            fullWidth
            name="room_name"
            floatingLabelText={t1('room_name')}
            label={t1('room_name')}
            hintText={t1('please_enter_room_name')}
          />
        </div>
        <div className="col-md-4">
          <TextField
            fullWidth
            name="theater_name"
            floatingLabelText={t1('theater_name')}
            label={t1('theater_name')}
            hintText={t1('please_enter_theater_name')}
          />
        </div>
        <div className="col-md-4">
          <Element
            schema={{
              type: 'number',
              name: 'floor_number',
              floatingLabelText: t1('floor_number'),
              floatingLabelFixed: true,
              fullWidth: true,
            }}
          />
        </div>
        <div className="col-md-4">
          <Element
            schema={{
              type: 'select',
              name: 'semester',
              floatingLabelText: t1('semester'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: semesters,
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
          <Element
            schema={{
              type: 'select',
              name: 'capacity_type',
              floatingLabelText: t1('capacity_type'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: capacityTypesOptions(),
            }}
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
              this.exportRoomsCapacity();
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
  let semesters = defaultSelectOptions;

  const config = state.formSchemaConfigs[props.id];
  if (config) {
    if (config.semester) {
      semesters = semesters.concat(config.semester);
    }
  }

  return {
    semesters,
    form: state.form,
  };
}

export default connect(mapStateToProps)(FormFilters);
