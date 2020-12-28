import React from 'react';
import FontSize from './FontSize';
import ChangeTheme from './Theme';

class ChangeStyle extends React.Component {
  render() {
    return (
      <div className="d-flex align-items-center justify-content-between row">
        <div>
          <FontSize />
        </div>
        {/*<div className="col-md-6 col-sm-12">*/}
        {/*  <ChangeTheme />*/}
        {/*</div>*/}
      </div>
    );
  }
}

export default ChangeStyle;
