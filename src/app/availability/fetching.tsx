'use server';

import { neon } from '@neondatabase/serverless';
import { format, toZonedTime } from 'date-fns-tz';

export async function FetchDate() {  
    // console.log(`Test: ${process.env.DATABASE_URL}`);
    const sql = neon(`${process.env.DATABASE_URL}`);
    const result = await sql('SELECT start_date, end_date FROM availability');

    const timeZone = 'Europe/Berlin'; // or any timezone relevant to your app
    const formattedResult = result.map(row => ({
        start_date: format(toZonedTime(row.start_date, timeZone), 'yyyy-MM-dd'),
        end_date: format(toZonedTime(row.end_date, timeZone), 'yyyy-MM-dd')
    }));

    console.log("Result: ", result);
    console.log("Formatted Result: ", formattedResult);
    
    return formattedResult;
}

export async function addDate(start_date: string, end_date: string) {
    const sql = neon(`${process.env.DATABASE_URL}`);

    //first fetch max id
    const maxId = await sql('SELECT MAX(id) FROM availability');
    const id = maxId !== null ? maxId[0].max + 1 : 1;
    const result = await sql('INSERT INTO availability (id, start_date, end_date) VALUES ($1, $2, $3)', [id, new Date(start_date), new Date(end_date)]);
    console.log("result insert:", result);

    return result;
}

export async function deleteDate(start_date: string, end_date: string) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const result = await sql('DELETE FROM availability WHERE start_date = $1 AND end_date = $2', [new Date(start_date), new Date(end_date)]);
    console.log("Deleted:", start_date, end_date);
    console.log("result delete:", result);

    return result;
}