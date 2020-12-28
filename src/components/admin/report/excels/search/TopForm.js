import React, { Component } from 'react';
import { t1 } from 'translate';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import schemaActions from 'schema-form/actions';
import { Element } from 'schema-form/elements';
import { ReportExcels } from './Options';

class TopForm extends Component {
  constructor(props) {
    super(props);
    this.fetchOptionsData = this.fetchOptionsData.bind(this);
  }

  componentDidMount() {
    this.fetchOptionsData();
  }

  fetchOptionsData() {
    const { id, dispatch } = this.props;
    const asyncFields = ['contest_code'];

    asyncFields.forEach((asyncField) => {
      // console.log('xxx asyncFields.forEach', asyncField);
      dispatch(schemaActions.formSchemaConfigsRequest(asyncField, id, {}));
    });
  }

  render() {
    const { contests } = this.props;

    return (
      <div id="teacher-search-form">
        <div className="row">
          <div className="col-md-4">
            <Element
              schema={{
                type: 'select',
                name: 'contest',
                floatingLabelText: t1('contest'),
                floatingLabelFixed: true,
                fullWidth: true,
                options: contests,
              }}
            />
          </div>
          <div className="col-md-8">
            <Element
              schema={{
                type: 'select',
                name: 'report',
                floatingLabelText: t1('report'),
                floatingLabelFixed: true,
                fullWidth: true,
                options: ReportExcels,
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

  let contests = defaultSelectOptions;

  const config = state.formSchemaConfigs[props.id];
  if (config) {
    if (config.contest_code) {
      contests = contests.concat(config.contest_code);
    }
  }

  return {
    contests,
    form: state.form,
  };
}

export default reduxForm({ form: 'report_excels_top_form' })(
  connect(mapStateToProps)(TopForm),
);
