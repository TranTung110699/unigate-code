import React from 'react';
import RaisedButton from 'components/common/mui/RaisedButton';
import get from 'lodash.get';
// import apiUrls from 'api-endpoints';
import assetApiUrls from 'components/admin/asset-manager/endpoints';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';
import commonSagaActions from 'actions/saga-creators';

class SearchFormFreeStyle extends React.PureComponent {
  exportResults() {
    const { dispatch, formValues, node } = this.props;

    dispatch(
      commonSagaActions.exportDataRequest(
        assetApiUrls.export_stationery_future_projection,
        {
          ntype: get(node, 'ntype'),
          item_iid: get(node, 'iid'),
          start_date: get(formValues, 'start_date'),
          end_date: get(formValues, 'end_date'),
        },
      ),
    );
  }

  render() {
    const { groups, readOnly } = this.props;
    let { submitButton } = this.props;

    if (readOnly) {
      submitButton = null;
    }

    return (
      <div className="container-fluid elementGroup">
        <div className="row">
          <div className="col-md-4">{groups.id.fieldNames.start_date}</div>
          <div className="col-md-4">{groups.id.fieldNames.end_date}</div>
          <div className="col-md-1 m-t-20 m-r-30 valign-wrapper">
            {submitButton}
          </div>
          <div className="col-md-2 m-t-30 valign-wrapper">
            <RaisedButton
              name="export"
              id="export"
              label={t1('export')}
              primary
              icon={<Icon icon={'export'} />}
              onClick={() => {
                this.exportResults();
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchFormFreeStyle;
