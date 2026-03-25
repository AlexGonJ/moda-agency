'use client'
import React, { CSSProperties, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Masonry.css';

// 1. Interface completa com todas as propriedades opcionais (corrige erro da Vercel)
interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [isMounted] = useState(typeof window !== 'undefined');
  const [imagesReady, setImagesReady] = useState(false);
  const hasMountedAnimation = useRef(false);
  const introAnimationPlayed = useRef(false);

  // Controle de Hydration para Next.js
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) setWidth(containerRef.current.offsetWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lógica de Grid e Altura Dinâmica
  const { grid, totalHeight } = useMemo(() => {
    if (!isMounted || !width) return { grid: [] as GridItem[], totalHeight: 0 };

    const isMobile = window.innerWidth < 768;
    const columns = isMobile ? 2 : window.innerWidth < 1000 ? 3 : 4;
    
    // Filtro para mobile: mostra no máximo 10 itens
    const activeItems = isMobile ? items.slice(0, Math.min(items.length, 10)) : items;

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;
    const imageScale = isMobile ? 0.7 : 1; 

    const gridData = activeItems.map((child: Item): GridItem => {
      const sorted = colHeights
        .map((h, i) => ({ h, i }))
        .sort((a, b) => a.h - b.h);

      const col = sorted[0].i;
      const x = columnWidth * col;
      const h = (child.height / 2) * imageScale;
      const y = colHeights[col];
      colHeights[col] += h;
      return { ...child, x, y, w: columnWidth, h };
    });

    const safetyPadding = isMobile ? 60 : 120;
    return { grid: gridData, totalHeight: Math.max(...colHeights) + safetyPadding };
  }, [isMounted, width, items]);

  // Pré-load das imagens
  useEffect(() => {
    if (!isMounted) return;
    const urls = items.map((i: Item) => i.img);
    Promise.all(urls.map((src: string) => new Promise<void>((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => resolve();
    }))).then(() => setImagesReady(true));
  }, [items, isMounted]);

  // Animações GSAP
  useLayoutEffect(() => {
    if (!imagesReady || !isMounted || grid.length === 0) return;

    let ctx: gsap.Context | undefined;

    (async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        grid.forEach((item: GridItem) => {
          const selector = `[data-key="${item.id}"]`;
          const centerX = item.x + item.w / 2;
          const centerY = item.y + item.h / 2;
          const spreadX = (centerX - width / 2) * 0.22;
          const spreadY = (centerY - totalHeight / 2) * 0.18;

          if (!hasMountedAnimation.current && !introAnimationPlayed.current) {
            gsap.set(selector, {
              opacity: 0,
              x: item.x + spreadX,
              y: item.y + spreadY + 80,
              scale: 0.86,
              width: item.w,
              height: item.h,
              filter: blurToFocus ? 'blur(18px)' : 'none',
            });
          } else {
            gsap.to(selector, {
              x: item.x,
              y: item.y,
              width: item.w,
              height: item.h,
              duration,
              ease,
              overwrite: 'auto'
            });
          }
        });

        if (!introAnimationPlayed.current && containerRef.current) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              once: true,
            },
          });

          grid.forEach((item: GridItem, index: number) => {
            const selector = `[data-key="${item.id}"]`;

            tl.to(
              selector,
              {
                opacity: 1,
                x: item.x,
                y: item.y,
                scale: 1,
                width: item.w,
                height: item.h,
                filter: 'blur(0px)',
                duration: 1,
                ease: 'power3.out',
              },
              index * stagger
            );
          });

          introAnimationPlayed.current = true;
        }

        hasMountedAnimation.current = true;
      }, containerRef);
    })();

    return () => {
      ctx?.revert();
    };
  }, [grid, imagesReady, isMounted, stagger, duration, ease, blurToFocus, totalHeight, width]);

  if (!isMounted) return <div ref={containerRef} style={{ width: '100%', minHeight: '400px' }} />;

  return (
    <div 
      ref={containerRef} 
      className="masonry-root"
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: `${totalHeight}px`, 
        transition: 'height 0.4s ease-out' 
      }}
    >
      {grid.map((item: GridItem) => (
        <div
          key={item.id}
          data-key={item.id}
          className="item-wrapper"
          style={{ 
            position: 'absolute', cursor: 'pointer', overflow: 'hidden', 
            width: item.w, height: item.h, padding: '6px',
            willChange: 'transform, width, height'
          }}
          onClick={() => item.url !== "#" && window.open(item.url, '_blank', 'noopener')}
        >
          <div 
            className="item-img"
            style={{
              '--hover-scale': hoverScale.toString(),
              backgroundImage: `url(${item.img})`, width: '100%', height: '100%', 
              backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px',
              transition: scaleOnHover ? 'transform 0.3s ease' : 'none'
            } as CSSProperties}
          />
        </div>
      ))}
    </div>
  );
};

export default Masonry;
