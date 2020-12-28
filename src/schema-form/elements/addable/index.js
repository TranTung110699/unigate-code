import React from 'react';
import { FormSection } from 'redux-form';
import TextField from 'material-ui/TextField';
import Icon from 'components/common/Icon';

class AddableCustom extends React.Component {
  textFieldStyle = {
    width: '95%',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
  }

  componentWillMount() {
    const { input, defaultValue } = this.props;
    const value =
      (input && input.value) || this.props.value || defaultValue.null;
    this.handleOnChange(value);
  }

  handleOnChange = (value) => {
    const { input, onChange } = this.props;
    if (input && input.onChange) {
      input.onChange(value);
    } else {
      this.setState({ value });
    }

    if (onChange) {
      onChange(value);
    }
  };

  changeValue = (newValue, index) => {
    const { input } = this.props;
    const value =
      input && input.onChange ? input.value || [] : this.state.value || [];
    value[index] = newValue;
    this.handleOnChange(value);
  };

  addable = () => {
    const { input } = this.props;
    const value =
      input && input.onChange ? input.value || [] : this.state.value || [];
    value[value.length] = null;
    this.handleOnChange(value);
  };

  remove = (index) => {
    const { input } = this.props;
    const value =
      input && input.onChange ? input.value || [] : this.state.value || [];
    value.splice(index, 1);
    this.handleOnChange(value);
  };

  render() {
    const { input, renderElementToAdd, name } = this.props;
    const value =
      input && input.onChange ? input.value || [] : this.state.value || [];
    return (
      <div>
        {value &&
          value.length > 0 &&
          value.map((row, index) => (
            <div key={`${name || 'edit-field'}[${index}]`}>
              {renderElementToAdd ? (
                <FormSection name={`${name}[${index}]`}>
                  {renderElementToAdd(row, (newValue) =>
                    this.changeValue(newValue, index),
                  )}
                </FormSection>
              ) : (
                <TextField
                  key={`custom-addable-${name}-${index}`}
                  type="number"
                  value={row}
                  fullWidth
                  style={this.textFieldStyle}
                  min={(value && value[index - 1]) || 0}
                  onChange={(e, val) => this.changeValue(val, index)}
                />
              )}
              {index === value.length - 1 ? (
                <Icon
                  className="m-t-25 action"
                  style={this.props.iconStyle}
                  icon="plus"
                  onClick={() => this.addable()}
                />
              ) : (
                <Icon
                  className="m-t-25 action"
                  icon="minus"
                  style={this.props.iconStyle}
                  onClick={() => this.remove(index)}
                />
              )}
            </div>
          ))}
      </div>
    );
  }
}

export default AddableCustom;
