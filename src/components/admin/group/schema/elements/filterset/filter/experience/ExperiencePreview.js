import React from 'react';
import { t1 } from 'translate';

class ExperiencePreview extends React.Component {
  render() {
    const { experience } = this.props;

    return (
      <div>
        <b>{t1('experience_year(s)')}</b>:{' '}
        {t1('from_%d_to_%d', [experience.min, experience.max])}
      </div>
    );
  }
}

export default ExperiencePreview;
