"use client";

import styles from "./changeAvailability.module.css";
import { Calendar, RangeValue } from "@heroui/calendar";
import { useTranslation } from "react-i18next";
import {
  today,
  getLocalTimeZone,
  isWeekend,
  DateValue,
  CalendarDate,
  parseDate,
} from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { Key, useEffect, useState } from "react";
// import { sql } from '@vercel/postgres';
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import { FetchDate, addDate, deleteDate } from "@/app/lib/fetching";

import { DateRangePicker } from "@heroui/date-picker";
import { Select, SelectSection, SelectItem } from "@heroui/select";
import { format, toZonedTime } from "date-fns-tz";

export default function Page() {
  dotenv.config();
  const { t } = useTranslation();
  const { locale } = useLocale();
  //   const [now, setNow] = useState<DateValue | null>(null);
  const [disabledRanges, setDisabledRanges] = useState<
    [DateValue, DateValue][]
  >([]);
  const [value, setValue] = useState<{ start: DateValue; end: DateValue }>({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()),
  });
  const [deleteValue, setDeleteValue] = useState<[DateValue, DateValue] | null>(
    null
  );

  //fetch data from database
  useEffect(() => {
    console.log("Local Time Zone: ", getLocalTimeZone());
    // setNow(today(getLocalTimeZone()));

    const fetchData = async () => {
      const result = (await FetchDate()) as {
        start_date: string;
        end_date: string;
      }[];
      const fetchedRanges = result.map((row) => {
        //long ass conversion from postgresql to javascript date
        const startDate = parseDate(
          new Date(Date.parse(row.start_date)).toISOString().split("T")[0]
        );
        console.log("Fetched Start date ", startDate); //correct

        const endDate = parseDate(
          new Date(Date.parse(row.end_date)).toISOString().split("T")[0]
        );
        // console.log("Start Date: ", startDate);
        // console.log("End Date: ", endDate);
        return [startDate, endDate] as [DateValue, DateValue];
      });
      setDisabledRanges(fetchedRanges);
      console.log(fetchedRanges);
    };
    fetchData();
  }, []);

  //   if (!now) {
  //     // Render a loading state or nothing until the client-side data is available
  //     return null;
  //   }

  const isDateUnavailable = (date: DateValue) =>
    disabledRanges.some(
      (interval) =>
        date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
    );

  const processInputDate = (range: RangeValue<DateValue> | null) => {
    if (range && range.start && range.end) {
      setValue({ start: range.start, end: range.end });
      console.log("Value: ", value);
      setDisabledRanges([...disabledRanges, [range.start, range.end]]);
      //   console.log("Start Input: ", range.start.toDate(getLocalTimeZone()));
      //   console.log("End Input: ", range.end.toDate(getLocalTimeZone()));
      addDate(
        range.start.toDate(getLocalTimeZone()).toISOString(),
        range.end.toDate(getLocalTimeZone()).toISOString()
      );
    }
  };

  const processDeleteDate = (keys: "all" | Iterable<Key> | undefined) => {
    if (!keys || (Array.isArray(keys) && keys.length === 0)) {
      return;
    }
    if (keys && keys !== "all") {
      const selectedRanges = Array.from(keys).map((key) => {
        console.log("Key: ", key);
        console.log(disabledRanges[Number(key)]);
        const start = disabledRanges[Number(key)][0]
          .toDate(getLocalTimeZone())
          .toISOString();
        console.log("Start Delete: ", start);
        const end = disabledRanges[Number(key)][1]
          .toDate(getLocalTimeZone())
          .toISOString();
        console.log("Start Delete: ", start);
        console.log("End Delete: ", end);

        //delete that from selected ranges
        setDisabledRanges(
          disabledRanges.filter(
            (r) =>
              !(
                r[0].compare(disabledRanges[Number(key)][0]) === 0 &&
                r[1].compare(disabledRanges[Number(key)][1]) === 0
              )
          )
        );
        deleteDate(start, end);
      });
      // setDeleteValue(selectedRanges);
    } else {
      setDeleteValue(null);
    }
  };
  const timeZone = "Europe/Berlin";

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Zugriff</h1>
      <Calendar
        aria-label="Date (Unavailable)"
        isDateUnavailable={isDateUnavailable}
      />
      <div className={styles.editContainer}>
        <h1 className="mt-1">Belegten Zeitraum eintragen:</h1>
        <DateRangePicker
          aria-label="Date Range"
          // isDateUnavailable={isDateUnavailable}
          value={value}
          onChange={processInputDate}
        />
        <h1 className="mt-1">Belegten Zeitraum löschen:</h1>
        <Select
          label="Belegten Zeitraum löschen"
          placeholder="Auswählen"
          selectedKeys={[]}
          onSelectionChange={processDeleteDate}
          selectionMode="single"
        >
          {disabledRanges.map((range, index) => (
            <SelectItem
              key={index}
              textValue={`${
                range[0].toDate(getLocalTimeZone()).toISOString().split("T")[0]
              } - ${
                range[1].toDate(getLocalTimeZone()).toISOString().split("T")[0]
              }`}
            >
              <p className={styles.selectItem}>
                {format(
                  toZonedTime(range[0].toDate(getLocalTimeZone()), timeZone),
                  "yyyy-MM-dd"
                )}{" "}
                -{" "}
                {format(
                  toZonedTime(range[1].toDate(getLocalTimeZone()), timeZone),
                  "yyyy-MM-dd"
                )}
              </p>
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
