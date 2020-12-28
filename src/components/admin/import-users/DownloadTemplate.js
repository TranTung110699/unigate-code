/* eslint-disable no-undef */
import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import userSagaActions from 'components/admin/user/actions/saga-creators';

class ImportForm extends React.PureComponent {
  handleDownloadTemplate = () => {
    this.props.dispatch(
      userSagaActions.downloadImportTemplateRequest({
        template: this.props.template || 'import-users-in-the-system',
        get_default: this.props.getDefault,
      }),
    );
  };

  render() {
    return (
      <RaisedButton
        label={t1('download_form_import')}
        onClick={this.handleDownloadTemplate}
        className="m-l-10 m-r-10"
        primary
        {...this.props}
      />
    );
  }
}

export default connect()(ImportForm);
