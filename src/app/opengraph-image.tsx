import { ImageResponse } from "next/og";

/**
 * Link preview for WhatsApp, Telegram, Facebook and search. Text is Latin only:
 * the built-in OG font has no Cyrillic glyphs.
 */
export const alt = "Expert Machinery — industrial gearboxes, pumps and drives, Kazakhstan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#1B2432",
          color: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 14, height: 56, background: "#F0562A" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: 4 }}>EXPERT MACHINERY</div>
            <div style={{ fontSize: 18, letterSpacing: 8, color: "rgba(255,255,255,0.5)" }}>
              INDUSTRIAL DRIVE
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.08, maxWidth: 960 }}>
            Gearboxes, pumps, filters and industrial drives
          </div>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.6)" }}>
            Engineering selection and supply across Kazakhstan
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26 }}>
          <div style={{ color: "#F0562A" }}>expertmachinery.kz</div>
          <div style={{ color: "rgba(255,255,255,0.6)" }}>Astana · Kazakhstan</div>
        </div>
      </div>
    ),
    size,
  );
}
