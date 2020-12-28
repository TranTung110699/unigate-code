import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import {
  communicationMethods,
  notificationRequireActions,
} from 'configs/constants';
import Results from './Results';
import './stylesheet.scss';
import { formValueSelector } from 'redux-form';
import { t1 } from 'translate';

class NotificationsLayout extends Component {
  paginationProps = {
    onlyShowIfTotalBigEnough: true,
    theme: 'light',
  };

  renderResultsComponent = (items, props) => {
    return <Results {...props} items={items} />;
  };

  render() {
    const { userInfo, formid, notShowTitle } = this.props;

    return (
      <div>
        {!notShowTitle && (
          <div>
            <h2>{t1('notifications')}</h2>
            <hr />
          </div>
        )}
        <SearchWrapper
          formid={formid}
          hiddenFields={{
            user_iid: userInfo && userInfo.iid,
            type: communicationMethods.WEB,
            require_action: [notificationRequireActions.NO],
          }}
          alternativeApi="/notification/search"
          renderResultsComponent={this.renderResultsComponent}
          paginationProps={this.paginationProps}
          showSearchButton={false}
          showResult
        />
      </div>
    );
  }
}

NotificationsLayout.propTypes = {
  paginationProps: null,
};

const mapStateToProps = (state) => {
  const userInfo = state.user.info;
  const formid = `notifications-of-user-${userInfo && userInfo.iid}`;
  const selector = formValueSelector(formid);
  const { page, items_per_page } = selector(state, 'page', 'items_per_page');
  let results = [];
  const resultFromStore = state.searchResults[formid];

  if (resultFromStore && resultFromStore.result) {
    results = resultFromStore.result;
  }
  return {
    paginationProps: state.prop,
    userInfo: state.user.info,
    items: results,
    formid: formid,
    page: page,
    itemsPerPage: items_per_page,
  };
};

export default connect(mapStateToProps)(NotificationsLayout);
