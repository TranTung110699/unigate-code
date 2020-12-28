import React from 'react';
import Menu from 'antd/lib/menu';
import fetchData from 'components/common/fetchData';
import Loading from 'components/common/loading';
import RaisedButton from 'components/common/mui/RaisedButton';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';
import PreviewUser from 'components/admin/user/account/common/PreviewUser';

const ResolveConflictUsersMapping = ({
  users = [],
  handleSelectedUserToResolvedConflict = () => {},
}) => {
  let [userHover, setUserHover] = React.useState(null);
  let [userSelected, setUserSelected] = React.useState(null);

  userSelected = userHover || userSelected;

  if (!Array.isArray(users) || !users.length) {
    return <Loading />;
  }

  return (
    <div>
      <div className="col-md-4">
        <Menu mode="inline">
          {users.map((user) => (
            <Menu.Item
              onMouseEnter={() => setUserHover(user)}
              onMouseLeave={() => setUserHover(null)}
              onClick={() => setUserSelected(user)}
            >
              {user.name || user.id}
            </Menu.Item>
          ))}
        </Menu>
      </div>
      <div className="col-md-8">
        {userSelected && (
          <PreviewUser
            user={userSelected}
            actions={
              <RaisedButton
                style={{
                  color: '#ffffff',
                }}
                className="m-l-10 m-r-10"
                icon={<Icon icon="ok" />}
                label={t1('comfirm_this_user')}
                onClick={() =>
                  handleSelectedUserToResolvedConflict(userSelected)
                }
                primary
              />
            }
          />
        )}
      </div>
    </div>
  );
};

const getParamsToQuery = (user_temp_id, valuesToCompare = {}) => {
  return { ...valuesToCompare, user_temp_id };
};

export default fetchData(({ user_id, valuesToCompare = {} }) => ({
  baseUrl: '/user/data/get-users-matching-the-user-temp',
  params: getParamsToQuery(user_id, valuesToCompare),
  propKey: 'users',
  fetchCondition: true,
}))(ResolveConflictUsersMapping);
