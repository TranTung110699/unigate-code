import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import GlobalDialog from 'components/common/modal/GlobalDialog';
import { HashRouter, Switch, withRouter } from 'react-router-dom';
import hashRoutes from 'routes/admin/hashroutes';
// import { hashType as hashTypeText } from 'configs/constants';
import SubMenuLeft from 'layouts/admin_v2/sub-menu-left';
import HashbangContext from './hashbang-context';
import withFeatureFlags from 'feature-flag/withFeatureFlags';

const antDialogOptionsProperties = {
  handleClose: true,
  modal: false,
  className: 'hashbang-dialog-ant',
  autoDetectWindowHeight: false,
  closeButtonType: 'button',
  width: 'calc(100% - 110px)',
};

class HashDialog extends Component {
  renderFull = () => {
    return (
      <HashbangContext.Provider value={1}>
        <div className="ui-admin-layout ui-admin-layout-dialog">
          {/*
          <HashRouter hashType="hashbang">
            <SubMenuTop isHashbang={1} />
          </HashRouter>
             */}

          <HashRouter hashType="hashbang">
            <SubMenuLeft isHashbang={1} />
          </HashRouter>

          <div className="m-t-20">
            <HashRouter hashType="hashbang">
              <Switch>{renderRoutes(hashRoutes())}</Switch>
            </HashRouter>
          </div>
        </div>
      </HashbangContext.Provider>
    );
  };

  renderSmallDialog = () => {
    return (
      <HashbangContext.Provider value={1}>
        <div className="ui-admin-layout ui-admin-layout-dialog">
          <div className="m-t-20">
            <HashRouter hashType="hashbang">
              <SubMenuLeft isHashbang={1} />
            </HashRouter>

            <HashRouter hashType="hashbang">
              <Switch>{renderRoutes(hashRoutes('small'))}</Switch>
            </HashRouter>
          </div>
        </div>
      </HashbangContext.Provider>
    );
  };

  render() {
    // return null;
    const { isFeatureEnabled } = this.props;

    return (
      <React.Fragment>
        <GlobalDialog
          open={
            this.props.location.hash &&
            this.props.location.hash != '#' &&
            this.props.location.hash != '#/' &&
            !this.props.location.hash.includes('#!/small')
          }
          {...this.props}
          dialogOptionsProperties={Object.assign(
            {},
            antDialogOptionsProperties,
            {
              callbacks: {
                onCloseDialog: () =>
                  this.props.history.push(this.props.location.pathname),
              },
            },
          )}
          renderFull={this.renderFull}
          dialogKey={'GlobalHashDialog'}
        />

        <GlobalDialog
          open={
            this.props.location.hash &&
            this.props.location.hash != '#' &&
            this.props.location.hash != '#/' &&
            this.props.location.hash.includes('#!/small')
          }
          onClose={() => this.props.history.push(this.props.location.pathname)}
          {...this.props}
          renderFull={this.renderSmallDialog}
          dialogKey={'GlobalHashDialogSmall'}
        />
      </React.Fragment>
    );
  }
}

export default withFeatureFlags()(withRouter(HashDialog));
