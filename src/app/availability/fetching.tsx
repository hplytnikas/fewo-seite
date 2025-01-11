'use server';

import { neon } from '@neondatabase/serverless';

export default async function FetchDate() {  
    console.log(`Test: ${process.env.DATABASE_URL}`);
    const sql = neon(`${process.env.DATABASE_URL}`);
    const result = await sql('SELECT start_date, end_date FROM availability');
    console.log(result);

    return result;
}