import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { getUserThunk, loginUserThunk } from '../../services/userActions';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, useDispatch } from '../../services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeLogin: React.ReactEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onChangePassword: React.ReactEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.currentTarget.value);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(loginUserThunk({ email, password }))
      .unwrap()
      .then(() => {
        dispatch(getUserThunk())
          .unwrap()
          .then(() => {
            navigate('/');
          })
          .catch(({ message }) => alert(message));
      })
      .catch(({ message }) => alert(message));
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
