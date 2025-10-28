import { useEffect, useRef } from 'react';

export function useOutsideClick<T extends HTMLElement = HTMLElement>(
  handler: VoidFunction,
  listenCapture = true
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (ref.current && !ref.current.contains(target)) {
        handler();
      }
    };

    document.addEventListener('click', handleClickOutside, {
      capture: listenCapture,
    });

    return () =>
      document.removeEventListener('click', handleClickOutside, {
        capture: listenCapture,
      });
  }, [handler, listenCapture]);

  return ref;
}
