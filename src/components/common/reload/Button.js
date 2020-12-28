import React from 'react';
import Button from 'antd/lib/button';

const ReloadButton = ({ renderButton }) => {
  const renderDefaultButton = React.useCallback(
    ({ onClick }) => <Button icon="reload" onClick={onClick} />,
    [],
  );

  if (!renderButton) {
    renderButton = renderDefaultButton;
  }

  const handleClick = React.useCallback(() => {
    window.location.reload();
  }, []);

  return renderButton({ onClick: handleClick });
};

export default ReloadButton;
