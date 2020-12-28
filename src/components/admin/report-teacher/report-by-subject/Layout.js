import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import Card from 'components/admin/report-teacher/common/Card';

import { t2 } from 'translate';
import apiUrls from 'api-endpoints';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import { schoolTypes } from 'configs/constants';
import EnterpriseResults from './Results';
import SISResults from './ums/Results';
import enterpriseSchema from './schema-form';
import sisSchema from './ums/schema-form';
import { menuItems } from '../menu/sub-left-menu-configs';
import { getThemeConfig } from 'utils/selectors';
import SubMenuTopContext from '../../../../common/context/menu/SubMenuTopDispatcher';

const url = apiUrls.get_report_by_subject;

const renderSISResultComponent = (items, _props, _objects, page) => {
  return <SISResults items={items} page={page} />;
};

const SISReport = (props) => {
  return (
    <SearchWrapper
      formid="report_by_subject"
      renderResultsComponent={renderSISResultComponent}
      showSearchButton
      schema={sisSchema}
      alternativeApi={url}
    />
  );
};

const renderEnterpriseResultComponent = (items) => {
  return (
    <EnterpriseResults
      items={items && items.items}
      keys={items.keys}
      displayTexts={items.displayTexts}
    />
  );
};

const EnterpriseReport = (props) => {
  return (
    <SearchWrapper
      formid="report_by_subject"
      renderResultsComponent={renderEnterpriseResultComponent}
      showSearchButton
      schema={enterpriseSchema}
      alternativeApi={url}
    />
  );
};

const Layout = (props) => {
  const { isSis } = props;

  return (
    <div>
      <Card title={t2('report_by_subject')}>
        <SubMenuTopContext isHidden />
        <SubLeftMenuContext schema={menuItems(props)} />
        {isSis ? <SISReport {...props} /> : <EnterpriseReport {...props} />}
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  conf: get(state, 'domainInfo.conf'),
  isSis: get(getThemeConfig(state), 'type') === schoolTypes.SIS,
});

export default connect(mapStateToProps)(Layout);
