import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import NodeNew from 'components/admin/node/new';
import Loading from 'components/common/loading';
import { loadingStatuses } from 'configs/constants';
import { Redirect, withRouter } from 'react-router';
import { getRootUrl } from 'routes/links/common';
import userSchema from 'components/admin/user/schema/form';
import SubmitButton from './submitButton';
import './stylesheet.scss';
import userLinks from 'routes/links/user';

class ProfileLayout extends Component {
  render() {
    const { user, actionsToDoOnSuccess, loadingStatus, rootUrl } = this.props;
    if (!user) return null;
    user.settings__language =
      user.settings && user.settings.language ? user.settings.language : '';
    user.settings__session_reminder =
      user.settings && user.settings.session_reminder
        ? user.settings.session_reminder
        : '';

    const styleForMobile = {
      wrapper: {
        padding: 0,
        margin: 0,
        overflowY: 'scroll',
      },
      container: {
        top: '-47px',
        position: 'relative',
        margin: 0,
        paddingTop: 0,
        paddingLeft: 16,
        paddingRight: 16,
      },
    };

    if (window.isETEP) {
      return <Redirect to={userLinks.dashboard} />;
    }

    return (
      <div
        className="user-profile-wrapper"
        style={rootUrl === 'mobile' ? styleForMobile.wrapper : {}}
      >
        <div style={rootUrl === 'mobile' ? styleForMobile.container : {}}>
          {rootUrl !== 'mobile' && (
            <div className="col-md-12">
              <h3 className="uppercase">
                {t1(this.props.step || 'profile')} #{user.iid}
              </h3>
            </div>
          )}
          {rootUrl !== 'mobile' &&
            loadingStatus &&
            loadingStatus === loadingStatuses.LOADING && (
              <Loading blackLoadingIcon />
            )}
          {(!loadingStatus || loadingStatus === loadingStatuses.FINISHED) && (
            <NodeNew
              hiddenFields={this.props.hiddenFields}
              formid={`edit_${this.props.step || 'profile'}`}
              ntype="user"
              schema={userSchema}
              mode="edit"
              step={this.props.step || 'profile'}
              node={user}
              submitButton={<SubmitButton />}
              actionsToDoOnSuccess={actionsToDoOnSuccess}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  loadingStatus:
    state.loading && state.loading.status ? state.loading.status : null,
  rootUrl: getRootUrl(props),
});

export default withRouter(connect(mapStateToProps)(ProfileLayout));
