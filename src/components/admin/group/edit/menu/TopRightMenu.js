import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getSubMenuLink } from 'routes/links'; // import NodeEditContainer from 'components/admin/node/edit/NodeEditContainer';
// import MemberSearchLayout from './member/search';
// import MemberAddLayout from './member/add';
// import LearningItemSearchLayout from './learning-item/search';
// import LearningItemAddLayout from './learning-item/add';
// import Info from './info';
import { t1 } from 'translate';
import FlatButton from 'components/common/mui/FlatButton';
import RaisedButton from 'components/common/mui/RaisedButton';
import Icon from 'components/common/Icon';
import NewStaff from 'components/admin/group/common/new-staff/ButtonNew';
import { getSearchFormId } from '../staff/common/utils';
import { getIdOfFormSearchBatchSurveyInserts } from '../survey/common';
import ButtonAddSurveyTakeToFeedbackGroupUsers from '../survey/new/ButtonAddSurveyTakeToFeedbackGroupUsers';
import NewSupervisor from '../../common/new-supervisor/ButtonNew';
import { getSupervisorSearchFormId } from '../supervisor/utils';

class CategoryEditTopRightMenu extends Component {
  render() {
    const { action, group, subAction } = this.props;

    if (action === 'learning-items') {
      const label = t1('add_new_learning_item');
      return [
        group && group.iid && (
          <Link to={`/admin/group/${group.iid}/${action}/new`}>
            <RaisedButton primary icon={<Icon icon="plus" />} label={label} />
          </Link>
        ),
      ];
    }

    if (action === 'members') {
      const label = t1('add_new_member');
      return [
        group && group.iid && (
          <Link to={`/admin/group/${group.iid}/${action}/new`}>
            <RaisedButton
              primary
              icon={<Icon icon="plus" />}
              label={label}
              className="m-r-10"
            />
          </Link>
        ),
        group && group.iid && !group.smart && (
          <Link to={getSubMenuLink(group.ntype, group, 'import-members')}>
            <RaisedButton
              primary
              icon={<Icon icon="import" />}
              label={t1('import_members')}
            />
          </Link>
        ),
      ];
    }

    if (action === 'roles') {
      return (
        group &&
        group.iid && (
          <Link to={`/admin/group/${group.iid}/${action}/new`}>
            <FlatButton
              icon={<Icon icon="plus" />}
              label={t1('add_new_roles', 1)}
            />
          </Link>
        )
      );
    }

    if (action === 'surveys' && subAction !== 'batch') {
      return (
        group &&
        group.iid && (
          <ButtonAddSurveyTakeToFeedbackGroupUsers
            group={group}
            searchFormId={getIdOfFormSearchBatchSurveyInserts(group)}
          />
        )
      );
    }

    if (action === 'staff') {
      return (
        <div>
          <NewStaff node={group} searchFormId={getSearchFormId(group)} />
          {/*
            <Link to={getSubMenuLink(group.ntype, group, 'roles')}>roles</Link>
             */}
        </div>
      );
    }

    if (action === 'supervisor') {
      return (
        <div>
          <NewSupervisor
            node={group}
            searchFormId={getSupervisorSearchFormId(group)}
          />
        </div>
      );
    }

    return null;
  }
}

export default CategoryEditTopRightMenu;
