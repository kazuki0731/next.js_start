export default function handler(req, res) {
  const pid = req.query.pid;
  res.end(`Post: ${pid}`);
}
