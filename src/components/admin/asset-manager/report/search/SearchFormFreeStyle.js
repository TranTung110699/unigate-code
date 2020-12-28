import React from 'react';
import RaisedButton from 'components/common/mui/RaisedButton';
import get from 'lodash.get';
import apiUrls from 'api-endpoints';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';
import commonSagaActions from 'actions/saga-creators';
import FlatButton from 'components/common/mui/NewButton';

class SearchFormFreeStyle extends React.PureComponent {
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
          <div className="col-md-4 m-t-20 valign-wrapper">{submitButton}</div>
        </div>
      </div>
    );
  }
}

export default SearchFormFreeStyle;
