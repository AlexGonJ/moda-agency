'use client'
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Masonry.css';

// --- INTERFACES ---
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
  stagger?: number;
}

const Masonry: React.FC<MasonryProps> = ({ items, stagger = 0.05 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);
  const hasMountedAnimation = useRef(false);

  // 1. Controle de Hydration: Garante que o código de tela só rode no Cliente
  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      if (containerRef.current) setWidth(containerRef.current.offsetWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 2. Cálculo do Grid Dinâmico
  const { grid, totalHeight } = useMemo(() => {
    // Retorno vazio para o servidor evitar erro #418
    if (!isMounted || !width) return { grid: [] as GridItem[], totalHeight: 0 };

    const isMobile = window.innerWidth < 768;
    const columns = isMobile ? 2 : window.innerWidth < 1000 ? 3 : 4;
    
    // REDUÇÃO AJUSTADA: No mobile, agora permitimos até 10 itens (um pouco mais que antes)
    const activeItems = isMobile ? items.slice(0, Math.min(items.length, 10)) : items;

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;
    
    // Escala no mobile agora é 0.7 (maior que o 0.5 anterior) para preencher melhor
    const imageScale = isMobile ? 0.7 : 1; 

    const gridData = activeItems.map((child: Item): GridItem => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const h = (child.height / 2) * imageScale;
      const y = colHeights[col];
      colHeights[col] += h;
      return { ...child, x, y, w: columnWidth, h };
    });

    // ESPAÇAMENTO: Reduzi o respiro para 60px no mobile e 120px no desktop
    const safetyPadding = isMobile ? 60 : 120;
    return { grid: gridData, totalHeight: Math.max(...colHeights) + safetyPadding };
  }, [isMounted, width, items]);

  // 3. Pré-carregamento de imagens
  useEffect(() => {
    if (!isMounted) return;
    const urls = items.map((i: Item) => i.img);
    Promise.all(urls.map((src: string) => new Promise<void>((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => resolve();
    }))).then(() => setImagesReady(true));
  }, [items, isMounted]);

  // 4. Animação GSAP Segura
  useLayoutEffect(() => {
    if (!imagesReady || !isMounted || grid.length === 0) return;

    grid.forEach((item: GridItem, index: number) => {
      const selector = `[data-key="${item.id}"]`;
      if (!hasMountedAnimation.current) {
        gsap.fromTo(selector, 
          { opacity: 0, y: item.y + 50 },
          { 
            opacity: 1, 
            x: item.x, 
            y: item.y, 
            width: item.w, 
            height: item.h, 
            duration: 0.8, 
            delay: index * stagger, 
            ease: 'power3.out' 
          }
        );
      } else {
        gsap.to(selector, { 
          x: item.x, 
          y: item.y, 
          width: item.w, 
          height: item.h, 
          duration: 0.6, 
          ease: 'power3.out',
          overwrite: 'auto' 
        });
      }
    });
    hasMountedAnimation.current = true;
  }, [grid, imagesReady, isMounted, stagger]);

  // Fallback para Hydration
  if (!isMounted) return <div ref={containerRef} style={{ width: '100%', minHeight: '400px' }} />;

  return (
    <div 
      ref={containerRef} 
      className="masonry-root"
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: `${totalHeight}px`, // Define a altura real que o Footer respeita
        transition: 'height 0.4s ease-out' 
      }}
    >
      {grid.map((item: GridItem) => (
        <div
          key={item.id}
          data-key={item.id}
          className="item-wrapper"
          style={{ 
            position: 'absolute', 
            cursor: 'pointer', 
            overflow: 'hidden', 
            width: item.w, 
            height: item.h, 
            padding: '6px',
            willChange: 'transform, width, height'
          }}
          onClick={() => item.url !== "#" && window.open(item.url, '_blank', 'noopener')}
        >
          <div 
            className="item-img"
            style={{ 
              backgroundImage: `url(${item.img})`, 
              width: '100%', 
              height: '100%', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center', 
              borderRadius: '8px'
            }} 
          />
        </div>
      ))}
    </div>
  );
};

export default Masonry;