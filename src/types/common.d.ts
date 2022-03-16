import React from 'react';

export type TIconProps = {
  width?: string;
  height?: string;
  className?: string;
  onClick?: (e: React.SynteticEvent) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export type TLocationState = {
  background?: Location<TLocationState>;
  from?: Location<TLocationState>;
};
