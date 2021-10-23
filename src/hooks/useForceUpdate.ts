import { useState, useCallback } from 'react';

const useForceUpdate = () => {
  const [, updateState] = useState<{}>();
  return useCallback(() => updateState({}), []);
};

export default useForceUpdate;
