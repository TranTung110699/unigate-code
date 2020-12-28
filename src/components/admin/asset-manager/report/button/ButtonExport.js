import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import FlatButton from 'components/common/mui/NewButton';
import { getUrl } from 'routes/links/common';
import Icon from 'components/common/Icon';
import { withRouter } from 'react-router';
import commonSagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';
import assetApiUrls from 'components/admin/asset-manager/endpoints';

class ButtonExport extends Component {
  constructor(props) {
    super(props);
    this.exportFutureProjection = this.exportFutureProjection.bind(this);
  }

  exportFutureProjection = () => {
    const { dispatch, formValues } = this.props;
    dispatch(
      commonSagaActions.exportDataRequest(
        assetApiUrls.export_stationery_future_projection,
        formValues,
      ),
    );
  };

  render() {
    return (
      <FlatButton
        name="submit"
        icon={<Icon icon="plus" />}
        label={t1('export_stationery')}
        onClick={() => this.exportFutureProjection()}
      />
    );
  }
}

export default withRouter(connect()(ButtonExport));
