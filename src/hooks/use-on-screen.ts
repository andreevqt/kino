import React, { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';

const useOnScreen = (ref: React.RefObject<HTMLDivElement>, offset = 0) => {
  const [isVisible, setIsVisible] = useState(false);
  const onScroll = throttle(() => {
    if (!ref.current) {
      setIsVisible(false);
      return;
    }
    const { top, height } = ref.current.getBoundingClientRect();
    setIsVisible(top + offset >= 0 && top + height - offset <= window.innerHeight);
  }, 100);

  useEffect(() => {
    document.addEventListener('scroll', onScroll, true);
    return () => document.removeEventListener('scroll', onScroll, true);
  });

  useEffect(() => {
    onScroll();
  }, []);

  return isVisible;
};

export default useOnScreen;
