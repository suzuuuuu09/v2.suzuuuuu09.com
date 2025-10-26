import React from 'react';
import { motion } from 'framer-motion';
import { css } from 'styled-system/css';

const shapesNumber = 20;

interface Shape {
  id: number;
  type: 'circle' | 'square' | 'triangle';
  size: number;
  x: number;
  y: number;
  color: string;
  duration: number;
}

const FloatingBackground: React.FC = () => {
  // ランダムな図形を生成
  const generateShapes = (): Shape[] => {
    const shapes: Shape[] = [];
    const shapeTypes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
    const colors = [
      '#3951e21a',
      '#0072f81a',
      '#0088f21a',
      '#0096d41a',
      '#00a0a91a',
      '#00a87a1a',
      '#968fc31a',
    ];

    for (let i = 0; i < shapesNumber; i++) {
      shapes.push({
        id: i,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        size: Math.random() * 80 + 20, // 20-100px
        x: Math.random() * 100, // 0-100%
        y: Math.random() * 100, // 0-100%
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 20 + 10, // 10-30秒
      });
    }

    return shapes;
  };

  const shapes = React.useMemo(() => generateShapes(), []);

  // 図形コンポーネント
  const renderShape = (shape: Shape) => {
    const animationVariants = {
      floating: {
        y: [0, -30, 0],
        x: [0, 15, -15, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.1, 0.9, 1],
        transition: {
          duration: shape.duration,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      },
    };

    const baseClassName = css({
      position: 'absolute',
    });

    switch (shape.type) {
      case 'circle':
        return (
          <motion.div
            key={shape.id}
            className={baseClassName}
            style={{
              width: shape.size,
              height: shape.size,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              backgroundColor: shape.color,
              borderRadius: '50%',
            }}
            variants={animationVariants}
            animate="floating"
          />
        );
      case 'square':
        return (
          <motion.div
            key={shape.id}
            className={baseClassName}
            style={{
              width: shape.size,
              height: shape.size,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              backgroundColor: shape.color,
              borderRadius: '8px',
            }}
            variants={animationVariants}
            animate="floating"
          />
        );
      case 'triangle':
        return (
          <motion.div
            key={shape.id}
            className={baseClassName}
            style={{
              width: 0,
              height: 0,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              backgroundColor: 'transparent',
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`,
            }}
            variants={animationVariants}
            animate="floating"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={css({
      position: 'fixed',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0,
    })}>
      {shapes.map(renderShape)}
    </div>
  );
};

export default FloatingBackground;
