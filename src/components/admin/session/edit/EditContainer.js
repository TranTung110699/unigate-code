import React, { Component } from 'react';
import Loading from 'components/common/loading';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import { connect } from 'react-redux';
import withNodeEditContainer from '../../node/edit/withNodeEditContainer';
import menuItems from './sub-menu-left-configs';
import UpdateForm from '../mainstage/update';

class SessionEditContainer extends Component {
  getContentByAction(props) {
    const { action, subAction, node } = props;

    if (!node || !node.iid) {
      return <Loading />;
    }

    let contentDisplay = '';
    switch (action) {
      case 'dashboard': {
        contentDisplay = <div>session dashboard</div>;
        break;
      }
      case 'update': {
        contentDisplay = <UpdateForm {...this.props} />;
        break;
      }

      default:
        contentDisplay = <div>session content</div>;
        break;
    }

    return contentDisplay;
  }

  render() {
    const contentDisplay = this.getContentByAction(this.props);
    const { node } = this.props;

    return [
      <SubLeftMenuContext node={node} schema={menuItems(node)} />,
      contentDisplay,
    ];
  }
}

export default withNodeEditContainer(connect()(SessionEditContainer));
