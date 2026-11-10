import { useEffect, type RefObject } from 'react';

/** Equal pixel speed across differently sized, duplicated ticker groups. */
export function useContinuousTicker(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const tracks = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-continuous-track]') ?? []);
    const measure = () => tracks.forEach(track => {
      const width = track.firstElementChild?.getBoundingClientRect().width ?? 0;
      if (width) track.style.setProperty('--ticker-duration', `${width / 40}s`);
    });
    const observer = new ResizeObserver(measure);
    tracks.forEach(track => { if (track.firstElementChild) observer.observe(track.firstElementChild); });
    measure();
    return () => observer.disconnect();
  }, [root]);
}
