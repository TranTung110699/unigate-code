import React from 'react';
import PropTypes from 'prop-types';
import NodeNew from 'components/admin/node/new';
import user from 'components/admin/user/schema/form';

class EditTeacherBasicInfo extends React.Component {
  render() {
    const { className, teacher } = this.props;
    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <NodeNew
          ntype={'user'}
          schema={user}
          mode="edit"
          node={teacher}
          alternativeApi="/user/update"
          formid="edit_university_teacher"
          step="university_teacher"
        />
      </div>
    );
  }
}

EditTeacherBasicInfo.propTypes = {
  className: PropTypes.string,
  teacher: PropTypes.shape(),
};

EditTeacherBasicInfo.defaultProps = {
  className: '',
  teacher: null,
};

export default EditTeacherBasicInfo;
