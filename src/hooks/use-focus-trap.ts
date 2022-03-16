import { useRef, useEffect } from 'react';

const KEYCODE_TAB = 9;

const useFocusTrap = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  let currentIdx = 0;

  const handleFocus = (e: KeyboardEvent) => {
    const form = ref.current?.querySelector('form');
    if (form && e.key === 'Enter') {
      const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      if (submit) {
        submit.focus();
      }
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
      return;
    }

    if (e.key !== 'Tab' && !ref.current) {
      return;
    }

    const focusableEls = ref.current?.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );

    if (!focusableEls) {
      return;
    }

    const isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB;
    if (!isTabPressed) {
      return;
    }

    const el = focusableEls[currentIdx];
    el.focus();
    e.preventDefault();

    if (currentIdx < focusableEls.length - 1) {
      currentIdx++;
    } else {
      currentIdx = 0;
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleFocus);
    return () => {
      document.removeEventListener('keydown', handleFocus);
    };
  }, []);

  return ref;
};

export default useFocusTrap;
