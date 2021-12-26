import style from './DisplayName.module.css';
import avatarDefault from '../../../../assets/avatar.png';
import SubMenubar from './SubMenubar/SubMenubar';
import { useUserContext } from '../../../../common/hooks'
import { useNavigate } from 'react-router-dom'
import { signOutUser } from '../../../../utils';
import clsx from 'clsx';
function Display() {
    const navigation = useNavigate()

    const { loggedInUser, setLoggedInUser } = useUserContext()
    const { avatar } = loggedInUser
    const imageLink = !avatar ? avatarDefault : avatar
    const displayName = loggedInUser.displayName ? loggedInUser.displayName : loggedInUser.email
    const displayClass = clsx({
        [style.displayText]: true,
        [style.email ]: loggedInUser.displayName === '',
        [style.name ]: loggedInUser.displayName !== ''
    })
    const handleSignOut = () => {
        signOutUser()
        setLoggedInUser(null)
        navigation('/')
    }

    return (
        <>
            <div className={style.wrapper}>
                <div className={style.avatarContainer} >
                    <img className={style.avatar} src={imageLink} title={displayName} alt="user avatar" />
                </div>
                <p className={displayClass}>{displayName}</p>
                <div className={style.subMenubar}>
                    <SubMenubar onHandlerSignOut={handleSignOut} loggedInUser={loggedInUser} />
                </div>
            </div>
        </>
    )
}

export default Display