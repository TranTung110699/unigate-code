/**
 * Created by hungvo on 21/04/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import get from 'lodash.get';

import routes from 'routes';
import Loading from 'components/common/loading';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import MajorPrograms from 'components/admin/plan/mainstage/major-program/Layout';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';

import Info from '../mainstage/info';
import Dashboard from '../mainstage/dashboard';
import Students from '../mainstage/students/Layout';
import FormsOfTraining from '../mainstage/forms-of-training';
import { menuItems } from './sub-left-menu-configs';

class MajorEditContainer extends Component {
  getContentByAction(props) {
    const { action, category } = props;
    if (!category || !category.iid) {
      return <Loading />;
    }

    let contentDisplay = '';
    switch (action) {
      case 'dashboard':
        contentDisplay = <Dashboard node={category} />;
        break;
      case 'info':
        contentDisplay = <Info node={category} />;
        break;
      case 'programs':
        contentDisplay = (
          <MajorPrograms paramsSearch={{ major: category && category.iid }} />
        );
        break;
      case 'students':
        contentDisplay = <Students node={category} />;
        break;
      case 'forms-of-training': {
        contentDisplay = <FormsOfTraining node={category} />;
        break;
      }
      default: {
        contentDisplay = (
          <Redirect
            to={routes.url(
              'node_edit',
              Object.assign({}, category, { ntype: 'major', step: 'info' }),
            )}
          />
        );
        break;
      }
    }

    return contentDisplay;
  }

  render() {
    const { category } = this.props;

    return [
      <SubTopMenuContext lastBreadcrumbName={category.name} />,
      <SubLeftMenuContext node={category} schema={menuItems(this.props)} />,
      this.getContentByAction(this.props),
    ];
  }
}

MajorEditContainer.propTypes = {
  action: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  itemAncestors: PropTypes.arrayOf(PropTypes.any),
};

MajorEditContainer.defaultProps = {
  action: '',
  dispatch: () => {},
  itemAncestors: [],
};

function mapStateToProps(state, props) {
  return {
    category: props.node,
    schoolType: get(state, 'domainInfo.school.type'),
    conf: get(state, 'domainInfo.conf'),
  };
}

export default withNodeEditContainer(
  connect(mapStateToProps)(MajorEditContainer),
);
