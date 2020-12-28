import React from 'react';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import commonSagaActions from 'actions/saga-creators';
import { object } from 'prop-types';
import { connect } from 'react-redux';

class Export extends React.PureComponent {
  handleExport = () => {
    const { dispatch, params, url } = this.props;
    dispatch(commonSagaActions.exportDataRequest(url, params));
  };

  render() {
    const { label } = this.props;
    return (
      <RaisedButton
        name="export"
        type="button"
        id="export"
        label={label || t1('export')}
        primary
        onClick={this.handleExport}
      />
    );
  }
}

Export.propTypes = {
  params: object,
};

Export.defaultProps = {
  params: null,
};

export default connect()(Export);
