import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Full from './full';
import Preview from './preview';
import './stylesheet.scss';

const HelpCreditSyllabus = () => {
  return (
    <div>
      {t1(
        'only_teachers_who_have_contracts_teaching_this_subject_can_appear_here',
      )}
      .
      <a href="/admin/school/teachers" target="_blank">
        {t1('manage_staff')}
      </a>
    </div>
  );
};

class UsersAvatarList extends React.Component {
  cssClass = 'uses-avatar-list';

  render() {
    const { className, previewNumber, mode } = this.props;
    let users = this.props.users || [];
    users = users.filter((user) => !!(user.iid || user.id));

    if (users.length === 0) {
      return null;
    }

    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <DetailOnDialog
          dialogKey="users-avatar-list"
          renderPreview={({ showFull }) => (
            <Preview
              users={users}
              onClick={showFull}
              previewNumber={previewNumber}
            />
          )}
          renderFull={() => (
            <div>
              {mode === 'previewCreditSyllabus' && <HelpCreditSyllabus />}
              <Full users={users} mode={mode} />
            </div>
          )}
        />
      </div>
    );
  }
}

UsersAvatarList.propTypes = {
  className: PropTypes.string,
  previewNumber: PropTypes.number,
  users: PropTypes.arrayOf(PropTypes.shape()),
};

UsersAvatarList.defaultProps = {
  className: '',
  previewNumber: 3,
  users: [],
};

export default UsersAvatarList;
