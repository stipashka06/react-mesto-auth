import { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import ContextUser from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const user = useContext(ContextUser);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(user?.name || '');
    setDescription(user?.about || '');
  }, [user, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  };

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      title={'Редактировать профиль'}
      name={'username'}
      textButton={'Сохранить'}
      onClose={onClose}
      onSubmit={handleSubmit}
    // onSubmit={(userInfo) => { handleSubmit(userInfo) }}
    >
      <input className="popup__input popup__input_border-thin popup__input_type_name popup_condition-white" id="username" name="username" type="text" value={name} onChange={handleChangeName} required
        minLength="2" maxLength="40" />
      <span className="popup__input-error popup__input-error_username"></span>
      <input className="popup__input popup__input_border-thin popup__input_type_description popup_condition-white" id="userinfo" name="userinfo" type="text" value={description} onChange={handleChangeDescription}
        required minLength="2" maxLength="200" />
      <span className="popup__input-error popup__input-error_userinfo"></span>
    </PopupWithForm>
  );
};