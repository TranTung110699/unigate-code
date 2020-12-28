import React from 'react';
import PropTypes from 'prop-types';
import NodeNew from 'components/admin/node/new';
import userGroupSchema from 'components/admin/group/schema/form';

class GroupInfoEdit extends React.Component {
  render() {
    const { className, group } = this.props;
    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <NodeNew
          ntype="group"
          mode="edit"
          step="user_group_info"
          alternativeApi="group/api/update"
          schema={userGroupSchema(
            group && group.type ? { type: group.type } : {},
          )}
          node={group}
          formid="edit_group"
        />
      </div>
    );
  }
}

GroupInfoEdit.propTypes = {
  className: PropTypes.string,
  group: PropTypes.shape(),
};

GroupInfoEdit.defaultProps = {
  className: '',
  group: null,
};

export default GroupInfoEdit;
