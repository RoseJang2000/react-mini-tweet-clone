import Tweet from 'components/Tweet';
import { authService, dbService } from 'fBase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ userObj, setUserObj, refreashUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const navigate = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    setUserObj(null);
    navigate('/');
    refreashUser();
  };

  const getMyTweets = async () => {
    const myTweetsData = await dbService
      .collection('tweets')
      .where('creatorId', '==', userObj.uid)
      .orderBy('createdAt', 'desc')
      .get();
    // setMyTweets(myTweetsData.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyTweets();
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreashUser();
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value={newDisplayName}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: '10px',
          }}
        />
      </form>
      <button className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </button>
    </div>
  );
};

export default Profile;
