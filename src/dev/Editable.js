import React from 'react';
import Editable from 'components/common/forms/editable';

export default class DevEditable extends React.Component {
  render() {
    return (
      <Editable
        form="foo-editable"
        name="foo"
        initialValue="123123 - click to edit me"
        onSubmit={({ foo }) => {
          console.log(foo);
        }}
        validate={({ foo }) =>
          foo === '' ? { foo: 'foo cannot be empty' } : {}
        }
      />
    );
  }
}
