export default function PopupWithForm({ isOpen, onClose, onSubmit, textButton, children, name, title }) {
  return (
    <div className={`popup-fade popup-fade_opacity_medium popup-fade_type_${name} popup-fade__${(isOpen) ? 'visible' : 'hidden'}`}>
      <div className="popup popup_condition-white">
        <h2 className="popup__title popup_condition-white">{title}</h2>
        <form className={`popup__form popup__form_${name} `} name={`${name} `} onSubmit={onSubmit}>
          {children}
          <button className="popup__submit-button popup__submit-button_m popup_condition-black cursor" name="submit" type="submit">{textButton}</button>
        </form>
        <button className="close-button cursor" type="button" aria-label="Закрыть" onClick={onClose}></button>
      </div>
    </div >
  );
};