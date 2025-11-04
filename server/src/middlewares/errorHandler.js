export function notFoundHandler(req, res, next) {
  res.status(404).json({ message: 'Resource not found' });
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  if (err.isJoi) {
    return res.status(400).json({ message: err.message });
  }

  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal server error' });
}
