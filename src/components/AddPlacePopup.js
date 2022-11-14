import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onUpdateCard }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  };

  function handleChangeDescription(e) {
    setLink(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateCard({
      name,
      about: link,
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      title={'Новое место'}
      name={'nameCard'}
      textButton={'Создать'}
      onClose={onClose}
      onSubmit={handleSubmit}
    // onSubmit={(cardInfo) => { handleSubmit(cardInfo) }}
    >
      <input className="popup__input popup__input_border-thin popup__input_type_name popup_condition-white" id="cardinfo" name="cardinfo" type="text" value={name} onChange={handleChangeName}
        placeholder="Название" required minLength="2" maxLength="30" />
      <span className="popup__input-error popup__input-error_cardinfo"></span>
      <input className="popup__input popup__input_border-thin popup__input_type_description popup_condition-white" id="cardurl" name="cardurl" type="url" value={link} onChange={handleChangeDescription}
        placeholder="Ссылка на картинку" required />
      <span className="popup__input-error popup__input-error_cardurl"></span>
    </PopupWithForm>
  );
};