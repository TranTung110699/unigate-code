import React from 'react';
import PropTypes from 'prop-types';
import lodashGet from 'lodash.get';
import SearchMembers from 'components/admin/enrolment-plan/mainstage/members/search';
import MembersByOrganization from './members-by-organization';
import HorizontalNav from 'layouts/admin_v2/horizontal-nav/index-v2';
import routes from 'routes';
import { t1 } from 'translate';

class Members extends React.PureComponent {
  columnsNotToShow = [
    ...(window.isETEP
      ? [
          'academic_categories',
          'job_position',
          'from_to_date',
          'location',
          'cp',
          'p',
          'oe_question',
        ]
      : []),
  ];

  render() {
    const { className, node, action, subAction } = this.props;

    // const componentClassName = `${className || ''}`;
    //
    // const hiddenFields = {
    //   usersOverallProgress: 1,
    // };

    // {
    //   url: routes.url('node_edit', {
    //     ntype: 'training_plan',
    //     iid: lodashGet(node, 'iid'),
    //     step: 'members',
    //   }),
    //     title: t1('training_plan_members'),
    //   icon: {
    //   position: 'left',
    //     type: 'team',
    // },
    // },
    // {
    //   url: routes.url('node_edit', {
    //     ntype: 'training_plan',
    //     iid: lodashGet(node, 'iid'),
    //     step: 'users-by-organization',
    //   }),
    //   title: t1('training_plan_members_by_organization'),
    //   icon: {
    //     position: 'left',
    //     type: 'cluster',
    //   },
    // },

    const navItems = [
      {
        id: 'members',
        active: !subAction,
        label: t1('members'),
        link: routes.url('node_edit', {
          ntype: 'training_plan',
          iid: lodashGet(node, 'iid'),
          step: 'members',
        }),
      },
      {
        id: 'members-by-organizations',
        active: subAction,
        label: t1('training_plan_members_by_organization'),
        link: routes.url('node_edit', {
          ntype: 'training_plan',
          iid: lodashGet(node, 'iid'),
          step: 'members/users-by-organization',
        }),
      },
    ];

    let content;
    if (subAction) content = <MembersByOrganization node={node} />;
    else {
      content = (
        <SearchMembers
          trainingPlan={node}
          displayRowCheckboxOnTheRightSide
          columnsNotToShow={this.columnsNotToShow}
        />
      );
    }

    return (
      <div>
        <HorizontalNav
          items={navItems}
          content={content}
          key={node && node.iid}
        />
      </div>
    );
  }
}

Members.propTypes = {
  className: PropTypes.string,
};

Members.defaultProps = {
  className: '',
};

export default Members;
