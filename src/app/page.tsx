import Image from "next/image";
import Link from "next/link";
import Homepage from "./components/homepage";
import OtherComponent from "./components/other";
import Navigation from "./components/navigation";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center ">
      {/* <h1>Home</h1>
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        width={72}
        height={16}
      />

      <Link href="/checkout">
        Checkout
      </Link> */}
      <Homepage />
      <OtherComponent />
    </div>
  );
}
