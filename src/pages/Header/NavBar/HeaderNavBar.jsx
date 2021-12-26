import { Link } from 'react-router-dom';
import styles from './HeaderNavBar.module.css'
    
function HeaderNavBar({ loggedInUser }) {

    return (
        <ul className={styles.list}>
            <li className={styles.items}>
                <Link to="/" className={styles.links}>Home</Link>
            </li>
            <li className={styles.items}>
                <Link to="/theory" className={styles.links}>Theory</Link>
            </li>
            {
                (loggedInUser !== null &&
                    <li className={styles.items}>
                        <Link to={`/${loggedInUser.uid}/exercises`} className={styles.links} >Exercises</Link>
                    </li>
                )
            }

            <li className={styles.items}>
                <Link to="/tutorial" className={styles.links} >Tutorial</Link>
            </li>

        </ul>
    );
}

export default HeaderNavBar;