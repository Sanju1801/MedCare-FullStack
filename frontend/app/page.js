import styles from "@/styles/home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      {/* Left Section */}
      <div className={styles.leftContainer}>
        <div className={styles.titleContainer}>
          <h1>Health in Your Hands.</h1>
          <p>
            Take control of your healthcare with CareMate. Book appointments with ease, explore health blogs, and
            stay on top of your well-being, all in one place.
          </p>
        </div>
        <button className={styles.startBtn}>
          <Link href="/login">Get Started</Link>
        </button>
      </div>

      {/* Right Section */}
      <div className={styles.rightContainer}></div>
    </div>
  );
}
