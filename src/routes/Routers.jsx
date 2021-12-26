import { Routes, Route } from 'react-router-dom';
import { Profile, PageSetting } from '../pages/'

function Routers({ loggedInUser }) {
    return (
        <Routes >
            <Route path="/" exact element={<h1>Home</h1>} />
            {
                (loggedInUser !== null &&
                    <>
                        <Route path={`${loggedInUser.uid}/*`}  >
                            <Route path="profile" element={<Profile />} />
                            <Route path="exercises" element={<h1>exercises</h1>} />
                            <Route path="setting" element={<PageSetting />} />
                        </Route>
                    </>
                ) || null
            }
            <Route path="theory" element={<h1>theory</h1>} />

            <Route path="tutorial" element={<h1>tutorial</h1>} />
            <Route path="about" element={<h1>about</h1>} />
        </Routes >
    );
}

export default Routers;
