interface OgImageProps {
  readonly title: string;
  readonly type?: 'blog' | 'product' | 'about' | 'default';
  readonly siteName?: string;
}

// グラデーション背景を持つOG画像コンポーネント
export default function OgImage({ title, type = 'default', siteName = 'suzuuuuu09.com' }: OgImageProps) {
  return (
    <div
      style={{
        width: '1200px',
        height: '630px',
        background: '#faf8ff',
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
      <h1
        style={{
          fontSize: '72px',
          fontWeight: 'bold',
          textAlign: 'center',
          margin: '0 0 40px 0',
          lineHeight: 1.2,
          wordWrap: 'break-word',
          wordBreak: 'break-word',
          maxWidth: '100%',
        }}
      >
        {title}
      </h1>
      

      {/* サイト名 */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '200px',
          textAlign: 'center',
          fontSize: '28px',
          fontWeight: 'normal',
          opacity: 0.9,
        }}
      >
          {siteName}
      </div>
    </div>
  );
}
