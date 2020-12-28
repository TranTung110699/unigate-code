import React from 'react';
import { connect } from 'react-redux';

import { abacRoleTypes } from 'configs/constants';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import Search from 'components/admin/abac-role/concrete-role/search';
import { getSearchFormId } from 'components/admin/school-role/common/utils';

import topMenuSchema from '../menu/teacher-menus';

class Layout extends React.Component {
  render() {
    const { node, location } = this.props;

    if (!node) {
      return null;
    }

    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <Search
          step={'school'}
          type={abacRoleTypes.SCHOOL}
          formid={getSearchFormId(node)}
          node={node}
          location={location}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const node = state.domainInfo && state.domainInfo.school;

  return {
    node,
  };
};

export default connect(mapStateToProps)(Layout);
