import React, { Component } from 'react';
import { t1 } from 'translate/index';
import NodeNew from 'components/admin/node/new/index';
import userGroupSchema from 'components/admin/group/schema/form';
import lodashGet from 'lodash.get';
import { editGroupFiltersFormId } from 'components/admin/group/schema/elements/filterset/utils';
import PreviewAllFilters from './FiltersetsPreview';
import Card from 'antd/lib/card';

class Filtersets extends Component {
  render() {
    const { group } = this.props;
    const formid = editGroupFiltersFormId;

    let node = group;
    if (lodashGet(group, 'organizations')) {
      node = Object.assign({}, node, {
        organizationRootIids: lodashGet(group, 'organizations'),
        includeRootOrganizations: 1,
      });
    }

    return (
      <div className={'row'}>
        <div className="col-md-8">
          <NodeNew
            ntype={'group'}
            schema={userGroupSchema(
              group && group.type ? { type: group.type } : {},
            )}
            mode={'edit'}
            step={'filtersets'}
            alternativeApi={'/category/index/update'}
            node={node}
            formid={formid}
          />
        </div>
        <div className="col-md-4">
          <Card title={t1('group_filtersets_preview')}>
            <PreviewAllFilters formid={formid} />
          </Card>
        </div>
      </div>
    );
  }
}

export default Filtersets;
