import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;

// Prevent multiple instances of Prisma Client in development due to hot reloading
//The global variable is not affected by hot reloading, so it will persist between reloads.
