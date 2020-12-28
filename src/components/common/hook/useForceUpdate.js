import React from 'react';

/**
 * @return {Function} that you can call whenever you need to trigger component update
 */
const useForceUpdate = () => {
  const [_, update] = React.useState();

  return () => {
    update([]);
  };
};

export default useForceUpdate;
