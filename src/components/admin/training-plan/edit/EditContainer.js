/**
 * Created by hungvo on 21/04/2017.
 */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import get from 'lodash.get';

import routes from 'routes';
import { t1 } from 'translate';
import actions from 'actions/creators';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import Loading from 'components/common/loading';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';
import enrolmentPlansTopMenuSchema from 'components/admin/training-plan/menu/teacher-menus/training_plan_enrolment_plans';

import Info from '../mainstage/info';
import Members from '../mainstage/members';
import Dashboard from '../mainstage/dashboard';
import EnrolmentPlans from '../mainstage/enrolment-plans';
import { isK12 } from 'common/k12';
import { menuItems } from './sub-left-menu-configs';
import { menuItems as menuItemsK12 } from './k12-sub-left-menu-configs';
import DashboardReport from '../mainstage/reports';

class TrainingPlanEditContainer extends Component {
  getTopMenuSchemaByAction(props) {
    const { action } = props;

    switch (action) {
      case 'enrolment-plans': {
        return enrolmentPlansTopMenuSchema(null, props);
      }
      case 'dashboard':
      case 'info':
      case 'report':
      case 'members':
      case 'users-by-organization':
      case 'not-started-learners':
      case 'credit-overall-progress':
      default:
        return null;
    }
  }

  getContentByAction(props) {
    const { action, node, subAction, search } = props;
    if (!node || !node.iid) {
      return <Loading />;
    }

    let contentDisplay = '';
    switch (action) {
      case 'dashboard': {
        contentDisplay = <Dashboard node={node} />;
        break;
      }
      case 'info': {
        contentDisplay = <Info node={node} />;
        break;
      }
      case 'enrolment-plans': {
        contentDisplay = <EnrolmentPlans node={node} />;
        break;
      }
      case 'members': {
        contentDisplay = (
          <Members node={node} action="members" subAction={subAction} />
        );
        break;
      }
      case 'report': {
        contentDisplay = (
          <DashboardReport trainingPlan={node} subAction={subAction} />
        );
        break;
      }
      default:
        contentDisplay = (
          <Redirect
            to={routes.url(
              'node_edit',
              Object.assign({}, node, {
                ntype: 'training_plan',
                step: 'dashboard',
              }),
            )}
          />
        );
    }

    return contentDisplay;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.node && !isEqual(this.props.node, nextProps.node)) {
      const siteTitle = `${t1('training_plan')}: ${nextProps.node.name}`;
      const { dispatch } = this.props;
      dispatch(actions.setTopMenuElement({ siteTitle }));
    }
  }

  render() {
    const { node, action, k12 } = this.props;

    return [
      <SubLeftMenuContext
        node={node}
        schema={k12 ? menuItemsK12(node) : menuItems(node)}
      />,
      <SubTopMenuContext
        lastBreadcrumbName={node.name}
        action={action}
        schema={this.getTopMenuSchemaByAction(this.props)}
        isSmallSize
      />,
      this.getContentByAction(this.props),
    ];
  }
}

TrainingPlanEditContainer.propTypes = {
  action: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

TrainingPlanEditContainer.defaultProps = {
  action: '',
  dispatch: () => {},
};

function mapStateToProps(state, props) {
  const {
    match: {
      params: { iid, action, subAction },
    },
    location: { search },
  } = props;
  const nodes = state.tree;

  return {
    action,
    subAction,
    search,
    node: get(nodes, iid, {}),
    k12: isK12(state),
  };
}

export default withNodeEditContainer(
  connect(mapStateToProps)(TrainingPlanEditContainer),
);
