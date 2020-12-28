import React, { Component } from 'react';
import { Element } from 'schema-form/elements';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import schemaActions from 'schema-form/actions';

class FormFilters extends Component {
  componentDidMount() {
    this.fetchOptionsData();
  }

  fetchOptionsData() {
    const { formid, dispatch } = this.props;
    const asyncFields = ['status', 'skills'];
    asyncFields.forEach((field) => {
      dispatch(schemaActions.formSchemaConfigsRequest(field, formid, {}));
    });
  }

  render() {
    const { statuses, skills } = this.props;

    return (
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-4">
            <Element
              schema={{
                type: 'text',
                name: 'name',
                floatingLabelText: t1('iid_or_name'),
                fullWidth: true,
                label: t1('name'),
                hintText: t1('enter_iid_or_name'),
              }}
            />
          </div>
          <div className="col-md-4">
            <Element
              schema={{
                type: 'select',
                name: 'status',
                floatingLabelText: t1('status'),
                fullWidth: true,
                floatingLabelFixed: true,
                options: statuses,
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <Element
              schema={{
                type: 'select',
                name: 'from',
                floatingLabelText: t1('from_skill'),
                fullWidth: true,
                floatingLabelFixed: true,
                options: skills,
              }}
            />
          </div>
          <div className="col-md-4">
            <Element
              schema={{
                type: 'select',
                name: 'to',
                floatingLabelText: t1('to_skill'),
                fullWidth: true,
                floatingLabelFixed: true,
                options: skills,
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
  let statuses = defaultSelectOptions;
  let skills = defaultSelectOptions;

  const config = state.formSchemaConfigs[props.formid];
  if (config) {
    if (config.status) {
      statuses = statuses.concat(config.status);
    }
    if (config.skills) {
      skills = skills.concat(config.skills);
    }
  }

  return {
    statuses,
    skills,
  };
}

export default connect(mapStateToProps)(FormFilters);
