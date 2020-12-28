import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import lodashGet from 'lodash.get';

import { t1 } from 'translate';
import actions from 'actions/creators';
import { NodeShape } from 'configs/constants';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';

import EditContainer from '../mainstage/new-or-edit/EditOrCreate';
import MajorProgram from '../mainstage/major-program/Layout';
import MultiDegree from '../mainstage/multi-degree/Layout';
import Help from '../mainstage/help';
import Overview from '../mainstage/overview/Overview';
import { menuItems } from './sub-left-menu-configs';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';

class PlanEditContainer extends Component {
  componentWillMount() {
    const action = lodashGet(this.props, 'match.params.action');
    this.setTopMenuElement(action);
  }

  componentWillReceiveProps(nextProps) {
    const action = lodashGet(this.props, 'match.params.action');
    const nextAction = lodashGet(nextProps, 'match.params.action');
    if (action !== nextAction) {
      this.setTopMenuElement(nextAction);
    }
  }

  setTopMenuElement = (action) => {
    let siteTitle = `${t1('teaching_plan')} > `;

    if (action === 'major-program') {
      siteTitle = siteTitle.concat(t1('major_program'));
    } else if (action === 'create_or_update_plan') {
      siteTitle = siteTitle.concat(t1('create_or_update_plan'));
    } else siteTitle = siteTitle.concat(t1('overview_teaching_plan'));

    this.props.dispatch(actions.setTopMenuElement({ siteTitle }));
  };

  getContent = () => {
    const action = lodashGet(this.props, 'match.params.action');

    if (action === 'major-program') {
      return <MajorProgram />;
    } else if (action === 'create') {
      return <EditContainer />;
    } else if (action === 'help') {
      return <Help />;
    } else if (action === 'multi-degree') {
      return <MultiDegree />;
    }

    return <Overview />;
  };

  render() {
    return (
      <div>
        <SubTopMenuContext
          lastBreadcrumbName={t1('plan')}
          description={t1('plan_description')}
        />
        <SubLeftMenuContext schema={menuItems} />
        {this.getContent()}
      </div>
    );
  }
}

PlanEditContainer.propTypes = {
  match: PropTypes.shape(NodeShape),
};

// Specifies the default values for props:
PlanEditContainer.defaultProps = {
  match: {},
};

export default connect()(PlanEditContainer);
