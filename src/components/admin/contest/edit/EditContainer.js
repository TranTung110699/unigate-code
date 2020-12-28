/* eslint-disable jsx-a11y/anchor-is-valid,no-undef,react/prop-types,global-require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import get from 'lodash.get';

import routes from 'routes';
import nodeActions from 'actions/node/creators';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import { extractObject } from 'common/utils/Array';

import Loading from 'components/common/loading';
import ExamRoundLayout from 'components/admin/contest/exam-round/search/Layout';
import RoomLayout from 'components/admin/room/search/Layout';
import ExamShiftsContainer from 'components/admin/contest/exam-shift/ExamShiftsContainer';
import ContestantsLayout from 'components/admin/contest/contestants/contestant-search/Layout';
import ReportExcelLayout from 'components/admin/report/excels/search/Layout';
import SyllabusLayout from 'components/admin/syllabus/search/Layout';
import ExamResultLayout from 'components/admin/contest/exam-result/search';
import Reports from 'components/admin/contest/report';
import ImportUsers from 'components/admin/import-users';
import FormNewInvite from 'components/admin/invite/new/FormNewInvite';
import AbstractRoles from 'components/admin/organization/edit/EditContainer';
import Dashboard from '../dashboard/index';
import ExamRoundInsideContest from '../exam-round/edit/EditContainer';
import contestTopMenuSchema from '../contest/menu/MainstageTopMenu';
import examRoundTopMenuSchema from '../exam-round/menu/MainstageTopMenu';
import examShiftTopMenuSchema from '../exam-shift/menu/MainstageTopMenu';
import contestTopRolesTopMenuSchema from '../contest/menu/contestTopRoles';
import { Redirect } from 'react-router-dom';

import contestStaffTopMenuSchema from '../contest/menu/contest-staff';
import { menuItems as contestMenuItems } from './sub-left-menu-configs';
import ContestBasicInfoContainer from './basic/ContestBasicInfoContainer';
import contestantTopMenuSchema from '../contestants/MainstageTopMenu';
import { getLearningItemFormSchema } from 'components/admin/node/schema-form/learning-items';
import { t1 } from 'translate';
import NodeNew from 'components/admin/node/new/';
import { isNodeFreeze } from 'components/admin/node/utils';
import BasicInformationNavMenu from 'components/admin/node/edit/basic-information-nav-menu';
import { isContestSharedFromAncestorOrganizations } from 'components/admin/contest/common';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';
import withUserInfo from 'common/hoc/withUserInfo';
import withLeftMenuCollapsed from 'common/hoc/withLeftMenuCollapsed';
import { getSearch } from 'common/selectors/router';

const isToeicMarker = (userInfo) => {
  return (
    userInfo.iid == 191648 &&
    userInfo.name == 'TestMarker1' &&
    userInfo.lname == 'testm@rker1.com'
  );
};

class ContestEditContainer extends Component {
  inviteSuccessFull = () => {
    const { contest, dispatch } = this.props;
    const url = routes.url('node_edit', { ...contest, step: 'invite' });
    window.history.pushState(null, null, url);
    dispatch(nodeActions.setEditingItem({ action: 'invite' }));
  };

  getTopMenuSchemaByAction(props) {
    const { action, contest, contestIid, examRound, subAction } = props;

    switch (action) {
      case 'rooms': {
        return contestTopMenuSchema();
      }
      case 'information': {
        if (subAction && subAction.length) {
          if (subAction[0] === 'roles')
            return contestTopRolesTopMenuSchema(null, { node: contest });
          else if (subAction['0'] === 'staff')
            return contestStaffTopMenuSchema(null, { node: contest });
        }
        break;
      }
      case 'exam-rounds': {
        return examRoundTopMenuSchema(contest);
      }
      case 'exam-shifts': {
        return examShiftTopMenuSchema(contestIid, examRound);
      }
      case 'contestants':
      case 'import-contestants':
      case 'invite': {
        return contestantTopMenuSchema(contest);
      }
      default: {
        return null;
      }
    }
  }

  getContentByAction(props) {
    const {
      action,
      contest,
      contestIid,
      examRound,
      location,
      node,
      itemAncestors,
      userInfo,
      ...newProps
    } = props;
    const { subAction } = newProps;

    // pass syllabus iid along for permission checking at the server side
    const syllabus =
      itemAncestors &&
      itemAncestors.length &&
      itemAncestors.find((item) => item && item.ntype === 'syllabus');

    const hiddenFields =
      syllabus && syllabus.iid ? { syllabus: syllabus.iid } : null;

    const readOnly = isNodeFreeze(contest);

    let contentDisplay = '';

    if (
      Array.isArray(itemAncestors) &&
      itemAncestors.find((round) => {
        return round.iid && round.ntype === 'exam-round';
      })
    ) {
      if (!examRound || !Object.keys(examRound).length) {
        return <Loading />;
      }

      return <ExamRoundInsideContest {...this.props} />;
    }

    switch (action) {
      case 'dashboard': {
        contentDisplay = (
          <Dashboard node={contest} contestIid={contestIid} {...newProps} />
        );
        break;
      }
      case 'information': {
        contentDisplay = (
          <ContestBasicInfoContainer
            examRound={examRound}
            contest={contest}
            action={action}
            subAction={subAction}
            isHashbang={this.props.isHashbang}
          />
        );
        break;
      }
      case 'invite': {
        const value = extractObject(contest, [
          'name',
          'iid',
          'id',
          'ntype',
          'code',
        ]);
        value.type = 'contest';
        contentDisplay = (
          <FormNewInvite
            modal={1}
            simpleMode
            alternativeApi={'/invite/api/new'}
            hiddenFields={{
              items: [{ ...value }],
              contest,
            }}
            inviteSuccessFull={this.inviteSuccessFull}
          />
        );
        break;
      }
      case 'exam-rounds': {
        contentDisplay = (
          <ExamRoundLayout
            node={contest}
            contestIid={contestIid}
            {...newProps}
          />
        );
        break;
      }
      case 'import-contestants': {
        return (
          <div>
            <h1>{t1('import_contestants_to_contest_from_excel_file')}</h1>
            <div>
              {t1(
                'you_can_import_contestantts_from_an_excel_file_with_the_following_steps',
              )}
              <ul>
                <li>{t1('download_the_sample_template_excel_file')}</li>
                <li>{t1('edit_the_list_of_contestants_in_the_excel_file')}</li>
                <li>
                  {t1(
                    'upload_the_excel_file_by_clicking_the_upload_icon_or_simply_paste_the_url_of_the_excel_file',
                  )}
                </li>
                <li>{t1('click_preview')}</li>
                <li>{t1('review_the_list_of_contestants_and_then_import')}</li>
              </ul>
            </div>

            <ImportUsers
              importId={Array.isArray(subAction) && subAction[0]}
              node={contest}
            />
          </div>
        );
      }
      case 'exam-shifts': {
        contentDisplay = (
          <ExamShiftsContainer
            contestIid={contestIid}
            contest={contest}
            subAction={subAction}
            {...newProps}
          />
        );
        break;
      }
      case 'rooms': {
        contentDisplay = <RoomLayout node={contest} {...newProps} />;
        break;
      }
      case 'contestants': {
        contentDisplay = (
          <ContestantsLayout
            contest={contest}
            contestIid={contestIid}
            examRound={examRound}
            {...newProps}
          />
        );
        break;
      }
      case 'exam-stores': {
        contentDisplay = (
          <SyllabusLayout
            contest={contest}
            examRound={examRound}
            location={location}
            autoSearchWhenStart
            type="syllabus_exam"
          />
        );
        break;
      }
      case 'exam-result': {
        contentDisplay = (
          <ExamResultLayout
            node={contest}
            contestIid={contest && contest.iid}
            examRound={examRound}
            action={'exam-result'}
            takeId={subAction && subAction.length ? subAction[0] : null}
          />
        );
        break;
      }
      // case 'arrange-exam-shift': {
      //   contentDisplay = (
      //     <ChangeExamShiftLayout
      //       contest={contest}
      //       examRound={examRound}
      //     />
      //   );
      //   break;
      // }
      case 'reports': {
        contentDisplay = (
          <Reports node={contest} action={action} subAction={subAction} />
        );
        break;
      }
      case 'old-reports': {
        contentDisplay = <ReportExcelLayout node={contest} />;
        break;
      }
      // case 'roles': {
      //   contentDisplay = (
      //     <Roles node={contest} action={subAction && subAction[0]} />
      //   );
      //   break;
      // }
      case 'abstract-roles': {
        contentDisplay = (
          <AbstractRoles {...props} action={subAction && subAction[0]} />
        );
        break;
      }
      // case 'children': {
      //   //Edit exam store, sco, exercise children in edit contest container
      //   contentDisplay = (
      //     <div>
      //       <BasicInformationNavMenu {...this.props} contestMode />
      //
      //       <Metadata
      //         node={node}
      //         syllabusIid={syllabusIid}
      //         ancestors={itemAncestors}
      //         action={action}
      //       />
      //     </div>
      //   );
      //   break;
      // }
      case 'edit': {
        //Edit question in edit contest container
        contentDisplay = (
          <div>
            <BasicInformationNavMenu
              {...this.props}
              contestMode
              content={
                <NodeNew
                  key={node.iid}
                  schema={getLearningItemFormSchema(node.ntype)}
                  hiddenFields={hiddenFields}
                  readOnly={readOnly}
                  message={readOnly ? `(*${t1('this_form_is_read_only')})` : ''}
                  ntype={node.ntype}
                  node={node}
                  mode="edit"
                  step={node.type === 'credit' ? 'credit' : ''}
                />
              }
            />
          </div>
        );
        break;
      }
      // case 'staff': {
      //   contentDisplay = (
      //     <Staff node={contest} action={subAction && subAction[0]} />
      //   );
      //   break;
      // }
      default: {
        if (isContestSharedFromAncestorOrganizations(contest)) {
          contentDisplay = (
            <Redirect
              to={routes.url(
                'node_edit',
                Object.assign({}, contest, {
                  ntype: 'contest',
                  step: 'exam-result',
                }),
              )}
            />
          );
        } else {
          contentDisplay = (
            <Redirect
              to={routes.url(
                'node_edit',
                Object.assign({}, contest, {
                  ntype: 'contest',
                  step: 'dashboard',
                }),
              )}
            />
          );
        }
        break;
      }
    }

    return contentDisplay;
  }

  render() {
    const { contest, action, subAction, conf, userInfo } = this.props;

    if (!contest || !contest.iid) {
      return <Loading />;
    }

    const subLeftMenuItems = contestMenuItems({ ...contest }, conf);

    if (isToeicMarker(userInfo) && action != 'exam-result') {
      window.location = `/admin/contest/${contest.iid}/exam-result`;
    }

    // hack for TOEIC marker
    const menu = isToeicMarker(userInfo) ? null : (
      <SubLeftMenuContext node={contest} schema={subLeftMenuItems} />
    );

    return [
      !this.props.isHashbang && [
        menu,
        <SubTopMenuContext
          lastBreadcrumbName={contest.name}
          action={action}
          subAction={subAction}
          schema={this.getTopMenuSchemaByAction(this.props)}
          isSmallSize
        />,
      ],
      this.getContentByAction(this.props),
    ];
  }
}

ContestEditContainer.propTypes = {
  action: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  itemAncestors: PropTypes.arrayOf(PropTypes.any),
};

ContestEditContainer.defaultProps = {
  action: '',
  dispatch: () => {},
  itemAncestors: [],
};

function mapStateToProps(state, props) {
  let contest = props.rootNode || {};
  let examRound = {};
  const itemAncestors = props.itemAncestors || [];
  const nodes = state.tree;

  const examRoundItem = itemAncestors[1];
  if (examRoundItem && examRoundItem.iid && nodes[examRoundItem.iid]) {
    examRound = nodes[examRoundItem.iid];
  }

  const queryString = require('query-string');
  const queryStringParams = queryString.parse(getSearch(state));

  return {
    // ...getEditingItemSelector(state),
    // itemAncestors,
    contest,
    contestIid: contest.iid,
    examRound,
    ...queryStringParams,
    conf: get(state, 'domainInfo.conf'),
  };
}

export default withNodeEditContainer(
  connect(mapStateToProps)(
    withRouter(withUserInfo(withLeftMenuCollapsed(ContestEditContainer))),
  ),
);
