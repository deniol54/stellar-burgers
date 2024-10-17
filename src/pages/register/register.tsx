import { FC, SyntheticEvent, useReducer, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { registerUser, getUser } from '@slices';
import { useDispatch, useSelector } from '../../services/store';
import { TRegisterData } from '@api';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const data: TRegisterData = {
      email: email,
      name: userName,
      password: password
    };
    dispatch(registerUser(data))
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
    <RegisterUI
      errorText={error?.message}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
