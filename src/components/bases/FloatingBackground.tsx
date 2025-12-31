import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { css } from 'styled-system/css';

const mobileShapesNumber = 10;
const tabletShapesNumber = 15;
const pcShapesNumber = 20;

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [shapesNumber, setShapesNumber] = useState(20);

  // 画面サイズに応じた図形の数を取得
  useEffect(() => {
    const updateShapesNumber = () => {
      const width = window.innerWidth;
      if (width <= 640) {
        setShapesNumber(mobileShapesNumber); // スマホ
      } else if (width <= 768) {
        setShapesNumber(tabletShapesNumber); // タブレット
      } else {
        setShapesNumber(pcShapesNumber); // PC
      }
    };

    updateShapesNumber();
    window.addEventListener('resize', updateShapesNumber);

    return () => {
      window.removeEventListener('resize', updateShapesNumber);
    };
  }, []);

  // ランダムな図形を生成（useMemoで一度だけ生成）
  const shapes = React.useMemo(() => {
    const generatedShapes: Shape[] = [];
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
      generatedShapes.push({
        id: i,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        size: Math.random() * 80 + 20, // 20-100px
        x: Math.random() * 100, // 0-100%
        y: Math.random() * 100, // 0-100%
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 200 + 100, // 100-120秒
      });
    }

    return generatedShapes;
  }, [shapesNumber]);

  useEffect(() => {
    if (!containerRef.current) return;

    // 各図形にGSAPアニメーションを適用
    const elements = containerRef.current.querySelectorAll('[data-shape]');
    let index = 0;
    for (const element of elements) {
      const shape = shapes[index];
      if (!shape) {
        index++;
        continue;
      }

      // フローティングアニメーション
      gsap.to(element, {
        y: -30,
        x: 15,
        rotate: 5,
        scale: 1.1,
        duration: shape.duration / 4,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        repeatDelay: 0,
        keyframes: [
          { y: -30, x: 15, rotate: 5, scale: 1.1 },
          { y: 0, x: -15, rotate: -5, scale: 0.9 },
          { y: 0, x: 0, rotate: 0, scale: 1 },
        ],
      });

      index++;
    }

    // クリーンアップ
    return () => {
      gsap.killTweensOf(elements);
    };
  }, [shapes]);

  // 図形をレンダリング
  const renderShape = (shape: Shape) => {
    const baseClassName = css({
      position: 'absolute',
    });

    const baseStyle: React.CSSProperties = {
      left: `${shape.x}%`,
      top: `${shape.y}%`,
    };

    switch (shape.type) {
      case 'circle':
        return (
          <div
            key={shape.id}
            data-shape
            className={baseClassName}
            style={{
              ...baseStyle,
              width: shape.size,
              height: shape.size,
              backgroundColor: shape.color,
              borderRadius: '50%',
            }}
          />
        );
      case 'square':
        return (
          <div
            key={shape.id}
            data-shape
            className={baseClassName}
            style={{
              ...baseStyle,
              width: shape.size,
              height: shape.size,
              backgroundColor: shape.color,
              borderRadius: '8px',
            }}
          />
        );
      case 'triangle':
        return (
          <div
            key={shape.id}
            data-shape
            className={baseClassName}
            style={{
              ...baseStyle,
              width: 0,
              height: 0,
              backgroundColor: 'transparent',
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className={css({
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      })}
    >
      {shapes.map(renderShape)}
    </div>
  );
};

export default FloatingBackground;
