import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import { t1 } from 'translate';

import Results from './Results';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <Results items={items} {...props} />;
  }

  render() {
    const { attendingUsers } = this.props;

    const hiddenFields = {
      attending_users: attendingUsers,
    };

    const currentUsersTitle = attendingUsers
      ? t1('attending_users')
      : t1('not_attending_users');

    return (
      <div>
        <h1>{currentUsersTitle}</h1>
        <SearchWrapper
          formid="get_current_users"
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
          showQueryField={false}
          showSearchButton={false}
        />
      </div>
    );
  }
}

export default Layout;
