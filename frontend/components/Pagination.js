import styles from '../styles/pagination.module.css';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className={styles.container}>
            <button className={styles.btn}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}>
                ‹ Prev
            </button>
            <span className={styles.pageInfo}>
                Page {currentPage} of {totalPages}
            </span>
            <button
                className={styles.btn}
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange(currentPage + 1)}>
                Next ›</button>
        </div>
    );
}






















// export default function Pagination({ currentPage, totalPages, onPageChange }) {
//     return (
//         <div className={styles.container}>
//             <button
//             className={styles.btn}
//             >
//                 ‹ Prev
//             </button>

//             <span className={styles.pageInfo}>
//           Page
//         </span>

//             <button
//             className={styles.btn}
//         >
//                 Next ›
//             </button>
//         </div>
//     )
// }
