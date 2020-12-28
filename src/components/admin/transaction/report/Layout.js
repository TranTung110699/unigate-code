import React from 'react';

import SubTopMenuContext from 'common/context/menu/SubMenuTop';

import ReportSelect from './choose-report/ReportSelect';
import ReportDisplay from './choose-report/ReportDisplay';
import topMenuSchema from '../menu/MainstageTopMenu';

class TransactionReportLayout extends React.Component {
  render() {
    const searchFormId = 'transaction_report_search';

    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <ReportSelect form={searchFormId} />
        <ReportDisplay searchFormId={searchFormId} />
      </div>
    );
  }
}

export default TransactionReportLayout;
