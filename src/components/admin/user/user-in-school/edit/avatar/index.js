import React, { Component } from 'react';
import { t1 } from 'translate';
import { Link } from 'react-router-dom';
import { getUrl } from 'routes/links/common';
import Avatar from 'antd/lib/avatar';

import noavatar from './noavatar.png';

class UserAvatar extends Component {
  render() {
    const { user, roleUser } = this.props;

    const img = user.avatar ? (
      <Avatar src={user.avatar} size={200} />
    ) : (
      <div>
        <img
          src={noavatar}
          title={
            roleUser === 'user'
              ? t1('no_user_avatar._click_to_update')
              : t1('no_user_avatar')
          }
          style={{ maxHeight: '200px', maxWidth: '100%' }}
          alt={user.name}
        />
      </div>
    );

    // const editAvatarLink = `#!/admin/user/${user.iid}/avatar`;
    const editAvatarLink = getUrl('node_edit', {
      ...user,
      ntype: roleUser,
      step: 'avatar',
      dialog: 1,
    });
    // const editAvatarLink = `/admin/user/${user.iid}/avatar`;

    if (roleUser === 'user')
      return (
        <Link to={editAvatarLink} title={t1('click_to_edit_avatar')}>
          {img}
        </Link>
      );
    else return <div className="text-center">{img}</div>;
  }
}

export default UserAvatar;
