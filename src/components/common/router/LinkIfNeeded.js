import React from 'react';
import Link from 'components/common/router/Link';

const LinkIfNeeded = ({ noLink, ...rest }) =>
  noLink ? <span {...rest} /> : <Link {...rest} />;

export default LinkIfNeeded;
