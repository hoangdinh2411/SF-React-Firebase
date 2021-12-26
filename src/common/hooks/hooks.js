import { UserContext } from '../../store/'
import { useContext, useRef } from 'react'

const useUserContext = () => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext)

    return { loggedInUser, setLoggedInUser }
}

const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

    return [htmlElRef, setFocus]
}


const showErrorMessageFromServer = (err) => {
    const index = err.indexOf("/")
    const error = err.slice(index + 1, err.length - 2)

    const words = error.split('-').map((word, wordIndex) => {
        if (wordIndex === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1, word.length)
        }

        return word
    })

    return words.join(' ')
}


export { useUserContext, useFocus , showErrorMessageFromServer}