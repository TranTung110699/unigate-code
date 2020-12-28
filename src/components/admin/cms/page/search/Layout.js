import React, { Component } from 'react';

import { t1 } from 'translate';
import { constants } from 'configs/constants';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';

import Results from './Results';
import topMenuSchema from '../menu/MainstageTopMenu';
import schema from './schema';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <Results items={items} {...props} />;
  }

  render() {
    const { hiddenFields } = this.props;
    const localHiddenFields = hiddenFields
      ? Object.assign(hiddenFields, { ntype: 'page' })
      : { ntype: 'page' };
    const statuses = {
      name: 'status',
      options: constants.StatusOptions(),
      label: t1('status_search'),
    };
    const blogTypes = {
      name: 'blogTypes',
      options: constants.BlogTypeOptions(),
      label: t1('blog_type_search'),
    };
    const isFeatured = {
      name: 'isFeatured',
      options: constants.IsFeaturedOptions(),
      label: t1('is_featured'),
    };

    return (
      <div>
        <SubTopMenuContext
          schema={topMenuSchema()}
          lastBreadcrumbName={t1('page')}
          description={t1('page_description')}
        />
        <SearchWrapper
          formid="page_search"
          hiddenFields={localHiddenFields}
          renderResultsComponent={this.renderResultComponent}
          showSearchButton
          schema={schema}
          statuses={statuses}
          blogTypes={blogTypes}
          isFeatured={isFeatured}
        />
      </div>
    );
  }
}

export default Layout;
