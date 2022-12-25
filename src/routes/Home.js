import { dbService } from 'fBase';
import { useState } from 'react';

const Home = () => {
  const [newTweet, setNewTweet] = useState('');
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection('Tweets').add({
      newTweet,
      createdAt: Date.now(),
    });
    setNewTweet('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={newTweet}
          placeholder="What's on your mind?"
          maxLength={120}
          onChange={onChange}
        />
        <input type="submit" value="newTweet" />
      </form>
    </div>
  );
};

export default Home;
