import '../index.css';
import { useState, useCallback, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import api from '../utils/Api';
import Register from './Register';
import Login from './Login';
import Mesto from './Mesto';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from "./InfoTooltip";

export default function App(updateData) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [isInfoTooltipYesOpen, setInfoTooltipYesOpen] = useState(false);
  const [isInfoTooltipNoOpen, setInfoTooltipNoOpen] = useState(false);

  const cbAuthenticate = useCallback((data) => {
    data.token && localStorage.setItem('jwt', data.token);
    data.data && setUserData(data.data);
    setLoggedIn(true);
  }, []);

  const tokenCheck = useCallback(async () => {
    try {
      setLoading(true)
      let jwt = localStorage.getItem('jwt');
      if (!jwt) {
        throw new Error('no token');
      }
      const user = await api.checkToken(jwt);
      if (!user) {
        throw new Error('invalid user');
      }
      if (user) {
        setLoggedIn(true);
        setUserData(user.data);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    };
  }, [loggedIn]);

  const cbLoding = useCallback(async (login, password) => {
    try {
      setLoading(true);
      const data = await api.authorize(login, password);
      if (!data) {
        throw new Error('Неверные имя или пароль пользователя');
      }
      if (data.token) {
        cbAuthenticate(data);
      }
      return data;
    } catch (err) {
      setInfoTooltipNoOpen(true);
    } finally {
      setLoading(false);
    };
  }, [cbAuthenticate]);

  const cbRegister = useCallback(async (login, password) => {
    try {
      setLoading(true);
      const data = await api.register(login, password);
      cbLoding(login, password);
      setInfoTooltipYesOpen(true);
      return data;
    } catch (err) {
      setInfoTooltipNoOpen(true);
    } finally {
      setLoading(false);
    };
  }, [cbAuthenticate]);

  const cbLogout = useCallback(() => {
    setLoading(true);
    localStorage.removeItem('jwt');
    setUserData({});
    setLoggedIn(false);
    setLoading(false);
  }, []);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  if (loading) {
    return '...Loading'
  }

  function closeAllPopups() {
    setInfoTooltipYesOpen(false);
    setInfoTooltipNoOpen(false);
  };

  return (
    <>
      <InfoTooltip
        isOpen={isInfoTooltipYesOpen}
        title="Вы успешно зарегистрировались!"
        img="union-yes"
        onClose={closeAllPopups}
      />
      <InfoTooltip
        isOpen={isInfoTooltipNoOpen}
        title="Что-то пошло не так! Попробуйте ещё раз."
        img="union-no"
        onClose={closeAllPopups}
      />
      <Switch>
        <ProtectedRoute path="/mesto" loggedIn={loggedIn} cbLogout={cbLogout} userData={userData} component={Mesto} />
        <Route path="/sign-in">
          <Login loggedIn={loggedIn} onLogin={cbLoding} updateData={updateData} />
        </Route>
        <Route path="/sign-up">
          <Register loggedIn={loggedIn} onRegister={cbRegister} />
        </Route>
        <Route >
          {loggedIn ? <Redirect to="/mesto" /> : <Redirect to="/sign-up" />}
        </Route>
      </Switch >
    </>
  );
};