import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash.isequal';
import { t1 } from 'translate';
import actions from 'actions/creators';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';

import MemberSearchLayout from './member/search';
import MemberAddLayout from './member/add/search-user/Layout';
import LearningItemSearchLayout from './learning-item/search';
import LearningItemAddLayout from './learning-item/add';
import Info from './info';
import TopRightMenu from './menu/TopRightMenu';
import Filtersets from './filterset/index';
import DashBoard from './dashboard';
import SearchRoles from './roles/search';
import NewRoles from './roles/new';
import Supervisor from './supervisor/Layout';
import ImportStudentsToGroup from './import/Layout';
import { menuItems } from './sub-left-menu-configs';
import Attendance from './attendance/Layout';
import SurveySearch from './survey/Layout';
import { parse } from 'query-string';
import lodashGet from 'lodash.get';
import FeedbackStudentsInBatch from 'components/admin/survey/feedback-students-in-batch';
import AddEp from './enrolment-plan/new';
import SchoolYearReport from './year-report';
import K12Setup from './k12-setup';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import ImportUsers from 'components/admin/import-users';
import Score from './score';

const getTitle = (node) =>
  `${node.name} (${node.smart ? t1('smart_group') : t1('normal_group')})`;

class GroupEditContainer extends Component {
  componentWillReceiveProps(nextProps) {
    let { node, action, subAction, dispatch } = this.props;
    if (
      nextProps &&
      nextProps.node &&
      (nextProps.node.iid !== (node && node.iid) ||
        nextProps.action !== action ||
        !isEqual(nextProps.subAction, subAction))
    ) {
      node = nextProps.node || {};
      const siteTitle = getTitle(node);

      dispatch(actions.setTopMenuElement({ siteTitle }));
    }
  }

  getContentByAction = (
    action,
    subAction,
    item,
    itemAncestors,
    node,
    queryStringParams,
  ) => {
    const { isSIS } = this.props;
    switch (action) {
      case 'members':
      case 'pending_members':
      case 'redundant_members': {
        if (subAction === 'new') {
          return (
            <div>
              <b className="text-white">{t1('add_new_member_to_group')}</b>
              <MemberAddLayout
                group={node}
                action={action}
                subAction={subAction}
              />
            </div>
          );
        }
        return (
          <MemberSearchLayout
            group={node}
            action={action}
            subAction={subAction}
          />
        );
      }
      case 'learning-items': {
        if (subAction === 'new') {
          return (
            <div>
              <b>{t1('add_new_learning_item_to_group')}</b>
              <LearningItemAddLayout group={node} />
            </div>
          );
        }
        return <LearningItemSearchLayout group={node} />;
      }
      case 'info': {
        return <Info group={node} />;
      }
      case 'import-members': {
        return isSIS ? (
          <ImportStudentsToGroup
            group={node}
            formid={'import-members-to-group'}
          />
        ) : (
          <ImportUsers importId={subAction} node={node} />
        );
      }
      case 'filtersets': {
        return <Filtersets group={node} />;
      }
      case 'dashboard': {
        return <DashBoard group={node} />;
      }
      case 'roles': {
        if (subAction === 'new') return <NewRoles group={node} />;
        return <SearchRoles group={node} />;
      }
      case 'supervisor': {
        return <Supervisor group={node} />;
      }
      case 'attendance': {
        return <Attendance group={node} />;
      }
      case 'add-ep': {
        return <AddEp group={node} />;
      }
      case 'year-report': {
        return <SchoolYearReport group={node} />;
      }
      case 'setup': {
        return <K12Setup group={node} />;
      }

      case 'surveys': {
        switch (subAction) {
          case 'batch': {
            const surveyIid = lodashGet(queryStringParams, 'survey_iid');
            const batchId = lodashGet(queryStringParams, 'batch_id');

            return (
              <FeedbackStudentsInBatch
                surveyIid={surveyIid}
                batchId={batchId}
              />
            );
          }
        }
        return <SurveySearch group={node} />;
      }
      case 'score': {
        return <Score group={node} />;
      }

      default: {
        return <MemberSearchLayout group={node} />;
      }
    }
  };

  displayCategoryInformation = (group) => {
    if (
      !group ||
      (!group.icoObject && !group.majorObject && !group.semesterObject)
    ) {
      return null;
    }

    return (
      <div>
        <ul>
          {group.facultyObject && (
            <li>{`${t1('faculty')}: ${group.facultyObject.name}`}</li>
          )}
          {group.majorObject && (
            <li>{`${t1('major')}: ${group.majorObject.name}`}</li>
          )}
          {group.training_mode && (
            <li>{`${t1('training_mode')}: ${group.training_mode}`}</li>
          )}
          {group.training_level && (
            <li>{`${t1('training_level')}: ${group.training_level}`}</li>
          )}
          {group.icoObject && (
            <li>{`${t1('ico')}: ${group.icoObject.name}`}</li>
          )}
          {group.semesterObject && (
            <li>{`${t1('semester')}: ${group.semesterObject.name}`}</li>
          )}
        </ul>
      </div>
    );
  };

  render() {
    const {
      action,
      item,
      itemAncestors,
      node,
      subAction,
      queryStringParams,
    } = this.props;

    const menuSchema = menuItems(node);

    const firstSubAction = subAction && subAction.length ? subAction[0] : null;
    return (
      <div>
        <SubTopMenuContext
          node={Object.assign({}, node, {
            action,
            subAction,
          })}
          lastBreadcrumbName={getTitle(node)}
          action={action}
          button={
            <TopRightMenu action={action} group={node} subAction={subAction} />
          }
          isSmallSize
        />

        <SubLeftMenuContext node={node} schema={menuSchema} />
        {this.displayCategoryInformation(node)}
        {this.getContentByAction(
          action,
          firstSubAction,
          item,
          itemAncestors,
          node,
          queryStringParams,
        )}
      </div>
    );
  }
}

// GroupEditContainer.propTypes = {
//   action: PropTypes.string,
//   dispatch: PropTypes.func.isRequired,
//   group: PropTypes.shape(),
//   item: PropTypes.shape(),
//   itemAncestors: PropTypes.arrayOf(PropTypes.any),
// };
//
// GroupEditContainer.defaultProps = {
//   action: '',
//   dispatch: () => {},
//   group: null,
//   item: null,
//   itemAncestors: [],
// };

function mapStateToProps(state, props) {
  return {
    queryStringParams: parse(lodashGet(props, 'location.search')),
  };
}

export default connect(mapStateToProps)(
  withSchoolConfigs(withNodeEditContainer(GroupEditContainer)),
);
