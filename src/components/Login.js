import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';

export default function Login({ loggedIn, onLogin }) {
  const [userData, setUserData] = useState({
    usermail: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.usermail || !userData.password) {
      return;
    }
    onLogin(userData.usermail, userData.password);
  };

  if (loggedIn) {
    return <Redirect to="/" />
  };

  return (
    <>
      <Header title={'Регистрация'} link="/mesto" />
      <main className="content" >
        <section className="profile profile_condition-m">
          <div className="popup popup_condition-black">
            <h2 className="popup__title popup_condition-black">Вход</h2>
            <form className="popup__form popup__form_info" name="nameInfo" onSubmit={handleSubmit}>
              <input className="popup__input popup_condition-black popup__input_border-thick popup__input_type_name" id="usermail" name="usermail"
                type="email" value={userData.usermail} placeholder="Email" required minLength="2" maxLength="40" onChange={handleChange} />
              <span className="popup__input-error popup__input-error_username"></span>
              <input className="popup__input popup_condition-black popup__input_border-thick popup__input_type_description" id="password" name="password"
                type="password" value={userData.password} placeholder="Пароль" required minLength="2" maxLength="200" onChange={handleChange} />
              <span className="popup__input-error popup__input-error_userinfo"></span>
              <button className="popup__submit-button-regist popup__submit-button_l popup_condition-white cursor" name="submit"
                type="submit">Войти</button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};