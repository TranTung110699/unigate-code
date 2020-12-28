import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'components/admin/report-teacher/common/Card';

import { t2 } from 'translate';
import apiUrls from 'api-endpoints';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';

import Results from './Results';
import schema from './schema-form';
import { menuItems } from '../menu/sub-left-menu-configs';
import get from 'lodash.get';

const formid = 'progress_master_by_academic_categorie';

class Layout extends Component {
  renderResultComponent = (items, props) => (
    <Results
      items={items}
      learningType={get(props, 'formValues.learning_type') || 'ilt'}
    />
  );

  render() {
    return (
      <div>
        <SubLeftMenuContext schema={menuItems(this.props)} />
        <Card title={t2('report_progress_master_by_academic_categorie')}>
          <SearchWrapper
            showResult
            formid={formid}
            schema={schema}
            showSearchButton
            renderResultsComponent={this.renderResultComponent}
            alternativeApi={apiUrls.get_progress_master_by_academic_categorie}
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
