import React, { useRef, useEffect } from 'react';
import { useOnScreen } from '../../hooks';

type TAppearBoxProps = {
  onAppearence: () => void;
};

const AppearBox: React.FC<TAppearBoxProps> = ({
  children,
  onAppearence
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(ref, 5);

  useEffect(() => {
    if (isOnScreen) {
      onAppearence();
    }
  }, [isOnScreen]);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
};

export default AppearBox;
