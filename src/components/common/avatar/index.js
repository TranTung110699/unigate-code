import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'antd/lib/avatar';
import { initials } from 'common/utils/string';
import lodashGet from 'lodash.get';

const loadImage = (url, callback) => {
  const img = new Image();
  img.onload = () => callback(true);
  img.onerror = () => callback(false);
  img.src = url;
};

const AvatarImage = ({ user, size, style, className, title, alt, shape }) => {
  const [avatarSrc, setAvatarSrc] = React.useState(false);

  // if the image is loadable, this will be used as the avatar src
  const mayBeAvatarSrc = lodashGet(user, 'avatar');

  React.useEffect(
    () => {
      if (mayBeAvatarSrc) {
        loadImage(mayBeAvatarSrc, (success) => {
          if (success) {
            setAvatarSrc(mayBeAvatarSrc);
          } else {
            setAvatarSrc(null);
          }
        });
      }
    },
    [mayBeAvatarSrc],
  );

  style = Object.assign({}, style, {
    verticalAlign: 'middle',
  });

  const renderProps = { size, className, title, alt, style, shape };

  if (!user || !user.name) {
    return <Avatar {...renderProps} icon="user" />;
  }

  if (avatarSrc && mayBeAvatarSrc) {
    return <Avatar title={user.name} {...renderProps} src={avatarSrc} />;
  }

  return (
    <Avatar title={user.name} {...renderProps}>
      {initials(user.name)}
    </Avatar>
  );
};

AvatarImage.propTypes = {
  user: PropTypes.shape(),
};

AvatarImage.defaultProps = {
  user: null,
};

export default AvatarImage;
