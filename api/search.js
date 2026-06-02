export default async function handler(req, res) {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({
        error: "Missing search query",
      });
    }

    // Get Spotify access token
    const auth = Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return res.status(500).json({
        error: "Failed to get Spotify token",
        spotifyResponse: tokenData,
      });
    }

    // Search Spotify
    const searchResponse = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(
        query
      )}`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    const searchData = await searchResponse.json();

    return res.status(200).json(searchData);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}