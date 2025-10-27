// import { connection, db } from '@/lib/db/db';
// import { migrate } from 'drizzle-orm/postgres-js/migrator';

// (async () => {
//     await migrate(db, { migrationsFolder: './drizzle' });
//     await connection.$client.end();
// })();


import { connection, db } from '@/lib/db/db';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

(async () => {
    // Get DATABASE_URL from environment or command line

    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
        throw new Error('DATABASE_URL is not set. Please provide it via environment or command line.');
    }

    // Set the connection URL if your db setup requires it
    process.env.DATABASE_URL = dbUrl; // Ensure it's available for the connection

    await migrate(db, { migrationsFolder: './drizzle' });
    await connection.$client.end();
})();