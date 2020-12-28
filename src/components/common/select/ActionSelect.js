/**
 * Created by hungvo on 01/07/17.
 */

import React from 'react';
import { submit } from 'redux-form';
import { connect } from 'react-redux';
import Request from 'common/network/http/Request';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import actions from 'actions/node/creators';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

class ActionSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentWillMount() {
    const { value } = this.props;
    this.setValue(value);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.handleChange(null, 0, nextProps.value);
    }
  }

  setValue = (value) => {
    this.setState({
      value: value || '',
    });
  };

  handleChange = (event, index, value) => {
    const {
      baseURL,
      name,
      dispatch,
      hiddenParams,
      handleChange,
      formidSubmitOnSuccess,
    } = this.props;

    if (!baseURL || !name) {
      if (handleChange) {
        handleChange({ success: true }, value);
      }
      this.setValue(value);
      return;
    }

    const param = {};
    param[name] = value;

    Request.post(baseURL, Object.assign({}, param, hiddenParams)).then(
      (res) => {
        if (res.success) {
          this.setValue(value);
        }
        dispatch(actions.snackbar(true, res.message));
        if (handleChange) {
          handleChange(res, value);
        }
        if (formidSubmitOnSuccess) {
          dispatch(submit(formidSubmitOnSuccess));
        }
      },
    );
  };

  render() {
    const {
      dataSet,
      baseURL,
      dispatch,
      handleChange,
      updateValue,
      hiddenParams,
      readOnly,
      type, // radio or default = select
      inline,
      ...options
    } = this.props;
    let floatingLabelFixed = false;
    if (options && options.floatingLabelText) {
      floatingLabelFixed = true;
    }
    if (readOnly) {
      const selected =
        dataSet &&
        dataSet.length &&
        dataSet.find((item) => item.value === this.state.value);

      return <span>{selected && selected.primaryText}</span>;
    }

    const style = inline ? { display: 'flex', flexDirection: 'row' } : {};

    return (
      <div>
        {type === 'radio' ? (
          <RadioButtonGroup
            style={style}
            readOnly={readOnly}
            onChange={(event, value) => {
              this.handleChange(event, 0, value);
            }}
            valueSelected={this.state.value}
          >
            {dataSet.map((opt) => (
              <RadioButton
                key={opt.value}
                disabled={opt.disabled}
                value={opt.value}
                label={opt.primaryText || opt.label}
              />
            ))}
          </RadioButtonGroup>
        ) : (
          <SelectField
            style={style}
            {...options}
            floatingLabelFixed={floatingLabelFixed}
            value={this.state.value}
            onChange={this.handleChange}
            fullWidth
          >
            {dataSet &&
              dataSet.length &&
              dataSet.map((opt) => (
                <MenuItem
                  key={opt.value}
                  value={opt.value}
                  primaryText={opt.primaryText || opt.label}
                />
              ))}
          </SelectField>
        )}
      </div>
    );
  }
}

export default connect()(ActionSelect);
