export const HOST_URL: string =
  process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTION_URL!
    : process.env.DEVELOPMENT_URL!;
