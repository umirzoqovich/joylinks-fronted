'use client';

import { useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  value: number;
  suffix?: string;
  durationMs?: number;
}

/** Ekranga kirganda 0 dan `value` gacha sanaydi */
export function CountUp({ value, suffix = '', durationMs = 1400 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setCurrent(value);
      return;
    }
    if (!inView) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      setCurrent(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion, value, durationMs]);

  return (
    <span ref={ref} aria-label={`${new Intl.NumberFormat('ru-RU').format(value)}${suffix}`}>
      <span aria-hidden="true">
        {new Intl.NumberFormat('ru-RU').format(current)}
        {suffix}
      </span>
    </span>
  );
}
