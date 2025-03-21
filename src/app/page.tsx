import Image from "next/image";
import Link from "next/link";
import Homepage from "./components/homepage";
import OtherComponent from "./components/other";
import Navigation from "./components/navigation";

import { DateValue } from "@internationalized/date";

export default function Home() {
  
  return (
    <div className="flex flex-col items-center justify-center ">
      <Homepage />
    </div>
  );
}

//changing the title of the page
export const metadata = {
  title: "Fewo Seite",
  // description: "My description",
}