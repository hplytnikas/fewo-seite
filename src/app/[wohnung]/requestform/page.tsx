"use client";

import Navigation from "@/app/components/navigation";
import styles from "./requestform.module.css";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Form } from "@heroui/form";
import { Input, Button, NumberInput, Textarea, RangeValue } from "@heroui/react";
import { useEffect, useState } from "react";
import { DateRangePicker } from "@heroui/date-picker";
import { RadioGroup, Radio } from "@heroui/radio";
import { useDisabledRanges } from "@/app/context/disabledrangescontext";
import { DateValue, getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { FetchDate } from "@/app/lib/fetching";
import { POST } from "@/app/api/send-email/route";

export default function Page() {
  //logic to check which wohnung it is - automatically knows which one it is
  const { wohnung } = useParams();
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState<{
    [key: string]: FormDataEntryValue;
  } | null>(null);
  const [action, setAction] = useState<string | null>(null);
  const [selected, setSelected] = useState("No");
  const { disabledRanges, setDisabledRanges } = useDisabledRanges();
  const [now, setNow] = useState<DateValue | null>(null);
  const [value, setValue] = useState<{ start: DateValue; end: DateValue }>({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()),
  });
  const [stringDateRange, setStringDateRange] = useState<string[] | null>(null);

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


  const isDateUnavailable = (date: DateValue) => {
      const intlDate = parseDate(date.toString()); // Convert ReactDateValue to IntlDateValue
      return disabledRanges.some(
        (interval) => intlDate.compare(interval[0]) >= 0 && intlDate.compare(interval[1]) <= 0
      );
    };

  const handleSubmit = async (jsondata: { [k: string]: FormDataEntryValue; }) => {
    const data = {
      wohnung: wohnung === "villaforyou" ? "Villa For You" : "Unter der Linde",
      email: jsondata.email as string,
      lastname: jsondata.lastname as string,
      message: jsondata.message as string || "",
      name: jsondata.name as string,
      people: parseInt(jsondata.people as string),
      petList: jsondata["pet-list"] as string || "",
      pets: jsondata.pets as string,
      startDate: jsondata.startDate as string,
      endDate: jsondata.endDate as string,
    };
    // console.log("Data Type: ", typeof JSON.stringify(data));
    
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
        // const data = await res.json();
      // if (!res.ok) throw new Error(data.error || "Failed to send email");

      // setResponse("Email sent successfully!");
      });
    } catch (error) {
      // setResponse(error.message);
      console.error("Error: ", error);
    }
  };

  const processInputDate = (range: RangeValue<DateValue> | null) => {
      if (range && range.start && range.end) {
        setValue({ start: range.start, end: range.end });
        setStringDateRange([range.start.toString(), range.end.toString()]);
        console.log("Value: ", value);
        console.log("String Date Range: ", stringDateRange);
      }
    };

  return (
    <>
      <Navigation home={false} />
      <div className={styles.container}>
        <h1 className={styles.heading}> {t("request form")} </h1>
        <div className={styles.form}>
          <Form
            className="w-full max-w-xs flex flex-col gap-3"
            onReset={() => setAction("reset")}
            onSubmit={(e) => {
              e.preventDefault();
              let data = Object.fromEntries(new FormData(e.currentTarget));
             
              const formatDate = (date: string) => {
                const [year, month, day] = date.split("-");
                return `${day}.${month}.${year}` as string;
              };

              data.startDate = stringDateRange ? formatDate(stringDateRange[0]) : "no date";
              data.endDate = stringDateRange ? formatDate(stringDateRange[1]) : "no date";
              console.log("Data: ", data);
              setAction(`submit ${JSON.stringify(data)}`);
              handleSubmit(data);
            }}
          >
            <Input
              isRequired
              errorMessage="Please enter a valid name"
              label={t("name")}
              labelPlacement="outside"
              name="name"
              placeholder={t("enter your name")}
              type="text"
              className={styles.input}
            />
            <Input
              isRequired
              errorMessage="Please enter a valid lastname"
              label={t("surname")}
              labelPlacement="outside"
              name="lastname"
              placeholder={t("enter your surname")}
              type="text"
            />
            <Input
              isRequired
              errorMessage="Please enter a valid email"
              label={t("email")}
              labelPlacement="outside"
              name="email"
              placeholder={t("enter your email")}
              type="email"
            />
            <DateRangePicker
              isRequired
              className="max-w-xs"
              label={t("stay duration")}
              labelPlacement="outside"
              isDateUnavailable={isDateUnavailable}
              // value={value}
              onChange={processInputDate}
            />
            <NumberInput
              isRequired
              errorMessage="Please enter a valid number"
              label={t("number of guests")}
              labelPlacement="outside"
              name="people"
              placeholder={t("enter number of guests")}
              minValue={1}
              maxValue={wohnung === "villaforyou" ? 7 : 10}
            />

            <label className={styles.radioLabel}>{t("do you have pets")}</label>
            <RadioGroup
              //   className={styles.radioLabel}
              isRequired
              label=""
              name="pets"
              orientation="horizontal"
              size="sm"
              // color="danger"
              value={selected}
              onValueChange={setSelected}
            >
              <Radio value="Yes">{t("yes")}</Radio>
              <Radio value="No">{t("no")}</Radio>
            </RadioGroup>
            {selected === "Yes" && (
              <Input
                label={t("what pets do you have")}
                labelPlacement="outside"
                name="pet-list"
                placeholder={t("list your pets")}
                type="text"
              />
            )}
            <Textarea
              label={t("message")}
              labelPlacement="outside"
              name="message"
              placeholder={t("enter message")}
              type="text"

              // className={styles.message}
            />

            <div className="flex gap-2">
              <Button color="primary" type="submit">
                {t("submit")}
              </Button>
              <Button type="reset" variant="flat">
                {t("reset")}
              </Button>
            </div>
            {action && (
              <div className="text-small text-default-500">
                {action === "reset" ? t("reset form") : t("request submitted")}
              </div>
            )}
          </Form>
        </div>
      </div>
    </>
  );
}
