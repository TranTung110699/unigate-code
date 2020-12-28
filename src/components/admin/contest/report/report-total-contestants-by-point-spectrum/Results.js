import React from 'react';
import PropTypes from 'prop-types';

import ReportTotalContestantsByPointSpectrumViaBarChart from './sections/report-total-contestants-by-point-spectrum-via-bar-chart';
import ReportTotalContestantsByPointSpectrumViaPieChart from './sections/report-total-contestants-by-point-spectrum-via-pie-chart';

class Results extends React.Component {
  render() {
    const { items } = this.props;

    const containerStyle = {
      height: 'auto',
      width: 'auto',
      margin: '0 auto',
    };

    return (
      <div className="sections" style={containerStyle}>
        <div className="row">
          <div className="col-md-6">
            <ReportTotalContestantsByPointSpectrumViaBarChart data={items} />
          </div>
          <div className="col-md-6">
            <ReportTotalContestantsByPointSpectrumViaPieChart data={items} />
          </div>
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()),
};

Results.defaultProps = {
  items: [],
};

export default Results;
