import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import { Element } from 'schema-form/elements';
import schemaActions from 'schema-form/actions';
import RaisedButton from 'components/common/mui/RaisedButton';

class FormFilters extends Component {
  constructor(props) {
    super(props);
    this.fetchExamRounds = this.fetchExamRounds.bind(this);
  }

  componentDidMount() {
    this.fetchExamRounds();
  }

  fetchExamRounds() {
    const { hiddenFields, id, dispatch } = this.props;

    const params = {
      contest_code: hiddenFields.contest_code,
    };

    dispatch(schemaActions.formSchemaConfigsRequest('exam_round', id, params));
  }

  render() {
    const { examRounds } = this.props;

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

        <div className="col-md-6">
          <Element
            schema={{
              type: 'select',
              name: 'order_by',
              floatingLabelFixed: true,
              fullWidth: true,
              options: [
                {
                  value: 'score',
                  primaryText: t1('score'),
                },
                {
                  value: 'finished_time',
                  primaryText: t1('finished_time'),
                },
              ],
              floatingLabelText: t1('order_by'),
            }}
          />
        </div>

        <div className="col-md-6">
          <Element
            schema={{
              type: 'select',
              name: 'order',
              floatingLabelFixed: true,
              fullWidth: true,
              options: [
                {
                  value: 1,
                  primaryText: t1('ascending'),
                },
                {
                  value: -1,
                  primaryText: t1('descending'),
                },
              ],
              floatingLabelText: t1('order'),
            }}
          />
        </div>

        <div className="col-md-6">
          <Element
            schema={{
              type: 'select',
              name: 'include_survey',
              floatingLabelFixed: true,
              fullWidth: true,
              options: [
                {
                  value: 'no',
                  primaryText: t1('no'),
                },
                {
                  value: 'yes',
                  primaryText: t1('yes'),
                },
              ],
              floatingLabelText: t1('include_survey'),
            }}
          />
        </div>

        <div className="col-md-6">
          <Element
            schema={{
              type: 'text',
              name: 'u__iid',
              floatingLabelText: t1('user_iid'),
              fullWidth: true,
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

  const config = state.formSchemaConfigs[props.id];

  if (config) {
    if (config.exam_round) {
      examRounds = examRounds.concat(config.exam_round);
    }
  }

  return {
    examRounds,
  };
}

export default connect(mapStateToProps)(FormFilters);
