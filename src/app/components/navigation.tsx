import Link from "next/link";
import styles from "./navigation.module.css";

export default function Navigation() {
    return (
        <nav className="p-4" style={{height : "6vh"}}>
            <div className={styles.navButton}> 
                <Link href="/checkout"> 
                    Checkout
                </Link>
            </div>
        </nav>
    )
}
