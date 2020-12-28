import React from 'react';
import { t1 } from 'translate';
import selectedUsersModes from '../../action-buttons/configs';
import OneFiltersetPreview from '../../../filterset/OneFiltersetPreview';

const userListStyle = {
  maxHeight: '200px',
  height: '200px',
  overflowY: 'scroll',
};

class UsersListPreview extends React.Component {
  render() {
    const {
      selectedUsersMode,
      users,
      mode,
      filterset,
      formid,
      total,
    } = this.props;

    const totalUsers =
      selectedUsersMode === selectedUsersModes.PERFORM_ALL_MATCHING_RESULTS
        ? total
        : users.length;

    return (
      <div className="elementGroup">
        <b>{t1('%d_users_matching', [totalUsers])}</b>

        <div style={users.length > 10 ? userListStyle : null}>
          {(selectedUsersMode ===
            selectedUsersModes.PERFORM_ON_MULTIPLE_SELECTED_MEMBERS ||
            selectedUsersMode === selectedUsersModes.PERFORM_ON_ONE_USER) && (
            <ul>
              {users.map((user, i) => (
                <li key={user.iid}>
                  {user.name} {user.code && `(${user.code})`}
                </li>
              ))}
            </ul>
          )}
          {selectedUsersMode ===
            selectedUsersModes.PERFORM_ALL_MATCHING_RESULTS && (
            <div>
              <p>
                {mode === 'add'
                  ? t1(
                      'you_are_adding_all_users_matching_the_following_conditions_to_the_group',
                    )
                  : t1(
                      'you_are_removing_all_users_matching_the_following_conditions_from_the_group',
                    )}
              </p>
              <OneFiltersetPreview filterset={filterset} formid={formid} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default UsersListPreview;
