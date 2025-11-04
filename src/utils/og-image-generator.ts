import satori from 'satori';
import sharp from 'sharp';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import OgImage from '@/components/OgImage';

type ImageFormat = 'png' | 'webp' | 'jpeg';

interface GenerateOgImageOptions {
  readonly title: string;
  readonly siteName?: string;
  readonly format?: ImageFormat;
}

// 背景画像をBase64でエンコード
async function getBackgroundImageBase64(): Promise<string> {
  try {
    const imagePath = path.join(
      process.cwd(),
      'public',
      'imgs',
      'ogp-background.png'
    );

    if (!fs.existsSync(imagePath)) {
      console.warn('Background image not found:', imagePath);
      return '';
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const base64 = imageBuffer.toString('base64');
    return `data:image/png;base64,${base64}`;
  } catch (error) {
    console.error('Error loading background image:', error);
    return '';
  }
}

// アイコンをBase64でエンコード
async function getIconBase64(): Promise<string> {
  try {
    const iconPath = path.join(
      process.cwd(),
      'src',
      'assets',
      'icon.svg'
    );

    if (!fs.existsSync(iconPath)) {
      console.warn('Icon not found:', iconPath);
      return '';
    }

    const iconBuffer = fs.readFileSync(iconPath);
    const base64 = iconBuffer.toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
  } catch (error) {
    console.error('Error loading icon:', error);
    return '';
  }
}

// フォントを読み込む
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
): Promise<string> {
  try {
    const fonts = await loadFonts();
    const backgroundImage = await getBackgroundImageBase64();
    const icon = await getIconBase64();

    const svg = await satori(
      React.createElement(OgImage, {
        title,
        siteName: 'suzuuuuu09.com',
        backgroundImage,
        icon,
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
    const { title, format = 'png' } = options;

    const svg = await generateSvg(title);
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
