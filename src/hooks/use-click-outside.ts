import { useEffect, RefObject } from 'react';

type TEvent =
  | MouseEvent
  | TouchEvent;

const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (e: TEvent) => void
) => useEffect(
  () => {
    const listener = (event: TEvent) => {
      if (!ref?.current || ref.current.contains(event.target as Element)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  },
  [ref, handler]
);

export default useOnClickOutside;
