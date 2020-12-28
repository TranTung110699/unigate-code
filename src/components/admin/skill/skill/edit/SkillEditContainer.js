import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { t1 } from 'translate';
import actions from 'actions/creators';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';

import Mainstage from './Mainstage';
import { menuItems } from './sub-left-menu-configs';

class Layout extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const siteTitle = t1('skills');

    dispatch(actions.setTopMenuElement({ siteTitle }));
  }

  render() {
    const { node } = this.props;

    return [
      <SubLeftMenuContext node={node} schema={menuItems(node)} />,
      <SubTopMenuContext lastBreadcrumbName={node.name} isSmallSize />,
      <Mainstage {...this.props} />,
    ];
  }
}

// Layout.propTypes = {
//   iid: PropTypes.string,
//   step: PropTypes.string,
// };
//
// Layout.defaultProps = {
//   iid: 58638,
//   step: 'skill',
// };
//
export default withNodeEditContainer(connect()(Layout));
