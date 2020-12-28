import React from 'react';
import { t } from 'translate';
import ShowFullWhenHover from 'components/common/html/show-full-when-hover';

const styles = {
  iid: { color: '#aaadad' },
};

export function displayBenefits(benefits, numberOfApplicableBenefits) {
  if (!benefits) return '';

  const benefitNames = benefits
    .map((benefit) => benefit && benefit.name)
    .join(', ');

  return (
    <div>
      <ShowFullWhenHover content={benefitNames} style={{ width: 'inherit' }} />
      <div style={styles.iid}>
        {numberOfApplicableBenefits
          ? ` (${t('maximum_apply')}: ${numberOfApplicableBenefits})`
          : ''}
      </div>
    </div>
  );
}
