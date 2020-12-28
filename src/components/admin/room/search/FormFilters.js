import React, { Component } from 'react';
import { Element } from 'schema-form/elements';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
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
    const asyncFields = ['address'];
    asyncFields.forEach((asyncField) => {
      dispatch(schemaActions.formSchemaConfigsRequest(asyncField, id, {}));
    });
  }

  render() {
    const { addresses } = this.props;
    return (
      <div>
        <div className="col-md-4">
          <TextField
            fullWidth
            name="name"
            floatingLabelText={t1('search_by_name_or_iid')}
            label={t1('search_by_name_or_iid')}
            hintText={t1('please_type_search_text')}
          />
        </div>
        <div className="col-md-4">
          <Element
            schema={{
              type: 'select',
              name: 'address',
              floatingLabelText: t1('address'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: addresses,
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
  addresses: selectFieldPropTypes,
};

FormFilters.defaultProps = {
  addresses: [],
};

function mapStateToProps(state, props) {
  const defaultSelectOptions = [
    {
      value: '',
      primaryText: t1('all'),
    },
  ];
  let addresses = defaultSelectOptions;

  const config = state.formSchemaConfigs[props.id];
  if (config) {
    if (config.venue) {
      addresses = addresses.concat(config.venue);
    }
  }
  return {
    addresses,
    form: state.form,
  };
}

export default connect(
  mapStateToProps,
  null,
)(FormFilters);
