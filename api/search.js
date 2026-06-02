export default async function handler(req, res) {
  return res.status(200).json({
    success: true,
    message: "NEW SEARCH FILE IS RUNNING",
    time: new Date().toISOString()
  });
}