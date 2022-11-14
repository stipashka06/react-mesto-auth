import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from './Header';

export default function Register({ loggedIn, onRegister }) {
  const [userData, setUserData] = useState({
    usermail: '',
    password: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    let { usermail, password } = userData;
    onRegister(usermail, password);
  };

  if (loggedIn) {
    return <Redirect to="/" />
  };

  return (
    <>
      <Header title={'Войти'} link="/sign-in" />
      <main className="content">
        <section className="profile profile_condition-m">
          <div className="popup popup_condition-black">
            <h2 className="popup__title popup_condition-black">Регистрация</h2>
            <form className="popup__form popup__form_info" name="nameInfo" onSubmit={handleSubmit}>
              <input className="popup__input popup_condition-black popup__input_border-thick popup__input_type_email" id="usermail" name="usermail"
                type="email" value={userData.name} placeholder="Email" required minLength="2" maxLength="40" onChange={handleChange} />
              <span className="popup__input-error popup__input-error_username"></span>
              <input className="popup__input popup_condition-black popup__input_border-thick popup__input_type_password" id="password" name="password"
                type="password" value={userData.password} placeholder="Пароль" required minLength="2" maxLength="200" onChange={handleChange} />
              <span className="popup__input-error popup__input-error_userinfo"></span>
              <button className="popup__submit-button-regist popup__submit-button_l popup_condition-white cursor" name="submit"
                type="submit">Зарегистрироваться</button>
            </form>
            <Link to="/sign-in" className="popup__description popup_condition-black cursor">Уже зарегистрированы? Войти</Link>
          </div>
        </section>
      </main>
    </>
  );
};