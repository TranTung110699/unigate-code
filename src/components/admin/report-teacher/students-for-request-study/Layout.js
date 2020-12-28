import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import Card from 'components/admin/report-teacher/common/Card';

import { t2 } from 'translate';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';

import schema from './schema-form';
import Results from './Results';
import { menuItems } from '../menu/sub-left-menu-configs';

class Layout extends Component {
  renderResultsComponent = (items, props, objects, searchValues) => (
    <Results items={items} objects={objects} searchValues={searchValues} />
  );

  render() {
    return (
      <div>
        <SubLeftMenuContext schema={menuItems(this.props)} />
        <Card title={t2('students_for_request_study')}>
          <SearchWrapper
            schema={schema}
            formid="students_for_request_study"
            renderResultsComponent={this.renderResultsComponent}
            showSearchButton
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  conf: get(state, 'domainInfo.conf'),
});

export default connect(mapStateToProps)(Layout);
