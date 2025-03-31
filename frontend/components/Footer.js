import Image from "next/image";
import styles from "../styles/footer.module.css";

export default function Footer() {
    return (
        <div className={styles.footerContainer}>
            <span>@EmScripts 2024. All Rights Reserved.</span>
            <Image src="/Social_media.png" width={60} height={60} alt="social media" />
        </div>
    );
}
