"use client";

import { Calendar } from "@heroui/calendar";
import styles from "./availability.module.css";
import {FetchDate} from "@/app/lib/fetching";
import { useTranslation } from "react-i18next";
import {
  today,
  getLocalTimeZone,
  isWeekend,
  DateValue,
  CalendarDate,
  parseDate
} from "@internationalized/date";
import { useEffect, useState } from "react";
// import { sql } from '@vercel/postgres';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import Navigation from "@/app/components/navigation";
import { useParams } from "next/navigation";
import { useDisabledRanges } from "@/app/context/disabledrangescontext";

export default function Page() {
  const { wohnung } = useParams();
  dotenv.config();
  const { t } = useTranslation();
  // const { locale } = useLocale();
  const [now, setNow] = useState<DateValue | null>(null);
  // const [disabledRanges, setDisabledRanges] = useState<[DateValue, DateValue][]>([]);
  const { disabledRanges, setDisabledRanges } = useDisabledRanges();

  console.log("Disabled Ranges: ", disabledRanges);

  useEffect(() => {
    const fetchData = async () => {
      setNow(today(getLocalTimeZone()));

      const result = await FetchDate(wohnung as string) as { start_date: string, end_date: string }[];
      const fetchedRanges = result.map((row) => {
        // console.log("Type: ", new Date(Date.parse(row.start_date)).toISOString().split('T')[0]);

        const startDate = parseDate(new Date(Date.parse(row.start_date)).toISOString().split('T')[0]);
        const endDate = parseDate(new Date(Date.parse(row.end_date)).toISOString().split('T')[0]);
        console.log("Start Date: ", startDate);
        console.log("End Date: ", endDate);
        return [startDate, endDate] as [DateValue, DateValue];
      });
      setDisabledRanges(fetchedRanges);
    };
    fetchData();
  }, []);

  if (!now) {
    // Render a loading state or nothing until the client-side data is available
    return null;
  }

  // const disabledRanges = [
  //   [now, now.add({ days: 5 })],
  //   [now.add({ days: 14 }), now.add({ days: 16 })],
  //   [now.add({ days: 23 }), now.add({ days: 24 })],
  // ];

  const isDateUnavailable = (date: DateValue) => {
    const intlDate = parseDate(date.toString()); // Convert ReactDateValue to IntlDateValue
    return disabledRanges.some(
      (interval) => intlDate.compare(interval[0]) >= 0 && intlDate.compare(interval[1]) <= 0
    );
  };
  // const isDateUnavailable = (date: CalendarDate) => {
  //   return disabledRanges.some(
  //     ([start, end]) => date.compare(start) >= 0 && date.compare(end) <= 0
  //   );
  // };

  return (
    <>
    <Navigation home={false}/>
    <div className={styles.container}>
      <h1 className={styles.title}>{t("availability")}</h1>
      {/* <h1 className={styles.title}> Vefügbarkeit</h1> */}
      <Calendar
        aria-label="Date (Unavailable)"
        isDateUnavailable={isDateUnavailable}
      />
    </div>
    </>    
  );
}