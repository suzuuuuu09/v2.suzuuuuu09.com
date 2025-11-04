import satori from 'satori';
import sharp from 'sharp';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import OgImage from '@/components/OgImage';

type ImageFormat = 'png' | 'webp' | 'jpeg';
type ImageType = 'blog' | 'product' | 'about' | 'default';

interface GenerateOgImageOptions {
  readonly title: string;
  readonly type?: ImageType;
  readonly siteName?: string;
  readonly format?: ImageFormat;
}

/**
 * フォントを読み込む
 */
async function loadFonts() {
  try {
    const regularPath = path.join(
      process.cwd(),
      'public',
      'fonts',
      'IBMPlexSansJP-Regular.ttf'
    );
    const boldPath = path.join(
      process.cwd(),
      'public',
      'fonts',
      'IBMPlexSansJP-Bold.ttf'
    );

    const fonts = [];

    if (fs.existsSync(regularPath)) {
      fonts.push({
        name: 'IBM Plex Sans JP',
        data: fs.readFileSync(regularPath),
        weight: 400 as any,
        style: 'normal' as any,
      });
    }

    if (fs.existsSync(boldPath)) {
      fonts.push({
        name: 'IBM Plex Sans JP',
        data: fs.readFileSync(boldPath),
        weight: 700 as any,
        style: 'normal' as any,
      });
    }

    return fonts;
  } catch (error) {
    console.error('Error loading fonts:', error);
    return [];
  }
}

// OG画像をSVGとして生成
async function generateSvg(
  title: string,
  type: ImageType = 'default'
): Promise<string> {
  try {
    const fonts = await loadFonts();

    const svg = await satori(
      React.createElement(OgImage, {
        title,
        type,
        siteName: 'suzuuuuu09.com',
      }),
      {
        width: 1200,
        height: 630,
        fonts,
      }
    );

    return svg;
  } catch (error) {
    console.error('Error generating SVG:', error);
    throw error;
  }
}

/**
 * SVGを画像に変換
 */
async function convertSvgToImage(
  svg: string,
  format: ImageFormat = 'png'
): Promise<Buffer> {
  try {
    const resvg = new Resvg(svg, {
      fitTo: {
        mode: 'original',
      },
    });

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    if (format === 'png') {
      return pngBuffer;
    }

    let image = sharp(pngBuffer);

    if (format === 'webp') {
      image = image.webp({ quality: 80 });
    } else if (format === 'jpeg') {
      image = image.jpeg({ quality: 80 });
    }

    return await image.toBuffer();
  } catch (error) {
    console.error('Error converting SVG to image:', error);
    throw error;
  }
}

// OG画像を生成
export async function generateOgImage(
  options: GenerateOgImageOptions
): Promise<Buffer> {
  try {
    const { title, type = 'default', format = 'png' } = options;

    const svg = await generateSvg(title, type);
    const imageBuffer = await convertSvgToImage(svg, format);

    return imageBuffer;
  } catch (error) {
    console.error('Error in generateOgImage:', error);
    throw error;
  }
}

// フォーマットに応じたContent-Typeを取得
export function getContentType(format: ImageFormat): string {
  const contentTypes: Record<ImageFormat, string> = {
    png: 'image/png',
    webp: 'image/webp',
    jpeg: 'image/jpeg',
  };

  return contentTypes[format] || 'image/png';
}
