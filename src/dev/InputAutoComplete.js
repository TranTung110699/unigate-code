/**
 * Created by vohung on 18/05/2017.
 */
import React from 'react';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

export default class DevInputAutoComplete extends React.Component {
  dataSourceConfig = { text: 'key', value: 'data' };

  render() {
    return (
      <InputAutoComplete
        nameElement="items"
        type="inputAutoComplete"
        baseUrl="/skill/api/data-auto-complete-demo"
        floatingLabelText="items"
        dataSourceConfig={this.dataSourceConfig}
        fullWidth
      />
    );
  }
}
