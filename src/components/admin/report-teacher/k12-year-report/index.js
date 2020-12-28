import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import Card from 'components/admin/report-teacher/common/Card';

import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import { menuItems } from '../menu/sub-left-menu-configs';
import ReportInGroup from 'components/admin/group/edit/year-report/index';

class Layout extends Component {
  renderResultComponent = (items) => <div>afsdf</div>;

  render() {
    return (
      <div>
        <SubLeftMenuContext schema={menuItems(this.props)} />
        <Card title={'school_year_report'}>
          <ReportInGroup />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  conf: get(state, 'domainInfo.conf'),
  reportType: get(props, 'match.params.report_type'),
});

export default connect(mapStateToProps)(Layout);
