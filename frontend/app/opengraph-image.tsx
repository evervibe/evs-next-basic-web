import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "EVS - EverVibe Studios";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "linear-gradient(to bottom right, #2563eb, #9333ea)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <div style={{ fontSize: 120, fontWeight: "bold", marginBottom: 20 }}>EVS</div>
        <div style={{ fontSize: 40, opacity: 0.9 }}>EverVibe Studios</div>
        <div style={{ fontSize: 28, opacity: 0.8, marginTop: 20 }}>
          Premium Next.js Landing Page Template
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
