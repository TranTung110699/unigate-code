import React from 'react';
import { t1 } from 'translate';

class NoResult extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="col-md-12">
          <p>{t1('there_are_no_in_progress_courses_yet')}.</p>
        </div>
      </React.Fragment>
    );
  }
}

export default NoResult;
