import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'components/admin/report-teacher/common/Card';
import { createSelector } from 'reselect';

import { t2 } from 'translate';
import apiUrls from 'api-endpoints';
import sApiUrls from 'components/admin/survey/endpoints';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import { confSelector } from 'common/selectors';
import schema from './schema-form';

import Results from './Results';
import { menuItems } from '../menu/sub-left-menu-configs';

const formid = 'report_average_survey_result';

class Layout extends Component {
  renderResultsComponent = (result, props, objects, searchValues) => (
    <Results result={result} objects={objects} searchValues={searchValues} />
  );

  render() {
    const { conf } = this.props;
    return (
      <div>
        <SubLeftMenuContext schema={menuItems({ conf })} />
        <Card title={t2('report_average_survey_result')}>
          <SearchWrapper
            schema={schema}
            formid={formid}
            renderResultsComponent={this.renderResultsComponent}
            showSearchButton
            alternativeApi={sApiUrls.get_report_average_survey_result}
            showResult
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  confSelector,
  (conf) => ({
    conf,
  }),
);

export default connect(mapStateToProps)(Layout);
