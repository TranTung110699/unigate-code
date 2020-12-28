import React, { Component } from 'react';
import Widget from 'components/common/Widget';
import { t1 } from 'translate';
import TemisEvidenceFromTemplate from './evidence-from-template';
import TemisTemplatelessEvidence from './templateless-evidence';

class TemisEvidence extends Component {
  render() {
    return (
      <div>
        <div>
          <Widget title={t1('evidences_from_templates')}>
            <TemisEvidenceFromTemplate />
          </Widget>
        </div>
        <div>
          <Widget title={t1('my_own_evidences')}>
            <TemisTemplatelessEvidence />
          </Widget>
        </div>
      </div>
    );
  }
}

export default TemisEvidence;
