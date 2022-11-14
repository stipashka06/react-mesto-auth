import { Link } from 'react-router-dom';

export default function Header({ userData, loggedIn, cbLogout, title, link }) {
  return (
    <header className="header">
      <div className="logo"></div>
      {loggedIn ?
        <div>
          <p className="header__title">{userData.email}</p>
          <button className="header__button cursor" name="submit" type="submit" onClick={cbLogout}>{title}</button>
        </div>
        :
        <Link to={`${link}`} className="header__button cursor">{title}</Link>}
    </header >
  );
};