import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { t1 } from 'translate';
import actions from 'actions/creators';
import { confSelector } from 'common/selectors';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import Loading from 'components/common/loading';
import NodeNew from 'components/admin/node/new';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';
import schema from 'components/admin/financial/mainstage/fee-collecting-phase/schema/form';
import FcpDetail from './detail';
import { menuItems } from './sub-left-menu-configs';

class FeeCollectingPhaseContainer extends Component {
  getContentByAction() {
    const { action, node } = this.props;
    if (!node || !node.iid) {
      return <Loading />;
    }

    if (action === 'applied-fees') {
      const hiddenFields = {
        status: ['approved'],
      };
      return <FcpDetail fcp={node} />;
    }

    return (
      <NodeNew
        className="white-box"
        mode="edit"
        ntype={'fcp'}
        schema={schema}
        node={node}
        formid="update_fcp"
      />
    );
  }

  componentDidMount() {
    this.setMainstageTopMenu(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { action } = this.props;
    if (action !== nextProps.action) {
      this.setMainstageTopMenu(nextProps);
    }
  }

  setMainstageTopMenu = (props) => {
    const { dispatch } = props;

    const siteTitle = t1('fee_collecting_phase');

    dispatch(actions.setTopMenuElement({ siteTitle }));
  };

  render() {
    const { node } = this.props;

    return [
      <SubLeftMenuContext node={node} schema={menuItems(node)} />,
      this.getContentByAction(),
    ];
  }
}

FeeCollectingPhaseContainer.propTypes = {
  action: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  itemAncestors: PropTypes.arrayOf(PropTypes.any),
};

FeeCollectingPhaseContainer.defaultProps = {
  action: '',
  dispatch: () => {},
  itemAncestors: [],
};

export default withNodeEditContainer(FeeCollectingPhaseContainer);
