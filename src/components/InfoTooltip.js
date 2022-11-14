export default function InfoTooltip({ isOpen, title, img, onClose }) {
  return (
    <div className={`popup-fade popup-fade_opacity_medium popup-fade__${(isOpen) ? 'visible' : 'hidden'}`}>
      <div className="popup popup_condition-white">
        <div className={`${img}`}></div>
        <h2 className="popup__title popup_condition-white popup__submit-button_m">{title}</h2>
        <button className="close-button cursor" type="button" onClick={onClose}></button>
      </div>
    </div>
  );
};