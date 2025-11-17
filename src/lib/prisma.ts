import { PrismaClient } from '@prisma/client';

// Add prisma to the NodeJS global type
// This is to prevent multiple instances of PrismaClient in development
// (e.g., when Next.js HMR reloads modules)
declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: `${process.env.DATABASE_URL}?pgbouncer=true`,
      },
    },
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      datasources: {
        db: {
          url: `${process.env.DATABASE_URL}?pgbouncer=true`,
        },
      },
    });
  }
  prisma = global.prisma;
}

export default prisma;
