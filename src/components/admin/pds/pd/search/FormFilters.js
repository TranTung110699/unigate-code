import React, { Component } from 'react';
import { t1 } from 'translate';
import { Element } from 'schema-form/elements';
import { connect } from 'react-redux';
import schemaActions from 'schema-form/actions';
import { Zones } from './Options';

class FormFilters extends Component {
  constructor(props) {
    super(props);
    this.fetchOptionsData = this.fetchOptionsData.bind(this);
  }

  componentDidMount() {
    this.fetchOptionsData();
  }

  fetchOptionsData() {
    const { formid, dispatch } = this.props;
    const asyncFields = ['sub_type'];
    asyncFields.forEach((asyncField) => {
      dispatch(schemaActions.formSchemaConfigsRequest(asyncField, formid, {}));
    });
  }

  render() {
    const { subType } = this.props;

    return (
      <div>
        <div className="col-md-4">
          <Element
            schema={{
              type: 'text',
              name: 'name',
              floatingLabelText: t1('name'),
              fullWidth: true,
              label: t1('name'),
              hintText: t1('enter_name'),
            }}
          />
        </div>
        <div className="col-md-4">
          <Element
            schema={{
              type: 'select',
              name: 'sub_type',
              floatingLabelText: t1('type'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: subType,
            }}
          />
        </div>
        <div className="col-md-4">
          <Element
            schema={{
              type: 'select',
              name: 'zone',
              floatingLabelText: t1('zone'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: Zones,
            }}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  let subType = [];
  const config = state.formSchemaConfigs[props.formid];
  if (config) {
    if (config.sub_type) {
      subType = subType.concat(config.sub_type);
    }
  }

  return {
    subType,
    form: state.form,
  };
}

export default connect(mapStateToProps)(FormFilters);
