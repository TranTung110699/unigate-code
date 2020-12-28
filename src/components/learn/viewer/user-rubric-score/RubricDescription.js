import React, { Component } from 'react';
import { t1 } from 'translate';
import { FormulaHelp } from 'components/admin/rubric/utils';
import get from 'lodash.get';
import Html from 'components/common/html';
import Warning from 'components/common/Warning';

const styles = {
  border: '1px solid #ddd',
};

class RubricDescription extends Component {
  render() {
    const { rubric } = this.props;

    return (
      <div>
        <Warning>
          <strong>{t1('minimum_rubric_pass_score')}: </strong>
          <b>{get(rubric, 'pass_score') || t1('no_rubric_pass_score')}</b>
        </Warning>

        <div className="m-t-10">
          <strong>{t1('rubric_id')}: </strong>#<b>{get(rubric, 'iid')}</b>
        </div>
        <div>
          <strong>{t1('rubric_score_formula')}: </strong>
          {FormulaHelp(get(rubric, 'sub_type'))}
        </div>

        {get(rubric, 'pass_score') ? (
          <div>
            <strong>{t1('score_scale')}: </strong>
            <b>{get(rubric, 'scale') || 100}</b>
          </div>
        ) : null}
        {get(rubric, 'description') ? (
          <div>
            <strong>{t1('rubric_description')}</strong>
            <div style={styles} className="p-10">
              <Html content={get(rubric, 'description')} />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default RubricDescription;
