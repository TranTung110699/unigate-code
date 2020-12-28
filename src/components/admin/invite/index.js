/**
 * Created by hungvo on 19/04/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { t1 } from 'translate';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';

import InvitedSearch from './search/Layout';
import InviteDashboard from './dashboard';
import FormNewInvite from './new/FormNewInvite';
import EnrolmentSessionSearch from './enrolment-session';
import { menuItems as leftMenuSchema } from './menu/sub-left-menu-configs';

class Layout extends Component {
  getContent(action) {
    switch (action) {
      case 'new': {
        return (
          <div>
            <h1>{t1('create_a_new_enrolment')}</h1>
            <FormNewInvite />
          </div>
        );
      }
      case 'invited': {
        return <InvitedSearch />;
      }
      case 'plan': {
        return <EnrolmentSessionSearch />;
      }
      case 'dashboard':
      default: {
        return <InviteDashboard />;
      }
    }
  }

  render() {
    const { action } = this.props;

    return (
      <div>
        <SubLeftMenuContext schema={leftMenuSchema()} />
        {this.getContent(action)}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const {
    match: {
      params: { action },
    },
  } = props;
  return {
    action,
  };
};

export default connect(mapStateToProps)(Layout);
