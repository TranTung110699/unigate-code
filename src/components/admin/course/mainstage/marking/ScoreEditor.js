import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import { ScoreLabelMapping } from 'configs/constants';
import Editable from 'components/common/forms/editable';
import { scoreFormId } from './utilities';

class ScoreEditor extends Component {
  render() {
    const { item, index } = this.props;
    return (
      <Editable
        form={scoreFormId(item.takeId, item.iid, index)}
        name="score"
        title={ScoreLabelMapping[item.score]}
        initialValue={typeof item.score !== 'undefined' ? item.score : '0'}
        url={`/take/update?id=${
          item.takeId
        }&_sand_step=set_question_score&${item.type === 'marking' &&
          `question=${item.iid}`}`}
        validate={({ score }) => {
          const n = Math.floor(Number(score));
          const max = item.weighted || 100;
          const check = String(n) === score && n >= 0 && n <= max;
          return check
            ? {}
            : { score: t1('score_is_number_between_%s_and_%s', [0, max]) };
        }}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  nodes: state.tree,
});
export default connect(mapStateToProps)(ScoreEditor);
