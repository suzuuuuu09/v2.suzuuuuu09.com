import fs from "fs";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { loadDefaultJapaneseParser } from "budoux";

export const generateOgImage = async (title: string, isShowSiteName: boolean = true): Promise<Buffer> => {
  const ibmPlexSansRegularFont = fs.readFileSync("./public/fonts/IBMPlexSansJP-Regular.ttf");
  const ibmPlexSnasBoldFont = fs.readFileSync("./public/fonts/IBMPlexSansJP-Bold.ttf");
  const backgroundImage = fs.readFileSync("./public/imgs/ogp-background.png");
  const iconSvg = fs.readFileSync("./src/assets/icon.svg", "utf-8");

  const width = 1200;
  const height = 630;

  const parser = loadDefaultJapaneseParser();
  const words = parser.parse(title);

  const svg = await satori(
    <main
      style={{
        width,
        height,
        backgroundImage: backgroundImage ? `url('data:image/png;base64,${backgroundImage.toString("base64")}')` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: '"Moralerspace Neon", sans-serif',
        color: "#474554",
        padding: "60px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* タイトル */}
      <div
        style={{
          fontSize: "64px",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "flex-start", // 左寄せ
          width: "1020px",
          height: "400px",
          flexWrap: "wrap",
          alignContent: "center",
          alignItems: "center",
          lineHeight: 1.1,
          wordWrap: "break-word",
          wordBreak: "break-word",
          maxWidth: "100%",
          position: "relative",
          zIndex: 1,
          fontFamily: '"IBM Plex Sans JP", sans-serif',
          background: "linear-gradient(135deg, #3951E2 0%, #474554 50%, #6bbaa3 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-0.02em",
          textShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {words.map((word, index) => (
          <span key={`${word}-${index}`} style={{ whiteSpace: "pre-wrap" }}>
            {word}
          </span>
        ))}
      </div>
      
      {/* サイト名 */}
      {isShowSiteName && (
        <div
          style={{
            position: "absolute",
            gap: "10px",
            zIndex: 1,
            bottom: "40px",
            right: "60px",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            opacity: 1,
            fontSize: "48px",
            fontFamily: '"Moralerspace Neon", sans-serif',
            textTransform: "uppercase",
            background: "linear-gradient(135deg, #3951E2 0%, #6bbaa3 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.03em",
            filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
          }}
        >
          {iconSvg && (
            <img
              src={`data:image/svg+xml;base64,${Buffer.from(iconSvg).toString("base64")}`}
              style={{
                width: "48px",
                height: "48px",
                display: "block",
                objectFit: "contain",
                filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
              }}
              alt="icon"
            />
          )}
          suzuuuu09.com
        </div>
      )}
    </main>,
    {
      width,
      height,
      fonts: [
        {
          name: "IBM Plex Sans",
          data: ibmPlexSansRegularFont,
          weight: 400,
          style: "normal",
        },
        {
          name: "IBM Plex Sans",
          data: ibmPlexSnasBoldFont,
          weight: 700,
          style: "normal",
        },
      ]
    }
  )

  // Render SVG to PNG and return as Buffer
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: width
    },
    background: "#faf8ff",
    font: {
      loadSystemFonts: false,
    }
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return Buffer.from(pngBuffer.buffer, pngBuffer.byteOffset, pngBuffer.byteLength);
}