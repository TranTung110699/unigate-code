import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ActionToggle from 'components/common/toggle/ActionToggle';
import sagaActions from 'actions/node/saga-creators';
import routes from 'routes';
import { t1 } from 'translate';

class QuestionsGroupSwitch extends Component {
  actionToggleDataSet = { on: 1, off: 0 };
  // constructor(props) {
  //   super(props);
  // }

  // componentWillMount() {
  //   const { node } = this.props;
  // }

  handleChangeGroup(response, logged) {
    if (!response || !response.success) {
      return;
    }

    const node = this.props.node || {};
    const metadata = node.metadata || [];
    const children = metadata.map((item, index) => {
      item.group = logged ? 1 : index + 1;
      return item;
    });
    node.metadata = children;
    node.group = logged ? 1 : 0;

    // this.saveDataOnChange(node);
    this.props.dispatch(
      sagaActions.updateNodeRequest({
        step: 'metadata',
        iid: node.iid,
        data: node,
      }),
    );
  }

  render() {
    const { node, readOnly } = this.props;
    return (
      <div>
        <ActionToggle
          readOnly={readOnly}
          label={node.group ? t1('separate_questions') : t1('group_questions')}
          labelPosition="right"
          baseURL={routes.url('node_update', { ...node, step: 'group' })}
          dataSet={this.actionToggleDataSet}
          value={node.group || 0}
          name="group"
          handleChange={(res, logged) => this.handleChangeGroup(res, logged)}
        />
      </div>
    );
  }
}

QuestionsGroupSwitch.propTypes = {
  node: PropTypes.object.isRequired,
};

export default connect()(QuestionsGroupSwitch);
