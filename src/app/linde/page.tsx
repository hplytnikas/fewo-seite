import Navigation from "../components/navigation";
import { DateValue, getLocalTimeZone, parseDate } from "@internationalized/date";
import { FetchDate } from "../lib/fetching";

export default function Page() {
    
    return(
        <>
            <Navigation home={false}/>
            <div>
                Linde
            </div>
        </>
    )
}

function setDisabledRanges(fetchedRanges: [DateValue, DateValue][]) {
    throw new Error("Function not implemented.");
}