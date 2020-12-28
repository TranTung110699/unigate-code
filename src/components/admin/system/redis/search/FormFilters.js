import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import { Element } from 'schema-form/elements';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import schemaActions from 'schema-form/actions';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';

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
    const asyncFields = ['db', 'key_type'];
    asyncFields.forEach((asyncField) => {
      dispatch(schemaActions.formSchemaConfigsRequest(asyncField, id, {}));
    });
  }

  renderComponent = (props) => (
    <RaisedButton
      className="m-l-10"
      name="delete"
      id="submit"
      label={t1('delete_all_matching_items')}
      onClick={props && props.onClick}
      secondary
    />
  );

  compareKeyTypesForDisplay = (option, anotherOption) => {
    if (!option && !anotherOption) {
      return 0;
    }
    if (!option.value) {
      return -1;
    }
    if (!anotherOption.value) {
      return 1;
    }
    if (option.primaryText < anotherOption.primaryText) {
      return -1;
    }
    if (option.primaryText > anotherOption.primaryText) {
      return 1;
    }
    return 0;
  };

  render() {
    const { redisDbs, keyTypes, formid, db, keyType, prefix } = this.props;
    const deleteLabel = t1('delete');
    const confirmDeleteLabel = t1('are_you_sure_you_want_to_do_this');
    const keyTypesForDisplay = Object.assign([], keyTypes);
    keyTypesForDisplay.sort(this.compareKeyTypesForDisplay);

    return (
      <div>
        <div className="col-md-3">
          <Element
            schema={{
              type: 'select',
              name: 'db',
              floatingLabelText: t1('db'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: redisDbs,
            }}
          />
        </div>
        <div className="col-md-2">
          <TextField
            fullWidth
            name="prefix"
            floatingLabelText={t1('filter_(regex_style_:_*course*)')}
            label={t1('filter_(regex_style_:_*course*)')}
            hintText={t1('enter_prefix')}
          />
        </div>
        <div className="col-md-4">
          <Element
            schema={{
              type: 'select',
              name: 'key_type',
              floatingLabelText: t1('key_type'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: keyTypesForDisplay,
            }}
          />
        </div>
        <div className="col-md-3 m-t-25">
          <RaisedButton
            name="submit"
            type="submit"
            id="submit"
            label={t1('search')}
            primary
          />
          <DeleteItem
            title={deleteLabel}
            textConfirm={confirmDeleteLabel}
            formid={formid}
            renderComponent={this.renderComponent}
            alternativeApi={'/redis/delete-multi'}
            params={{
              prefix,
              db,
              key_type: keyType,
              submit: 1,
              items_per_page: -1,
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
  let redisDbs = defaultSelectOptions;
  let keyTypes = defaultSelectOptions;

  const config = state.formSchemaConfigs[props.id];
  if (config) {
    if (config.db) {
      redisDbs = redisDbs.concat(config.db);
    }
    if (config.key_type) {
      keyTypes = keyTypes.concat(config.key_type);
    }
  }

  const redisSearchFormValueSelector = getFormValues('redis_search');
  const selectedDb = redisSearchFormValueSelector(state, 'db');
  const selectedKeyType = redisSearchFormValueSelector(state, 'key_type');
  const selectedPrefix = redisSearchFormValueSelector(state, 'prefix');

  return {
    db: selectedDb && selectedDb.db,
    keyType: selectedKeyType && selectedKeyType.key_type,
    prefix: selectedPrefix && selectedPrefix.prefix,
    redisDbs,
    keyTypes,
    form: state.form,
  };
}

export default connect(mapStateToProps)(FormFilters);
