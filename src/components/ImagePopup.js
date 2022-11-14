export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup-fade popup-fade_opacity_strong popup-fade_type_img popup-fade__${card ? 'visible' : 'hidden'}`}>
      <figure className="popup-figure">
        <img className="popup-figure__image" src={card?.link} alt={card?.name} />
        <p className="popup-figure__title">{card?.name}</p>
        <button className="close-button cursor" type="button" onClick={onClose}></button>
      </figure>
    </div >
  );
};