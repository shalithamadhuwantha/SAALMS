import Image from "next/image";
import styles from "./login.module.css";
import LoginCard from "./components/LoginCard";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen">
        <LoginCard />
      </main>
    // <main className={styles.mainBg}>
    //     <div className={styles.maincanvaLogin}>

    //     </div>
    // </main>
  );
}
