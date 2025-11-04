import { loadDefaultJapaneseParser } from 'budoux';

interface OgImageProps {
  readonly title: string;
  readonly siteName?: string;
  readonly backgroundImage?: string;
  readonly icon?: string;
}

// OG画像
export default function OgImage({ title, siteName = 'suzuuuuu09.com', backgroundImage, icon }: OgImageProps) {
  const parser = loadDefaultJapaneseParser();
  const words = parser.parse(title);

  return (
    <div
      style={{
        width: '1200px',
        height: '630px',
        background: '#faf8ff',
        backgroundImage: backgroundImage ? `url('${backgroundImage}')` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"IBM Plex Sans JP", sans-serif',
        color: '#474554',
        padding: '60px',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >

      {/* タイトル */}
      <div
        style={{
          fontSize: '64px',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'flex-start', // 左寄せ
          width: "1020px",
          height: "400px",
          flexWrap: 'wrap',
          textOverflow: 'ellipsis',
          alignContent: 'center',
          alignItems: 'center',
          lineHeight: 1.2,
          wordWrap: 'break-word',
          wordBreak: 'break-word',
          maxWidth: '100%',
          position: 'relative',
          zIndex: '1',
        }}
      >
        {words.map((word, index) => (
          <span key={`${word}-${index}`} style={{ whiteSpace: 'pre-wrap' }}>
            {word}
          </span>
        ))}
      </div>
      

      {/* サイト名 */}
      <div
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '700px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '48px',
          opacity: 0.9,
          zIndex: '1',
        }}
      >
        {icon && (
          <img
            src={icon}
            alt="icon"
            style={{
              maxWidth: '48px',
              maxHeight: '48px',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        )}
        {siteName}
      </div>
    </div>
  );
}
