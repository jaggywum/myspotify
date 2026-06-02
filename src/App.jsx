import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchSpotify = async () => {
    if (!query) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();

      setResults(data.tracks?.items || []);
    } catch (err) {
      console.error(err);
      alert("Search failed");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#121212",
        color: "white",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ color: "#1DB954" }}>MySpotify Search</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Search artist, song or album..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "none",
          }}
        />

        <button
          onClick={searchSpotify}
          style={{
            background: "#1DB954",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Search
        </button>
      </div>

      {loading && <p>Searching...</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        {results.map((track) => (
          <div
            key={track.id}
            onClick={() => setSelectedTrack(track)}
            style={{
              background: "#181818",
              padding: "15px",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            <img
              src={track.album.images?.[0]?.url}
              alt={track.name}
              style={{
                width: "100%",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            />

            <h3>{track.name}</h3>

            <p style={{ color: "#b3b3b3" }}>
              {track.artists.map((a) => a.name).join(", ")}
            </p>
          </div>
        ))}
      </div>

      {selectedTrack && (
        <div style={{ marginTop: "40px" }}>
          <h2>Now Playing</h2>

          <iframe
            src={`https://open.spotify.com/embed/track/${selectedTrack.id}`}
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
      )}
    </div>
  );
}