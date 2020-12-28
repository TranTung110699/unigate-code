import React from 'react';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import commonSagaActions from 'actions/saga-creators';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import Icon from 'components/common/Icon';
import ExportBtnWithConfirmDialog from 'components/common/action-button/ExportBtnWithConfirmDialog';

class SearchFormLayoutFreestyle extends React.PureComponent {
  h3Style = {
    margin: 0,
    // background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  divStyle = { textAlign: 'center' };

  style = { background: 'white' };

  render() {
    const { groups, message, readOnly, formValues } = this.props;
    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    return (
      <div className="p-5">
        {submitButton}
        <ExportBtnWithConfirmDialog
          newButton
          primary
          label={t1('export_results')}
          url={apiUrls.export_enrolment_plan_credits_overall_progress}
          params={formValues}
        />
      </div>
    );
  }
}

export default SearchFormLayoutFreestyle;
