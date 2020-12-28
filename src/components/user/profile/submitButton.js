import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';

import './submitButton.scss';

class SubmitButton extends Component {
  render() {
    return (
      <div className="submit-btn-wrapper m-t-10">
        <RaisedButton
          primary
          label={t1('save')}
          type="submit"
          className="save-submit-button"
          raisedButton
        />
      </div>
    );
  }
}

export default connect()(SubmitButton);
