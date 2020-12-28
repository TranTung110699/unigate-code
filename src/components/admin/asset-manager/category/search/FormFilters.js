import React, { Component } from 'react';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import { Element } from 'schema-form/elements';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import { connect } from 'react-redux';
import schemaActions from 'schema-form/actions';

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
    const asyncFields = ['asset_type'];
    asyncFields.forEach((asyncField) => {
      dispatch(schemaActions.formSchemaConfigsRequest(asyncField, id, {}));
    });
  }

  render() {
    const { assetTypes } = this.props;
    return (
      <div>
        <div className="col-md-3">
          <TextField
            fullWidth
            name="text"
            floatingLabelText={t1('search_by_name')}
            label={t1('item_name')}
            hintText={t1('please_type_search_text')}
          />
        </div>

        <div className="col-md-3">
          <TextField
            fullWidth
            name="code"
            floatingLabelText={t1('search_by_code')}
            label={t1('item_code')}
            hintText={t1('please_type_search_text')}
          />
        </div>

        <div className="col-md-3">
          <Element
            schema={{
              type: 'select',
              name: 'sub_type',
              floatingLabelText: t1('type'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: assetTypes,
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
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  let assetTypes = [];
  const config = state.formSchemaConfigs[props.id];

  if (config) {
    if (config.asset_type) {
      assetTypes = assetTypes.concat(config.asset_type);
    }
  }

  return { assetTypes };
}

export default connect(mapStateToProps)(FormFilters);
