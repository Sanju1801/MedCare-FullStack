// doctor card component
'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../styles/card.module.css";

export default function Doctor_card({ doctor }) {
    const router = useRouter();

    return (
        <div className={styles.card}>
            <div 
                className={styles.profile} 
                onClick={() => router.push(`/appointments/${doctor.doctor_id}`)}
                >
                    <img src={doctor.picture} alt={doctor.name} width={120} height={120} className={styles.profilePic} />
                    <h3 className={styles.name}>{doctor.doctor_name}, {doctor.title}</h3>
                    <div className={styles.description}>
                        <div className={styles.descTitle}>
                             <Image
                                src="/Stethoscope.svg"
                                alt="Stethoscope icon"
                                width={16}
                                height={16}
                                className={styles.descImg}
                            />
                            <span>{doctor.expertise}</span>
                        </div>
                        <div className={styles.descTitle}>
                            <Image
                                src="/Hourglass.svg"
                                alt="Hourglass icon"
                                width={16}
                                height={16}
                                className={styles.descImg}
                            />
                            <span>{doctor.experience} Years</span>
                        </div>
                    </div>
                    <div className={styles.rating}>
                        <span>Ratings:</span>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Image
                                key={index}
                                src={index < doctor.rating ? "/filled_star.svg" : "/empty_star.svg"}
                                alt="Star icon"
                                width={16}
                                height={16}
                                className={styles.star}
                            />
                        ))}
                    </div>
                </div>
                <button 
                    className={styles.bookBtn}
                    onClick={() => router.push(`/appointments/${doctor.doctor_id}/booking`)}
                >
                    Book Appointment
                </button>
        </div>
    );
}