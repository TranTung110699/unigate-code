import React from 'react';
import { connect } from 'react-redux';
import sagaActions from 'actions/node/saga-creators';
import { t1 } from 'translate';
import TwoSideToggle from 'schema-form/elements/toggle/TwoSideToggle';
import Loading from 'components/common/loading';

class UpdateAccountStatus extends React.Component {
  render() {
    const { node } = this.props;

    if (!node || !node.iid) {
      return <Loading />;
    }
    return (
      <TwoSideToggle
        onLabel={t1('activated')}
        offLabel={t1('unactivated')}
        toggled={node && node.status === 'activated'}
        onToggle={(event, toggled) => {
          this.props.dispatch(
            sagaActions.updateNodeRequest({
              iid: node.iid,
              step: 'status',
              data: {
                id: node.id,
                iid: node.iid,
                ntype: 'user',
                status: toggled ? 'activated' : 'unactivated',
              },
            }),
          );
        }}
      />
    );
  }
}

export default connect()(UpdateAccountStatus);
