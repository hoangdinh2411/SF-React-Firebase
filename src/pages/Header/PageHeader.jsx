import style from './PageHeader.module.css'
import HeaderLogo from "./Logo/HeaderLogo"
import HeaderNavBar from "./NavBar/HeaderNavBar"
import NavbarActions from "./NavBar/Actions/NavbarActions"
import Display from "./NavBar/DisplayName/Display"
import { useUserContext } from '../../common/hooks'
// React bootstrap

function PageHeader({ setShowModal }) {
    const { loggedInUser } = useUserContext()
    return (
        <div className={style.wrapper}>
            <div className={style.menuTop}>
                <div className={style.logoContainer}>
                    <HeaderLogo />
                </div>
                <HeaderNavBar loggedInUser={loggedInUser} />
                <div className={style.navbarActionContainer}>
                    {
                        (loggedInUser !== null &&
                            <Display />
                        ) ||
                        <NavbarActions setShowModal={setShowModal} />
                    }
                </div>
            </div>
        </div>
    )
}

export default PageHeader