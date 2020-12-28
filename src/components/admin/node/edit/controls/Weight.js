import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ActionToggle from 'components/common/toggle/ActionToggle';
import sagaActions from 'actions/node/saga-creators';
import { t1 } from 'translate';

class Weight extends Component {
  actionToggleDataSet = { on: 1, off: 0 };

  constructor(props) {
    super(props);
    this.state = {
      weighed_score: null,
    };
  }

  handleWeightTogglerChange(value) {
    const node = this.props.node || {};
    const metadata = node.metadata || [];

    const children = metadata.map((item, index) => {
      item.weighted = value ? 1 : '- - -';
      return item;
    });

    node.metadata = children;
    node.weighed_score = value;

    // TODO if this fails, then don't update metadata
    this.props.dispatch(
      sagaActions.updateNodeRequest({
        step: 'weighed_score',
        iid: node.iid,
        data: {
          id: node.id,
          iid: node.iid,
          ntype: node.ntype,
          type: node.type,
          weighed_score: value,
        },
      }),
    );

    this.props.dispatch(
      sagaActions.updateNodeRequest({
        step: 'metadata',
        iid: node.iid,
        data: node,
      }),
    );

    // Do sau khi thực hiện updateNodeRequest node với step children thì giá trị weighed_score trả về bị sai dẫn đến việc hiển thị on-off bị sai
    // chưa detect được luôn nên đang dùng cách setState để workaround (quick & dirty)
    this.setState({
      weighed_score: node.weighed_score,
    });
  }

  render() {
    const { node, readOnly } = this.props;
    let weighedLabel = 'weighed_score';
    let averageLabel = 'averaged_score';

    // if (this.props.brief) {
    //   weighedLabel = 'weighed';
    //   averageLabel = 'avg_score';
    // }

    const weighedScoreValue =
      this.state.weighed_score !== null
        ? this.state.weighed_score
        : node.weighed_score;

    return node &&
      node.ntype !== 'question' &&
      node.ntype !== 'vocab' &&
      node.metadata &&
      node.metadata.length ? (
      <ActionToggle
        readOnly={readOnly}
        label={node.weighed_score ? t1(weighedLabel) : t1(averageLabel)}
        labelPosition="right"
        dataSet={this.actionToggleDataSet}
        title={t1('click_to_toggle_score_being_average_sum')}
        value={weighedScoreValue}
        handleChange={(res, val) => this.handleWeightTogglerChange(val)}
        noLabel={this.props.noLabel}
      />
    ) : null;
  }
}

Weight.propTypes = {
  node: PropTypes.object.isRequired,
};

export default connect()(Weight);
