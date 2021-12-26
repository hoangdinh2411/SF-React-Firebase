import { Link } from 'react-router-dom'
import styles from './SubMenubar.module.css'


function SubMenubar({loggedInUser, onHandlerSignOut}) {
    
    return (
        <ul className={styles.list}>
            <li className={styles.items}>
                <Link className={styles.itemLinks} to={`/${loggedInUser.uid}/profile`}>Profile</Link>
            </li>
            <li className={styles.items}>
                <Link className={styles.itemLinks} to={`/${loggedInUser.uid}/setting`} >Setting</Link>
            </li>
            <li className={styles.items}>
                <p to=""className={styles.itemLinks}  onClick={onHandlerSignOut}>Sign Out</p>
            </li>
        </ul>
    )
}

export default SubMenubar