import React, { Component } from 'react';
import ChipInput from 'material-ui-chip-input';
import { connect } from 'react-redux';
import lodashGet from 'lodash.get';

class MUInputToken extends Component {
  componentDidMount() {
    const { defaultValue } = this.props;
    this.handleChange(defaultValue);
  }

  handleChange = (value) => {
    const { input } = this.props;
    if (input && input.onChange) {
      input.onChange(value);
    }
  };

  render() {
    const errorText =
      this.props.errorText || lodashGet(this.props, 'meta.error');

    return (
      <ChipInput
        {...this.props}
        errorText={errorText}
        onChange={this.handleChange}
        clearOnBlur
      />
    );
  }
}

export default connect()(MUInputToken);
