import Image from "next/image";
import Link from "next/link";
import Homepage from "./components/homepage";
import OtherComponent from "./components/other";
import Navigation from "./components/navigation";

import { DateValue } from "@internationalized/date";

export default function Home() {
  // const [disabledRanges, setDisabledRanges] = useState<[DateValue, DateValue][]>([]);
  
  return (
    <div className="flex flex-col items-center justify-center ">
      <Homepage />
      {/* <OtherComponent /> */}
    </div>
  );
}
