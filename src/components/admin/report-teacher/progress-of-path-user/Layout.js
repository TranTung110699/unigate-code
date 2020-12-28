import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import Card from 'components/admin/report-teacher/common/Card';

import { t1, t2 } from 'translate';
import apiUrls from 'api-endpoints';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';

import FormFilters from './FormFilters';
import Results from './Results';
import { menuItems } from '../menu/sub-left-menu-configs';

class Layout extends Component {
  renderResultComponent = (items, props, objects, searchValues) => (
    <Results items={items} searchValues={searchValues} />
  );

  prepareDataBeforeSearch = (values) => {
    let newValues = values;
    if (Array.isArray(newValues.path_iid) && newValues.path_iid.length > 0) {
      newValues = {
        ...newValues,
        path_iid: newValues.path_iid[0],
      };
    }
    return newValues;
  };

  validate = (values) => {
    const { from, to } = values;
    let errors = {};
    if (to - from <= 0) {
      errors = {
        ...errors,
        to: t1('to_cannot_be_after_from'),
        from: t1('from_cannot_be_before_to'),
      };
    }
    return errors;
  };

  initialValues = {
    from: Math.floor(new Date().getTime() / 1000 - 29 * 86400),
    to: Math.floor(new Date().getTime() / 1000),
  };

  render() {
    return (
      <div>
        <SubLeftMenuContext schema={menuItems(this.props)} />
        <Card title={t2('progress_of_path_user')}>
          <SearchWrapper
            formid="progress_of_path_user"
            renderResultsComponent={this.renderResultComponent}
            showSearchButton={false}
            alternativeApi={apiUrls.progress_of_path_user}
            prepareDataBeforeSearch={this.prepareDataBeforeSearch}
            validate={this.validate}
            initialValues={this.initialValues}
          >
            <FormFilters id="progress_of_path_user" />
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
