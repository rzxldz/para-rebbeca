import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          borderRadius: "18px",
          color: "#f8eee8",
          background:
            "radial-gradient(circle at 32% 24%, #873a52 0%, #351923 48%, #170f12 100%)",
          boxShadow: "inset 0 0 0 2px rgba(248,238,232,.16)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 5,
            right: 7,
            color: "#dda0ae",
            fontSize: 19,
            lineHeight: 1,
          }}
        >
          ✿
        </div>

        <div
          style={{
            marginTop: 3,
            fontFamily: "Georgia, serif",
            fontSize: 38,
            fontStyle: "italic",
            lineHeight: 1,
            textShadow: "0 0 14px rgba(221,160,174,.4)",
          }}
        >
          R
        </div>
      </div>
    ),
    size
  );
}