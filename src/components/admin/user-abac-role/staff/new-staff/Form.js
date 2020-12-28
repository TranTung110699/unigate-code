/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import NodeNew from 'components/admin/node/new';
import schema from 'components/admin/relation/schema/form';

class New extends React.PureComponent {
  render() {
    const { node, searchFormId } = this.props;

    const elementSearchProps = {
      _sand_step: 'staff',
      item_iid: node.iid,
      type: node.ntype,
    };
    return (
      <NodeNew
        ntype={node && node.ntype}
        mode={'new'}
        step={'resource_staff'}
        closeModal
        formid={`new_${node && node.ntype}_staff`}
        searchFormId={searchFormId}
        schema={schema}
        alternativeApi="/user-abac-role/update"
        params={{
          sid: node.iid,
          roleAppliedTargetIid: node.iid,
          type: node.ntype,
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
