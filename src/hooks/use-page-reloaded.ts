import { useEffect, useState } from 'react';

const usePageReloaded = () => {
  const [isReloaded, setReloaded] = useState(false);

  useEffect(() => {
    // @ts-ignore
    setReloaded(performance.getEntriesByType('navigation')[0].type === 'reload');
  });

  return isReloaded;
};

export default usePageReloaded;
