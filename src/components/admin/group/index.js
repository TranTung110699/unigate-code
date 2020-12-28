import React from 'react';
import { connect } from 'react-redux';

import {
  categoryRelationTypes,
  categoryTypeMapping,
  userGroupSubTypes,
} from 'configs/constants';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';

import SearchLayout from './search';
import topMenuSchema from './menu/MainstageTopMenu';
import { t1 } from 'translate';

class CategoryLayout extends React.PureComponent {
  render() {
    const type = 'user_group',
      formid = `category-${type}`;
    const hiddenFields = {
      _sand_step: 'user_group',
      _sand_expand: ['organizations'],
    };

    if (Object.values(categoryRelationTypes).includes(type)) {
      hiddenFields.type = [type];
    }

    if (hiddenFields._sand_step === 'user_group' && type === 'user_group') {
      hiddenFields.sub_type = [userGroupSubTypes.NORMAL_USER_GROUP];
    }

    const node = {
      ...hiddenFields,
      type,
      formid,
    };

    return (
      <div>
        <SubTopMenuContext
          type={type}
          schema={topMenuSchema()}
          lastBreadcrumbName={t1('group')}
          description={t1('group_search_description')}
        />
        <SearchLayout
          formid={formid}
          type={type}
          hiddenFields={hiddenFields}
          showList
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const groupType =
    props && props.match && props.match.params && props.match.params.groupType;
  const type = categoryTypeMapping[groupType];
  return {
    type,
    formid: `category-${type}`,
  };
};

export default connect(mapStateToProps)(CategoryLayout);
