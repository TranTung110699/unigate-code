import React, { Component } from 'react';
import { t1 } from 'translate';
import routes from 'routes';
import UpdateForm from 'components/admin/contest/contest/new/Form';
import HorizontalNav from 'layouts/admin_v2/horizontal-nav/index-v2';
import Roles from '../../contest/roles/Layout';
import Staff from '../../contest/staff/Layout';
import FlatButton from 'components/common/mui/FlatButton';
import Icon from 'components/common/Icon';
import { getSearchFormId } from '../../../user-abac-role/staff/common/utils';
import ButtonNew from '../../../user-abac-role/staff/new-staff/ButtonNew';
import DetailOnDialog from 'components/common/detail-on-dialog';

// import ConfirmFinishTask from 'components/admin/contest/dashboard/ConfirmFinishTask';

class ContestBasicInfoContainer extends Component {
  renderPreview = ({ showFull }) => (
    <FlatButton
      onClick={showFull}
      icon={<Icon icon="plus" />}
      label={t1('new_role')}
      type="submit"
    />
  );

  renderFull = ({ closeDialog }) => (
    <Roles node={this.props.contest} action="new" />
  );

  render() {
    const { action, subAction, contest, examRound, isHashbang } = this.props;
    let contentDisplay;

    let activeMenu = 'information';

    if (!subAction) {
      contentDisplay = (
        <UpdateForm
          mode="edit"
          node={contest}
          step={'contest'}
          formid="edit_contest"
        />
      );
    } else if (subAction.length && subAction[0] === 'roles') {
      contentDisplay = <Roles node={contest} action={subAction[1]} />;
      activeMenu = 'roles';
    } else if (subAction.length && subAction[0] === 'staff') {
      contentDisplay = (
        <div>
          <Staff node={contest} action={subAction[1] ? subAction[1] : ''} />
          {/*
          <div className="text-right">
            <ConfirmFinishTask
              ntype="contest"
              itemIid={contest.iid}
              className="m-l-10"
              field="task_list.examination_board"
              confirmed_status={
                contest &&
                contest.task_list &&
                contest.task_list.examination_board
              }
              title={
                contest &&
                contest.task_list &&
                contest.task_list.examination_board
                  ? t1('confirmed_finish_manage_examination_board')
                  : t1('confirm_finish_manage_examination_board')
              }
              textConfirm={t1(
                'are_you_sure_you_want_to_mark_done_manage_examination_board?',
              )}
            />
          </div>

             */}
        </div>
      );
      activeMenu = 'staff';
    }

    // else if (subAction.length && subAction[0] === 'abstract-roles') {
    //   contentDisplay = (
    //       <AbstractRoles {...props} action={subAction && subAction[0]} />
    //     );
    // }
    // console.log({props: this.pro})
    const navItems = [
      {
        id: 'info',
        active: activeMenu === 'information',
        label: t1('information'),
        link: routes.url('node_edit', {
          ...contest,
          step: 'information',
        }),
      },
      {
        id: 'roles',
        active: activeMenu === 'roles',
        label: t1('roles'),
        link: routes.url('node_edit', {
          ...contest,
          step: 'information/roles',
        }),
      },
      {
        id: 'staff',
        active: activeMenu === 'staff',
        label: t1('examination_board'),
        link: routes.url('node_edit', {
          ...contest,
          step: 'information/staff',
        }),
      },
    ];

    const extracontent = isHashbang
      ? {
          extraContent:
            subAction && subAction.length ? (
              subAction[0] === 'roles' ? (
                <DetailOnDialog
                  renderPreview={this.renderPreview}
                  renderFull={this.renderFull}
                />
              ) : subAction[0] === 'staff' ? (
                <ButtonNew
                  searchFormId={getSearchFormId(contest)}
                  node={contest}
                  ntype={'contest'}
                />
              ) : null
            ) : null,
        }
      : {};

    return (
      <div>
        <HorizontalNav
          items={navItems}
          content={contentDisplay}
          {...extracontent}
          key={contest && contest.iid}
        />
      </div>
    );
  }
}

export default ContestBasicInfoContainer;
