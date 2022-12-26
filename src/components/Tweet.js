import { dbService, storageService } from 'fBase';
import { useState } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [tweetText, setTweetText] = useState(tweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this tweet?');
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      if (tweetObj.attachmentUrl) {
        await storageService.refFromURL(tweetObj.attachmentUrl).delete();
      }
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: tweetText,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweetText(value);
  };

  return (
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              value={tweetText}
              placeholder="Edit your tweet"
              onChange={onChange}
              required
              className="formInput"
            />
            <input type="submit" value="Update Tweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} />}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FaTrash />
              </span>
              <span onClick={toggleEditing}>
                <FaPencilAlt />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
