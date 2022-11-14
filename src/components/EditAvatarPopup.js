import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef?.current?.value
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      title={'Обновить аватар'}
      name={'nameAvatar'}
      textButton={'Сохранить'}
      onClose={onClose}
      onSubmit={handleSubmit}
    // onSubmit={(avatarInfo) => { handleSubmit(avatarInfo) }}
    >
      <span className="popup__input-error popup__input-error_username"></span>
      <input className="popup__input popup__input_border-thin popup__input_type_description popup_condition-white" id="avatarurl" name="avatarurl" type="url" defaultValue="" ref={avatarRef}
        placeholder="Ссылка на картинку" required />
      <span className="popup__input-error popup__input-error_avatarurl"></span>
    </PopupWithForm>
  );
};