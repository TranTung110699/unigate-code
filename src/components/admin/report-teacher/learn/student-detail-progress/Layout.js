import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import Card from 'components/admin/report-teacher/common/Card';

import { t2 } from 'translate/index';
import apiUrls from 'api-endpoints/index';
import { userOrgIids } from 'common/selectors/index';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import Loading from 'components/common/loading/index';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';

import Results from './Results';
import schema from './schema';
import { menuItems } from '../../menu/sub-left-menu-configs';

class Layout extends Component {
  renderResultComponent = (items) => <Results items={items} />;

  render() {
    const { orgIids, mode } = this.props;

    if (!orgIids) {
      return <Loading />;
    }

    const hiddenFields = {
      orgIids,
    };

    const theSchema = mode == 'frontend' ? schema('frontend') : schema();

    if (mode === 'frontend')
      return (
        <SearchWrapper
          formid="student_detail_progress"
          renderResultsComponent={this.renderResultComponent}
          showSearchButton
          schema={theSchema}
          alternativeApi={apiUrls.get_student_detail_progress}
          hiddenFields={hiddenFields}
        />
      );

    return (
      <div>
        <SubLeftMenuContext schema={menuItems(this.props)} />
        <Card title={t2('student_detail_progress')}>
          xxxx
          <SearchWrapper
            formid="student_detail_progress"
            renderResultsComponent={this.renderResultComponent}
            showSearchButton
            schema={theSchema}
            alternativeApi={apiUrls.get_student_detail_progress}
            hiddenFields={hiddenFields}
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  conf: get(state, 'domainInfo.conf'),
  orgIids: userOrgIids(state),
});

export default connect(mapStateToProps)(Layout);
