import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ActionToggle from 'components/common/toggle/ActionToggle';
import sagaActions from 'actions/node/saga-creators';
import { t1 } from 'translate';

class SkillRequiredSwitch extends Component {
  actionToggleDataSet = { on: 1, off: 0 };

  handleSkillRequiredSwitchChange(value) {
    const node = this.props.node || {};
    const metadata = node.metadata || [];

    const children = metadata.map((item, index) => {
      item.require = value ? 1 : 0;
      return item;
    });

    node.metadata = children;

    this.props.dispatch(
      sagaActions.updateNodeRequest({
        step: 'metadata',
        iid: node.iid,
        data: node,
      }),
    );
  }

  render() {
    const { node } = this.props;
    let weighedLabel = 'require';
    let averageLabel = 'required';

    return (
      <span>
        {node &&
          node.ntype !== 'question' &&
          node.ntype !== 'vocab' &&
          node.metadata &&
          node.metadata.length && (
            <ActionToggle
              label={node.weighed_score ? t1(weighedLabel) : t1(averageLabel)}
              labelPosition="right"
              dataSet={this.actionToggleDataSet}
              title={t1('click_to_toggle_score_being_average_sum')}
              value={node.weighed_score}
              handleChange={(res, val) =>
                this.handleSkillRequiredSwitchChange(val)
              }
            />
          )}
      </span>
    );
  }
}

SkillRequiredSwitch.propTypes = {
  node: PropTypes.object.isRequired,
};

export default connect()(SkillRequiredSwitch);
