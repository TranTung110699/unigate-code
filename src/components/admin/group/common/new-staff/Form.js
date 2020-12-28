import React from 'react';
import PropTypes from 'prop-types';
import NodeNew from 'components/admin/node/new';
import { categoryRelationTypes, relationTypes } from 'configs/constants';
import schema from 'components/admin/relation/schema/form';

class New extends React.PureComponent {
  render() {
    const { node, searchFormId, ntype } = this.props;
    const elementSearchProps = {
      _sand_step: 'staff',
      category_iid: node.iid,
    };

    return (
      <NodeNew
        ntype={'relation'}
        mode={'new'}
        step={`${node && node.type}_staff`}
        closeModal
        formid={`new_${node && node.type}_staff`}
        searchFormId={searchFormId}
        schema={schema}
        params={{
          sid: node.iid,
          object: 'user',
          subject: 'category',
          type: categoryRelationTypes.USER_GROUP,
          ntype,
          rt: relationTypes.STAFF_CATEGORY,
          roleAppliedTargetIid: node.iid,
          elementSearchProps,
        }}
      />
    );
  }
}

New.propTypes = {
  className: PropTypes.string,
};

New.defaultProps = {
  className: '',
};

export default New;
