import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Navigation from 'components/Navigation';
import Profile from 'routes/Profile';

const AppRouter = ({ refreashUser, isLoggedIn, userObj, setUserObj }) => {
  return (
    <HashRouter>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <div
        style={{
          maxWidth: 890,
          width: '100%',
          margin: '0 auto',
          marginTop: 80,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Routes>
          {isLoggedIn ? (
            <>
              <Route exact={true} path="/" element={<Home userObj={userObj} />} />
              <Route
                exact={true}
                path="/profile"
                element={
                  <Profile userObj={userObj} setUserObj={setUserObj} refreashUser={refreashUser} />
                }
              />
            </>
          ) : (
            <Route exact={true} path="/" element={<Auth />} />
          )}
        </Routes>
      </div>
    </HashRouter>
  );
};

export default AppRouter;
