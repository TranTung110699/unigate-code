import React from 'react';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import RaisedButton from 'components/common/mui/RaisedButton';
import commonSagaActions from 'actions/saga-creators';

class ExportDataError extends React.PureComponent {
  handleExport = () => {
    const { dispatch, valuesToCompare = {} } = this.props;
    dispatch(
      commonSagaActions.exportDataRequest(
        '/user/data/export-data-imported-is-errors',
        valuesToCompare,
      ),
    );
  };

  render() {
    return (
      <RaisedButton
        label={t1('export_data_errors')}
        primary
        style={{ margin: '0 10px 10px 0' }}
        onClick={this.handleExport}
      />
    );
  }
}

export default connect()(ExportDataError);
