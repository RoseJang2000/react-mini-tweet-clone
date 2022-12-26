import { storageService, dbService } from 'fBase';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaPlus, FaTimes } from 'react-icons/fa';

const TweetFactory = ({ userObj }) => {
  const [newTweet, setNewTweet] = useState('');
  const [attachment, setAttachment] = useState('');

  const fileInput = useRef();

  const onSubmit = async (event) => {
    if (newTweet === '') {
      return;
    }
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
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          type="text"
          value={newTweet}
          placeholder="What's on your mind?"
          maxLength={120}
          onChange={onChange}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FaPlus />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
        ref={fileInput}
      />

      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FaTimes />
          </div>
        </div>
      )}
    </form>
  );
};

export default TweetFactory;
