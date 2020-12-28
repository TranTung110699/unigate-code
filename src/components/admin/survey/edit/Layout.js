/**
 * Created by hungvo on 21/04/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import { t1 } from 'translate';
import actions from 'actions/creators';
import Loading from 'components/common/loading';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';

import Dashboard from '../mainstage/dashboard';
import Info from '../mainstage/info';
import Preview from '../mainstage/preview';
import AppliedItems from '../mainstage/applied-items';
import Children from '../mainstage/children';
import EditQuestion from '../mainstage/children/EditQuestion';

import { menuItems } from './sub-left-menu-configs';
import appliedItemsTopMenuSchema from '../menu/teacher-menus/survey_applied_items';
import lodashGet from 'lodash.get';

class SurveyEditContainer extends Component {
  getTopMenuSchemaByAction(props) {
    const { action } = props;

    switch (action) {
      case 'applied-items':
        return appliedItemsTopMenuSchema(null, this.props);
      default:
        return null;
    }
  }

  getContentByAction(props) {
    const { action, rootNode, node, itemAncestors } = props;

    if (!rootNode || !rootNode.iid) {
      return <Loading />;
    }

    let contentDisplay = '';
    switch (action) {
      case 'dashboard': {
        contentDisplay = <Dashboard node={rootNode} />;
        break;
      }
      case 'info': {
        contentDisplay = <Info node={rootNode} className="white-box" />;
        break;
      }
      case 'applied-items': {
        contentDisplay = <AppliedItems node={rootNode} />;
        break;
      }
      case 'preview': {
        contentDisplay = <Preview node={rootNode} />;
        break;
      }
      case 'children': {
        contentDisplay = <Children node={rootNode} action={action} />;
        break;
      }
      default:
        // /admin/survey/1/question/2/edit
        if (
          itemAncestors.length === 2 &&
          itemAncestors[1].ntype === 'question'
        ) {
          contentDisplay = <EditQuestion node={node} />;
        } else {
          contentDisplay = <Dashboard node={rootNode} />;
        }
    }

    return contentDisplay;
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.rootNode &&
      !isEqual(this.props.rootNode, nextProps.rootNode)
    ) {
      const siteTitle = `${t1('survey')}: ${nextProps.rootNode.name}`;
      const { dispatch } = this.props;
      dispatch(actions.setTopMenuElement({ siteTitle }));
    }
  }

  render() {
    const { rootNode, action } = this.props;

    return (
      <div>
        <SubLeftMenuContext node={rootNode} schema={menuItems(rootNode)} />
        <SubTopMenuContext
          lastBreadcrumbName={lodashGet(rootNode, 'name')}
          action={action}
          schema={this.getTopMenuSchemaByAction(this.props)}
          isSmallSize
        />
        {this.getContentByAction(this.props)}
      </div>
    );
  }
}

SurveyEditContainer.propTypes = {
  action: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

SurveyEditContainer.defaultProps = {
  action: '',
  dispatch: () => {},
};

export default withNodeEditContainer(SurveyEditContainer);
