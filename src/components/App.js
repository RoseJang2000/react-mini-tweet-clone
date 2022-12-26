import AppRouter from 'components/Router';
import { useEffect, useState } from 'react';
import { authService } from 'fBase';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // ! option1
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
        // ! option2
        // setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreashUser = () => {
    const user = authService.currentUser;
    // ! option1
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
    // ! option2
    // setUserObj(Object.assign({}, user));
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreashUser={refreashUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          setUserObj={setUserObj}
        />
      ) : (
        'initializing'
      )}
    </>
  );
}

export default App;
