import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import Card from 'components/admin/report-teacher/common/Card';

import { t2 } from 'translate';
import contestApiUrls from 'components/admin/contest/endpoints';
import { userOrgIids } from 'common/selectors';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import Loading from 'components/common/loading';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';

import Results from './Results';
import schema from './schema-form';
import { menuItems } from '../menu/sub-left-menu-configs';

class Layout extends Component {
  renderResultComponent = (items) => (
    <Results
      items={items.items}
      topEquivalentPositions={items.topEquivalentPositions}
    />
  );

  render() {
    const { orgIids } = this.props;

    if (!orgIids) {
      return <Loading />;
    }

    const hiddenFields = {
      orgIids,
    };

    return (
      <div>
        <SubLeftMenuContext schema={menuItems(this.props)} />
        <Card title={t2('report_contest_result')}>
          <SearchWrapper
            formid="report_contest_result"
            renderResultsComponent={this.renderResultComponent}
            showSearchButton
            schema={schema}
            alternativeApi={contestApiUrls.get_report_contest_result}
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
