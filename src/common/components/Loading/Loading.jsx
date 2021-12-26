import styles from './Loading.module.css'
function Loading() {
    return (
        <div className="loading">
            <div className={styles.preloader}>
                < div className={styles.load}>
                    < div className={styles.box}></div>
                    < div className={styles.hill}></div>
                </div >
            </div >
        </div>
    )
}

export default Loading