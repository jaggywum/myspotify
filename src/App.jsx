import { useState } from "react";

export default function App() {
  const [url, setUrl] = useState("");
  const [embeds, setEmbeds] = useState([]);

  const addSpotify = () => {
    if (!url.includes("spotify.com")) {
      alert("Please enter a valid Spotify link");
      return;
    }

    const embedUrl = url.replace(
      "https://open.spotify.com/",
      "https://open.spotify.com/embed/"
    );

    setEmbeds([embedUrl, ...embeds]);
    setUrl("");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#121212",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#000",
          padding: "20px",
        }}
      >
        <h1 style={{ color: "#1DB954" }}>MySpotify</h1>

        <div style={{ marginTop: "30px" }}>
          <p>🏠 Home</p>
          <p>📚 Library</p>
          <p>❤️ Saved</p>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        <h2>Recently Added</h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "30px",
          }}
        >
          <input
            type="text"
            placeholder="Paste Spotify playlist, album or track"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px",
              border: "none",
            }}
          />

          <button
            onClick={addSpotify}
            style={{
              background: "#1DB954",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Add
          </button>
        </div>

        {embeds.length === 0 && (
          <p>Add a Spotify link to get started.</p>
        )}

        {embeds.map((embed, index) => (
          <div
            key={index}
            style={{
              marginBottom: "20px",
              background: "#181818",
              padding: "15px",
              borderRadius: "12px",
            }}
          >
            <iframe
              src={embed}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{
                border: 0,
                borderRadius: "12px",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}