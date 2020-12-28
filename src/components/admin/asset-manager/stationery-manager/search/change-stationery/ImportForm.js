import React, { Component } from 'react';
import { t2 } from 'translate';
import NodeNew from 'components/admin/node/new';
import apiUrls from 'api-endpoints';
import assetApiUrls from 'components/admin/asset-manager/endpoints';
import schema from 'components/admin/asset-manager/stationery-manager/schema/import-form';
import fetchData from 'components/common/fetchData';
import Loading from 'components/common/loading';
import get from 'lodash.get';

class Form extends Component {
  render() {
    let {
      mode,
      step,
      node,
      params,
      stationeries,
      loadingStatus,
      alternativeApi,
    } = this.props;
    const title = this.props.title || t2('import_stationery');
    const formid = this.props.formid || 'import_stationery';

    if (!node) {
      node = {
        stationery_list: Array.isArray(stationeries) ? stationeries : [],
      };
    }

    return loadingStatus !== 'finished' ? (
      <Loading />
    ) : (
      <div>
        <NodeNew
          title={title}
          ntype={'stationery'}
          schema={schema}
          alternativeApi={alternativeApi}
          node={node}
          mode={mode}
          params={{
            ...params,
            step,
            stationeries,
          }}
          closeModal
          searchFormId="stationery_search_import_items"
          formid={formid}
        />
      </div>
    );
  }
}

const fetchDataConfig = (props) => ({
  baseUrl: assetApiUrls.stationery_asset_search,
  fetchCondition: true,
  params: {
    ntype: 'stationery',
    mode: props.mode,
    stationery_iid: get(props.node, 'iid'),
  },
  propKey: 'stationeries',
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
});

export default fetchData(fetchDataConfig)(Form);
