import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { AppDispatch } from '../../services/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUserThunk, registerUserThunk } from '../../services/userActions';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeUserName: React.ReactEventHandler<HTMLInputElement> = (e) => {
    setUserName(e.currentTarget.value);
  };
  const onChangeLogin: React.ReactEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onChangePassword: React.ReactEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.currentTarget.value);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const name = userName;

    dispatch(registerUserThunk({ email, name, password }))
      .unwrap()
      .then(() => {
        dispatch(loginUserThunk({ email, password }))
          .unwrap()
          .then(() => {
            navigate('/');
          })
          .catch(({ message }) => alert(message));
      })
      .catch(({ message }) => alert(message));
  };

  return (
    <RegisterUI
      errorText=''
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
