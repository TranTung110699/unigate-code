import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import Card from 'components/admin/report-teacher/common/Card';

import { t2 } from 'translate';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';

import Results from './Results';
import FormFilters from './FormFilters';
import { menuItems } from '../menu/sub-left-menu-configs';

class Layout extends Component {
  renderResultComponent = (items, props) => (
    <Results items={items} {...props} />
  );

  render() {
    const { mode } = this.props;
    const hiddenFields = {
      ntype: 'teaching_hours',
    };

    let formid = 'teachers_by_faculty_search';
    if (mode && mode === 'credit') {
      formid = 'teachers_by_credit_search';
    }

    return (
      <div>
        <SubLeftMenuContext schema={menuItems(this.props)} />
        <Card title={t2(formid)}>
          <SearchWrapper
            formid={formid}
            hiddenFields={hiddenFields}
            renderResultsComponent={this.renderResultComponent}
            showSearchButton={false}
          >
            <FormFilters id={formid} {...this.props} />
          </SearchWrapper>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  conf: get(state, 'domainInfo.conf'),
});

export default connect(mapStateToProps)(Layout);
