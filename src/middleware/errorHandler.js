import { isHttpError } from 'http-errors';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, _next) => {
  if (isHttpError(err)) {
    return res.status(err.status).json({ message: err.message });
  }

  res.status(500).json({ message: err.message });
};
