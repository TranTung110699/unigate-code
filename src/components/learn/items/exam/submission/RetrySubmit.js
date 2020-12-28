import React from 'react';
import { connect } from 'react-redux';

import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import { retrySubmitExam } from 'actions/learn/exercise/normal/saga-creators';

class RetrySubmit extends React.Component {
  handleRetrySubmission = () => {
    const { info, learnItemIid } = this.props;
    this.props.dispatch(retrySubmitExam(learnItemIid, info));
  };

  render() {
    return (
      <RaisedButton
        primary
        label={t1('retry_submission')}
        onClick={this.handleRetrySubmission}
      />
    );
  }
}

export default connect()(RetrySubmit);
