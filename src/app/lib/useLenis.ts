'use client';

import { useEffect } from 'react';
import Lenis, { LenisOptions } from '@studio-freight/lenis';

export default function useLenis(options?: LenisOptions) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,     
      easing: (t) => t,  
      ...options,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [options]);
}