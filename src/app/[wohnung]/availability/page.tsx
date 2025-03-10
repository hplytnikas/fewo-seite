"use client";

import { Calendar, RangeValue } from "@heroui/calendar";
import styles from "./availability.module.css";
import { FetchDate } from "@/app/lib/fetching";
import { useTranslation } from "react-i18next";
import {
  today,
  getLocalTimeZone,
  isWeekend,
  DateValue,
  CalendarDate,
  parseDate,
} from "@internationalized/date";
import { useEffect, useState } from "react";
// import { sql } from '@vercel/postgres';
import { DatabaseError, neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import Navigation from "@/app/components/navigation";
import { useParams } from "next/navigation";
import { useDisabledRanges } from "@/app/context/disabledrangescontext";
import { DateRangePicker } from "@heroui/date-picker";
import { Input, NumberInput } from "@heroui/react";

export default function Page() {
  const { wohnung } = useParams();
  dotenv.config();
  const { t } = useTranslation();
  // const { locale } = useLocale();
  const [now, setNow] = useState<DateValue | null>(null);
  // const [disabledRanges, setDisabledRanges] = useState<[DateValue, DateValue][]>([]);
  const { disabledRanges, setDisabledRanges } = useDisabledRanges();
  const [price, setPrice] = useState<number>(0);
  const [people, setPeople] = useState<number>(1);

  const [value, setValue] = useState<{ start: DateValue; end: DateValue }>({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()),
  });

  // console.log("Disabled Ranges: ", disabledRanges);

  //get the input from the calendar
  const processInputDate = (range: RangeValue<DateValue> | null) => {
    if (range && range.start && range.end) {
      setValue({ start: range.start, end: range.end });
      console.log("Value: ", value);
    }
  };

  //calculate the price
  useEffect(() => {
    const calculateTotalPrice = () => {
      if (value.start && value.end) {
        const startDate = new Date(
          value.start.year,
          value.start.month - 1,
          value.start.day
        );
        const endDate = new Date(
          value.end.year,
          value.end.month - 1,
          value.end.day
        );
        const timeDiff = endDate.getTime() - startDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const totalPrice = daysDiff * 30 * people;
        console.log("Total Price: ", totalPrice);
        return totalPrice;
      }
    };
    const tmpprice = calculateTotalPrice();
    setPrice(tmpprice as number);
  }, [value, people]);

  useEffect(() => {
    const fetchData = async () => {
      setNow(today(getLocalTimeZone()));

      const result = (await FetchDate(wohnung as string)) as {
        start_date: string;
        end_date: string;
      }[];
      const fetchedRanges = result.map((row) => {
        // console.log("Type: ", new Date(Date.parse(row.start_date)).toISOString().split('T')[0]);

        const startDate = parseDate(
          new Date(Date.parse(row.start_date)).toISOString().split("T")[0]
        );
        const endDate = parseDate(
          new Date(Date.parse(row.end_date)).toISOString().split("T")[0]
        );
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

  const isDateUnavailable = (date: DateValue) => {
    const intlDate = parseDate(date.toString()); // Convert ReactDateValue to IntlDateValue
    return disabledRanges.some(
      (interval) =>
        intlDate.compare(interval[0]) >= 0 && intlDate.compare(interval[1]) <= 0
    );
  };

  return (
    <>
      <Navigation home={false} />
      <div className={styles.container}>
        <h1 className={styles.title}>{t("availability")}</h1>
        <div className={styles.subContainer}>
          <Calendar
            aria-label="Date (Unavailable)"
            isDateUnavailable={isDateUnavailable}
          />
          <div className={styles.price}>
            <h3 className={styles.priceHeader}> {t("check the price")}</h3>
            <DateRangePicker
              className="max-w-xs"
              label={t("select dates")}
              labelPlacement="outside"
              isDateUnavailable={isDateUnavailable}
              value={value}
              onChange={processInputDate}
              // size="lg"
            />
            <NumberInput
              className="max-w-xs pt-3"
              errorMessage="Please enter a valid number"
              label={t("number of guests")}
              labelPlacement="outside"
              name="people"
              placeholder={t("enter number of guests")}
              minValue={1}
              maxValue={wohnung === "villaforyou" ? 7 : 10}
              value={people}
              onValueChange={setPeople}
            />
            <p className="pt-3">
              {" "}
              {t("total price")}: {price}
            </p>
          </div>
        </div>
        {/* <h1 className={styles.title}> Vefügbarkeit</h1> */}
      </div>
    </>
  );
}
