"use client";

import Navigation from "@/app/components/navigation";
import styles from "./requestform.module.css";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Form } from "@heroui/form";
import { Input, Button, NumberInput } from "@heroui/react";
import { useState } from "react";
import { DateRangePicker } from "@heroui/date-picker";
import { RadioGroup, Radio } from "@heroui/radio";


export default function Page() {
  //logic to check which wohnung it is - automatically knows which one it is
  const { wohnung } = useParams();
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState<{
    [key: string]: FormDataEntryValue;
  } | null>(null);
  const [action, setAction] = useState<string | null>(null);
  const [selected, setSelected] = useState("No");
  

  //   const onSubmit = (e) => {
  //     e.preventDefault();

  //     const data = Object.fromEntries(new FormData(e.currentTarget));

  //     setSubmitted(data);
  //   };

  return (
    <>
      <Navigation home={false} />
      <div className={styles.container}>
        <h1 className={styles.heading}> {t("request form")} </h1>
        <div className={styles.form}>
          <Form
            className="w-full max-w-xs flex flex-col gap-4"
            onReset={() => setAction("reset")}
            onSubmit={(e) => {
              e.preventDefault();
              let data = Object.fromEntries(new FormData(e.currentTarget));
              setAction(`submit ${JSON.stringify(data)}`);
            }}
          >
            <Input
              isRequired
              errorMessage="Please enter a valid name"
              label="Name"
              labelPlacement="outside"
              name="name"
              placeholder="Enter your name"
              type="text"
              className={styles.input}
            />
            <Input
              isRequired
              errorMessage="Please enter a valid lastname"
              label="Lastname"
              labelPlacement="outside"
              name="lastname"
              placeholder="Enter your lastname"
              type="text"
            />
            <Input
              isRequired
              errorMessage="Please enter a valid email"
              label="Email"
              labelPlacement="outside"
              name="email"
              placeholder="Enter your email"
              type="email"
            />
            <DateRangePicker
              isRequired
              className="max-w-xs"
              label="Stay duration"
              labelPlacement="outside"
            />
            {/* <div>
              <label> Dauer: </label>
              <input type="text" id="dauer" name="dauer" required />
            </div> */}

            {/* <div>
              <label> Number of People: </label>
              <input type="number" id="people" name="people" required />
            </div> */}
            {/* <div>
              <label> Pet: </label>
              <input type="text" id="pet" name="pet" required />
            </div> */}
            <NumberInput
              isRequired
              errorMessage="Please enter a valid number"
              label="Number of people"
              labelPlacement="outside"
              name="people"
              placeholder="Enter number of people"
              minValue={1}
            />

            <label className={styles.radioLabel}> Do you have pets?</label>
            <RadioGroup
            //   className={styles.radioLabel}
              label=""
              name="pets"
              orientation="horizontal"
              size="sm"
              // color="danger"
              value={selected} 
              onValueChange={setSelected}
            >
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </RadioGroup>
            {selected === "Yes" && (
              <Input
                label="What pet do you have?"
                labelPlacement="outside"
                name="pet-list"
                placeholder="List you pets"
                type="text"
              />
            )}
            <Input
              label="Message"
              labelPlacement="outside"
              name="message"
              placeholder="Enter your message"
              type="text"
              size="md"
            />

            <div className="flex gap-2">
              <Button color="primary" type="submit">
                Submit
              </Button>
              <Button type="reset" variant="flat">
                Reset
              </Button>
            </div>
            {action && (
              <div className="text-small text-default-500">
                Action: <code>{action}</code>
              </div>
            )}
          </Form>
        </div>
      </div>
    </>
  );
}
