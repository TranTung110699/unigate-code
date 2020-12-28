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
    const { activeClasses } = this.props;

    const hiddenFields = {
      active_classes: activeClasses,
    };

    const currentClassesTitle = activeClasses
      ? t1('active_classes')
      : t1('inactive_classes');

    return (
      <div>
        <h1>{currentClassesTitle}</h1>
        <SearchWrapper
          formid="get_current_classes"
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
