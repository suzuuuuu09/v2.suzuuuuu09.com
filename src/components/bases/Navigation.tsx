import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { css } from 'styled-system/css';

interface LinkDimensions {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface NavigationProps {
  links: { href: string; label: string }[];
}

const Navigation: React.FC<NavigationProps> = ({ links }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [backgroundDimensions, setBackgroundDimensions] = useState<LinkDimensions | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const updateBackgroundPosition = (index: number) => {
    const link = linkRefs.current[index];
    
    if (link) {
      // 2フレーム待ってより確実な位置を取得
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setBackgroundDimensions({
            x: link.offsetLeft,
            y: link.offsetTop,
            width: link.offsetWidth,
            height: link.offsetHeight,
          });
        });
      });
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    updateBackgroundPosition(index);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    const isMovingToAnotherNavLink = relatedTarget?.closest('.nav-link');
    
    if (!isMovingToAnotherNavLink) {
      setHoveredIndex(null);
      setBackgroundDimensions(null);
    }
  };

  const handleContainerLeave = () => {
    setHoveredIndex(null);
    setBackgroundDimensions(null);
  };

  return (
    <nav
      ref={containerRef}
      className={css({
        display: 'none',
        md: {
          display: 'flex',
        },
        position: 'relative',
        alignItems: 'center',
        marginX: '0.5rem',
      })}
      onMouseLeave={handleContainerLeave}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* ホバーの背景 */}
      <AnimatePresence>
        {hoveredIndex !== null && backgroundDimensions && (
          <motion.div
            className={css({
              position: 'absolute',
              borderRadius: 'lg',
              backgroundColor: 'sz.primary/20',
              border: '1px solid',
              borderColor: 'sz.primary/30',
              pointerEvents: 'none',
              zIndex: -1,
            })}
            initial={{ 
              opacity: 0, 
              x: backgroundDimensions.x,
              y: backgroundDimensions.y,
              width: backgroundDimensions.width,
              height: backgroundDimensions.height,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: backgroundDimensions.x,
              y: backgroundDimensions.y,
              width: backgroundDimensions.width,
              height: backgroundDimensions.height,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 25,
              duration: 0.1,
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 },
            }}
            layout
          />
        )}
      </AnimatePresence>
      
      {links.map((link, index) => (
        <motion.a
          key={link.href}
          ref={(el) => { linkRefs.current[index] = el; }}
          href={link.href}
          className={`nav-link ${css({
            color: 'sz.text.main',
            position: 'relative',
            paddingX: '0.75rem',
            paddingY: '0.5rem',
            borderRadius: 'lg',
            transition: 'all 0.1s ease',
            _hover: {
              color: 'sz.primary',
            },
          })}`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          data-astro-prefetch
        >
          {link.label}
        </motion.a>
      ))}
    </nav>
  );
};

export default Navigation;
