import { useContext } from 'react';
import ContextUser from '../contexts/CurrentUserContext';

export default function Main({ onEditAvatar, onEditProfile, onAddPlace, cardsElements }) {
  const user = useContext(ContextUser);

  return (
    <main className="content">
      <section className="profile profile_condition-m">
        <div className="profile__background-avatar">
          <img className="profile__avatar" src={user?.avatar} alt={user?.name} />
          <div className="profile__avatar-hover cursor" onClick={onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <div className="profile__info-title">
            <h1 className="profile__title">{user?.name}</h1>
            <button className="profile__edit-button cursor" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{user?.about}</p>
        </div>
        <button className="profile__add-button cursor" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
      </section>
      <section className="elements" aria-label="Достопримечательности России">
        {cardsElements}
      </section>
    </main>
  );
};