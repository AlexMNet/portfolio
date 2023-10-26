'use client';
import anime from 'animejs/lib/anime.es.js';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Typography } from './ui/typography';

export function SplashScreen({ finishLoading }: { finishLoading: () => void }) {
  const [isMounted, setIsMounted] = useState(false);
  const textRef = useRef(null);

  const animate = useCallback(() => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader.add({
      targets: '.text',
      opacity: [0, 1],
      duration: 1500,
      easing: 'easeInOutExpo',
      endDelay: 500,
    });
  }, [finishLoading]);

  const SpannedText = (text: string) => {
    return Array.from(text).map((letter) => (
      <span key={letter} className="letter text-4xl">
        {letter}
      </span>
    ));
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);

    animate();
    return () => clearTimeout(timeout);
  }, [animate]);

  return (
    <div className="flex h-screen items-center justify-center">
      {/* {SpannedText("Alex Maldonado")} */}
      <h1 className="text text-7xl opacity-0">Alex Maldonado</h1>
    </div>
  );
}
