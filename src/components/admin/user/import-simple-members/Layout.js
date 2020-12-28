import React, { Component } from 'react';
import { t1 } from 'translate';
import ImportForm from './ImportForm';

class ImportUsersLayout extends Component {
  render() {
    const { node } = this.props;
    const formid = this.props.formid || 'import_contestants_form';
    const template = this.props.template || 'contestants';
    const importFormTitle =
      this.props.importFormTitle || t1('import_contestants');

    return (
      <ImportForm
        formid={formid}
        node={node}
        template={template}
        importFormTitle={importFormTitle}
        importEndpoint={this.props.importEndpoint}
        params={this.props.params}
      />
    );
  }
}

export default ImportUsersLayout;
