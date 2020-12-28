import React from 'react';
import { connect } from 'react-redux';

import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import { saveAs } from 'file-saver';
import { getContestReduxLog } from 'components/admin/contest/logger';
import Icon from 'components/common/Icon';

const styles = {
  color: 'white',
};
const redStyle = {
  color: 'red',
};

class DownloadReduxLog extends React.Component {
  saveTextToLocal = () => {
    let log = getContestReduxLog();
    // log = btoa(log);
    const blob = new Blob([log], { type: 'text/plain;charset=utf-8' });

    saveAs(blob, `${localStorage.contest_name || 'log_contest'}.txt`);
  };

  render() {
    const { mode } = this.props;
    if (mode === 'nav') {
      // the button is in the exam nav bar on the right
      return (
        <div>
          <div style={redStyle}>
            {t1(
              'in_case_of_error_download_your_exam_take_offline_to_send_to_your_manager',
            )}
          </div>
          <a onClick={this.saveTextToLocal} style={styles}>
            <Icon icon="fileDownload" /> {t1('download_your_take')}
          </a>
        </div>
      );
    }

    return (
      <RaisedButton
        primary
        label={t1('download_your_take')}
        onClick={this.saveTextToLocal}
      />
    );
  }
}

export default connect()(DownloadReduxLog);
