'use client';
import anime from 'animejs/lib/anime.es.js';
import { useState, useEffect, useCallback } from 'react';
import { SiteTitleSVG } from './svgs';

export function SplashScreen({ finishLoading }: { finishLoading: () => void }) {
  const [isMounted, setIsMounted] = useState(false);

  const animate = useCallback(() => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader
      .add({
        targets: '.st0, .st1',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 500,
        delay: function (el, i) {
          return i * 100;
        },
        direction: 'normal',
      })
      .add({
        targets: '.st0, .st1',
        delay: function (el, i) {
          return i * 50;
        },
        fill: '#3b82f6',
      })
      .add({
        targets: '.st0, .st1',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        opacity: 0,
        delay: function (el, i) {
          return i * 25;
        },
        endDelay: 10,
      });
  }, [finishLoading]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);

    animate();
    return () => clearTimeout(timeout);
  }, [animate]);

  return (
    <div className="flex h-screen items-center justify-center flex-col ">
      <div className="flex w-full h-16 px-4 md:px-0">
        <SiteTitleSVG className="st0 st1" />
      </div>
    </div>
  );
}
