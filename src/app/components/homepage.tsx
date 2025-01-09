import Navigation from "./navigation";

export default function Homepage() {
    return (
        <div className="bg-white-500 w-full h-screen"
        style={{ backgroundImage: "url('/schonbrunn.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center"
         }}>
            {/* <h1>Homepage</h1> */}
            {/* <Navigation/>  */}
        </div>
    )
}