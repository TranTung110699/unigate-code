import React from 'react';
import { t, t1 } from 'translate';
import EditMetadata from 'components/admin/node/edit/metadata/MetadataContainer';
import DuplicateCreditWarning from './duplicatedCreditWarning';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';

class ProgramEditMetadata extends React.Component {
  cssClass = 'admin-path-metadata';

  render() {
    const { className, node, isFeatureEnabled } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;
    const textClass = isFeatureEnabled(features.NEW_UI_JULY_2019)
      ? 'text-white'
      : '';
    return (
      <div className={componentClassName}>
        <DuplicateCreditWarning className="m-10" node={node} />
        {node &&
        node.ntype === 'path' &&
        node.type === 'program' &&
        node.subType !== 'enrolment_plan' &&
        node.hours ? (
          <div style={{ display: 'inline-block' }}>
            <span className={textClass} title={t1('total_hours')}>
              {t1('total_learning_duration')}: {node.hours} {t('hours')}
            </span>
          </div>
        ) : null}
        <EditMetadata {...this.props} />
      </div>
    );
  }
}

export default withFeatureFlags()(ProgramEditMetadata);
