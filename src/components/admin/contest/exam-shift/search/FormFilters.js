import React, { Component } from 'react';
import { Element } from 'schema-form/elements';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import RaisedButton from 'components/common/mui/RaisedButton';
import schemaActions from 'schema-form/actions';
import { constants, layouts } from 'configs/constants';
import { getThemeConfig } from 'utils/selectors';

class FormFilters extends Component {
  divStyle = { textAlign: 'center' };

  componentDidMount() {
    this.fetchOptionsData();
    this.contestCodeOnChanged = this.contestCodeOnChanged.bind(this);
    this.fetchOptionData = this.fetchOptionData.bind(this);
  }

  fetchOptionsData() {
    const { formid, dispatch, node } = this.props;

    dispatch(
      schemaActions.formSchemaConfigsRequest('contest_code', formid, {}),
    );
    if (node) {
      const params = {
        contest_code: node.code,
      };

      dispatch(
        schemaActions.formSchemaConfigsRequest('exam_round', formid, params),
      );
    }
  }

  fetchOptionData(fieldName, params) {
    const { formid, dispatch } = this.props;
    dispatch(schemaActions.formSchemaConfigsRequest(fieldName, formid, params));
  }

  contestCodeOnChanged(value) {
    const params = {
      contest_code: value,
    };

    this.fetchOptionData('exam_round', params);
  }

  render() {
    const {
      contests,
      examRounds,
      themeConfig,
      node,
      examRoundCode,
    } = this.props;

    const statuses = this.props.statuses || {
      name: 'status',
      options: constants.StatusOptions(),
    };

    const disableSelectContests = !!node;
    const disableSelectExamRounds = !!examRoundCode;

    return (
      <div>
        <div className="col-md-8">
          <TextField
            name="name"
            floatingLabelText={t1('search_by_name_or_iid')}
            label={t1('search_by_name_or_iid')}
            hintText={t1('please_type_search_text')}
            fullWidth
          />
        </div>
        <div className="col-md-4">
          <Element
            schema={{
              name: 'status',
              type: 'multiCheckbox',
              inline: true,
              floatingLabelText: t1('status'),
              options: statuses.options,
              defaultValue: ['queued', 'approved'],
            }}
          />
        </div>
        <div className={'clearfix'} />
        {themeConfig.layout !== layouts.ETEC && [
          <div className="col-md-4">
            <Element
              schema={{
                type: 'select',
                name: 'contest_code',
                floatingLabelText: t1('contest_code'),
                floatingLabelFixed: true,
                fullWidth: true,
                options: contests,
                disabled: disableSelectContests,
                onChange: (event, value) => {
                  this.contestCodeOnChanged(value);
                },
              }}
            />
          </div>,
          <div className="col-md-4">
            <Element
              schema={{
                type: 'select',
                name: 'exam_round',
                floatingLabelText: t1('exam_round'),
                floatingLabelFixed: true,
                fullWidth: true,
                options: examRounds,
                disabled: disableSelectExamRounds,
              }}
            />
          </div>,
        ]}
        <div className="col-md-4 m-t-25">
          <RaisedButton
            type="submit"
            name="submit"
            id="submit"
            label={t1('search')}
            style={{ 'margin-right': '1em' }}
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
  let contests = defaultSelectOptions;
  let examRounds = defaultSelectOptions;

  const config = state.formSchemaConfigs[props.formid];
  if (config) {
    if (config.contest_code) {
      contests = contests.concat(config.contest_code);
    }

    if (config.exam_round) {
      examRounds = examRounds.concat(config.exam_round);
    }
  }

  return {
    contests,
    examRounds,
    themeConfig: getThemeConfig(state),
  };
}

export default connect(mapStateToProps)(FormFilters);
