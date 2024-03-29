import { useNavigate } from 'react-router-dom';

import { signInWithPopup } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { setPersistence } from 'firebase/auth';
import { browserSessionPersistence } from 'firebase/auth';

import { GoogleAuthProvider } from 'firebase/auth';

import styles from './Login.module.css';

export default function Login() {
  const auth = getAuth();

  var navigate = useNavigate();

  async function onSocialClick() {
    try {
      await setPersistence(auth, browserSessionPersistence).then(() => {
        return signInWithPopup(auth, new GoogleAuthProvider());
      });

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.label}>login</div>

        <div className={styles.comment}>
          별도의 회원 가입 없이
          <br />
          Google 계정으로
          <br />
          테스트콘을 이용할 수 있습니다.
        </div>

        <div className={styles.button} onClick={onSocialClick}>
          로그인
        </div>
      </div>
    </div>
  );
}
