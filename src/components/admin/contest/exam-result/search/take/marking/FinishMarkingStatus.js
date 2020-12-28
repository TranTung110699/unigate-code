import React, { Component } from 'react';
import { t1 } from 'translate';
import routes from 'routes';
import SwitchControls from 'components/common/SwitchControls';

const finishMarkingOE = (node) => ({
  baseURL: routes.url('node_update', {
    ...node,
    step: 'manual_marking_status',
    ntype: 'take',
  }),
  value: node.manual_marking_status || 0,
  dataSet: { on: 1, off: 0 },
  // labelSet: {
  //   on: t1('finished_marking_manually'),
  //   off: t1('still_marking_manually'),
  // },
  name: 'manual_marking_status',
  label: true,
});

const style = {
  width: '300px',
};

class FinishMarkingStatus extends Component {
  render() {
    const { take } = this.props;

    const node = {
      id: take.id,
    };

    return (
      <div>
        <b>{t1('finished_manual_marking')}</b>
        <div className="text-muted">
          {t1(
            'if_you_have_finished_marking_for_this_contestant_you_can_turn_on_the_switch._if_you_dont_have_manual_marking_for_this_exam_you_can_ignore_it',
          )}
        </div>

        <div style={style}>
          <SwitchControls node={node} items={[finishMarkingOE(take)]} />
        </div>
      </div>
    );
  }
}

export default FinishMarkingStatus;
