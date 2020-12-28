import React from 'react';
import { t1 } from 'translate/index';
import { sexAsText } from 'common/sex';

class SexPreview extends React.Component {
  render() {
    const { sex } = this.props; // array
    const sexNames = sex.map(sexAsText);
    return (
      <div>
        <b>{t1('sex')}</b>: {sexNames.join(', ')}
      </div>
    );
  }
}

export default SexPreview;
