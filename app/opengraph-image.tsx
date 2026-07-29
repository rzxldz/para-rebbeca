import { ImageResponse } from "next/og";

export const alt =
  "Para Regina: 40 canciones y algo que quería decirte";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const flowers = Array.from({ length: 30 }, (_, index) => ({
  left: 55 + ((index * 137) % 1080),
  top: 45 + ((index * 83) % 520),
  size: 18 + (index % 4) * 6,
  opacity: 0.2 + (index % 5) * 0.08,
}));

export default function OpenGraphImage() {
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
          color: "#f8eee8",
          background:
            "radial-gradient(circle at 50% 18%, rgba(143,57,86,.72), transparent 38%), linear-gradient(155deg, #251218 0%, #150c10 58%, #090607 100%)",
        }}
      >
        {flowers.map((flower, index) => (
          <span
            key={index}
            style={{
              position: "absolute",
              left: flower.left,
              top: flower.top,
              color:
                index % 4 === 0
                  ? "#87977f"
                  : index % 3 === 0
                    ? "#f7e5d9"
                    : "#f0c2cd",
              fontSize: flower.size,
              opacity: flower.opacity,
            }}
          >
            ✿
          </span>
        ))}

        <div
          style={{
            width: 960,
            padding: "64px 78px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid rgba(248,238,232,.18)",
            borderRadius: 44,
            background: "rgba(255,255,255,.055)",
            boxShadow: "0 35px 100px rgba(0,0,0,.35)",
          }}
        >
          <div
            style={{
              marginBottom: 20,
              color: "#dda0ae",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Preparé algo para ti
          </div>

          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 94,
              fontStyle: "italic",
              lineHeight: 1,
              textAlign: "center",
            }}
          >
            Para Regina
          </div>

          <div
            style={{
              marginTop: 26,
              color: "rgba(248,238,232,.75)",
              fontSize: 31,
              lineHeight: 1.35,
              textAlign: "center",
            }}
          >
            40 canciones y algo que quería decirte.
          </div>

          <div
            style={{
              marginTop: 36,
              color: "#f0c2cd",
              fontSize: 52,
            }}
          >
            ✿
          </div>
        </div>
      </div>
    ),
    size
  );
}