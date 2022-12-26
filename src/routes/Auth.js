import AuthForm from 'components/AuthForm';
import { authService, firebaseInstance } from 'fBase';
import { FaTwitter, FaGoogle, FaGithub } from 'react-icons/fa';

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

  return (
    <div className="authContainer">
      <FaTwitter color={'#04AAFF'} size="40" style={{ marginBottom: 30 }} />
      <AuthForm />
      <div className="authBtns">
        <button name="google" onClick={onSocialClick} className="authBtn">
          Continue with Google <FaGoogle />
        </button>
        <button name="github" onClick={onSocialClick} className="authBtn">
          Continue with Github <FaGithub />
        </button>
      </div>
    </div>
  );
};

export default Auth;
