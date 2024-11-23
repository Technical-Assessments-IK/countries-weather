import type { IncomingMessage, ServerResponse } from 'http';
import { createProxyMiddleware, type RequestHandler } from 'http-proxy-middleware';

module.exports = function (app: { use: (arg0: string, arg1: RequestHandler<IncomingMessage, ServerResponse<IncomingMessage>, (err?: unknown) => void>) => void; }) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://restcountries.com',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
      secure: false,
    })
  );
};
