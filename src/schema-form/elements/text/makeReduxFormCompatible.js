import React from 'react';

const makeReduxFormCompatible = (TextField) => {
  class WrappedTextField extends React.Component {
    render() {
      const { input, meta, ...custom } = this.props;

      const errorText = meta && meta.touched && meta.error;

      return (
        <TextField
          {...(input ? input : {})}
          {...custom}
          errorText={errorText}
        />
      );
    }
  }

  return WrappedTextField;
};

export default makeReduxFormCompatible;
