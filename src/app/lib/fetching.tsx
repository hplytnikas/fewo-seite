'use server';

import { neon } from '@neondatabase/serverless';
import { format, toZonedTime } from 'date-fns-tz';

export async function FetchDate(wohnung: string) {  
    // console.log(`Test: ${process.env.DATABASE_URL}`);
    const sql = neon(`${process.env.DATABASE_URL}`);
    const result = await sql(`SELECT start_date, end_date FROM availability${wohnung}`);

    const timeZone = 'Europe/Berlin'; // or any timezone relevant to your app
    const formattedResult = result.map(row => ({
        start_date: format(toZonedTime(row.start_date, timeZone), 'yyyy-MM-dd'),
        end_date: format(toZonedTime(row.end_date, timeZone), 'yyyy-MM-dd')
    }));

    console.log("Result: ", result);
    console.log("Formatted Result: ", formattedResult);
    
    return formattedResult;
}

export async function addDate(start_date: string, end_date: string, wohnung: string) {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const timeZone = 'Europe/Berlin';
    const formattedStartDate = format(toZonedTime(new Date(start_date), timeZone), 'yyyy-MM-dd');
    const formattedEndDate = format(toZonedTime(new Date(end_date), timeZone), 'yyyy-MM-dd');
    //first fetch max id
    const maxId = await sql(`SELECT MAX(id) FROM availability${wohnung}`);
    console.log("Max ID: ", maxId);
    const id = maxId !== null ? maxId[0].max + 1 : 1;
    const result = await sql(`INSERT INTO availability${wohnung} (id, start_date, end_date) VALUES ($1, $2, $3)`, [id, formattedStartDate, formattedEndDate]);
    console.log("result insert:", result);
    return result;
}

export async function deleteDate(start_date: string, end_date: string, wohnung: string) {

    const timeZone = 'Europe/Berlin';
    const formattedStartDate = format(toZonedTime(new Date(start_date), timeZone), 'yyyy-MM-dd');
    const formattedEndDate = format(toZonedTime(new Date(end_date), timeZone), 'yyyy-MM-dd');

    const sql = neon(`${process.env.DATABASE_URL}`);
    const result = await sql('DELETE FROM availability$3 WHERE start_date = $1 AND end_date = $2', [formattedStartDate, formattedEndDate, wohnung]);
    console.log("Deleted:", start_date, end_date);
    console.log("result delete:", result);

    return result;
}