import cors, { CorsRequest } from 'cors';

const ACCEPTED_ORIGINS: string[] = [
  'http://localhost:3000',
  'https://atthemoment.com',
];

interface Response {
  statusCode?: number;
  setHeader(key: string, value: string): void;
  end(): void;
}

interface NextCallback {
  (err?: any): void;
}

interface CorsMiddlewareOptions {
  acceptedOrigins?: string[];
}

type CorsMiddleware = (
  options?: CorsMiddlewareOptions
) => (
  req: CorsRequest,
  res: Response,
  next: NextCallback
) => void;

export const corsMiddleware: CorsMiddleware = ({
  acceptedOrigins = ACCEPTED_ORIGINS,
} = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin || '')) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
  });
