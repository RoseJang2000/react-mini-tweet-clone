import { storageService, dbService } from 'fBase';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TweetFactory = ({ userObj }) => {
  const [newTweet, setNewTweet] = useState('');
  const [attachment, setAttachment] = useState('');

  const fileInput = useRef();

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = '';
    if (attachment !== '') {
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileRef.putString(attachment, 'data_url');
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const newTweetObj = {
      text: newTweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection('tweets').add(newTweetObj);
    setNewTweet('');
    setAttachment('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(file);
  };

  const onClearAttachment = () => {
    setAttachment('');
    fileInput.current.value = '';
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={newTweet}
        placeholder="What's on your mind?"
        maxLength={120}
        onChange={onChange}
      />
      <input type="file" accept="image/*" onChange={onFileChange} ref={fileInput} />
      <input type="submit" value="newTweet" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default TweetFactory;
