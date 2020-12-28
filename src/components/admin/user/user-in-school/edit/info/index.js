import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getThemeConfig } from 'utils/selectors';
import NodeNew from 'components/admin/node/new';
import userSchema from 'components/admin/user/schema/form';
import Widget from 'components/common/Widget';

class EditUserInfo extends React.Component {
  // onHandleWhenSuccessful = () => {
  //   const { themeConfig, history, roleUser } = this.props;
  //   if (themeConfig.layout === layouts.SEABANK) {
  //     if (roleUser === 'teacher') {
  //       history.push(getUrl('school/teachers'));
  //     } else if (roleUser === 'student') {
  //       history.push(getUrl('school/users'));
  //     }
  //   }
  // };

  render() {
    const { className, user, step, roleUser } = this.props;

    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <Widget className="m-b-10">
          <NodeNew
            roleUser={roleUser}
            ntype={'user'}
            schema={userSchema}
            mode="edit"
            node={{ ...user, code: user.lname, name: user.name || user.lname }}
            alternativeApi="/user/update"
            formid={`edit_${
              roleUser === 'parent'
                ? 'parent'
                : roleUser === 'teacher'
                ? 'staff'
                : 'basic_information'
            }`}
            step={
              roleUser === 'parent'
                ? 'parent'
                : roleUser === 'teacher'
                ? 'staff'
                : 'basic_information'
            }
          />
        </Widget>
      </div>
    );
  }
}

EditUserInfo.propTypes = {
  className: PropTypes.string,
  user: PropTypes.shape(),
  themeConfig: PropTypes.arrayOf(),
};

EditUserInfo.defaultProps = {
  className: '',
  user: null,
  themeConfig: [],
};

const mapStateToProp = (state) => ({
  themeConfig: getThemeConfig(state),
});

export default withRouter(connect(mapStateToProp)(EditUserInfo));
