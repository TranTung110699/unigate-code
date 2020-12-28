import React from 'react';
import ContestDashboard from './Dashboard';
import ReportSpentTimeLayout from './report-spent-time/search/Layout';
import ReportTotalContestantsByPointSpectrumLayout from './report-total-contestants-by-point-spectrum/Layout';

class ContestReport extends React.Component {
  render() {
    const { subAction, node } = this.props;
    const a =
      Array.isArray(subAction) && subAction.length ? subAction[0] : 'dashboard';

    let contentDisplay;
    switch (a) {
      case 'report-spent-time': {
        contentDisplay = (
          <ReportSpentTimeLayout node={node} action={'exam-result'} />
        );
        break;
      }
      case 'report-total-contestants-by-point-spectrum': {
        contentDisplay = (
          <ReportTotalContestantsByPointSpectrumLayout
            node={node}
            action={'exam-result'}
          />
        );
        break;
      }
      case 'dashboard':
      default:
        contentDisplay = <ContestDashboard node={node} />;
        break;
    }

    return contentDisplay;
  }
}

export default ContestReport;
