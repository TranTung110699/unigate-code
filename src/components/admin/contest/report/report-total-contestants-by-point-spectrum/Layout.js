import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import Card from 'components/admin/report-teacher/common/Card';

import { t2 } from 'translate';
import contestApiUrls from 'components/admin/contest/endpoints';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';

import schema from './schema-form';
import Results from './Results';
import './stylesheet.scss';

class PointSpectrumLayout extends Component {
  renderResultComponent = (items) => <Results items={items} />;

  render() {
    const { node, conf } = this.props;

    const hiddenFields = {
      contest_iid: node && node.iid,
    };

    return (
      <div className="report-total-contestants-by-point-spectrum-layout">
        <Card title={t2('report_total_contestants_by_point_spectrum')}>
          <SearchWrapper
            formid="report-total-contestants-by-point-spectrum"
            renderResultsComponent={this.renderResultComponent}
            showSearchButton
            schema={schema}
            hiddenFields={hiddenFields}
            alternativeApi={contestApiUrls.report_total_contestants_by_point}
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  conf: get(state, 'domainInfo.conf'),
});

export default connect(mapStateToProps)(PointSpectrumLayout);
