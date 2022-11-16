import { useState, useEffect } from 'react';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Card from './Card';
import ContextUser from '../contexts/CurrentUserContext';
import ContextCard from '../contexts/CurrentCard';

export default function Mesto({ loggedIn, cbLogout, userData }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentCard, setCurrentCard] = useState([]);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleEditAvatarClick = () => { setEditAvatarPopupOpen(true) };
  const handleEditProfileClick = () => { setEditProfilePopupOpen(true) };
  const handleAddPlaceClick = () => { setAddPlacePopupOpen(true) };
  const handleDeleteCardClick = () => { setDeleteCardPopupOpen(true) };

  const cardsElements = currentCard?.map((item, i) => (
    <Card
      cardData={item}
      key={item?._id}
      // onDeleteCard={onDeleteCard}
      onOpenImage={setSelectedCard}
      onCardLike={handleCardLike}
      onCardDelete={handleCardDelete}
    />
  ));

  useEffect(() => {
    api.getAllInfo()
      .then(([userInfo, cardInfo]) => {
        setCurrentUser(userInfo)
        setCurrentCard(cardInfo)
      })
      .catch((err) => {
        console.log(
          `Ошибка запроса загрузки данный пользователя или карточек ${err}`
        );
      });
  }, []);

  function handleUpdateAvatar(avatarInfo) {
    api.getAvatar(avatarInfo)
      .then((avatarInfo) => {
        setCurrentUser(avatarInfo)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(
          `Ошибка запроса загрузки данный аватара ${err}`
        );
      });
  };

  function handleUpdateUser(userInfo) {
    api.gatUserData(userInfo)
      .then((userInfo) => {
        setCurrentUser(userInfo)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(
          `Ошибка запроса загрузки данный пользователя ${err}`
        );
      });
  };

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeleteCardPopupOpen(false);
    setSelectedCard(null);
  };

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isDeleteCardPopupOpen || selectedCard;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      };
    };
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    };
  }, [isOpen]);

  function handleAddPlaceSubmit(cardInfo) {
    api.getNewCard(cardInfo)
      .then((cardInfo) => {
        setCurrentCard([cardInfo, ...currentCard])
        setAddPlacePopupOpen(false)
      })
      .catch((err) => {
        console.log(
          `Ошибка запроса загрузки данный карточки ${err}`
        );
      });
  };

  function handleCardLike(card) {
    const isLiked = card?.likes.some(i => i?._id === currentUser?._id);
    api.stagingLike(card?._id, isLiked)
      .then((newCard) => {
        setCurrentCard((state) => state.map((c) => c?._id === newCard?._id ? newCard : c));
      })
      .catch((err) => {
        console.log(
          `Ошибка запроса загрузки данный Like карточек ${err}`
        );
      });
  };

  function handleCardDelete(card) {
    api.deleteCard(card?._id)
      .then(() => {
        setCurrentCard((state) => state.filter(data => data !== card));
      })
      .catch((err) => {
        console.log(
          `Ошибка запроса загрузки удаления карточки ${err}`
        );
      });
  };

  return (
    <div className="page" link="/">
      <ContextUser.Provider value={currentUser}>
        <ContextCard.Provider value={currentCard}>
          <Header title={'Выйти'} loggedIn={loggedIn} cbLogout={cbLogout} userData={userData} />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onDeleteCard={handleDeleteCardClick}
            cardsElements={cardsElements}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
          />
          <Footer />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={(avatarInfo) => { handleUpdateAvatar(avatarInfo) }}
            onClose={closeAllPopups}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={(userInfo) => { handleUpdateUser(userInfo) }}
            onClose={closeAllPopups}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onUpdateCard={(cardInfo) => { handleAddPlaceSubmit(cardInfo) }}
            onClose={closeAllPopups}
          />
          <PopupWithForm
            isOpen={isDeleteCardPopupOpen}
            title={'Вы уверены?'}
            name={'namedelete'}
            textButton={'Да'}
            onClose={closeAllPopups}
          >
          </PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </ContextCard.Provider>
      </ContextUser.Provider>
    </div >
  );
};