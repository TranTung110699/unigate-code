import React from 'react';
import { t1 } from 'translate/index';

class AgePreview extends React.Component {
  render() {
    const { age } = this.props; // array
    return (
      <div>
        <b>{t1('age')}</b>: {t1('from_%d_to_%d', [age.min, age.max])}
      </div>
    );
  }
}

export default AgePreview;
