import React from 'react';

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (event) => {
    const { input } = this.props;
    const { value, onValueChange } = this.state;

    if (input) {
      input.onChange(event, event.target.value, value);
    }

    if (onValueChange) {
      onValueChange(event, event.target.value, value);
    }
    this.setState({ value: event.target.value });
  };

  render() {
    const props = { ...this.props };
    const { options, defaultValue } = props;

    return (
      <select {...props} onChange={this.handleChange}>
        {props.prependEmptyOption && (
          <option value="" defaultValue={defaultValue === ''}>
            ---
          </option>
        )}
        {options &&
          options.map((option) => (
            <option
              value={option.value}
              defaultValue={defaultValue === option.value}
            >
              {option.label}
            </option>
          ))}
      </select>
    );
  }
}

export default Select;
