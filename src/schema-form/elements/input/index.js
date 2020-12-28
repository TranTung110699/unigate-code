import React from 'react';

class Input extends React.Component {
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
    let { className } = props;
    const { input } = props;
    delete props.input;
    delete props.meta;
    delete props.onValueChange;

    const { activeClass } = this.state;
    className = className || '';
    className = `${className} ${activeClass}`;
    return (
      <input className={className} onChange={this.handleChange} {...props} />
    );
  }
}

export default Input;
