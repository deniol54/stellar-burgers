import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { getUser, loginUser } from '@slices';
import { TLoginData } from '@api';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const data: TLoginData = {
      email: email,
      password: password
    };
    dispatch(loginUser(data))
      .unwrap()
      .then(() => {
        dispatch(getUser())
          .unwrap()
          .then(() => {
            navigate('/');
          })
          .catch((err) => setError(err));
      })
      .catch((err) => setError(err));
  };

  return (
    <LoginUI
      errorText={error?.message}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
