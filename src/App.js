import './App.css';
import { PageHeader } from './pages/'
import Modal from './common/components/Modal/Modal'
import Routers from './routes/Routers'
//react
import { useState, useEffect } from 'react'
import { UserContext } from './store/'
import React from 'react'

// React bootstrap

//firebase auth
import { auth, onAuthStateChanged } from './utils/firebase'
function App() {
  const [showModal, setShowModal] = useState({
    isShowed: false,
    showLoginForm: false,
    showRegisterForm: false
  })
  const [loggedInUser, setLoggedInUser] = useState(null)

  


  useEffect(() => {
    if (loggedInUser) return;
    onAuthStateChanged(auth, user => {
      if (user !== null) {
        import('./utils/')
          .then(({ getUserInfo }) => {
            return getUserInfo(user.uid);
          })
          .then(data => {
            setLoggedInUser(data)
          })
          .catch(err => {
            alert(err.message)

          })
      }

      return
    })
  }, [loggedInUser])

  return (
   
    < UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      <React.StrictMode>
        <PageHeader setShowModal={setShowModal} />
        <div className="dashBoardWrapper">
          <Routers loggedInUser={loggedInUser} />
          {
            (showModal.isShowed &&
              <Modal showModal={showModal} setShowModal={setShowModal} />)
            || null
          }
        </div>
      </React.StrictMode>
    </UserContext.Provider >


  );
}

export default App;
