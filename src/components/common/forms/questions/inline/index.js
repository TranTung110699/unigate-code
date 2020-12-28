import React from 'react';
import InlineOld from './inline-old';

import InlineGoJapan from './inline-go-japan';

class Inline extends React.Component {
  render() {
    if (window.isGoJapan) {
      return <InlineGoJapan {...this.props} />;
    }
    return <InlineOld {...this.props} />;
  }
}

export default Inline;
