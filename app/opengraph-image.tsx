import { ImageResponse } from "next/og";
export const alt = "edo-dev — Il tuo ristorante, già dal primo sguardo.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#f4f0e7",
        color: "#28352b",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "65px 75px",
      }}
    >
      <div style={{ fontSize: 36, display: "flex" }}>edo—dev.</div>
      <div
        style={{
          fontSize: 24,
          marginTop: 70,
          color: "#6e7567",
          display: "flex",
        }}
      >
        SITI WEB PER RISTORANTI INDIPENDENTI
      </div>
      <div
        style={{
          fontSize: 76,
          letterSpacing: "-3px",
          lineHeight: 1.12,
          marginTop: 25,
          display: "flex",
          maxWidth: 950,
        }}
      >
        Il tuo ristorante, già dal primo sguardo.
      </div>
      <div
        style={{
          fontSize: 23,
          marginTop: 45,
          color: "#85604c",
          display: "flex",
        }}
      >
        Un progetto, un interlocutore. Edoardo.
      </div>
    </div>,
    { ...size },
  );
}
